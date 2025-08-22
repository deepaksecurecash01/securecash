import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { getCurrentDateTime } from "../utils/Helpers";
import { prepareAUSTRACEmail } from "../services/emailService";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);




export async function POST(req)
{
    try {
        const formData = await req.json();
        console.log(formData);

        const austracEmail = prepareAUSTRACEmail(formData);
        await sendgrid.send(austracEmail);


        console.log("AUSTRAC form submitted successfully:", {
            organisation: formData.Organisation,
            abn: formData.ABN,
            email: formData.OrganisationEmail,
            submissionDate: getCurrentDateTime(),
            timestamp: new Date().toISOString()
        });

        return NextResponse.json(
            {
                message: "AUSTRAC information submitted and emails sent successfully!",
                timestamp: new Date().toISOString(),
                submissionDate: getCurrentDateTime()
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("AUSTRAC form submission error:", error);

        return NextResponse.json(
            {
                error: "Failed to process AUSTRAC submission",
                details: error.message
            },
            { status: 500 }
        );
    }
}