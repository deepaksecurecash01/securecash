import { connectMongo } from "@/utils/connectMongo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Define contacts schema (flexible like your stats route)
const contactSchema = new mongoose.Schema({}, { collection: 'contacts', strict: false });
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export async function POST(request)
{
    try {
        const { username } = await request.json();

        // Validate input
        if (!username || username.length < 4) {
            return NextResponse.json(
                { available: true, tooShort: true },
                { status: 200 }
            );
        }

        // Connect to MongoDB
        await connectMongo();

        // Case-insensitive search for username
        const existingUser = await Contact.findOne({
            Username: { $regex: new RegExp(`^${username}$`, 'i') }
        }).select('Username').lean();

        const available = !existingUser;

   

        return NextResponse.json(
            {
                available,
                exists: !!existingUser,
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );

    } catch (error) {
        console.error('[API] Username check error:', error);

        // On error, allow submission (fail-open for better UX)
        return NextResponse.json(
            {
                available: true,
                error: 'Unable to verify username availability'
            },
            { status: 200 }
        );
    }
}