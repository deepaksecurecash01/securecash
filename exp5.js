import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import austracTemplate from './templates/austracTemplate.js';
import contactTemplate from './templates/contactTemplate.js';
import franchiseTemplate from './templates/franchiseTemplate.js';

const readPdfFile = (filename) =>
{
    try {
        const filePath = path.join(process.cwd(), "public", "upload", filename);

        if (!fs.existsSync(filePath)) {
            console.warn(`PDF file not found: ${filePath}`);
            return null;
        }

        const fileBuffer = fs.readFileSync(filePath);
        return fileBuffer.toString("base64");
    } catch (error) {
        console.error(`Error reading PDF file ${filename}:`, error);
        return null;
    }
};

// Helper function to prepare PDF attachments for franchise emails
{
    const attachmentConfigs = [
        {
            filename: "ACCC-Information-Statement.pdf",
            displayName: "ACCC - 2023 Information Statement for Prospective Franchisees.pdf",
        },
        {
            filename: "SecureCash-Franchise-Prospectus.pdf",
            displayName: "SecureCash Franchise Prospectus.pdf",
        },
        {
            filename: "SecureCash-DL-Flyer.pdf",
            displayName: "SecureCash Flyer.pdf",
        },
        {
            filename: "eDockets-DL-Flyer.pdf",
            displayName: "eDockets Flyer.pdf",
        },
    ];

    const attachments = [];

    for (const config of attachmentConfigs) {
        const pdfContent = readPdfFile(config.filename);
        if (pdfContent) {
            attachments.push({
                content: pdfContent,
                filename: config.displayName,
                type: "application/pdf",
                disposition: "attachment",
            });
        }
    }

    return attachments;
};

const getCurrentDate = () =>
{
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};

const getCurrentDateTime = () =>
{
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const templates = {
    austrac: austracTemplate,
    contact: contactTemplate,
    franchise: franchiseTemplate,
    // Will add more templates as you provide the other API routes
};

const formatCallbackDate = (callbackDate) =>
{
    if (!callbackDate) return 'Not requested';

    try {
        const date = new Date(callbackDate);
        if (isNaN(date.getTime())) return 'Not requested';

        return date.toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Not requested';
    }
};

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req)
{
    try {
        // Parse incoming request body
        const body = await req.json();
        const { formType, ...formData } = body;

        console.log('Form submission received:', { formType, ...formData });

        // Validate form type
        if (!formType || !templates[formType]) {
            return NextResponse.json(
                { error: 'Invalid or missing form type' },
                { status: 400 }
            );
        }

        if (formType === 'contact') {
            // Basic validation for contact form
            if (!formData.Department || !formData.FullName || !formData.Email || !formData.Message) {
                return NextResponse.json(
                    {
                        error: "Missing required fields",
                        details: "Department, Full Name, Email, and Message are required."
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

            // Validate department
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

            // Validate callback fields if callback is requested
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
        } else if (formType === 'franchise') {
            // Basic validation for franchise form
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
        }

        // Get the email options from the template
        const emailOptions = templates[formType](formData, { getCurrentDate, getCurrentDateTime, formatCallbackDate, preparePdfAttachments });

        // Send email(s) via SendGrid
        // Handle multiple emails if returned as array, single email if object
        if (Array.isArray(emailOptions)) {
            // Send multiple emails (like contact form: admin + confirmation)
            for (const email of emailOptions) {
                await sendgrid.send(email);
            }
        } else {
            // Send single email (like austrac)
            await sendgrid.send(emailOptions);
        }

        // Form-specific success logging
        let logData = { timestamp: new Date().toISOString() };
        let successMessage = "Form submitted and email sent successfully!";

        if (formType === 'austrac') {
            logData = {
                organisation: formData.Organisation,
                abn: formData.ABN,
                email: formData.OrganisationEmail,
                submissionDate: getCurrentDateTime(),
                timestamp: new Date().toISOString()
            };
            successMessage = "AUSTRAC information submitted and emails sent successfully!";
        } else if (formType === 'contact') {
            logData = {
                department: formData.Department,
                fullName: formData.FullName,
                organisation: formData.Organisation,
                email: formData.Email,
                hasCallback: formData.ChkCallBack === 'Yes, please.',
                submissionDate: getCurrentDateTime(),
                timestamp: new Date().toISOString()
            };
            successMessage = "Contact request submitted and emails sent successfully!";
        } else if (formType === 'franchise') {
            logData = {
                fullName: formData.FullName,
                email: formData.Email,
                phone: formData.Phone,
                interestedArea: formData.InterestedArea,
                submissionDate: getCurrentDateTime(),
                timestamp: new Date().toISOString()
            };
            successMessage = "Franchise enquiry submitted and emails sent successfully!";
        }

        console.log(`${formType} form submitted successfully:`, logData);

        // Return success response
        const responseData = {
            message: successMessage,
            timestamp: new Date().toISOString(),
            submissionDate: getCurrentDateTime()
        };

        // Add form-specific response data
        if (formType === 'contact') {
            responseData.submissionId = formData.submissionId || `contact_${Date.now()}`;
        } else if (formType === 'franchise') {
            responseData.submissionId = formData.submissionId || `franchise_${Date.now()}`;
        }

        return NextResponse.json(responseData, { status: 200 });

    } catch (error) {
        console.error("Form submission error:", error);

        // Return error response
        return NextResponse.json(
            {
                error: "Failed to process form submission",
                details: error.message
            },
            { status: 500 }
        );
    }
}