// /zod/TermsFormSchema.js
import { z } from "zod";

// Enhanced Zod schema for Terms form validation
const TermsFormSchema = z.object({
    Name: z
        .string()
        .min(1, "Full Name is required.")
        .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
        .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
    Position: z
        .string()
        .min(1, "Position is required.")
        .min(2, "Position must be at least 2 characters long."),
    Email: z
        .string()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
    Birthdate: z
        .date({
            required_error: "Date of Birth is required",
            invalid_type_error: "Date of Birth is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Date of Birth must be in the past or today",
        }),
    Organisation: z
        .string()
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long."),
    ABN: z
        .string()
        .min(1, "ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            // Remove spaces and check if it's 11 digits
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, {
            message: "ABN must be exactly 11 digits.",
        }),
    BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
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