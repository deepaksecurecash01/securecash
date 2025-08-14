// app/api/forms/route.js
import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { getCurrentDateTime } from "../utils/Helpers";
import
    {
        prepareAUSTRACEmail,
        prepareContactAdminEmail,
        prepareContactConfirmationEmail,
        prepareFranchiseAdminEmail,
        prepareFranchiseConfirmationEmail,
        prepareCustomerEmail,
        prepareInternalNotificationEmail,
        prepareOperationsEmail,
        prepareQuoteAdminEmail,
        prepareQuoteConfirmationEmail,
        prepareSiteInfoEmail,
        prepareSiteInfoConfirmationEmail,
        prepareTermsEmail
    } from "../services/emailService";

// Set SendGrid API key once
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Environment detection - Use sync emails on Vercel, async queue on your own server
const IS_VERCEL = process.env.VERCEL_ENV || process.env.VERCEL || process.env.VERCEL_URL;
const USE_SYNC_EMAILS = IS_VERCEL;

// Ultra-fast XSS sanitization - only for critical fields
const fastSanitize = (str) =>
{
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/javascript:/gi, '') // Remove javascript: urls
        .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Background email queue - process emails after response (Production only)
const emailQueue = [];
let processing = false;

// Helper function to calculate attachment sizes
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

// Enhanced email processing with detailed logging (Production only)
const processEmailQueue = async () =>
{
    if (processing || emailQueue.length === 0) return;

    processing = true;
    const queueStartTime = performance.now();

    console.log(`\n📧 Starting email queue processing - ${emailQueue.length} tasks queued`);

    while (emailQueue.length > 0) {
        const emailTask = emailQueue.shift();
        const taskStartTime = performance.now();

        try {
            // Execute the email task and get detailed results
            const result = await emailTask.executeWithDetails();
            const taskTime = performance.now() - taskStartTime;

            console.log(`\n✅ Successfully processed ${emailTask.type.toUpperCase()} emails:`);
            console.log(`   └─ Form Type: ${emailTask.formType}`);
            console.log(`   └─ Processing Time: ${taskTime.toFixed(2)}ms`);
            console.log(`   └─ Emails Sent: ${result.emailsSent}`);

            // Log individual email details
            result.emailDetails.forEach((email, index) =>
            {
                console.log(`   └─ Email ${index + 1}:`);
                console.log(`      ├─ To: ${email.to}`);
                console.log(`      ├─ Subject: ${email.subject}`);
                console.log(`      ├─ Send Time: ${email.sendTime}ms`);
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
                console.log(`      └─ Status: ${email.success ? '✓ Delivered' : '✗ Failed'}`);
            });

        } catch (error) {
            const taskTime = performance.now() - taskStartTime;
            console.error(`\n❌ Failed to process ${emailTask.type.toUpperCase()} emails:`);
            console.error(`   └─ Form Type: ${emailTask.formType}`);
            console.error(`   └─ Error Time: ${taskTime.toFixed(2)}ms`);
            console.error(`   └─ Error: ${error.message}`);
            console.error(`   └─ Stack: ${error.stack}`);
        }
    }

    const totalQueueTime = performance.now() - queueStartTime;
    console.log(`\n🏁 Email queue processing completed in ${totalQueueTime.toFixed(2)}ms\n`);

    processing = false;
};

// Enhanced send function with detailed logging
const sendEmailWithDetails = async (emailData) =>
{
    const startTime = performance.now();

    try {
        // Calculate attachment information
        const attachmentInfo = calculateAttachmentSizes(emailData);

        // Send the email
        const response = await sendgrid.send(emailData);
        const sendTime = performance.now() - startTime;

        return {
            success: true,
            to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
            subject: emailData.subject || 'No Subject',
            sendTime: sendTime.toFixed(2),
            response: `${response[0]?.statusCode || 'Unknown'} ${response[0]?.statusMessage || ''}`.trim(),
            attachments: attachmentInfo
        };
    } catch (error) {
        const sendTime = performance.now() - startTime;

        return {
            success: false,
            to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
            subject: emailData.subject || 'No Subject',
            sendTime: sendTime.toFixed(2),
            response: error.message || 'Unknown error',
            attachments: calculateAttachmentSizes(emailData)
        };
    }
};

// Universal form handlers with both async (production) and sync (Vercel) modes
const FORM_HANDLERS = {
    austrac: {
        // Async queue method (Production)
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'austrac',
                formType: 'AUSTRAC',
                executeWithDetails: async () =>
                {
                    const emailData = prepareAUSTRACEmail(data);
                    const emailDetails = [await sendEmailWithDetails(emailData)];

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        // Sync method (Vercel Development)
        executeEmailsSync: async (data) =>
        {
            const emailData = prepareAUSTRACEmail(data);
            const emailDetails = [await sendEmailWithDetails(emailData)];

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "AUSTRAC information submitted successfully!",
        logData: (data) => ({ org: data.Organisation, email: data.OrganisationEmail })
    },

    contact: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'contact',
                formType: 'Contact',
                executeWithDetails: async () =>
                {
                    const adminEmail = prepareContactAdminEmail(data);
                    const confirmationEmail = prepareContactConfirmationEmail(data);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(adminEmail),
                        sendEmailWithDetails(confirmationEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const adminEmail = prepareContactAdminEmail(data);
            const confirmationEmail = prepareContactConfirmationEmail(data);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(adminEmail),
                sendEmailWithDetails(confirmationEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
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
                executeWithDetails: async () =>
                {
                    const adminEmail = prepareFranchiseAdminEmail(data);
                    const confirmationEmail = prepareFranchiseConfirmationEmail(data);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(adminEmail),
                        sendEmailWithDetails(confirmationEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const adminEmail = prepareFranchiseAdminEmail(data);
            const confirmationEmail = prepareFranchiseConfirmationEmail(data);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(adminEmail),
                sendEmailWithDetails(confirmationEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
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
                executeWithDetails: async () =>
                {
                    const operationsEmail = prepareOperationsEmail(data);
                    const customerEmail = prepareCustomerEmail(data);
                    const internalEmail = prepareInternalNotificationEmail(data);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(operationsEmail),
                        sendEmailWithDetails(customerEmail),
                        sendEmailWithDetails(internalEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const operationsEmail = prepareOperationsEmail(data);
            const customerEmail = prepareCustomerEmail(data);
            const internalEmail = prepareInternalNotificationEmail(data);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(operationsEmail),
                sendEmailWithDetails(customerEmail),
                sendEmailWithDetails(internalEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "ICA form submitted successfully!",
        logData: (data) => ({ name: data.Name, business: data.BusinessName })
    },

    quote: {
        queueEmails: (data) =>
        {
            // Minimal sanitization - only dangerous fields
            const clean = {
                ...data,
                Name: fastSanitize(data.Name),
                Organisation: fastSanitize(data.Organisation),
                FormID: data.FormID || "quote"
            };

            emailQueue.push({
                type: 'quote',
                formType: 'Quote',
                executeWithDetails: async () =>
                {
                    const adminEmail = prepareQuoteAdminEmail(clean);
                    const confirmationEmail = prepareQuoteConfirmationEmail(clean);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(adminEmail),
                        sendEmailWithDetails(confirmationEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            // Minimal sanitization - only dangerous fields
            const clean = {
                ...data,
                Name: fastSanitize(data.Name),
                Organisation: fastSanitize(data.Organisation),
                FormID: data.FormID || "quote"
            };

            const adminEmail = prepareQuoteAdminEmail(clean);
            const confirmationEmail = prepareQuoteConfirmationEmail(clean);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(adminEmail),
                sendEmailWithDetails(confirmationEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "Quote request submitted successfully!",
        logData: (data) => ({ org: data.Organisation, name: data.Name })
    },

    siteinfo: {
        queueEmails: (data) =>
        {
            // Minimal sanitization + array normalization
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
                executeWithDetails: async () =>
                {
                    const siteInfoEmail = prepareSiteInfoEmail(clean);
                    const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(siteInfoEmail),
                        sendEmailWithDetails(confirmationEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            // Minimal sanitization + array normalization
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Regular Service",
                Services: Array.isArray(data.Services) ? data.Services : [data.Services].filter(Boolean)
            };

            const siteInfoEmail = prepareSiteInfoEmail(clean);
            const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(siteInfoEmail),
                sendEmailWithDetails(confirmationEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "Site info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, contact: data.Contact })
    },

    specialevent: {
        queueEmails: (data) =>
        {
            // Reuse siteinfo logic - same structure
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Special Event"
            };

            emailQueue.push({
                type: 'specialevent',
                formType: 'Special Event',
                executeWithDetails: async () =>
                {
                    const siteInfoEmail = prepareSiteInfoEmail(clean);
                    const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);

                    const emailDetails = await Promise.all([
                        sendEmailWithDetails(siteInfoEmail),
                        sendEmailWithDetails(confirmationEmail)
                    ]);

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            // Reuse siteinfo logic - same structure
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Special Event"
            };

            const siteInfoEmail = prepareSiteInfoEmail(clean);
            const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);

            const emailDetails = await Promise.all([
                sendEmailWithDetails(siteInfoEmail),
                sendEmailWithDetails(confirmationEmail)
            ]);

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "Special event info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, type: "special" })
    },

    terms: {
        queueEmails: (data) =>
        {
            emailQueue.push({
                type: 'terms',
                formType: 'Terms',
                executeWithDetails: async () =>
                {
                    const emailData = prepareTermsEmail(data);
                    const emailDetails = [await sendEmailWithDetails(emailData)];

                    return {
                        emailsSent: emailDetails.length,
                        emailDetails
                    };
                }
            });
        },
        executeEmailsSync: async (data) =>
        {
            const emailData = prepareTermsEmail(data);
            const emailDetails = [await sendEmailWithDetails(emailData)];

            return {
                emailsSent: emailDetails.length,
                emailDetails
            };
        },
        response: "Terms & Conditions accepted successfully!",
        logData: (data) => ({ org: data["Organisation Name"], name: data["Full Name"] })
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
                    console.log(`   └─ Email ${index + 1}: ${email.to} - ${email.sendTime}ms - ${email.success ? '✓' : '✗'}`);
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
            emailsSentSync: USE_SYNC_EMAILS
        };

        // Add email processing details for synchronous mode
        if (USE_SYNC_EMAILS && emailResult) {
            response.emailProcessingTime = `${emailProcessingTime.toFixed(2)}ms`;
            response.emailsSent = emailResult.emailsSent;
            response.emailSuccessRate = emailResult.emailDetails.filter(e => e.success).length / emailResult.emailDetails.length;
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

// Health check endpoint with environment info
export async function GET()
{
    return NextResponse.json({
        environment: USE_SYNC_EMAILS ? 'development (vercel)' : 'production (server)',
        emailMode: USE_SYNC_EMAILS ? 'synchronous' : 'asynchronous',
        emailQueueLength: USE_SYNC_EMAILS ? 'N/A (sync mode)' : emailQueue.length,
        processing: USE_SYNC_EMAILS ? 'N/A (sync mode)' : processing,
        timestamp: new Date().toISOString(),
        vercelEnv: process.env.VERCEL_ENV || 'not-vercel'
    });
}