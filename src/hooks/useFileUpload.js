// /hooks/useFileUpload.js
import { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';
import { fileToBase64 } from '@/utils/apiClient';

export const useFileUpload = ({
    compression = {
        targetSizeKB: 400,
        maxSizeMB: 5,
        allowedTypes: ['image/jpeg', 'image/png', 'image/jpg']
    },
    concurrencyLimit = 2
} = {}) =>
{
    const [isProcessing, setIsProcessing] = useState(false);
    const [fileErrors, setFileErrors] = useState([]);
    const [processingProgress, setProcessingProgress] = useState(0);

    // Progressive image compression
    const compressImageFile = useCallback(async (file) =>
    {
        const targetSizeBytes = compression.targetSizeKB * 1024;

        const compressionLevels = [
            { quality: 0.8, maxWidthOrHeight: 1920 },
            { quality: 0.6, maxWidthOrHeight: 1280 },
            { quality: 0.4, maxWidthOrHeight: 800 },
            { quality: 0.2, maxWidthOrHeight: 600 }
        ];

        console.log(`Compressing ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);

        for (let i = 0; i < compressionLevels.length; i++) {
            const options = {
                maxSizeMB: compression.targetSizeKB / 1024,
                maxWidthOrHeight: compressionLevels[i].maxWidthOrHeight,
                useWebWorker: true,
                quality: compressionLevels[i].quality
            };

            try {
                const compressedFile = await imageCompression(file, options);
                console.log(`Level ${i + 1}: ${(compressedFile.size / 1024).toFixed(2)}KB`);

                if (compressedFile.size <= targetSizeBytes || i === compressionLevels.length - 1) {
                    console.log(`Final: ${(compressedFile.size / 1024).toFixed(2)}KB`);
                    return compressedFile;
                }
            } catch (error) {
                console.error(`Compression level ${i + 1} failed:`, error);
                continue;
            }
        }

        console.warn('All compression failed, using original');
        return file;
    }, [compression]);

    // Process multiple files
    const processFiles = useCallback(async (formData, fileFieldsConfig) =>
    {
        setIsProcessing(true);
        setFileErrors([]);
        setProcessingProgress(0);

        const attachments = [];
        const errors = [];

        try {
            // Process files in batches
            for (let i = 0; i < fileFieldsConfig.length; i += concurrencyLimit) {
                const batch = fileFieldsConfig.slice(i, i + concurrencyLimit);

                const batchPromises = batch.map(async ({ field, prefix }) =>
                {
                    if (formData[field]) {
                        try {
                            const compressedFile = await compressImageFile(formData[field]);
                            const base64File = await fileToBase64(compressedFile);
                            if (base64File) {
                                return {
                                    filename: `${prefix}.${formData[field].name.split('.').pop()}`,
                                    data: base64File
                                };
                            }
                        } catch (error) {
                            errors.push(`${field}: ${error.message}`);
                            return null;
                        }
                    }
                    return null;
                });

                const batchResults = await Promise.all(batchPromises);
                attachments.push(...batchResults.filter(Boolean));

                // Update progress
                setProcessingProgress(Math.round(((i + concurrencyLimit) / fileFieldsConfig.length) * 100));
            }

            if (errors.length > 0) {
                setFileErrors(errors);
                throw new Error(`File processing errors: ${errors.join(', ')}`);
            }

            setProcessingProgress(100);
            return attachments;

        } catch (error) {
            setFileErrors(prev => [...prev, error.message]);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    }, [compressImageFile, concurrencyLimit]);

    // Validate single file
    const validateFile = useCallback((file) =>
    {
        if (!file) return { valid: true };

        const errors = [];

        // Size validation
        if (file.size > compression.maxSizeMB * 1024 * 1024) {
            errors.push(`File too large. Max ${compression.maxSizeMB}MB allowed.`);
        }

        // Type validation
        if (!compression.allowedTypes.includes(file.type)) {
            errors.push(`Invalid file type. Allowed: ${compression.allowedTypes.join(', ')}`);
        }

        return {
            valid: errors.length === 0,
            errors
        };
    }, [compression]);

    // Clear errors
    const clearFileErrors = useCallback(() =>
    {
        setFileErrors([]);
    }, []);

    return {
        // Processing state
        isProcessing,
        processingProgress,
        fileErrors,

        // Main functions
        processFiles,
        compressImageFile,
        validateFile,

        // Utilities
        clearFileErrors
    };
};