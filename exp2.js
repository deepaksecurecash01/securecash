// app/api/forms/route.js - Optimized Professional Email System
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

// Set SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Fast XSS sanitization for critical fields
const fastSanitize = (str) =>
{
    if (typeof str !== 'string') return str;
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/javascript:/gi, '') // Remove javascript: urls
        .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

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

// Optimized email sending with shorter retry logic
const sendEmailWithRetry = async (emailData, maxRetries = 2) =>
{
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const startTime = performance.now();

        try {
            console.log(`Sending email (attempt ${attempt}/${maxRetries}):`, {
                to: emailData.to,
                subject: emailData.subject,
                attachments: emailData.attachments?.length || 0
            });

            // Reduced timeout from 30s to 15s
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout after 15 seconds')), 15000)
            );

            const sendPromise = sendgrid.send(emailData);
            const result = await Promise.race([sendPromise, timeoutPromise]);

            const sendTime = performance.now() - startTime;
            const attachmentInfo = calculateAttachmentSizes(emailData);

            console.log(`Email sent successfully (attempt ${attempt}):`, {
                to: emailData.to,
                statusCode: result[0]?.statusCode,
                messageId: result[0]?.headers['x-message-id'],
                sendTime: `${sendTime.toFixed(2)}ms`
            });

            return {
                success: true,
                attempt,
                sendTime: sendTime.toFixed(2),
                statusCode: result[0]?.statusCode,
                messageId: result[0]?.headers['x-message-id'],
                to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
                subject: emailData.subject,
                attachments: attachmentInfo
            };

        } catch (error) {
            const sendTime = performance.now() - startTime;
            const attachmentInfo = calculateAttachmentSizes(emailData);

            console.warn(`Email attempt ${attempt} failed:`, {
                to: emailData.to,
                error: error.message,
                code: error.code,
                statusCode: error.response?.status,
                sendTime: `${sendTime.toFixed(2)}ms`
            });

            // Don't retry for certain errors
            const nonRetryableErrors = [400, 401, 403, 413]; // Bad request, auth, forbidden, payload too large
            if (error.response?.status && nonRetryableErrors.includes(error.response.status)) {
                console.error(`Non-retryable error (${error.response.status}), aborting retries`);
                return {
                    success: false,
                    attempt,
                    sendTime: sendTime.toFixed(2),
                    error: error.message,
                    statusCode: error.response?.status,
                    finalAttempt: true,
                    to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
                    subject: emailData.subject,
                    attachments: attachmentInfo
                };
            }

            // If this was the last attempt, return failure
            if (attempt === maxRetries) {
                console.error(`All ${maxRetries} attempts failed for email:`, {
                    to: emailData.to,
                    finalError: error.message
                });

                return {
                    success: false,
                    attempt,
                    sendTime: sendTime.toFixed(2),
                    error: error.message,
                    statusCode: error.response?.status,
                    finalAttempt: true,
                    to: Array.isArray(emailData.to) ? emailData.to.join(', ') : emailData.to,
                    subject: emailData.subject,
                    attachments: attachmentInfo
                };
            }

            // Reduced retry delay from 5s max to 2s max
            const delay = Math.min(500 * Math.pow(2, attempt - 1), 2000); // Max 2 seconds
            console.log(`Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Optimized parallel email sending - NO MORE SEQUENTIAL PROCESSING!
const sendMultipleEmails = async (emails, formType) =>
{
    console.log(`Starting ${formType} email processing - ${emails.length} emails to send`);
    const startTime = performance.now();

    // Send all emails in parallel using Promise.all
    const emailPromises = emails.map((email, index) =>
        sendEmailWithRetry(email)
            .then(result => ({ ...result, index }))
            .catch(error => ({
                success: false,
                error: error.message,
                index,
                attempt: 1,
                sendTime: '0.00',
                to: Array.isArray(email.to) ? email.to.join(', ') : email.to,
                subject: email.subject,
                attachments: calculateAttachmentSizes(email)
            }))
    );

    console.log(`Sending ${emails.length} emails in parallel...`);

    // Wait for all emails to complete (parallel execution)
    const results = await Promise.all(emailPromises);

    // Sort results by original index to maintain order
    results.sort((a, b) => a.index - b.index);

    // Calculate summary statistics
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;
    const totalTime = performance.now() - startTime;
    const successRate = emails.length > 0 ? Math.round((successCount / emails.length) * 100) : 0;

    console.log(`${formType} Email Summary:`);
    console.log(`   Successful: ${successCount}/${emails.length}`);
    console.log(`   Failed: ${failureCount}/${emails.length}`);
    console.log(`   Success Rate: ${successRate}%`);
    console.log(`   Total Time: ${totalTime.toFixed(2)}ms (PARALLEL)`);

    return {
        results,
        summary: {
            total: emails.length,
            successful: successCount,
            failed: failureCount,
            successRate,
            totalTime: totalTime.toFixed(2)
        }
    };
};

// Alternative batch sending for maximum performance (when possible)
const sendEmailsBatch = async (emails, formType) =>
{
    console.log(`Attempting ${formType} batch email processing - ${emails.length} emails`);
    const startTime = performance.now();

    try {
        // SendGrid supports sending multiple emails in one API call
        // This is the fastest possible method
        const result = await sendgrid.send(emails);

        const totalTime = performance.now() - startTime;
        console.log(`${formType} Batch Email Complete: ${totalTime.toFixed(2)}ms (BATCH)`);

        return {
            results: emails.map((email, i) => ({
                success: true,
                to: Array.isArray(email.to) ? email.to.join(', ') : email.to,
                subject: email.subject,
                statusCode: result[i]?.statusCode || 202,
                messageId: result[i]?.headers?.['x-message-id'] || 'batch-' + i,
                attempt: 1,
                sendTime: (totalTime / emails.length).toFixed(2),
                attachments: calculateAttachmentSizes(email)
            })),
            summary: {
                total: emails.length,
                successful: emails.length,
                failed: 0,
                successRate: 100,
                totalTime: totalTime.toFixed(2)
            }
        };
    } catch (error) {
        const totalTime = performance.now() - startTime;
        console.error(`Batch email failed: ${error.message}, falling back to parallel...`);

        // Fallback to parallel individual sends
        return await sendMultipleEmails(emails, formType);
    }
};

// Smart email processor that chooses the best method
const processEmailsSmart = async (emails, formType) =>
{
    // For single emails, just send directly
    if (emails.length === 1) {
        return await sendMultipleEmails(emails, formType);
    }

    // For multiple emails, try batch first, then parallel
    try {
        return await sendEmailsBatch(emails, formType);
    } catch (error) {
        console.log(`Batch method failed, using parallel method for ${formType}`);
        return await sendMultipleEmails(emails, formType);
    }
};

// Form handlers with optimized email processing
const FORM_HANDLERS = {
    austrac: {
        processEmails: async (data) =>
        {
            const emailData = prepareAUSTRACEmail(data);
            return await processEmailsSmart([emailData], 'AUSTRAC');
        },
        successMessage: "AUSTRAC information submitted successfully!",
        logData: (data) => ({ org: data.Organisation, email: data.OrganisationEmail })
    },

    contact: {
        processEmails: async (data) =>
        {
            const adminEmail = prepareContactAdminEmail(data);
            const confirmationEmail = prepareContactConfirmationEmail(data);
            return await processEmailsSmart([adminEmail, confirmationEmail], 'Contact');
        },
        successMessage: "Contact request submitted successfully!",
        logData: (data) => ({ name: data.FullName, dept: data.Department })
    },

    franchise: {
        processEmails: async (data) =>
        {
            const adminEmail = prepareFranchiseAdminEmail(data);
            const confirmationEmail = prepareFranchiseConfirmationEmail(data);
            return await processEmailsSmart([adminEmail, confirmationEmail], 'Franchise');
        },
        successMessage: "Franchise enquiry submitted successfully!",
        logData: (data) => ({ name: data.FullName, area: data.InterestedArea })
    },

    ica: {
        processEmails: async (data) =>
        {
            const operationsEmail = prepareOperationsEmail(data);
            const customerEmail = prepareCustomerEmail(data);
            const internalEmail = prepareInternalNotificationEmail(data);

            // This will now process all 3 emails in parallel instead of sequential
            return await processEmailsSmart([
                operationsEmail,
                customerEmail,
                internalEmail
            ], 'ICA');
        },
        successMessage: "ICA form submitted successfully!",
        logData: (data) => ({ name: data.Name, business: data.BusinessName })
    },

    quote: {
        processEmails: async (data) =>
        {
            // Basic sanitization
            const clean = {
                ...data,
                Name: fastSanitize(data.Name),
                Organisation: fastSanitize(data.Organisation),
                FormID: data.FormID || "quote"
            };

            const adminEmail = prepareQuoteAdminEmail(clean);
            const confirmationEmail = prepareQuoteConfirmationEmail(clean);
            return await processEmailsSmart([adminEmail, confirmationEmail], 'Quote');
        },
        successMessage: "Quote request submitted successfully!",
        logData: (data) => ({ org: data.Organisation, name: data.Name })
    },

    siteinfo: {
        processEmails: async (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Regular Service",
                Services: Array.isArray(data.Services) ? data.Services : [data.Services].filter(Boolean)
            };

            const siteInfoEmail = prepareSiteInfoEmail(clean);
            const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);
            return await processEmailsSmart([siteInfoEmail, confirmationEmail], 'Site Info');
        },
        successMessage: "Site info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, contact: data.Contact })
    },

    specialevent: {
        processEmails: async (data) =>
        {
            const clean = {
                ...data,
                BusinessName: fastSanitize(data.BusinessName),
                Contact: fastSanitize(data.Contact),
                Type: data.Type || "Special Event"
            };

            const siteInfoEmail = prepareSiteInfoEmail(clean);
            const confirmationEmail = prepareSiteInfoConfirmationEmail(clean);
            return await processEmailsSmart([siteInfoEmail, confirmationEmail], 'Special Event');
        },
        successMessage: "Special event info submitted successfully!",
        logData: (data) => ({ business: data.BusinessName, type: "special" })
    },

    terms: {
        processEmails: async (data) =>
        {
            const emailData = prepareTermsEmail(data);
            return await processEmailsSmart([emailData], 'Terms');
        },
        successMessage: "Terms & Conditions accepted successfully!",
        logData: (data) => ({ org: data["Organisation Name"], name: data["Full Name"] })
    }
};

// Main POST handler with performance optimizations
export async function POST(req)
{
    const startTime = performance.now();

    try {
        // Validate SendGrid configuration
        if (!process.env.SENDGRID_API_KEY) {
            console.error('SendGrid API key not configured');
            return NextResponse.json({
                error: "Email service not configured",
                details: "Missing SendGrid API key"
            }, { status: 500 });
        }

        // Parse request
        const { formType, ...formData } = await req.json();
        const parseTime = performance.now();

        if (!formType) {
            return NextResponse.json({
                error: "formType is required"
            }, { status: 400 });
        }

        const handler = FORM_HANDLERS[formType.toLowerCase()];
        if (!handler) {
            return NextResponse.json({
                error: "Invalid form type",
                validTypes: Object.keys(FORM_HANDLERS)
            }, { status: 400 });
        }

        console.log(`Processing ${formType} form submission:`, handler.logData(formData));

        // Process emails with optimized parallel/batch processing
        const emailResults = await handler.processEmails(formData);
        const processingTime = performance.now() - parseTime;
        const totalTime = performance.now() - startTime;

        // Log detailed results
        console.log(`Final Results for ${formType}:`);
        emailResults.results.forEach((result, index) =>
        {
            const status = result.success ? 'SUCCESS' : 'FAILED';
            console.log(`   Email ${index + 1}: ${status}`);
            console.log(`      To: ${result.to}`);
            console.log(`      Subject: ${result.subject}`);
            console.log(`      Time: ${result.sendTime}ms`);
            console.log(`      Attempts: ${result.attempt}`);
            if (result.attachments && result.attachments.count > 0) {
                console.log(`      Attachments: ${result.attachments.count} files (${result.attachments.totalSizeFormatted})`);
                result.attachments.details.forEach((att, attIndex) =>
                {
                    console.log(`         ${attIndex + 1}. ${att.filename} - ${att.sizeFormatted} (${att.type})`);
                });
            } else {
                console.log(`      Attachments: None`);
            }
            if (!result.success) {
                console.log(`      Error: ${result.error}`);
                if (result.statusCode) {
                    console.log(`      Status Code: ${result.statusCode}`);
                }
            }
        });

        // Determine response based on results
        const { summary } = emailResults;
        const allSuccess = summary.failed === 0;
        const partialSuccess = summary.successful > 0 && summary.failed > 0;

        // Log completion status with performance metrics
        console.log(`${formType} form processing completed:`, {
            timestamp: new Date().toISOString(),
            performance: {
                totalTime: `${totalTime.toFixed(2)}ms`,
                emailTime: `${(totalTime - processingTime).toFixed(2)}ms`,
                parseTime: `${(parseTime - startTime).toFixed(2)}ms`,
                processingTime: `${processingTime.toFixed(2)}ms`
            },
            results: {
                successful: summary.successful,
                failed: summary.failed,
                total: summary.total,
                successRate: `${summary.successRate}%`
            },
            optimization: "PARALLEL/BATCH processing enabled"
        });

        if (allSuccess) {
            // All emails sent successfully
            console.log(`${formType} form completed successfully - all emails sent`);

            return NextResponse.json({
                message: handler.successMessage,
                success: true,
                emailResults: {
                    sent: summary.successful,
                    total: summary.total,
                    successRate: summary.successRate,
                    processingTime: `${processingTime.toFixed(2)}ms`,
                    totalTime: `${totalTime.toFixed(2)}ms`,
                    optimization: "parallel"
                }
            }, { status: 200 });

        } else if (partialSuccess) {
            // Some emails failed
            console.log(`${formType} form partially completed - ${summary.successful}/${summary.total} emails sent`);

            return NextResponse.json({
                message: `Form submitted with partial email delivery (${summary.successful}/${summary.total} sent)`,
                success: true,
                warning: "Some emails failed to send",
                emailResults: {
                    sent: summary.successful,
                    failed: summary.failed,
                    total: summary.total,
                    successRate: summary.successRate,
                    processingTime: `${processingTime.toFixed(2)}ms`,
                    totalTime: `${totalTime.toFixed(2)}ms`,
                    optimization: "parallel"
                }
            }, { status: 207 }); // 207 = Multi-Status

        } else {
            // All emails failed
            console.error(`${formType} form submission failed - no emails sent`);

            return NextResponse.json({
                error: "Form submission failed - email delivery unsuccessful",
                success: false,
                emailResults: {
                    sent: 0,
                    failed: summary.failed,
                    total: summary.total,
                    successRate: 0,
                    processingTime: `${processingTime.toFixed(2)}ms`,
                    totalTime: `${totalTime.toFixed(2)}ms`
                }
            }, { status: 500 });
        }

    } catch (error) {
        const errorTime = performance.now() - startTime;

        console.error('Form processing error:', {
            error: error.message,
            stack: error.stack,
            processingTime: `${errorTime.toFixed(2)}ms`
        });

        return NextResponse.json({
            error: "Form submission failed",
            details: error.message,
            success: false,
            processingTime: `${errorTime.toFixed(2)}ms`
        }, { status: 500 });
    }
}