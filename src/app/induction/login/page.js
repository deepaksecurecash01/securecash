"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useInduction } from "@/context/InductionContext";
import UniversalFormField from "@/components/common/forms-new/core/UniversalFormField";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";

// ✅ Login schema defined inline
const LoginFormSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(4, "Password must be at least 4 characters"),
});

export default function InductionLoginPage()
{
    const router = useRouter();
    const { isAuthenticated, login } = useInduction();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [currentFocusField, setCurrentFocusField] = useState(null);

    const {
        control,
        handleSubmit: rhfHandleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        shouldFocusError: false,
    });

    // Redirect if already authenticated
    useEffect(() =>
    {
        if (isAuthenticated) {
            router.push("/induction/lessons");
        }
    }, [isAuthenticated, router]);

    // Focus first error field on validation failure
    useEffect(() =>
    {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            setCurrentFocusField(firstErrorField);
        }
    }, [errors]);

    const handleFieldFocus = (fieldName) =>
    {
        setCurrentFocusField(fieldName);
    };

    const handleFieldBlur = () =>
    {
        setCurrentFocusField(null);
    };

    const onSubmit = async (data) =>
    {
        setIsSubmitting(true);
        setLoginError(null);

        // Small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const success = login(data.username, data.password);

        if (success) {
            router.push("/induction/lessons");
        } else {
            setLoginError("Invalid credentials. Please try again.");
            setIsSubmitting(false);
        }
    };

    // Don't show login if already authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-[80vh] bg-[#f2f2f2] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-2xl">
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/images/SecureCash.webp"
                        alt="SecureCash Logo"
                        width={285}
                        height={91}
                        sizes="285px"
                        className="w-[285px] h-auto"
                        style={{ width: "285px", height: "auto" }}
                        priority={true}
                    />
                    <hr className="w-[100px] mt-3 mb-6 h-[4px] rounded-[5px] border-0 mx-auto bg-primary" aria-hidden="true" />
                </div>

                <div className="text-center mb-6">
                    <p className="text-[20px] text-gray-600 font-semibold">
                        Banking Courier Induction
                    </p>
                </div>

                <form onSubmit={rhfHandleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Username Field */}
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <UniversalFormField
                            name="username"
                            control={control}
                            type="text"
                            theme="light"
                            placeholder="Enter username"
                            Icon={FaUser}
                            currentFocusField={currentFocusField}
                            onFieldFocus={handleFieldFocus}
                            onFieldBlur={handleFieldBlur}
                            autoComplete="username"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <UniversalFormField
                            name="password"
                            control={control}
                            type="password"
                            theme="light"
                            placeholder="Enter password"
                            Icon={FaLock}
                            currentFocusField={currentFocusField}
                            onFieldFocus={handleFieldFocus}
                            onFieldBlur={handleFieldBlur}
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Error Message */}
                    {loginError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                            {loginError}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-[#c6a54b] text-white rounded hover:bg-[#b09140] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-500">
                        This is a secure training portal. Access credentials are provided by SecureCash management.
                    </p>
                </div>
            </div>
        </div>
    );
}