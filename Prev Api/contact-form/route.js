import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { getCurrentDateTime } from "../utils/Helpers";
import { prepareContactAdminEmail, prepareContactConfirmationEmail } from "../services/emailService";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


export async function POST(req)
{
    try {
        const formData = await req.json();
        console.log("Contact form data received:", formData);

        if (!formData.Department || !formData.FullName || !formData.Email || !formData.Message) {
            return NextResponse.json(
                {
                    error: "Missing required fields",
                    details: "Department, Full Name, Email, and Message are required."
                },
                { status: 400 }
            );
        }

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

        const validDepartments = ['customers', 'sales', 'operations'];
        if (!validDepartments.includes(formData.Department)) {
            return NextResponse.json(
                {
                    error: "Invalid department",
                    details: "Please select a valid department."
                },
                { status: 400 }
            );
        }

        if (formData.ChkCallBack === 'Yes, please.') {
            if (!formData.CallbackDate || !formData.CallbackTime || !formData.CallbackState) {
                return NextResponse.json(
                    {
                        error: "Incomplete callback information",
                        details: "When requesting a callback, please provide date, time, and state."
                    },
                    { status: 400 }
                );
            }
        }

        const adminEmail = prepareContactAdminEmail(formData);
        await sendgrid.send(adminEmail);

        const confirmationEmail = prepareContactConfirmationEmail(formData);
        await sendgrid.send(confirmationEmail);

        console.log("Contact form submitted successfully:", {
            department: formData.Department,
            fullName: formData.FullName,
            organisation: formData.Organisation,
            email: formData.Email,
            hasCallback: formData.ChkCallBack === 'Yes, please.',
            submissionDate: getCurrentDateTime(),
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(
            {
                message: "Contact request submitted and emails sent successfully!",
                timestamp: new Date().toISOString(),
                submissionDate: getCurrentDateTime(),
                submissionId: formData.submissionId || `contact_${Date.now()}`
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Contact form submission error:", error);

        return NextResponse.json(
            {
                error: "Failed to process contact form submission",
                details: error.message,
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}