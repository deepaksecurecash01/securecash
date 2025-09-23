// app/api/forms/progressive/route.js
import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { prepareQuoteProgressiveEmail } from "../services/emailService";

// Set SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// In-memory storage for tracking sent emails per session
// In production, you'd want to use Redis or database
const emailTracker = new Map();

// Clean up old sessions (older than 24 hours)
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
setInterval(() =>
{
  const now = Date.now();
  for (const [sessionId, data] of emailTracker.entries()) {
    if (now - data.created > CLEANUP_INTERVAL) {
      emailTracker.delete(sessionId);
    }
  }
}, CLEANUP_INTERVAL);

// Rate limiting for progressive emails
const RATE_LIMIT_MAP = new Map();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 20; // 20 progressive emails per 5 minutes per session

const checkProgressiveRateLimit = (sessionId) =>
{
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  if (!RATE_LIMIT_MAP.has(sessionId)) {
    RATE_LIMIT_MAP.set(sessionId, []);
  }

  const requests = RATE_LIMIT_MAP.get(sessionId);

  // Remove old requests
  while (requests.length > 0 && requests[0] < windowStart) {
    requests.shift();
  }

  if (requests.length >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  requests.push(now);
  return { allowed: true, remaining: RATE_LIMIT_MAX - requests.length };
};

// Enhanced email sending with simple retry
const sendProgressiveEmailWithRetry = async (emailData, maxRetries = 2) =>
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
        to: emailData.to,
        subject: emailData.subject,
        sendTime: sendTime.toFixed(2),
        response: `${response[0]?.statusCode || 'Success'}`
      };
    } catch (error) {
      lastError = error;
      console.error(`Progressive email attempt ${attempt}/${maxRetries} failed:`, {
        to: emailData.to,
        subject: emailData.subject,
        error: error.message
      });

      // Don't retry on permanent errors
      if (error.message.includes('Invalid email') ||
        error.response?.status === 400) {
        break;
      }

      // Wait before retrying
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  return {
    success: false,
    attempt: maxRetries,
    to: emailData.to,
    subject: emailData.subject,
    sendTime: '0',
    response: lastError?.message || 'Unknown error'
  };
};

export async function POST(req)
{
  const startTime = performance.now();

  try {
    // Fast-fail checks
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const { formType, sessionId, currentStep, stepId, stepData, accumulatedData } = await req.json();

    // Validate required fields
    if (!formType || !sessionId || stepId === undefined || !stepData) {
      return NextResponse.json({
        error: "Missing required fields",
        required: ["formType", "sessionId", "stepId", "stepData"]
      }, { status: 400 });
    }

    // Only handle Quote form progressive emails
    if (formType !== 'quote') {
      return NextResponse.json({
        error: "Progressive emails only supported for Quote form"
      }, { status: 400 });
    }

    // Check rate limiting
    const rateLimit = checkProgressiveRateLimit(sessionId);
    if (!rateLimit.allowed) {
      return NextResponse.json({
        error: "Rate limit exceeded for progressive emails",
        retryAfter: 300, // 5 minutes
        remaining: rateLimit.remaining
      }, { status: 429 });
    }

    // Get or create session tracking
    if (!emailTracker.has(sessionId)) {
      emailTracker.set(sessionId, {
        created: Date.now(),
        stepEmailsSent: new Set(),
        lastStep: -1
      });
    }

    const sessionData = emailTracker.get(sessionId);

    // Duplicate prevention - check if we already sent email for this step
    if (sessionData.stepEmailsSent.has(stepId)) {
      console.log(`Email already sent for session ${sessionId}, step ${stepId}`);
      return NextResponse.json({
        message: "Progressive email already sent for this step",
        sessionId,
        stepId,
        skipped: true,
        responseTime: `${(performance.now() - startTime).toFixed(2)}ms`
      }, { status: 200 });
    }

    // Validate email address exists
    if (!stepData.Email || typeof stepData.Email !== 'string') {
      return NextResponse.json({
        error: "Valid email address required in step data"
      }, { status: 400 });
    }

    // Prepare progressive email data
    const emailData = prepareQuoteProgressiveEmail(
      accumulatedData || stepData,
      stepId,
      currentStep
    );

    console.log(`Sending progressive Quote email - Session: ${sessionId}, Step: ${stepId}`);

    // Send email
    const emailResult = await sendProgressiveEmailWithRetry(emailData);

    if (emailResult.success) {
      // Mark this step as emailed
      sessionData.stepEmailsSent.add(stepId);
      sessionData.lastStep = Math.max(sessionData.lastStep, currentStep);

      console.log(`✅ Progressive email sent successfully - Session: ${sessionId}, Step: ${stepId}`);
      console.log(`   └─ To: ${emailResult.to}`);
      console.log(`   └─ Subject: ${emailResult.subject}`);
      console.log(`   └─ Send Time: ${emailResult.sendTime}ms`);
      console.log(`   └─ Attempts: ${emailResult.attempt}`);

      const totalTime = performance.now() - startTime;

      return NextResponse.json({
        message: "Progressive email sent successfully",
        sessionId,
        stepId,
        currentStep,
        emailSent: true,
        emailDetails: {
          to: emailResult.to.replace(/(.{3}).*@/, '$1***@'), // Mask email for privacy
          subject: emailResult.subject,
          sendTime: `${emailResult.sendTime}ms`,
          attempts: emailResult.attempt
        },
        responseTime: `${totalTime.toFixed(2)}ms`,
        rateLimit: {
          remaining: rateLimit.remaining,
          resetIn: `${RATE_LIMIT_WINDOW / 1000}s`
        }
      }, { status: 200 });

    } else {
      console.error(`❌ Progressive email failed - Session: ${sessionId}, Step: ${stepId}:`, emailResult.response);

      const totalTime = performance.now() - startTime;

      // Don't fail the form submission on email failure
      return NextResponse.json({
        message: "Progressive email failed but form progression continues",
        sessionId,
        stepId,
        currentStep,
        emailSent: false,
        error: emailResult.response,
        responseTime: `${totalTime.toFixed(2)}ms`,
        warning: "Email delivery failed but form submission can continue"
      }, { status: 200 }); // Still return 200 so form doesn't break
    }

  } catch (error) {
    const errorTime = performance.now() - startTime;

    console.error('Progressive email error:', {
      error: error.message,
      time: `${errorTime.toFixed(2)}ms`,
      stack: error.stack
    });

    // Don't fail form submission on email errors
    return NextResponse.json({
      message: "Progressive email service error but form progression continues",
      error: "Email service temporarily unavailable",
      responseTime: `${errorTime.toFixed(2)}ms`,
      warning: "Email delivery failed but form submission can continue"
    }, { status: 200 }); // Return 200 so form doesn't break
  }
}

// Health check for progressive email service
export async function GET()
{
  return NextResponse.json({
    service: "Progressive Email Service",
    status: "active",
    supportedForms: ["quote"],
    activeSessions: emailTracker.size,
    rateLimit: {
      windowMinutes: RATE_LIMIT_WINDOW / 60000,
      maxPerWindow: RATE_LIMIT_MAX
    },
    timestamp: new Date().toISOString()
  });
}