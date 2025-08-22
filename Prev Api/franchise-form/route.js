import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { getCurrentDateTime } from "../utils/Helpers";
import { prepareFranchiseAdminEmail, prepareFranchiseConfirmationEmail } from "../services/emailService";

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// POST request handler for Franchise form submission
export async function POST(req)
{
    try {
        // Parse incoming request body
        const formData = await req.json();
        console.log("Franchise form data received:", formData);

        // Basic validation
        if (!formData.FullName || !formData.Email || !formData.Phone || !formData.Address ||
            !formData.InterestedArea || !formData.ReasonForInterest || !formData.ReferralSource) {
            return NextResponse.json(
                {
                    error: "Missing required fields",
                    details: "All fields are required for franchise enquiry."
                },
                { status: 400 }
            );
        }

        // Check honeypot field (bot detection)
        if (formData.BotField && formData.BotField.length > 0) {
            console.log("Bot detected - submission rejected");
            return NextResponse.json(
                {
                    error: "Invalid submission detected",
                    details: "Automated submission rejected"
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.Email)) {
            return NextResponse.json(
                {
                    error: "Invalid email format",
                    details: "Please provide a valid email address."
                },
                { status: 400 }
            );
        }

        // Validate phone number format
        const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData.Phone) || formData.Phone.length < 8) {
            return NextResponse.json(
                {
                    error: "Invalid phone number",
                    details: "Please provide a valid phone number."
                },
                { status: 400 }
            );
        }

        // Prepare and send admin notification email
        const adminEmail = prepareFranchiseAdminEmail(formData);
        await sendgrid.send(adminEmail);

        // Prepare and send customer confirmation email with attachments
        const confirmationEmail = prepareFranchiseConfirmationEmail(formData);
        await sendgrid.send(confirmationEmail);

        // Log successful submission
        console.log("Franchise form submitted successfully:", {
            fullName: formData.FullName,
            email: formData.Email,
            phone: formData.Phone,
            interestedArea: formData.InterestedArea,
            submissionDate: getCurrentDateTime(),
            timestamp: new Date().toISOString()
        });

        // Return success response
        return NextResponse.json(
            {
                message: "Franchise enquiry submitted and emails sent successfully!",
                timestamp: new Date().toISOString(),
                submissionDate: getCurrentDateTime(),
                submissionId: formData.submissionId || `franchise_${Date.now()}`
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Franchise form submission error:", error);

        // Return error response
        return NextResponse.json(
            {
                error: "Failed to process franchise enquiry",
                details: error.message,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}