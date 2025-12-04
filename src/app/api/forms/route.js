import { NextResponse } from "next/server";
import { USE_SYNC_EMAILS } from "./config/environment.js";
import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX } from "./config/constants.js";
import { initializePdfCache, readPdfFile, getPdfCacheStatus } from "./services/pdfCache.js";
import { checkRateLimit, getRateLimitInfo } from "./services/rateLimit.js";
import { validateFormData } from "./services/validation.js";
import { processEmailQueue, getQueueStatus } from "./services/emailQueue.js";
import { FORM_HANDLERS } from "./handlers/formHandlers.js";

initializePdfCache();

export async function POST(req)
{
    const startTime = performance.now();

    try {
        if (!process.env.SENDGRID_API_KEY) {
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
        }

        const rateLimit = checkRateLimit(req);
        if (!rateLimit.allowed) {
            return NextResponse.json({
                error: "Rate limit exceeded",
                retryAfter: 60,
                remaining: rateLimit.remaining
            }, { status: 429 });
        }

        const { formType, ...formData } = await req.json();
        const parseTime = performance.now();

        if (!formType) {
            return NextResponse.json({ error: "formType required" }, { status: 400 });
        }

        const handler = FORM_HANDLERS[formType.toLowerCase()];
        if (!handler) {
            return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
        }

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
            const emailStartTime = performance.now();
            emailResult = await handler.executeEmailsSync(formData, readPdfFile);
            emailProcessingTime = performance.now() - emailStartTime;

            console.log(`${formType.toUpperCase()} emails sent synchronously:`);
            console.log(`   Emails Sent: ${emailResult.emailsSent}`);
            console.log(`   Processing Time: ${emailProcessingTime.toFixed(2)}ms`);

            if (formType.toLowerCase() === 'ica' || emailResult.emailDetails.length > 2) {
                emailResult.emailDetails.forEach((email, index) =>
                {
                    console.log(`   Email ${index + 1}: ${email.to} - ${email.sendTime}ms - Attempts: ${email.attempt} - ${email.success ? '✓' : '✗'}`);
                    if (email.attachments.count > 0) {
                        console.log(`      Attachments: ${email.attachments.count} files (${email.attachments.totalSizeFormatted})`);
                    }
                });
            }
        } else {
            handler.queueEmails(formData, readPdfFile);
            setImmediate(() => processEmailQueue());
            emailProcessingTime = 0;
        }

        const totalTime = performance.now() - startTime;
        const parseTimeMs = parseTime - startTime;
        const processingTimeMs = totalTime - parseTimeMs - emailProcessingTime;

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
            console.log(`${formType} Performance:`, performanceData);
        } else {
            setImmediate(() =>
            {
                console.log(`${formType} Performance:`, performanceData);
            });
        }

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

        console.error(`${USE_SYNC_EMAILS ? 'Vercel' : 'Production'} form error:`, {
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

export async function GET()
{
    const queueStatus = getQueueStatus();

    return NextResponse.json({
        environment: USE_SYNC_EMAILS ? 'development (vercel)' : 'production (server)',
        emailMode: USE_SYNC_EMAILS ? 'synchronous' : 'asynchronous',
        emailQueueLength: USE_SYNC_EMAILS ? 'N/A (sync mode)' : queueStatus.length,
        processing: USE_SYNC_EMAILS ? 'N/A (sync mode)' : queueStatus.processing,
        pdfCacheStatus: getPdfCacheStatus(),
        rateLimitInfo: getRateLimitInfo(),
        timestamp: new Date().toISOString(),
        vercelEnv: process.env.VERCEL_ENV || 'not-vercel'
    });
}