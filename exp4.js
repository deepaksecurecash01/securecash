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

// Set SendGrid API key with optimized timeout for attachments
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
sendgrid.setTimeout(15000); // 15 seconds for attachment-heavy emails

// Ultra-fast XSS sanitization - only for critical fields
const fastSanitize = (str) =>
{
	if (typeof str !== 'string') return str;
	return str
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
		.replace(/javascript:/gi, '') // Remove javascript: urls
		.replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Lightning-fast form handlers - minimal processing
const FORM_HANDLERS = {
	austrac: {
		processEmails: async (data) =>
		{
			await sendgrid.send(prepareAUSTRACEmail(data));
		},
		response: "AUSTRAC information submitted successfully!",
		logData: (data) => ({ org: data.Organisation, email: data.OrganisationEmail })
	},

	contact: {
		processEmails: async (data) =>
		{
			// Fire-and-forget email sending with timeout
			const emailPromises = [
				sendgrid.send(prepareContactAdminEmail(data)),
				sendgrid.send(prepareContactConfirmationEmail(data))
			];

			// Timeout after 3 seconds
			await Promise.race([
				Promise.all(emailPromises),
				new Promise((_, reject) =>
					setTimeout(() => reject(new Error('Email timeout')), 3000)
				)
			]);
		},
		response: "Contact request submitted successfully!",
		logData: (data) => ({ name: data.FullName, dept: data.Department })
	},

	franchise: {
		processEmails: async (data) =>
		{
			await Promise.all([
				sendgrid.send(prepareFranchiseAdminEmail(data)),
				sendgrid.send(prepareFranchiseConfirmationEmail(data))
			]);
		},
		response: "Franchise enquiry submitted successfully!",
		logData: (data) => ({ name: data.FullName, area: data.InterestedArea })
	},

	ica: {
		processEmails: async (data) =>
		{
			const attachmentCount = data.attachments?.length || 0;
			console.log(`📧 Processing ICA emails with ${attachmentCount} attachments`);

			if (attachmentCount === 0) {
				// No attachments - send normally
				await Promise.all([
					sendgrid.send(prepareOperationsEmail(data)),
					sendgrid.send(prepareCustomerEmail(data)),
					sendgrid.send(prepareInternalNotificationEmail(data))
				]);
				return;
			}

			// For heavy attachments: send sequentially to avoid SendGrid limits
			const emails = [
				{ email: prepareOperationsEmail(data), type: 'operations' },
				{ email: prepareCustomerEmail(data), type: 'customer' },
				{ email: prepareInternalNotificationEmail(data), type: 'internal' }
			];

			console.log(`📤 Sending ${emails.length} emails sequentially...`);

			for (let i = 0; i < emails.length; i++) {
				try {
					const startTime = performance.now();
					await sendgrid.send(emails[i].email);
					const sendTime = performance.now() - startTime;
					console.log(`✅ ${emails[i].type} email sent in ${sendTime.toFixed(2)}ms`);

					// Small delay between emails to avoid rate limiting
					if (i < emails.length - 1) {
						await new Promise(resolve => setTimeout(resolve, 500));
					}
				} catch (error) {
					console.error(`❌ Failed to send ${emails[i].type} email:`, error.message);
					throw error; // Re-throw to maintain "all must succeed" behavior
				}
			}
		},
		response: "ICA form submitted successfully!",
		logData: (data) => ({
			name: data.Name,
			business: data.BusinessName,
			attachmentCount: data.attachments?.length || 0,
			attachmentSizes: data.attachments?.map(a => `${a.filename}: ${(a.data?.length || 0 / 1024).toFixed(1)}KB`).join(', ') || 'none'
		})
	},

	quote: {
		processEmails: async (data) =>
		{
			// Minimal sanitization - only dangerous fields
			const clean = {
				...data,
				Name: fastSanitize(data.Name),
				Organisation: fastSanitize(data.Organisation),
				FormID: data.FormID || "quote"
			};

			await Promise.all([
				sendgrid.send(prepareQuoteAdminEmail(clean)),
				sendgrid.send(prepareQuoteConfirmationEmail(clean))
			]);
		},
		response: "Quote request submitted successfully!",
		logData: (data) => ({ org: data.Organisation, name: data.Name })
	},

	siteinfo: {
		processEmails: async (data) =>
		{
			// Minimal sanitization + array normalization
			const clean = {
				...data,
				BusinessName: fastSanitize(data.BusinessName),
				Contact: fastSanitize(data.Contact),
				Type: data.Type || "Regular Service",
				Services: Array.isArray(data.Services) ? data.Services : [data.Services].filter(Boolean)
			};

			await Promise.all([
				sendgrid.send(prepareSiteInfoEmail(clean)),
				sendgrid.send(prepareSiteInfoConfirmationEmail(clean))
			]);
		},
		response: "Site info submitted successfully!",
		logData: (data) => ({ business: data.BusinessName, contact: data.Contact })
	},

	specialevent: {
		processEmails: async (data) =>
		{
			// Reuse siteinfo logic - same structure
			const clean = {
				...data,
				BusinessName: fastSanitize(data.BusinessName),
				Contact: fastSanitize(data.Contact),
				Type: data.Type || "Special Event"
			};

			await Promise.all([
				sendgrid.send(prepareSiteInfoEmail(clean)),
				sendgrid.send(prepareSiteInfoConfirmationEmail(clean))
			]);
		},
		response: "Special event info submitted successfully!",
		logData: (data) => ({ business: data.BusinessName, type: "special" })
	},

	terms: {
		processEmails: async (data) =>
		{
			await sendgrid.send(prepareTermsEmail(data));
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

		// Handle attachment-heavy forms differently
		const isHeavyForm = ['ica'].includes(formType.toLowerCase());

		if (isHeavyForm) {
			// For heavy forms: ALWAYS async processing, immediate response
			const requestId = `${formType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

			setImmediate(async () =>
			{
				try {
					const emailStartTime = performance.now();
					await handler.processEmails(formData);
					const emailTime = performance.now() - emailStartTime;
					console.log(`✅ ${formType} emails sent successfully in ${emailTime.toFixed(2)}ms [RequestID: ${requestId}]`);
				} catch (emailError) {
					console.error(`❌ ${formType} email failed [RequestID: ${requestId}]:`, {
						error: emailError.message,
						attachmentCount: formData.attachments?.length || 0,
						timestamp: new Date().toISOString()
					});
				}
			});

			const totalTime = performance.now() - startTime;

			// Log immediate response
			setImmediate(() =>
			{
				const logData = handler.getLogData ? handler.getLogData(formData) : handler.logData(formData);
				console.log(`🚀 ${formType} submitted (immediate response):`, {
					...logData,
					requestId,
					timestamp: new Date().toISOString(),
					performance: {
						responseTime: `${totalTime.toFixed(2)}ms`,
						emailStatus: "processing_in_background"
					}
				});
			});

			return NextResponse.json({
				message: handler.response,
				responseTime: `${totalTime.toFixed(2)}ms`,
				emailStatus: "processing",
				requestId: requestId
			}, { status: 200 });
		}

		// For light forms: wait for email completion
		const emailStartTime = performance.now();
		await handler.processEmails(formData);
		const emailEndTime = performance.now();

		const totalTime = performance.now() - startTime;
		const emailTime = emailEndTime - emailStartTime;

		// Async logging - don't wait for it
		setImmediate(() =>
		{
			const logData = handler.getLogData ? handler.getLogData(formData) : handler.logData(formData);
			console.log(`${formType} submitted:`, {
				...logData,
				timestamp: new Date().toISOString(),
				performance: {
					totalTime: `${totalTime.toFixed(2)}ms`,
					emailTime: `${emailTime.toFixed(2)}ms`
				}
			});
		});

		// Return with timing info for light forms
		return NextResponse.json({
			message: handler.response,
			responseTime: `${totalTime.toFixed(2)}ms`
		}, { status: 200 });

	} catch (error) {
		const errorTime = performance.now() - startTime;

		// Fast error response
		console.error("Form error:", error.message, `Time: ${errorTime.toFixed(2)}ms`);

		return NextResponse.json(
			{
				error: "Submission failed",
				responseTime: `${errorTime.toFixed(2)}ms`
			},
			{ status: error.message?.includes('JSON') ? 400 : 500 }
		);
	}
}