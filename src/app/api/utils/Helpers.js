import fs from "fs";
import path from "path";

// Helper function to read PDF files from the public/upload directory
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

// Helper function to prepare PDF attachments for franchise emails
export const preparePdfAttachments = ({attachments, attachmentConfigs }) =>
{
   


    for (const config of attachmentConfigs) {
        const pdfContent = readPdfFile(config.filename);
        if (pdfContent) {
            attachments.push({
                content: pdfContent,
                filename: config.displayName,
                type: "application/pdf",
                disposition: "attachment",
            });
        }
    }

    return attachments;
};

// Helper function to process base64 attachments
export const processAttachment = (
    attachment,
    filename,
    mimeType = "application/pdf"
) =>
{
    if (!attachment) return null;

    try {
        // Handle base64 data with or without data URL prefix
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

// Helper function to determine MIME type from filename
export const getMimeType = (filename) =>
{
    const extension = filename.toLowerCase().split(".").pop();
    const mimeTypes = {
        pdf: "application/pdf",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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

// Helper function to format callback date for display
export const formatCallbackDate = (callbackDate) =>
{
    if (!callbackDate) return 'Not requested';

    try {
        const date = new Date(callbackDate);
        if (isNaN(date.getTime())) return 'Not requested';

        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Not requested';
    }
};

// Helper function to prepare attachments from uploaded files
export const prepareAttachments = (formData) =>
{
    const attachments = [];

    // Check if there are any file attachments in the form data
    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment) =>
        {
            if (attachment.filename && attachment.content) {
                attachments.push({
                    content: attachment.content,
                    filename: attachment.filename,
                    type: attachment.type || "application/octet-stream",
                    disposition: "attachment",
                });
            }
        });
    }

    return attachments;
};

export const formatArrayField = (field) =>
{
    if (Array.isArray(field)) {
        return field.length > 0 ? field.join(", ") : "No schedule - special event.";
    }
    return field || "Not specified";
};
