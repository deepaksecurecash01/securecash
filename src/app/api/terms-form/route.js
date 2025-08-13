import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import fs from "fs";
import path from "path";
import { getCurrentDateTime } from "../utils/Helpers";
import { prepareTermsEmail } from "../services/emailService";

// Set the SendGrid API key
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);






// POST request handler for terms form submission
export async function POST(req)
{
  try {
    // Parse incoming request body
    const formData = await req.json();
    console.log(formData);

    // Validate required fields
    const requiredFields = ["Full Name", "Organisation Name", "Organisation Role", "Organisation ABN", "Email", "Birthday"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Prepare and send customer email with terms & conditions
    const customerEmail = prepareTermsEmail(formData);
    await sendgrid.send(customerEmail);


    // Log successful submission
    console.log("Terms & Conditions form submitted successfully:", {
      organisation: formData["Organisation Name"],
      name: formData["Full Name"],
      email: formData.Email,
      agreementCommencementDate: getCurrentDateTime(),
      timestamp: new Date().toISOString()
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Terms & Conditions accepted and emails sent successfully!",
        timestamp: new Date().toISOString(),
        agreementCommencementDate: getCurrentDateTime()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Terms form submission error:", error);

    // Return error response
    return NextResponse.json(
      {
        error: "Failed to process Terms & Conditions submission",
        details: error.message
      },
      { status: 500 }
    );
  }
}