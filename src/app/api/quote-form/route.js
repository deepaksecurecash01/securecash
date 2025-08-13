import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import { sanitizeFormData, validateQuoteFormData } from "../utils/validationHelpers";
import { prepareQuoteAdminEmail, prepareQuoteConfirmationEmail } from "../services/emailService";

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);



// POST request handler for quote form submission
export async function POST(req)
{
    try {
        // Check if SendGrid API key is configured
        if (!process.env.SENDGRID_API_KEY) {
            console.error("SendGrid API key not configured");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        // Parse and validate request body
        let formData;
        try {
            formData = await req.json();
        } catch (parseError) {
            console.error("Invalid JSON in request body:", parseError);
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        console.log("Quote form data received:", formData);

        // Sanitize form data
        const sanitizedData = sanitizeFormData(formData);

        // Validate form data
        const validationErrors = validateQuoteFormData(sanitizedData);
        if (validationErrors.length > 0) {
            console.error("Validation errors:", validationErrors);
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationErrors,
                },
                { status: 400 }
            );
        }

        // Prepare emails
        const adminEmail = prepareQuoteAdminEmail(sanitizedData);
        const customerEmail = prepareQuoteConfirmationEmail(sanitizedData);

        // Send emails with proper error handling
        const emailPromises = [];

        try {
            emailPromises.push(sendgrid.send(adminEmail));
            emailPromises.push(sendgrid.send(customerEmail));

            await Promise.all(emailPromises);
        } catch (emailError) {
            console.error("Email sending error:", emailError);

            // Check if it's a SendGrid specific error
            if (emailError.response) {
                console.error("SendGrid error details:", emailError.response.body);
            }

            return NextResponse.json(
                { error: "Failed to send confirmation emails" },
                { status: 500 }
            );
        }

        // Log successful submission
        console.log("Quote form submitted successfully:", {
            organisation: sanitizedData.Organisation,
            name: sanitizedData.Name,
            email: sanitizedData.Email,
            formID: sanitizedData.FormID,
            services: sanitizedData.service || [],
            timestamp: new Date().toISOString(),
        });

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Quote request submitted successfully!",
                timestamp: new Date().toISOString(),
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Unexpected error in quote submission:", error);
        return NextResponse.json(
            {
                error: "An unexpected error occurred",
                message: "Please try again later or contact support",
            },
            { status: 500 }
        );
    }
}