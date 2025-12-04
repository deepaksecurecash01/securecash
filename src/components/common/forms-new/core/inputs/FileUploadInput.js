import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback } from 'react';
import { FaTimes, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import imageCompression from 'browser-image-compression';

const fileToBase64 = (file) =>
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const formatFileSize = (bytes) =>
{
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const isImageFile = (file) => file && file.type && file.type.startsWith('image/');

const getFilePreview = (file) =>
{
    if (file instanceof File && isImageFile(file)) {
        return URL.createObjectURL(file);
    }
    return null;
};

const getFileIcon = (file) =>
{
    if (file.type.startsWith('image/')) {
        return (
            <svg className="text-blue-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        );
    } else if (file.type === 'application/pdf') {
        return (
            <svg className="text-red-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
            </svg>
        );
    }
    return (
        <svg className="text-gray-500 w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
        </svg>
    );
};

export const FileUploadInput = forwardRef(({
    value,
    onChange,
    onFocus,
    onBlur,
    name,
    accept = "image/*",
    multiple = false,
    theme = 'dark',
    hasError,
    isFocused,
    disabled = false,
    fileUploadState,
    maxFileSize = 10 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
    currentErrorField,
    setCurrentErrorField,
    ...otherProps
}, ref) =>
{
    const containerRef = useRef(null);
    const hiddenInputRef = useRef(null);

    const [dragActive, setDragActive] = useState(false);
    const [fileStates, setFileStates] = useState(new Map());

    useImperativeHandle(ref, () => ({
        focus: () =>
        {
            if (hiddenInputRef.current) {
                containerRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                setTimeout(() =>
                {
                    hiddenInputRef.current.focus();
                    if (onFocus) {
                        onFocus({ target: { name } });
                    }
                }, 100);
            }
        },
        scrollIntoView: (options) =>
        {
            if (containerRef.current) {
                containerRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    ...options
                });
            }
        },
        name,
        type: 'file'
    }), [onFocus, name]);

    const validateFile = useCallback((file) =>
    {
        const errors = [];
        if (file.size > maxFileSize) {
            errors.push(`File too large. Maximum ${Math.round(maxFileSize / (1024 * 1024))}MB allowed.`);
        }
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            errors.push(`Invalid file type. Allowed: ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}`);
        }
        return { valid: errors.length === 0, errors };
    }, [maxFileSize, allowedTypes]);

    const getFileId = useCallback((file) =>
    {
        return `${file.name}-${file.size}-${file.lastModified}-${Date.now()}`;
    }, []);

    const processFile = useCallback(async (file, fileId) =>
    {
        setFileStates(prev => new Map(prev.set(fileId, {
            file,
            status: 'uploading',
            message: 'Processing file...',
            error: null
        })));

        try {
            const validation = validateFile(file);
            if (!validation.valid) {
                throw new Error(validation.errors[0]);
            }

            setFileStates(prev => new Map(prev.set(fileId, {
                ...prev.get(fileId),
                message: 'Uploading image...'
            })));

            let processedFile = file;

            if (file.type.startsWith('image/')) {
                const compressionOptions = {
                    maxSizeMB: 5,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    quality: 0.8
                };

                processedFile = await imageCompression(file, compressionOptions);
            }

            setFileStates(prev => new Map(prev.set(fileId, {
                ...prev.get(fileId),
                message: 'Uploading file...'
            })));

            const base64Data = await fileToBase64(processedFile);

            const result = {
                filename: `${file.name.split('.')[0]}.${file.name.split('.').pop()}`,
                data: base64Data,
                originalFile: file,
                compressedFile: processedFile,
                isProcessed: true,
                processedAt: new Date().toISOString(),
                fileId
            };

            if (fileUploadState?.setUploadResult) {
                fileUploadState.setUploadResult(fileId, result);
            }

            setFileStates(prev => new Map(prev.set(fileId, {
                file,
                status: 'completed',
                message: 'Upload complete',
                error: null,
                result
            })));

            return result;

        } catch (error) {
            setFileStates(prev => new Map(prev.set(fileId, {
                file,
                status: 'error',
                message: null,
                error: error.message
            })));

            return null;
        }
    }, [validateFile, fileUploadState]);

    const handleFileChange = useCallback(async (files) =>
    {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const fileToSubmit = multiple ? fileArray : fileArray[0];
        onChange(fileToSubmit);

        if (onFocus) {
            onFocus({ target: { name } });
        }

        for (const file of fileArray) {
            const fileId = getFileId(file);
            await processFile(file, fileId);
        }
    }, [multiple, onChange, onFocus, name, getFileId, processFile]);

    const removeFile = useCallback((e, fileToRemove) =>
    {
        e.preventDefault();
        e.stopPropagation();

        const fileId = Array.from(fileStates.keys()).find(id =>
            fileStates.get(id)?.file?.name === fileToRemove.name &&
            fileStates.get(id)?.file?.size === fileToRemove.size
        );

        if (fileId) {
            setFileStates(prev =>
            {
                const updated = new Map(prev);
                updated.delete(fileId);
                return updated;
            });

            if (fileUploadState?.clearUploadResult) {
                fileUploadState.clearUploadResult(fileId);
            }
        }

        if (multiple && Array.isArray(value)) {
            const newFiles = value.filter(file =>
                !(file.name === fileToRemove.name && file.size === fileToRemove.size)
            );
            onChange(newFiles.length > 0 ? newFiles : null);
        } else {
            onChange(null);
        }
    }, [fileStates, fileUploadState, multiple, value, onChange]);

    const handleDragEnter = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setDragActive(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setDragActive(false);
        }
    }, []);

    const handleDragOver = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) =>
    {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (disabled) return;
        handleFileChange(e.dataTransfer.files);
    }, [disabled, handleFileChange]);

    const handleFocus = useCallback((e) =>
    {
        if (onFocus) onFocus(e);
    }, [onFocus]);

    const handleBlur = useCallback((e) =>
    {
        if (onBlur) onBlur(e);
    }, [onBlur]);

    const getContainerClasses = () =>
    {
        const baseClasses = "relative w-full border-2 border-dashed rounded-lg text-center transition-all duration-200 h-[200px] overflow-hidden";
        let stateClasses = "";

        if (disabled) {
            stateClasses = "border-gray-300 bg-gray-50 cursor-not-allowed";
        } else if (dragActive) {
            stateClasses = "border-primary bg-primary/10 shadow-lg";
        } else {
            stateClasses = "border-dark-border/50 bg-white hover:border-primary/50";
        }

        const errorClasses = (hasError && isFocused) ? "border-red-500 bg-red-50/30" : "";
        return `${baseClasses} ${stateClasses} ${errorClasses}`;
    };

    const getCurrentFiles = () =>
    {
        if (!value) return [];
        if (value instanceof FileList) return Array.from(value);
        if (value instanceof File) return [value];
        if (Array.isArray(value)) return value.filter(file => file instanceof File);
        return [];
    };

    const currentFiles = getCurrentFiles();

    return (
        <div ref={containerRef} className="relative" data-field-name={name}>
            <div
                className={getContainerClasses()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="h-full w-full flex flex-col justify-center items-center bg-[rgb(242,242,242,0.3)] p-4 relative pointer-events-none">
                    {currentFiles.length === 0 ? (
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <svg
                                className={`mx-auto mb-4 w-16 h-16 transition-colors ${disabled ? 'text-gray-300' :
                                    dragActive ? 'text-primary' : 'text-gray-400'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                />
                            </svg>
                            <p className={`text-sm mb-2 ${disabled ? 'text-gray-400' :
                                dragActive ? 'text-primary font-medium' : 'text-gray-600'
                                }`}>
                                {disabled ? 'File upload disabled' :
                                    dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
                            </p>
                            <p className={`text-xs ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
                                PNG, JPG, PDF up to {Math.round(maxFileSize / (1024 * 1024))}MB
                            </p>
                        </div>
                    ) : (
                        <div className="w-full">
                            {currentFiles.map((file, index) =>
                            {
                                const fileId = Array.from(fileStates.keys()).find(id =>
                                    fileStates.get(id)?.file?.name === file.name &&
                                    fileStates.get(id)?.file?.size === file.size
                                );
                                const fileState = fileId ? fileStates.get(fileId) : null;
                                const previewUrl = getFilePreview(file);

                                return (
                                    <div key={`${file.name}-${index}`} className="relative">
                                        {(fileState?.status === 'completed' || fileState?.status === 'error') && (
                                            <button
                                                type="button"
                                                onClick={(e) => removeFile(e, file)}
                                                onMouseDown={(e) => e.stopPropagation()}
                                                className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-30 shadow-lg border-2 border-white"
                                                style={{ pointerEvents: 'auto' }}
                                                disabled={disabled}
                                                title="Remove file"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}

                                        {fileState?.status === 'uploading' ? (
                                            <div className="flex flex-col items-center py-4">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <FaSpinner className="animate-spin text-primary text-2xl" />
                                                    <div className="text-center">
                                                        <span className="text-sm text-gray-700 font-medium block truncate max-w-[200px]">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-primary">
                                                            {fileState.message}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : fileState?.status === 'error' ? (
                                            <div className="flex flex-col items-center py-4">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <FaExclamationTriangle className="text-red-500 text-2xl" />
                                                    <div className="text-center">
                                                        <span className="text-sm text-gray-700 font-medium block truncate max-w-[200px]">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-red-600">
                                                            {fileState.error}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : previewUrl ? (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={previewUrl}
                                                    alt={file.name}
                                                    className="w-32 h-20 object-cover rounded mb-2 shadow-sm"
                                                    onError={() => URL.revokeObjectURL(previewUrl)}
                                                />
                                                <span className="text-sm text-gray-700 font-medium text-center truncate max-w-full">
                                                    {file.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatFileSize(file.size)}
                                                </span>
                                                {fileState?.status === 'completed' && (
                                                    <span className="text-xs text-green-600 mt-1">
                                                        Upload complete
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    {getFileIcon(file)}
                                                    <div className="text-center">
                                                        <span className="text-sm text-gray-700 font-medium block truncate max-w-[200px]">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {formatFileSize(file.size)}
                                                        </span>
                                                    </div>
                                                </div>
                                                {fileState?.status === 'completed' && (
                                                    <span className="text-xs text-green-600">
                                                        Upload complete
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <input
                    ref={hiddenInputRef}
                    type="file"
                    name={name}
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => handleFileChange(e.target.files)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label={`Upload ${multiple ? 'files' : 'file'}${accept ? ` (${accept})` : ''}`}
                    aria-describedby={hasError && isFocused ? `${name}-error` : undefined}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    disabled={disabled}
                    style={{
                        pointerEvents: disabled ? 'none' : 'auto',
                        cursor: disabled ? 'not-allowed' : 'pointer'
                    }}
                    {...otherProps}
                />
            </div>
        </div>
    );
});

FileUploadInput.displayName = 'FileUploadInput';
