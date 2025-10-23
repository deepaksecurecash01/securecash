// /zod/FranchiseFormSchema.js
import { z } from "zod";

/**
 * Enhanced Franchise Form Schema - Clean Declarative Version
 * 
 * COMPREHENSIVE VALIDATION:
 * - Full name validation with business context
 * - Phone number validation with Australian format
 * - Email validation with professional context
 * - Address validation for location accuracy
 * - Territory/area interest validation
 * - Reason for interest validation
 * - Referral source validation with conditional "Other" field
 * - Honeypot spam protection
 */
const FranchiseFormSchema = z.object({
    FullName: z
        .string({
            required_error: "Full name is required."
        })
        .min(1, "Full name is required.")
        .min(2, "Full name must be at least 2 characters long.")
        .max(100, "Full name is too long (maximum 100 characters).")
        .refine((name) =>
        {
            const trimmed = name.trim();
            // Should contain at least one letter and have multiple words (first + last name)
            const words = trimmed.split(/\s+/).filter(word => word.length > 0);
            return /[A-Za-z]/.test(trimmed) && words.length >= 2;
        }, {
            message: "Please enter your full name (first and last name)."
        })
        .refine((name) =>
        {
            const trimmed = name.trim();
            // Should not be just common test values
            const invalidNames = ['test test', 'john doe', 'jane doe', 'example name'];
            return !invalidNames.includes(trimmed.toLowerCase());
        }, {
            message: "Please enter a valid full name."
        }),

    Phone: z
        .string({
            required_error: "Phone number is required."
        })
        .min(1, "Phone number is required.")
        .min(8, "Phone number must be at least 8 digits.")
        .max(20, "Phone number is too long.")
        .refine((phone) =>
        {
            // Remove all non-numeric characters
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            return cleanPhone.length >= 8 && cleanPhone.length <= 15;
        }, {
            message: "Phone number must be between 8-15 digits."
        })
        .refine((phone) =>
        {
            // Should contain some digits
            return /[0-9]/.test(phone);
        }, {
            message: "Phone number must contain valid digits."
        }),

    Email: z
        .string({
            required_error: "Email address is required."
        })
        .min(1, "Email address is required.")
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) =>
        {
            // Additional validation for consecutive dots
            const trimmed = email.trim().toLowerCase();
            return !trimmed.includes('..');
        }, {
            message: "Email address format is invalid (consecutive dots not allowed)."
        })
        .refine((email) =>
        {
            // Should have valid domain structure
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email.trim());
        }, {
            message: "Please enter a valid email address format."
        }),

    Address: z
        .string({
            required_error: "Address is required."
        })
        .min(1, "Address is required.")
        .min(5, "Address must be at least 5 characters long.")
        .max(200, "Address is too long (maximum 200 characters).")
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should contain both letters and numbers (typical address format)
            return /[A-Za-z]/.test(trimmed) && (/[0-9]/.test(trimmed) || /street|road|avenue|lane|drive|place|court|way/i.test(trimmed));
        }, {
            message: "Please enter a valid address with street details."
        })
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should have at least 2 words
            const words = trimmed.split(/\s+/);
            return words.length >= 2;
        }, {
            message: "Please enter a complete address."
        }),

    InterestedArea: z
        .string({
            required_error: "Territory/Area/Suburb of interest is required."
        })
        .min(1, "Territory/Area/Suburb of interest is required.")
        .min(2, "Please specify the area of interest (minimum 2 characters).")
        .max(100, "Area of interest is too long (maximum 100 characters).")
        .refine((area) =>
        {
            const trimmed = area.trim();
            // Should contain at least one letter
            return /[A-Za-z]/.test(trimmed);
        }, {
            message: "Please enter a valid territory, area, or suburb name."
        })
        .refine((area) =>
        {
            const trimmed = area.trim();
            // Should not be just generic terms
            const genericTerms = ['area', 'suburb', 'territory', 'location', 'place'];
            return !genericTerms.includes(trimmed.toLowerCase());
        }, {
            message: "Please specify the actual area/suburb you're interested in."
        }),

    ReasonForInterest: z
        .string({
            required_error: "Please explain your interest in a SecureCash franchise."
        })
        .min(1, "Please explain your interest in a SecureCash franchise.")
        .min(10, "Please provide more detail about your interest (minimum 10 characters).")
        .max(1000, "Response is too long (maximum 1000 characters)."),

    ReferralSource: z
        .string({
            required_error: "Please tell us where you heard about this opportunity."
        })
        .min(1, "Please tell us where you heard about this opportunity.")
        .refine((value) => value !== "", {
            message: "Please select where you heard about us."
        }),

    ReferralSourceOther: z
        .string()
        .optional(),

    BotField: z
        .string()
        .max(0, "Bot detected!"), // Honeypot field must be empty
})
    .refine((data) =>
    {
        // If ReferralSource is "Other", then ReferralSourceOther must be filled
        if (data.ReferralSource === "Other") {
            return data.ReferralSourceOther && data.ReferralSourceOther.trim().length > 0;
        }
        return true;
    }, {
        message: "Please specify where you heard about us.",
        path: ["ReferralSourceOther"], // This puts the error on the ReferralSourceOther field
    });

// Default values for the form
export const FRANCHISE_DEFAULT_VALUES = {
    FullName: "",
    Phone: "",
    Email: "",
    Address: "",
    InterestedArea: "",
    ReasonForInterest: "",
    ReferralSource: "",
    ReferralSourceOther: "",
    BotField: "",
};

export const FRANCHISE_FIELD_PRIORITY = [
    'FullName',
    'Phone',
    'Email',
    'Address',
    'InterestedArea',
    'ReasonForInterest',
    'ReferralSource',
    'ReferralSourceOther'
];

/**
 * Alternative schema factory for different validation requirements
 * E.g., for different regions or validation strictness
 */
export const createFranchiseSchemaForRegion = (region = 'AU') =>
{
    if (region === 'US') {
        // US variant - different phone validation
        return FranchiseFormSchema.extend({
            Phone: z
                .string({
                    required_error: "Phone number is required."
                })
                .min(1, "Phone number is required.")
                .regex(/^[\d\s\-\(\)\+]+$/, "Phone number contains invalid characters.")
                .refine((phone) =>
                {
                    // US phone format validation
                    const cleanPhone = phone.replace(/[^0-9]/g, '');
                    return cleanPhone.length === 10;
                }, {
                    message: "Please enter a valid 10-digit US phone number."
                }),
        });
    }

    return FranchiseFormSchema;
};

/**
 * Schema for partial validation (useful for multi-step forms)
 */
export const FranchisePartialSchema = z.object({
    FullName: z.string().optional(),
    Phone: z.string().optional(),
    Email: z.string().optional(),
    Address: z.string().optional(),
    InterestedArea: z.string().optional(),
    ReasonForInterest: z.string().optional(),
    ReferralSource: z.string().optional(),
    ReferralSourceOther: z.string().optional(),
    BotField: z.string().optional(),
});

export default FranchiseFormSchema;