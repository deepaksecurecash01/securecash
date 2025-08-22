import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import { getCurrentDateTime } from "../utils/Helpers";
import { prepareCustomerEmail, prepareInternalNotificationEmail, prepareOperationsEmail } from "../services/emailService";

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


export async function POST(req) {
  try {
    // Parse incoming request body
    const formData = await req.json();
    console.log("ICA Form Data Received:", formData);

    // Validate required fields (fixed to match HTML form field names)
    const requiredFields = ["Name", "Email", "ABN", "Phone"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Send all three emails
    const emailPromises = [];

    // 1. Operations email with attachments
    const operationsEmail = prepareOperationsEmail(formData);
    emailPromises.push(sendgrid.send(operationsEmail));

    // 2. Customer confirmation email
    const customerEmail = prepareCustomerEmail(formData);
    emailPromises.push(sendgrid.send(customerEmail));

    // 3. Internal notification email
    const internalEmail = prepareInternalNotificationEmail(formData);
    emailPromises.push(sendgrid.send(internalEmail));

    // Send all emails concurrently
    await Promise.all(emailPromises);

    console.log("All ICA emails sent successfully");

    // Log successful submission (fixed field names)
    console.log("ICA form submitted successfully:", {
      name: formData.Name,
      businessName: formData.BusinessName,
      email: formData.Email,
      abn: formData.ABN,
      phone: formData.Phone,
      attachmentCount: formData.attachments ? formData.attachments.length : 0,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      {
        message: "ICA form submitted and all emails sent successfully!",
        timestamp: new Date().toISOString(),
        submissionDate: getCurrentDateTime(),
        emailsSent: 3,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ICA form submission error:", error);

    // Return error response
    return NextResponse.json(
      {
        error: "Failed to process ICA form submission",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
