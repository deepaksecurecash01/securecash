// /zod/TermsFormSchema.js
import { z } from "zod";

// Enhanced Zod schema for Terms form validation with sequential error display
const TermsFormSchema = z.object({
    Name: z.string(),
    Position: z.string(),
    Email: z.string(),
    Birthdate: z.date().nullable(),
    Organisation: z.string(),
    ABN: z.string(),
    BotField: z.string(),
}).superRefine((data, ctx) =>
{
    // Sequential validation - stop at first error found
    // Order: Name → Position → Email → Birthdate → Organisation → ABN → BotField

    // 1. Name validation
    if (!data.Name || data.Name.trim().length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Full Name is required.",
            path: ["Name"],
        });
        return; // Stop here - show only this error
    }

    if (!/^[A-Za-z\s]+$/.test(data.Name)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Name must only contain letters and spaces.",
            path: ["Name"],
        });
        return; // Stop here
    }

    if (!/^\S+\s\S+/.test(data.Name.trim())) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Name must include both first and last name.",
            path: ["Name"],
        });
        return; // Stop here
    }

    // 2. Position validation
    if (!data.Position || data.Position.trim().length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Position is required.",
            path: ["Position"],
        });
        return; // Stop here
    }

    if (data.Position.trim().length < 2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Position must be at least 2 characters long.",
            path: ["Position"],
        });
        return; // Stop here
    }

    // 3. Email validation
    if (!data.Email || data.Email.trim().length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is required.",
            path: ["Email"],
        });
        return; // Stop here
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.Email)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid email address.",
            path: ["Email"],
        });
        return; // Stop here
    }

    // 4. Birthdate validation
    if (!data.Birthdate) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date of Birth is required",
            path: ["Birthdate"],
        });
        return; // Stop here
    }

    if (data.Birthdate > new Date()) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date of Birth must be in the past or today",
            path: ["Birthdate"],
        });
        return; // Stop here
    }

    // 5. Organisation validation
    if (!data.Organisation || data.Organisation.trim().length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Organisation name is required.",
            path: ["Organisation"],
        });
        return; // Stop here
    }

    if (data.Organisation.trim().length < 2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Organisation name must be at least 2 characters long.",
            path: ["Organisation"],
        });
        return; // Stop here
    }

    // 6. ABN validation
    if (!data.ABN || data.ABN.trim().length === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "ABN number is required.",
            path: ["ABN"],
        });
        return; // Stop here
    }

    if (!/^[0-9\s]+$/.test(data.ABN)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "ABN must contain only digits and spaces.",
            path: ["ABN"],
        });
        return; // Stop here
    }

    // Remove spaces and check if it's 11 digits
    const cleanABN = data.ABN.replace(/\s/g, '');
    if (cleanABN.length !== 11) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "ABN must be exactly 11 digits.",
            path: ["ABN"],
        });
        return; // Stop here
    }

    // 7. BotField validation (honeypot)
    if (data.BotField && data.BotField.length > 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Bot detected!",
            path: ["BotField"],
        });
        return; // Stop here
    }
});

// Default values for the form
export const TERMS_DEFAULT_VALUES = {
    Name: "",
    Position: "",
    Email: "",
    Birthdate: null,
    Organisation: "",
    ABN: "",
    BotField: "",
};

export default TermsFormSchema;