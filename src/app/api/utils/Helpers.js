// app/utils/Helpers.js
import fs from "fs";
import path from "path";

// Helper function to read PDF files - now supports external readPdfFile function
export const readPdfFile = (filename) =>
{
    try {
        const filePath = path.join(process.cwd(), "public", "upload", filename);

        if (!fs.existsSync(filePath)) {
            console.warn(`PDF file not found: ${filePath}`);
            return null;
        }

        const fileBuffer = fs.readFileSync(filePath);
        return fileBuffer.toString("base64");
    } catch (error) {
        console.error(`Error reading PDF file ${filename}:`, error);
        return null;
    }
};

// Enhanced PDF attachments preparation - now supports external readPdfFile function
export const preparePdfAttachments = ({ attachments, attachmentConfigs, readPdfFile: externalReadPdfFile }) =>
{
    const pdfReader = externalReadPdfFile || readPdfFile;

    for (const config of attachmentConfigs) {
        const pdfContent = pdfReader(config.filename);
        if (pdfContent) {
            attachments.push({
                content: pdfContent,
                filename: config.displayName,
                type: "application/pdf",
                disposition: "attachment",
            });
        } else {
            console.warn(`⚠️ Failed to load PDF: ${config.filename}`);
        }
    }

    return attachments;
};

// Enhanced attachment processing with better error handling and memory management
export const processAttachment = (attachment, filename, mimeType = "application/pdf") =>
{
    if (!attachment) return null;

    try {
        // Handle base64 data with or without data URL prefix
        let base64Content = attachment;
        if (attachment.includes(",")) {
            base64Content = attachment.split(",")[1];
        }

        // Validate base64 content
        if (!base64Content || base64Content.length === 0) {
            console.warn(`⚠️ Empty attachment content for: ${filename}`);
            return null;
        }

        // Basic size validation (5MB limit)
        const sizeBytes = Buffer.byteLength(base64Content, 'base64');
        if (sizeBytes > 5 * 1024 * 1024) {
            console.warn(`⚠️ Attachment too large (${(sizeBytes / (1024 * 1024)).toFixed(2)}MB): ${filename}`);
            return null;
        }

        return {
            filename: filename,
            type: mimeType,
            disposition: "attachment",
            content: base64Content,
        };
    } catch (error) {
        console.error(`Error processing attachment ${filename}:`, error);
        return null;
    }
};

// Enhanced MIME type detection with more formats
export const getMimeType = (filename) =>
{
    const extension = filename.toLowerCase().split(".").pop();
    const mimeTypes = {
        pdf: "application/pdf",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        bmp: "image/bmp",
        webp: "image/webp",
        tiff: "image/tiff",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        txt: "text/plain",
        rtf: "application/rtf",
        zip: "application/zip",
        rar: "application/x-rar-compressed"
    };
    return mimeTypes[extension] || "application/octet-stream";
};

// Helper function to get current date in consistent format
export const getCurrentDate = () =>
{
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

// Helper function to get current datetime in consistent format
export const getCurrentDateTime = () =>
{
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Enhanced callback date formatting with better error handling
export const formatCallbackDate = (callbackDate) =>
{
    console.log(callbackDate, "Callback Date");

    if (!callbackDate) return 'Not requested';

    try {
        let date;

        if (callbackDate instanceof Date) {
            date = callbackDate;
        } else if (typeof callbackDate === 'string') {
            // Check if the string is in DD/MM/YYYY format
            if (callbackDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                // Split the date and rearrange to MM/DD/YYYY for proper parsing
                const [day, month, year] = callbackDate.split('/');
                date = new Date(`${month}/${day}/${year}`);
            } else {
                // For other formats, try direct parsing
                date = new Date(callbackDate);
            }
        } else {
            return 'Not requested';
        }

        if (isNaN(date.getTime())) return 'Not requested';

        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting callback date:', error);
        return 'Not requested';
    }
};

// Enhanced attachments preparation with better validation
export const prepareAttachments = (formData) =>
{
    const attachments = [];

    // Validate form data structure
    if (!formData || typeof formData !== 'object') {
        return attachments;
    }

    // Check if there are any file attachments in the form data
    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment, index) =>
        {
            try {
                if (attachment && typeof attachment === 'object' && attachment.filename && attachment.content) {
                    // Validate attachment size (5MB limit)
                    const sizeBytes = Buffer.byteLength(attachment.content, 'base64');
                    if (sizeBytes > 5 * 1024 * 1024) {
                        console.warn(`⚠️ Skipping oversized attachment ${index + 1}: ${attachment.filename} (${(sizeBytes / (1024 * 1024)).toFixed(2)}MB)`);
                        return;
                    }

                    // Validate MIME type
                    const detectedMimeType = getMimeType(attachment.filename);
                    const finalMimeType = attachment.type || detectedMimeType;

                    attachments.push({
                        content: attachment.content,
                        filename: attachment.filename,
                        type: finalMimeType,
                        disposition: "attachment",
                    });
                } else {
                    console.warn(`⚠️ Invalid attachment structure at index ${index}:`, {
                        hasFilename: !!(attachment && attachment.filename),
                        hasContent: !!(attachment && attachment.content),
                        type: typeof attachment
                    });
                }
            } catch (error) {
                console.error(`Error processing attachment ${index}:`, error);
            }
        });
    }

    return attachments;
};

// Enhanced array field formatting with better validation
export const formatArrayField = (field) =>
{
    if (field === null || field === undefined) {
        return "Not specified";
    }

    if (Array.isArray(field)) {
        // Filter out empty/null values and trim strings
        const validItems = field
            .filter(item => item !== null && item !== undefined && item !== '')
            .map(item => typeof item === 'string' ? item.trim() : item)
            .filter(item => item !== '');

        if (validItems.length === 0) {
            return "No schedule - special event.";
        }

        return validItems.join(", ");
    }

    // Handle single values
    if (typeof field === 'string') {
        const trimmed = field.trim();
        return trimmed || "Not specified";
    }

    return field || "Not specified";
};

// Memory-efficient attachment processing function for sequential processing
export const processAttachmentsSequentially = (attachmentMappings, formData, getMimeTypeFn = getMimeType) =>
{
    const attachments = [];

    if (!formData || !Array.isArray(attachmentMappings)) {
        return attachments;
    }

    // Process one attachment at a time to reduce memory pressure
    for (const mapping of attachmentMappings) {
        if (!mapping || !mapping.field || !mapping.filename) {
            continue;
        }

        try {
            const attachmentData = formData[mapping.field];
            if (attachmentData) {
                const mimeType = getMimeTypeFn(mapping.filename);
                const processedAttachment = processAttachment(
                    attachmentData,
                    mapping.filename,
                    mimeType
                );

                if (processedAttachment) {
                    attachments.push(processedAttachment);

                    // Log successful processing
                    console.log(`Processed attachment: ${mapping.filename} (${(Buffer.byteLength(processedAttachment.content, 'base64') / 1024).toFixed(2)}KB)`);
                } else {
                    console.warn(`⚠️ Failed to process attachment: ${mapping.filename}`);
                }

                // Force garbage collection hint after each attachment
                // This is just a hint - the GC will decide when to actually run
                if (typeof global !== 'undefined' && global.gc) {
                    global.gc();
                }
            }
        } catch (error) {
            console.error(`Error in sequential processing for ${mapping.filename}:`, error);
        }
    }

    return attachments;
};

// Utility function to validate email addresses
export const isValidEmail = (email) =>
{
    if (!email || typeof email !== 'string') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();

    // Basic format check
    if (!emailRegex.test(trimmedEmail)) {
        return false;
    }

    // Additional checks
    if (trimmedEmail.length > 254) { // RFC 5321 limit
        return false;
    }

    // Check for common invalid patterns
    const invalidPatterns = [
        /^\./, // starts with dot
        /\.$/, // ends with dot
        /\.\./, // consecutive dots
        /@.*@/, // multiple @ symbols
    ];

    return !invalidPatterns.some(pattern => pattern.test(trimmedEmail));
};

// Utility function to sanitize file names
export const sanitizeFilename = (filename) =>
{
    if (!filename || typeof filename !== 'string') {
        return 'unknown_file';
    }

    // Remove or replace invalid characters
    return filename
        .trim()
        .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid characters
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/_{2,}/g, '_') // Replace multiple underscores with single
        .replace(/^_+|_+$/g, '') // Trim leading/trailing underscores
        .substring(0, 255); // Limit length
};

// Utility function to format file sizes consistently
export const formatFileSize = (bytes) =>
{
    if (!bytes || bytes === 0) return '0 B';

    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    if (i >= sizes.length) {
        return `${(bytes / Math.pow(k, sizes.length - 1)).toFixed(2)} ${sizes[sizes.length - 1]}`;
    }

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Enhanced error logging utility
export const logError = (context, error, additionalData = {}) =>
{
    const errorInfo = {
        timestamp: new Date().toISOString(),
        context,
        error: {
            message: error.message,
            name: error.name,
            stack: error.stack
        },
        ...additionalData
    };

    console.error(`${context}:`, errorInfo);

    return errorInfo;
};

// Performance monitoring utility
export const createPerformanceTimer = (label) =>
{
    const startTime = performance.now();

    return {
        end: () =>
        {
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
            return duration;
        },
        getDuration: () => performance.now() - startTime
    };
};