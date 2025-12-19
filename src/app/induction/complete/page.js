"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function CompletionPage()
{
    useEffect(() =>
    {
        localStorage.removeItem("induction_progress_v1");
        localStorage.removeItem("induction_auth"); 
    }, []);

    return (
        <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-12 rounded-lg shadow-lg max-w-2xl text-center">
                <FaCheckCircle className="text-[#4bb543] text-[96px] mx-auto mb-6" />

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Congratulations!
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                    You have successfully completed the SecureCash Banking Courier Induction.
                </p>

                <div className="bg-primary/10 border-l-4 border-primary p-6 mb-8 text-left">
                    <h2 className="font-bold text-gray-800 mb-2">What happens next?</h2>
                    <ul className="text-gray-700 space-y-2 text-sm">
                        <li>✓ Your submission has been received by our team</li>
                        <li>✓ We will review your information within 1-2 business days</li>
                        <li>✓ You will receive an email confirmation with your eDocket credentials</li>
                        <li>✓ Your ID will be added to our authorized courier system</li>
                    </ul>
                </div>

                <Link
                    href="/"
                    className="inline-block bg-[#333] text-white px-8 py-3 rounded hover:bg-black transition"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}