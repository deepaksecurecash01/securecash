// app/api/forms/route.js
import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import
    {
        prepareContactAdminNotificationEmail,
        prepareContactUserConfirmationEmail,
        prepareFranchiseAdminInquiryEmail,
        prepareFranchiseUserWelcomeEmail,
        prepareICAContractorWelcomeEmail,
        prepareICAEdocketsIntroductionEmail,
        prepareICAOperationsReviewEmail,
        prepareQuoteAdminRequestEmail,
        prepareQuoteUserConfirmationEmail,
        prepareSiteInfoAdminNotificationEmail,
        prepareSiteInfoUserConfirmationEmail,
        prepareTermsAgreementEmail,
        prepareAustracSubmissionEmail
    } from "./services/emailService";

// Set SendGrid API key once
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Environment detection - moved to startup (Performance Optimization)
const IS_VERCEL = !!(process.env.VERCEL_ENV || process.env.VERCEL || process.env.VERCEL_URL);
const USE_SYNC_EMAILS = IS_VERCEL;

// PDF Cache for performance optimization
const PDF_CACHE = new Map();
const PDF_CACHE_INITIALIZED = { value: false };

// Initialize PDF cache at startup
const initializePdfCache = () =>
{
    if (PDF_CACHE_INITIALIZED.value) return;

    console.log('🔄 Initializing PDF cache...');
    const startTime = performance.now();

    const pdfFiles = [
        // Franchise PDFs
        "ACCC-Information-Statement.pdf",
        "SecureCash-Franchise-Prospectus.pdf",
        "SecureCash-DL-Flyer.pdf",
        "eDockets-DL-Flyer.pdf",
        // ICA PDFs
        "Independant Contractors Agreement - Courier Lab.pdf",
        "SecureCash Deed - Courier Lab.pdf",
        // Site Info PDFs
        "SecureCash-Online-Services-Flyer.pdf",
        "How-to-Prepare-Your-Banking.pdf",
        // Terms PDFs
        "Terms & Conditions.pdf"
    ];

    let cachedCount = 0;
    let totalSize = 0;

    pdfFiles.forEach(filename =>
    {
        try {
            const filePath = path.join(process.cwd(), "public", "upload", filename);
            if (fs.existsSync(filePath)) {
                const fileBuffer = fs.readFileSync(filePath);
                const base64Content = fileBuffer.toString("base64");
                PDF_CACHE.set(filename, base64Content);
                cachedCount++;
                totalSize += base64Content.length;
            } else {
                console.warn(`⚠️ PDF not found for caching: ${filename}`);
            }
        } catch (error) {
            console.error(`❌ Error caching PDF ${filename}:`, error.message);
        }
    });

    const initTime = performance.now() - startTime;
    const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    console.log(`✅ PDF cache initialized: ${cachedCount}/${pdfFiles.length} files cached`);
    console.log(`📊 Cache size: ${sizeMB}MB, Init time: ${initTime.toFixed(2)}ms`);

    PDF_CACHE_INITIALIZED.value = true;
};

// Initialize cache immediately
initializePdfCache();

// Enhanced PDF reading with cache
const readPdfFile = (filename) =>
{
    // Return cached version if available
    if (PDF_CACHE.has(filename)) {
        return PDF_CACHE.get(filename);
    }

    // Fallback to file system read (shouldn't happen after init)
    console.warn(`⚠️ PDF cache miss for: ${filename}, reading from disk`);
    try {
        const filePath = path.join(process.cwd(), "public", "upload", filename);
        if (!fs.existsSync(filePath)) {
            console.warn(`PDF file not found: ${filePath}`);
            return null;
        }
        const fileBuffer = fs.readFileSync(filePath);
        const base64Content = fileBuffer.toString("base64");
        // Cache it for next time
        PDF_CACHE.set(filename, base64Content);
        return base64Content;
    } catch (error) {
        console.error(`Error reading PDF file ${filename}:`, error);
        return null;
    }
};

// Rate limiting storage (IP-based)
const RATE_LIMIT_MAP = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 submissions per minute

// Rate limiting function
const checkRateLimit = (req) =>
{
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Get or create rate limit entry
    if (!RATE_LIMIT_MAP.has(ip)) {
        RATE_LIMIT_MAP.set(ip, []);
    }

    const requests = RATE_LIMIT_MAP.get(ip);

    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] < windowStart) {
        requests.shift();
    }

    // Check if limit exceeded
    if (requests.length >= RATE_LIMIT_MAX) {
        return { allowed: false, remaining: 0 };
    }

    // Add current request
    requests.push(now);

    return { allowed: true, remaining: RATE_LIMIT_MAX - requests.length };
};

// Clean up old rate limit entries periodically
setInterval(() =>
{
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    for (const [ip, requests] of RATE_LIMIT_MAP.entries()) {
        // Remove old requests
        while (requests.length > 0 && requests[0] < windowStart) {
            requests.shift();
        }
        // Remove empty entries
        if (requests.length === 0) {
            RATE_LIMIT_MAP.delete(ip);
        }
    }
}, RATE_LIMIT_WINDOW); // Run cleanup every minute

// Server-side validation backup
const validateFormData = (formType, formData) =>
{
    const errors = [];

    // Basic required field validation based on form type
    const validations = {
        contact: ['FullName', 'Email', 'Department'],
        franchise: ['FullName', 'Email', 'InterestedArea'],
        ica: ['Name', 'Email', 'BusinessName'],
        quote: ['Name', 'Email', 'Organisation'],
        siteinfo: ['BusinessName', 'Email', 'Contact'],
        specialevent: ['BusinessName', 'Email', 'Contact'],
        terms: ['Full Name', 'Email', 'Organisation Name'],
        austrac: ['Organisation', 'OrganisationEmail']
    };

    const requiredFields = validations[formType.toLowerCase()] || [];

    requiredFields.forEach(field =>
    {
        const value = formData[field];
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    // Email format validation
    const emailFields = ['Email', 'OrganisationEmail'];
    emailFields.forEach(field =>
    {
        const email = formData[field];
        if (email && typeof email === 'string') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                errors.push(`Invalid email format: ${field}`);
            }
        }
    });

    // File size validation (5MB limit)
    if (formData.attachments && Array.isArray(formData.attachments)) {
        formData.attachments.forEach((attachment, index) =>
        {
            if (attachment.content) {
                const size = Buffer.byteLength(attachment.content, 'base64');
                if (size > 5 * 1024 * 1024) { // 5MB
                    errors.push(`Attachment ${index + 1} exceeds 5MB limit`);
                }
            }
        });
    }

    return errors;
};

// Enhanced sanitization
const fastSanitize = (str) =>
{
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/data:text\/html/gi, '')
        .trim();
};

// Failed email storage
const FAILED_EMAILS_DIR = path.join(process.cwd(), 'failed-emails');

const ensureFailedEmailsDir = () =>
{
    try {
        if (!fs.existsSync(FAILED_EMAILS_DIR)) {
            fs.mkdirSync(FAILED_EMAILS_DIR, { recursive: true });
        }
    } catch (error) {
        console.error('Failed to create failed-emails directory:', error);
    }
};

const saveFailedEmail = (emailData, error, formType) =>
{
    try {
        ensureFailedEmailsDir();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${formType}-${timestamp}.json`;
        const filepath = path.join(FAILED_EMAILS_DIR, filename);

        const failedEmailRecord = {
            timestamp: new Date().toISOString(),
            formType,
            error: error.message,
            emailData: {
                to: emailData.to,
                subject: emailData.subject,
                from: emailData.from,
                // Don't save full content to avoid large files
                hasAttachments: !!(emailData.attachments && emailData.attachments.length > 0),
                attachmentCount: emailData.attachments ? emailData.attachments.length : 0
            },
            retryable: !error.message.includes('Invalid email') // Mark if worth retrying
        };

        fs.writeFileSync(filepath, JSON.stringify(failedEmailRecord, null, 2));
        console.log(`💾 Failed email saved: ${filename}`);
    } catch (saveError) {
        console.error('Failed to save failed email:', saveError);
    }
};

// Background email queue with enhanced resilience
const emailQueue = [];
let processing = false;

// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 16000, // 16 seconds
    backoffFactor: 4
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const calculateRetryDelay = (attempt) =>
{
    const delay = RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffFactor, attempt - 1);
    return Math.min(delay, RETRY_CONFIG.maxDelay);
};

const calculateAttachmentSizes = (emailData) =>
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

// Helper function to format file sizes
const formatFileSize = (bytes) =>
{
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Enhanced email sending with retry logic
const sendEmailWithRetry = async (emailData, formType, maxRetries = RETRY_CONFIG.maxRetries) =>
{
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const startTime = performance.now();
            const response = await sendgrid.send(emailData);
            const sendTime = performance.now() - startTime;

            return {
                success: true,
                attempt,
                to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
                subject: emailData.subject || 'No Subject',
                sendTime: sendTime.toFixed(2),
                response: `${response[0]?.statusCode || 'Unknown'} ${response[0]?.statusMessage || ''}`.trim(),
                attachments: calculateAttachmentSizes(emailData)
            };
        } catch (error) {
            lastError = error;
            const sendTime = performance.now();

            console.error(`❌ Email attempt ${attempt}/${maxRetries} failed:`, {
                to: emailData.to,
                subject: emailData.subject,
                error: error.message,
                sendTime: sendTime.toFixed(2)
            });
            if (error.code === 429 || error.message.toLowerCase().includes('rate limit')) {
                console.warn(`🚨 SENDGRID RATE LIMIT HIT: ${error.message}`);
            }
            // Don't retry on certain errors
            if (error.message.includes('Invalid email') ||
                error.message.includes('Unsubscribed Address') ||
                error.response?.status === 400) {
                console.log(`🚫 Not retrying due to permanent error: ${error.message}`);
                break;
            }

            // If not the last attempt, wait before retrying
            if (attempt < maxRetries) {
                const delayMs = calculateRetryDelay(attempt);
                console.log(`⏱️ Retrying in ${delayMs}ms... (attempt ${attempt + 1}/${maxRetries})`);
                await delay(delayMs);
            }
        }
    }

    // All retries failed - save for manual inspection
    saveFailedEmail(emailData, lastError, formType);

    return {
        success: false,
        attempt: maxRetries,
        to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
        subject: emailData.subject || 'No Subject',
        sendTime: '0',
        response: lastError.message || 'Unknown error',
        attachments: calculateAttachmentSizes(emailData)
    };
};

// Enhanced email processing with all-or-nothing retry logic
const processEmailQueue = async () =>
{
    if (processing || emailQueue.length === 0) return;

    processing = true;
    const queueStartTime = performance.now();

    console.log(`\n📧 Starting email queue processing - ${emailQueue.length} tasks queued`);

    while (emailQueue.length > 0) {
        const emailTask = emailQueue.shift();
        const taskStartTime = performance.now();
        let success = false;
        let retryCount = 0;
        const maxTaskRetries = 2; // Retry entire email batch if any email fails

        // Retry entire email batch logic
        while (!success && retryCount <= maxTaskRetries) {
            try {
                const result = await emailTask.executeWithResilience();
                const taskTime = performance.now() - taskStartTime;

                // Check if all emails succeeded
                const allSuccessful = result.emailDetails.every(email => email.success);

                if (allSuccessful) {
                    success = true;
                    console.log(`\n✅ Successfully processed ${emailTask.type.toUpperCase()} emails:`);
                    console.log(`   └─ Form Type: ${emailTask.formType}`);
                    console.log(`   └─ Processing Time: ${taskTime.toFixed(2)}ms`);
                    console.log(`   └─ Emails Sent: ${result.emailsSent}`);
                    console.log(`   └─ Retry Count: ${retryCount}`);

                    // Log individual email details
                    result.emailDetails.forEach((email, index) =>
                    {
                        console.log(`   └─ Email ${index + 1}:`);
                        console.log(`      ├─ To: ${email.to}`);
                        console.log(`      ├─ Subject: ${email.subject}`);
                        console.log(`      ├─ Send Time: ${email.sendTime}ms`);
                        console.log(`      ├─ Attempts: ${email.attempt}`);
                        console.log(`      ├─ Response: ${email.response}`);

                        if (email.attachments.count > 0) {
                            console.log(`      ├─ Attachments: ${email.attachments.count} files (${email.attachments.totalSizeFormatted})`);
                            email.attachments.details.forEach((att, attIndex) =>
                            {
                                console.log(`      │  └─ ${attIndex + 1}. ${att.filename} - ${att.sizeFormatted} (${att.type})`);
                            });
                        } else {
                            console.log(`      ├─ Attachments: None`);
                        }
                        console.log(`      └─ Status: ✓ Delivered`);
                    });
                } else {
                    // Some emails failed - retry entire batch
                    retryCount++;
                    const failedEmails = result.emailDetails.filter(email => !email.success);

                    if (retryCount <= maxTaskRetries) {
                        const retryDelay = calculateRetryDelay(retryCount);
                        console.warn(`⚠️ Batch retry ${retryCount}/${maxTaskRetries} for ${emailTask.formType} - ${failedEmails.length} emails failed`);
                        console.log(`⏱️ Retrying entire batch in ${retryDelay}ms...`);
                        await delay(retryDelay);
                    } else {
                        console.error(`❌ Final batch failure for ${emailTask.formType} after ${maxTaskRetries} retries`);
                        break;
                    }
                }

            } catch (error) {
                retryCount++;
                const taskTime = performance.now() - taskStartTime;

                if (retryCount <= maxTaskRetries) {
                    const retryDelay = calculateRetryDelay(retryCount);
                    console.error(`❌ Batch error retry ${retryCount}/${maxTaskRetries}:`, {
                        formType: emailTask.formType,
                        error: error.message,
                        retryDelay: `${retryDelay}ms`
                    });
                    await delay(retryDelay);
                } else {
                    console.error(`❌ Final batch error for ${emailTask.formType}:`, {
                        errorTime: `${taskTime.toFixed(2)}ms`,
                        error: error.message,
                        stack: error.stack
                    });
                    break;
                }
            }
        }
    }

    const totalQueueTime = performance.now() - queueStartTime;
    console.log(`\n🏁 Email queue processing completed in ${totalQueueTime.toFixed(2)}ms\n`);

    processing = false;
};

// Process attachments sequentially for better memory management
const processAttachmentsSequentially = (attachmentMappings, formData) =>
{
    const attachments = [];

    // Process one attachment at a time to reduce memory pressure
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
                // Force garbage collection hint
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

// Helper functions (moved from helper file for better organization)
const getMimeType = (filename) =>
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

const processAttachment = (attachment, filename, mimeType = "application/pdf") =>
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

// ADD THIS NEW FUNCTION - Place it after your helper functions but before FORM_HANDLERS
// Universal multi-email batch executor with individual tracking
const executeMultiEmailBatch = async (emailTasks, formType) =>
{
    // Initialize all tasks as unsent
    emailTasks.forEach(task => { task.sent = false; });

    let retryCount = 0;
    const maxRetries = 2;
    const emailDetails = [];

    while (retryCount <= maxRetries) {
        // Only process emails that haven't been sent successfully
        const pendingTasks = emailTasks.filter(task => !task.sent);

        if (pendingTasks.length === 0) {
            console.log(`✅ All ${formType} emails successfully sent (retry ${retryCount})`);
            break;
        }

        console.log(`📧 ${formType} batch attempt ${retryCount + 1}: ${pendingTasks.length}/${emailTasks.length} emails to send`);

        // Send all pending emails in parallel
        const batchResults = await Promise.all(
            pendingTasks.map(async (task) =>
            {
                try {
                    const emailData = task.prepare();
                    const result = await sendEmailWithRetry(emailData, task.type, 1); // Single attempt per batch retry

                    // Mark as sent if successful
                    if (result.success) {
                        task.sent = true;
                        console.log(`✅ ${formType} ${task.id} email sent successfully`);
                    } else {
                        console.warn(`❌ ${formType} ${task.id} email failed: ${result.response}`);
                    }

                    return { ...result, taskId: task.id, recipient: task.recipient };
                } catch (error) {
                    console.error(`❌ ${formType} ${task.id} email error:`, error.message);
                    return {
                        success: false,
                        taskId: task.id,
                        recipient: task.recipient,
                        to: 'unknown',
                        subject: task.id,
                        sendTime: '0',
                        response: error.message,
                        attempt: 1,
                        attachments: { count: 0, totalSize: 0, details: [] }
                    };
                }
            })
        );

        // Add results to collection
        emailDetails.push(...batchResults);

        // Check if all emails are now sent
        const allSent = emailTasks.every(task => task.sent);

        if (allSent) {
            console.log(`✅ All ${formType} emails sent successfully on attempt ${retryCount + 1}`);
            break;
        }

        // Prepare for retry if not all sent and retries remaining
        if (retryCount < maxRetries) {
            const failedTasks = emailTasks.filter(task => !task.sent);
            const successfulTasks = emailTasks.filter(task => task.sent);
            const retryDelay = calculateRetryDelay(retryCount + 1);

            console.warn(`⏱️ ${formType} batch retry ${retryCount + 2}/${maxRetries + 1} in ${retryDelay}ms`);
            console.warn(`   └─ Failed emails (will retry): ${failedTasks.map(t => `${t.id}(${t.recipient})`).join(', ')}`);

            if (successfulTasks.length > 0) {
                console.log(`   └─ Successful emails (won't resend): ${successfulTasks.map(t => `${t.id}(${t.recipient})`).join(', ')}`);
            }

            await delay(retryDelay);
        }

        retryCount++;
    }

    // Create final summary with latest results for each task
    const sentCount = emailTasks.filter(task => task.sent).length;
    const finalDetails = emailTasks.map(task =>
    {
        // Get the latest result for this task
        const latestResult = emailDetails
            .filter(detail => detail.taskId === task.id)
            .pop(); // Get the most recent attempt

        return {
            taskId: task.id,
            recipient: task.recipient,
            success: task.sent,
            to: latestResult?.to || 'unknown',
            subject: latestResult?.subject || task.id,
            attempts: retryCount + 1,
            sendTime: latestResult?.sendTime || '0',
            response: task.sent ? 'Success' : (latestResult?.response || 'Failed after retries'),
            attachments: latestResult?.attachments || { count: 0, totalSize: 0, details: [] }
        };
    });

    // Log final summary
    if (sentCount === emailTasks.length) {
        console.log(`\n✅ ${formType} COMPLETE: All ${emailTasks.length} emails sent successfully`);
    } else {
        console.warn(`\n⚠️ ${formType} PARTIAL SUCCESS: ${sentCount}/${emailTasks.length} emails sent`);
        const failedEmails = finalDetails.filter(d => !d.success);
        failedEmails.forEach(failed =>
        {
            console.warn(`   └─ Failed: ${failed.taskId} (${failed.recipient}) - ${failed.response}`);
        });
    }

    return {
        emailsSent: sentCount,
        emailDetails: finalDetails,
        partialSuccess: sentCount > 0 && sentCount < emailTasks.length,
        totalAttempts: retryCount + 1
    };
};

// Universal form handlers with enhanced resilience
const FORM_HANDLERS = {
    // Single email forms (no changes needed)
    austrac: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'austrac',
                formType: 'AUSTRAC',
                executeWithResilience: async () =>
                {
                    const emailData = prepareAustracSubmissionEmail(data, readPdfFile);
                    const emailDetails = [await sendEmailWithRetry(emailData, 'austrac')];

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const emailData = prepareAustracSubmissionEmail(data, readPdfFile);
            const emailDetails = [await sendEmailWithRetry(emailData, 'austrac')];

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "AUSTRAC information submitted successfully!",
        logData: (data) => ({ org: data.Organisation, email: data.OrganisationEmail })
    },

    terms: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'terms',
                formType: 'Terms',
                executeWithResilience: async () =>
                {
                    const emailData = prepareTermsAgreementEmail(data, readPdfFile);
                    const emailDetails = [await sendEmailWithRetry(emailData, 'terms')];

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const emailData = prepareTermsAgreementEmail(data, readPdfFile);
            const emailDetails = [await sendEmailWithRetry(emailData, 'terms')];

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "Terms & Conditions accepted successfully!",
        logData: (data) => ({ org: data["Organisation Name"], name: data["Full Name"] })
    },

    // MULTI-EMAIL FORMS - Enhanced with individual tracking

    contact: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'contact',
                formType: 'Contact',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'admin-notification',
                            type: 'contact-admin',
                            prepare: () => prepareContactAdminNotificationEmail(data, readPdfFile),
                            recipient: 'admin'
                        },
                        {
                            id: 'user-confirmation',
                            type: 'contact-user',
                            prepare: () => prepareContactUserConfirmationEmail(data, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'Contact');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            return await executeMultiEmailBatch([
                {
                    id: 'admin-notification',
                    type: 'contact-admin',
                    prepare: () => prepareContactAdminNotificationEmail(data, readPdfFile),
                    recipient: 'admin'
                },
                {
                    id: 'user-confirmation',
                    type: 'contact-user',
                    prepare: () => prepareContactUserConfirmationEmail(data, readPdfFile),
                    recipient: 'customer'
                }
            ], 'Contact');
        },
        response: "Contact request submitted successfully!",
        logData: (data) => ({ name: data.FullName, dept: data.Department })
    },

    franchise: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'franchise',
                formType: 'Franchise',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'admin-inquiry',
                            type: 'franchise-admin',
                            prepare: () => prepareFranchiseAdminInquiryEmail(data, readPdfFile),
                            recipient: 'admin'
                        },
                        {
                            id: 'user-welcome',
                            type: 'franchise-user',
                            prepare: () => prepareFranchiseUserWelcomeEmail(data, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'Franchise');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            return await executeMultiEmailBatch([
                {
                    id: 'admin-inquiry',
                    type: 'franchise-admin',
                    prepare: () => prepareFranchiseAdminInquiryEmail(data, readPdfFile),
                    recipient: 'admin'
                },
                {
                    id: 'user-welcome',
                    type: 'franchise-user',
                    prepare: () => prepareFranchiseUserWelcomeEmail(data, readPdfFile),
                    recipient: 'customer'
                }
            ], 'Franchise');
        },
        response: "Franchise enquiry submitted successfully!",
        logData: (data) => ({ name: data.FullName, area: data.InterestedArea })
    },

    ica: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'ica',
                formType: 'ICA',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'operations-review',
                            type: 'ica-operations',
                            prepare: () => prepareICAOperationsReviewEmail(data, readPdfFile, processAttachmentsSequentially),
                            recipient: 'admin'
                        },
                        {
                            id: 'contractor-welcome',
                            type: 'ica-contractor',
                            prepare: () => prepareICAContractorWelcomeEmail(data, readPdfFile),
                            recipient: 'customer'
                        },
                        {
                            id: 'edockets-intro',
                            type: 'ica-edockets',
                            prepare: () => prepareICAEdocketsIntroductionEmail(data, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'ICA');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            return await executeMultiEmailBatch([
                {
                    id: 'operations-review',
                    type: 'ica-operations',
                    prepare: () => prepareICAOperationsReviewEmail(data, readPdfFile, processAttachmentsSequentially),
                    recipient: 'admin'
                },
                {
                    id: 'contractor-welcome',
                    type: 'ica-contractor',
                    prepare: () => prepareICAContractorWelcomeEmail(data, readPdfFile),
                    recipient: 'customer'
                },
                {
                    id: 'edockets-intro',
                    type: 'ica-edockets',
                    prepare: () => prepareICAEdocketsIntroductionEmail(data, readPdfFile),
                    recipient: 'customer'
                }
            ], 'ICA');
        },
        response: "ICA form submitted successfully!",
        logData: (data) => ({ name: data.Name, business: data.BusinessName })
    },

    quote: {
        queueEmails: (data) =>
        {
            const clean = {
                ...data,
                Name: fastSanitize(data.Name),
                Organisation: fastSanitize(data.Organisation),
                FormID: data.FormID || "quote"
            };

            emailQueue.push({
                type: 'quote',
                formType: 'Quote',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'admin-request',
                            type: 'quote-admin',
                            prepare: () => prepareQuoteAdminRequestEmail(clean, readPdfFile),
                            recipient: 'admin'
                        },
                        {
                            id: 'user-confirmation',
                            type: 'quote-user',
                            prepare: () => prepareQuoteUserConfirmationEmail(clean, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'Quote');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const clean = {
                ...data,
                Name: fastSanitize(data.Name),
                Organisation: fastSanitize(data.Organisation),
                FormID: data.FormID || "quote"
            };

            return await executeMultiEmailBatch([
                {
                    id: 'admin-request',
                    type: 'quote-admin',
                    prepare: () => prepareQuoteAdminRequestEmail(clean, readPdfFile),
                    recipient: 'admin'
                },
                {
                    id: 'user-confirmation',
                    type: 'quote-user',
                    prepare: () => prepareQuoteUserConfirmationEmail(clean, readPdfFile),
                    recipient: 'customer'
                }
            ], 'Quote');
        },
        response: "Quote request submitted successfully!",
        logData: (data) => ({ org: data.Organisation, name: data.Name })
    },

    siteinfo: {
        queueEmails: (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Regular Service",
                Services: Array.isArray(data.Services) ? data.Services : [data.Services].filter(Boolean)
            };

            emailQueue.push({
                type: 'siteinfo',
                formType: 'Site Info',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'admin-notification',
                            type: 'siteinfo-admin',
                            prepare: () => prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                            recipient: 'admin'
                        },
                        {
                            id: 'user-confirmation',
                            type: 'siteinfo-user',
                            prepare: () => prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'Site Info');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Regular Service",
                Services: Array.isArray(data.Services) ? data.Services : [data.Services].filter(Boolean)
            };

            return await executeMultiEmailBatch([
                {
                    id: 'admin-notification',
                    type: 'siteinfo-admin',
                    prepare: () => prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                    recipient: 'admin'
                },
                {
                    id: 'user-confirmation',
                    type: 'siteinfo-user',
                    prepare: () => prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                    recipient: 'customer'
                }
            ], 'Site Info');
        },
        response: "Site info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, contact: data.Contact })
    },

    specialevent: {
        queueEmails: (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Special Event"
            };

            emailQueue.push({
                type: 'specialevent',
                formType: 'Special Event',
                executeWithResilience: async () =>
                {
                    return await executeMultiEmailBatch([
                        {
                            id: 'admin-notification',
                            type: 'specialevent-admin',
                            prepare: () => prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                            recipient: 'admin'
                        },
                        {
                            id: 'user-confirmation',
                            type: 'specialevent-user',
                            prepare: () => prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                            recipient: 'customer'
                        }
                    ], 'Special Event');
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Special Event"
            };

            return await executeMultiEmailBatch([
                {
                    id: 'admin-notification',
                    type: 'specialevent-admin',
                    prepare: () => prepareSiteInfoAdminNotificationEmail(clean, readPdfFile),
                    recipient: 'admin'
                },
                {
                    id: 'user-confirmation',
                    type: 'specialevent-user',
                    prepare: () => prepareSiteInfoUserConfirmationEmail(clean, readPdfFile),
                    recipient: 'customer'
                }
            ], 'Special Event');
        },
        response: "Special event info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, type: "special" })
    }
};


export async function POST(req)
{
    const startTime = performance.now();

    try {
        // Fast-fail checks
        if (!process.env.SENDGRID_API_KEY) {
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
        }

        // Rate limiting check
        const rateLimit = checkRateLimit(req);
        if (!rateLimit.allowed) {
            return NextResponse.json({
                error: "Rate limit exceeded",
                retryAfter: 60,
                remaining: rateLimit.remaining
            }, { status: 429 });
        }

        // Parse JSON - let it throw if invalid
        const { formType, ...formData } = await req.json();
        const parseTime = performance.now();
        // Quick validation
        if (!formType) {
            return NextResponse.json({ error: "formType required" }, { status: 400 });
        }

        const handler = FORM_HANDLERS[formType.toLowerCase()];
        if (!handler) {
            return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
        }

        // Server-side validation backup
        const validationErrors = validateFormData(formType, formData);
        if (validationErrors.length > 0) {
            return NextResponse.json({
                error: "Validation failed",
                details: validationErrors
            }, { status: 400 });
        }

        let emailProcessingTime = 0;
        let emailResult = null;

        if (USE_SYNC_EMAILS) {
            // 🔄 SYNCHRONOUS MODE (Vercel Development)
            console.log(`🔄 Processing ${formType} emails synchronously (Vercel mode)`);

            const emailStartTime = performance.now();
            emailResult = await handler.executeEmailsSync(formData);
            emailProcessingTime = performance.now() - emailStartTime;

            // Log email results immediately
            console.log(`\n✅ ${formType.toUpperCase()} emails sent synchronously:`);
            console.log(`   └─ Emails Sent: ${emailResult.emailsSent}`);
            console.log(`   └─ Processing Time: ${emailProcessingTime.toFixed(2)}ms`);

            // Log individual email details for heavy forms (ICA)
            if (formType.toLowerCase() === 'ica' || emailResult.emailDetails.length > 2) {
                emailResult.emailDetails.forEach((email, index) =>
                {
                    console.log(`   └─ Email ${index + 1}: ${email.to} - ${email.sendTime}ms - Attempts: ${email.attempt} - ${email.success ? '✓' : '✗'}`);
                    if (email.attachments.count > 0) {
                        console.log(`      └─ Attachments: ${email.attachments.count} files (${email.attachments.totalSizeFormatted})`);
                    }
                });
            }

        } else {
            // ⚡ ASYNC MODE (Production Server)
            console.log(`⚡ Queuing ${formType} emails for background processing (Production mode)`);

            handler.queueEmails(formData);

            // Start processing queue in background (non-blocking)
            setImmediate(() => processEmailQueue());

            emailProcessingTime = 0; // Queued
        }

        const totalTime = performance.now() - startTime;
        const parseTimeMs = parseTime - startTime;
        const processingTimeMs = totalTime - parseTimeMs - emailProcessingTime;

        // Async logging for production, sync for development
        const logData = handler.logData(formData);
        const performanceData = {
            ...logData,
            timestamp: new Date().toISOString(),
            environment: USE_SYNC_EMAILS ? 'vercel-dev' : 'production',
            rateLimit: {
                remaining: rateLimit.remaining,
                windowMinutes: RATE_LIMIT_WINDOW / 60000
            },
            performance: {
                totalTime: `${totalTime.toFixed(2)}ms`,
                emailTime: USE_SYNC_EMAILS ? `${emailProcessingTime.toFixed(2)}ms` : '0ms (queued)',
                parseTime: `${parseTimeMs.toFixed(2)}ms`,
                processingTime: `${processingTimeMs.toFixed(2)}ms`,
                emailsQueued: !USE_SYNC_EMAILS,
                emailsSentSync: USE_SYNC_EMAILS
            }
        };

        if (USE_SYNC_EMAILS) {
            console.log(`📊 ${formType} Performance:`, performanceData);
        } else {
            setImmediate(() =>
            {
                console.log(`📊 ${formType} Performance:`, performanceData);
            });
        }

        // Return response with environment-specific data
        const response = {
            message: handler.response,
            responseTime: `${totalTime.toFixed(2)}ms`,
            environment: USE_SYNC_EMAILS ? 'development' : 'production',
            emailsQueued: !USE_SYNC_EMAILS,
            emailsSentSync: USE_SYNC_EMAILS,
            rateLimit: {
                remaining: rateLimit.remaining,
                resetIn: `${RATE_LIMIT_WINDOW / 1000}s`
            }
        };

        // Add email processing details for synchronous mode
        if (USE_SYNC_EMAILS && emailResult) {
            response.emailProcessingTime = `${emailProcessingTime.toFixed(2)}ms`;
            response.emailsSent = emailResult.emailsSent;
            response.emailSuccessRate = emailResult.emailDetails.filter(e => e.success).length / emailResult.emailDetails.length;
            response.emailRetryInfo = emailResult.emailDetails.map(e => ({
                to: e.to.substring(0, 20) + '...',
                attempts: e.attempt,
                success: e.success
            }));
        }

        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        const errorTime = performance.now() - startTime;

        // Fast error response
        console.error(`❌ ${USE_SYNC_EMAILS ? 'Vercel' : 'Production'} form error:`, {
            error: error.message,
            time: `${errorTime.toFixed(2)}ms`,
            stack: error.stack
        });

        return NextResponse.json(
            {
                error: "Submission failed",
                environment: USE_SYNC_EMAILS ? 'development' : 'production',
                responseTime: `${errorTime.toFixed(2)}ms`
            },
            { status: error.message?.includes('JSON') ? 400 : 500 }
        );
    }
}

// Health check endpoint with environment info and queue status
export async function GET()
{
    return NextResponse.json({
        environment: USE_SYNC_EMAILS ? 'development (vercel)' : 'production (server)',
        emailMode: USE_SYNC_EMAILS ? 'synchronous' : 'asynchronous',
        emailQueueLength: USE_SYNC_EMAILS ? 'N/A (sync mode)' : emailQueue.length,
        processing: USE_SYNC_EMAILS ? 'N/A (sync mode)' : processing,
        pdfCacheStatus: {
            initialized: PDF_CACHE_INITIALIZED.value,
            cachedFiles: PDF_CACHE.size,
            cacheSize: `${(Array.from(PDF_CACHE.values()).join('').length / (1024 * 1024)).toFixed(2)}MB`
        },
        rateLimitInfo: {
            windowMinutes: RATE_LIMIT_WINDOW / 60000,
            maxPerWindow: RATE_LIMIT_MAX,
            activeIPs: RATE_LIMIT_MAP.size
        },
        timestamp: new Date().toISOString(),
        vercelEnv: process.env.VERCEL_ENV || 'not-vercel'
    });
}