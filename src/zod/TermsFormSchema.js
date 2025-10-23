// /zod/TermsFormSchema.js
import { z } from "zod";

/**
 * Enhanced Terms Form Schema - Clean Declarative Version
 * 
 * BENEFITS:
 * - Much more readable than superRefine
 * - Easy to maintain and modify
 * - Type-safe with excellent IntelliSense
 * - Works with singleErrorResolver for sequential display
 */
const TermsFormSchema = z.object({
    Name: z
        .string({
            required_error: "Full Name is required."
        })
        .min(1, "Full Name is required.")
        .regex(/^[A-Za-z\s\-']+$/, "Name must only contain letters, spaces, hyphens, and apostrophes.")
        .refine((name) =>
        {
            const trimmed = name.trim();
            // Must have at least two words (first and last name)
            return /^\S+\s+\S+/.test(trimmed);
        }, {
            message: "Name must include both first and last name."
        })
        .refine((name) =>
        {
            const trimmed = name.trim();
            // Name should not be excessively long
            return trimmed.length <= 100;
        }, {
            message: "Name is too long (maximum 100 characters)."
        }),

    Position: z
        .string({
            required_error: "Position is required."
        })
        .min(1, "Position is required.")
        .min(2, "Position must be at least 2 characters long.")
        .max(100, "Position is too long (maximum 100 characters)."),

    Email: z
        .string({
            required_error: "Email is required."
        })
        .min(1, "Email is required.")
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) =>
        {
            // Additional email validation for common issues
            const trimmed = email.trim().toLowerCase();
            return !trimmed.includes('..');
        }, {
            message: "Email address format is invalid (consecutive dots not allowed)."
        }),

    Birthdate: z
        .date({
            required_error: "Date of Birth is required",
            invalid_type_error: "Date of Birth is required",
        })
        .refine((date) =>
        {
            // Must be in the past or today
            return date <= new Date();
        }, {
            message: "Date of Birth must be in the past or today",
        })
        .refine((date) =>
        {
            // Must be at least 13 years old (reasonable business requirement)
            const thirteenYearsAgo = new Date();
            thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
            return date <= thirteenYearsAgo;
        }, {
            message: "You must be at least 13 years old",
        })
        .refine((date) =>
        {
            // Must not be more than 150 years ago (reasonable limit)
            const oneHundredFiftyYearsAgo = new Date();
            oneHundredFiftyYearsAgo.setFullYear(oneHundredFiftyYearsAgo.getFullYear() - 150);
            return date >= oneHundredFiftyYearsAgo;
        }, {
            message: "Please enter a valid birth date",
        }),

    Organisation: z
        .string({
            required_error: "Organisation name is required."
        })
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long.")
        .max(200, "Organisation name is too long (maximum 200 characters).")
        .refine((org) =>
        {
            const trimmed = org.trim();
            // Should contain at least one letter (not just numbers/symbols)
            return /[A-Za-z]/.test(trimmed);
        }, {
            message: "Organisation name must contain at least one letter."
        }),

    ABN: z
        .string({
            required_error: "ABN number is required."
        })
        .min(1, "ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            // Remove spaces and check if it's exactly 11 digitsgg
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, {
            message: "ABN must be exactly 11 digits.",
        }),


    BotField: z
        .string()
        .max(0, "Bot detected!"), // Honeypot field must be empty
});

// Default values for the form - unchanged
export const TERMS_DEFAULT_VALUES = {
    Name: "",
    Position: "",
    Email: "",
    Birthdate: null,
    Organisation: "",
    ABN: "",
    BotField: "",
};

/**
 * Alternative: Age-based schema factory for different age requirements
 */
export const createTermsSchemaWithMinAge = (minAge = 13) =>
{
    return TermsFormSchema.extend({
        Birthdate: z
            .date({
                required_error: "Date of Birth is required",
                invalid_type_error: "Date of Birth is required",
            })
            .refine((date) => date <= new Date(), {
                message: "Date of Birth must be in the past or today",
            })
            .refine((date) =>
            {
                const minAgeDate = new Date();
                minAgeDate.setFullYear(minAgeDate.getFullYear() - minAge);
                return date <= minAgeDate;
            }, {
                message: `You must be at least ${minAge} years old`,
            })
    });
};

export default TermsFormSchema;