import { MIME_TYPES, MAX_ATTACHMENT_SIZE } from "../config/constants.js";

export const getMimeType = (filename) =>
{
    const extension = filename.toLowerCase().split(".").pop();
    return MIME_TYPES[extension] || "application/octet-stream";
};

export const processAttachment = (attachment, filename, mimeType = "application/pdf") =>
{
    if (!attachment) return null;

    try {
        let base64Content = attachment;
        if (attachment.includes(",")) {
            base64Content = attachment.split(",")[1];
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

export const processAttachmentsSequentially = (attachmentMappings, formData) =>
{
    const attachments = [];

    for (const mapping of attachmentMappings) {
        if (formData[mapping.field]) {
            try {
                const mimeType = getMimeType(mapping.filename);
                const processedAttachment = processAttachment(
                    formData[mapping.field],
                    mapping.filename,
                    mimeType
                );
                if (processedAttachment) {
                    attachments.push(processedAttachment);
                }
                if (global.gc) {
                    global.gc();
                }
            } catch (error) {
                console.error(`Error processing attachment ${mapping.filename}:`, error);
            }
        }
    }

    return attachments;
};

export const formatFileSize = (bytes) =>
{
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const calculateAttachmentSizes = (emailData) =>
{
    if (!emailData.attachments || !Array.isArray(emailData.attachments)) {
        return { count: 0, totalSize: 0, details: [] };
    }

    const details = emailData.attachments.map(attachment =>
    {
        const size = attachment.content ?
            (typeof attachment.content === 'string' ?
                Buffer.byteLength(attachment.content, 'base64') :
                attachment.content.length) : 0;

        return {
            filename: attachment.filename || 'unknown',
            size: size,
            sizeFormatted: formatFileSize(size),
            type: attachment.type || 'unknown'
        };
    });

    const totalSize = details.reduce((sum, att) => sum + att.size, 0);

    return {
        count: details.length,
        totalSize,
        totalSizeFormatted: formatFileSize(totalSize),
        details
    };
};