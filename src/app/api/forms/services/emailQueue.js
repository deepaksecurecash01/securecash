import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import { RETRY_CONFIG } from "../config/constants.js";
import { calculateAttachmentSizes } from "../utils/attachments.js";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const emailQueue = [];
let processing = false;

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
                hasAttachments: !!(emailData.attachments && emailData.attachments.length > 0),
                attachmentCount: emailData.attachments ? emailData.attachments.length : 0
            },
            retryable: !error.message.includes('Invalid email')
        };

        fs.writeFileSync(filepath, JSON.stringify(failedEmailRecord, null, 2));
    } catch (saveError) {
        console.error('Failed to save failed email:', saveError);
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const calculateRetryDelay = (attempt) =>
{
    const delayMs = RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffFactor, attempt - 1);
    return Math.min(delayMs, RETRY_CONFIG.maxDelay);
};

export const sendEmailWithRetry = async (emailData, formType, maxRetries = RETRY_CONFIG.maxRetries) =>
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

            console.error(`Email attempt ${attempt}/${maxRetries} failed:`, {
                to: emailData.to,
                subject: emailData.subject,
                error: error.message,
                sendTime: sendTime.toFixed(2)
            });

            if (error.code === 429 || error.message.toLowerCase().includes('rate limit')) {
                console.warn(`SENDGRID RATE LIMIT: ${error.message}`);
            }

            if (error.message.includes('Invalid email') ||
                error.message.includes('Unsubscribed Address') ||
                error.response?.status === 400) {
                break;
            }

            if (attempt < maxRetries) {
                const delayMs = calculateRetryDelay(attempt);
                await delay(delayMs);
            }
        }
    }

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

export const executeMultiEmailBatch = async (emailTasks, formType) =>
{
    emailTasks.forEach(task => { task.sent = false; });

    let retryCount = 0;
    const maxRetries = 2;
    const emailDetails = [];

    while (retryCount <= maxRetries) {
        const pendingTasks = emailTasks.filter(task => !task.sent);

        if (pendingTasks.length === 0) {
            break;
        }

        const batchResults = await Promise.all(
            pendingTasks.map(async (task) =>
            {
                try {
                    const emailData = task.prepare();
                    const result = await sendEmailWithRetry(emailData, task.type, 1);

                    if (result.success) {
                        task.sent = true;
                    }

                    return { ...result, taskId: task.id, recipient: task.recipient };
                } catch (error) {
                    console.error(`${formType} ${task.id} email error:`, error.message);
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

        emailDetails.push(...batchResults);

        const allSent = emailTasks.every(task => task.sent);

        if (allSent) {
            break;
        }

        if (retryCount < maxRetries) {
            const retryDelay = calculateRetryDelay(retryCount + 1);
            await delay(retryDelay);
        }

        retryCount++;
    }

    const sentCount = emailTasks.filter(task => task.sent).length;
    const finalDetails = emailTasks.map(task =>
    {
        const latestResult = emailDetails
            .filter(detail => detail.taskId === task.id)
            .pop();

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

    return {
        emailsSent: sentCount,
        emailDetails: finalDetails,
        partialSuccess: sentCount > 0 && sentCount < emailTasks.length,
        totalAttempts: retryCount + 1
    };
};

export const processEmailQueue = async () =>
{
    if (processing || emailQueue.length === 0) return;

    processing = true;
    const queueStartTime = performance.now();

    while (emailQueue.length > 0) {
        const emailTask = emailQueue.shift();
        const taskStartTime = performance.now();
        let success = false;
        let retryCount = 0;
        const maxTaskRetries = 2;

        while (!success && retryCount <= maxTaskRetries) {
            try {
                const result = await emailTask.executeWithResilience();
                const taskTime = performance.now() - taskStartTime;

                const allSuccessful = result.emailDetails.every(email => email.success);

                if (allSuccessful) {
                    success = true;
                    console.log(`${emailTask.formType} emails sent: ${result.emailsSent}, ${taskTime.toFixed(2)}ms`);
                } else {
                    retryCount++;
                    const failedEmails = result.emailDetails.filter(email => !email.success);

                    if (retryCount <= maxTaskRetries) {
                        const retryDelay = calculateRetryDelay(retryCount);
                        await delay(retryDelay);
                    } else {
                        console.error(`Final batch failure for ${emailTask.formType} after ${maxTaskRetries} retries`);
                        break;
                    }
                }

            } catch (error) {
                retryCount++;
                const taskTime = performance.now() - taskStartTime;

                if (retryCount <= maxTaskRetries) {
                    const retryDelay = calculateRetryDelay(retryCount);
                    await delay(retryDelay);
                } else {
                    console.error(`Final batch error for ${emailTask.formType}:`, error.message);
                    break;
                }
            }
        }
    }

    const totalQueueTime = performance.now() - queueStartTime;
    console.log(`Email queue completed in ${totalQueueTime.toFixed(2)}ms`);

    processing = false;
};

export const queueEmail = (emailTask) =>
{
    emailQueue.push(emailTask);
};

export const getQueueStatus = () => ({
    length: emailQueue.length,
    processing
});