// /zod/AustracFormSchema.js
import { z } from "zod";

/**
 * Enhanced Austrac Form Schema - Clean Declarative Version
 * 
 * COMPREHENSIVE VALIDATION:
 * - Organisation name with business context validation
 * - ABN validation with proper Australian format checking
 * - Website URL validation with proper protocols
 * - Email validation with business context
 * - Organisation type selection validation
 * - Australian address validation
 * - State/territory validation
 * - Personnel information validation
 * - Honeypot spam protection
 */
const AustracFormSchema = z.object({
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
        })
        .refine((org) =>
        {
            const trimmed = org.trim();
            // Should not be just common words like "test", "example"
            const invalidNames = ['test', 'example', 'company', 'business', 'organisation'];
            return !invalidNames.includes(trimmed.toLowerCase());
        }, {
            message: "Please enter a valid organisation name."
        }),

    ABN: z
        .string({
            required_error: "ABN number is required."
        })
        .min(1, "ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            // Remove spaces and check if it's exactly 11 digits
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, {
            message: "ABN must be exactly 11 digits."
        })
    ,

    Website: z
        .string({
            required_error: "Website URL is required."
        })
        .min(1, "Website URL is required.")
        .url("Please enter a valid website URL (including http:// or https://)")
        .refine((url) =>
        {
            // Must start with http:// or https://
            return /^https?:\/\/.+/.test(url.toLowerCase());
        }, {
            message: "Website URL must start with http:// or https://"
        })
        .refine((url) =>
        {
            // Should have a valid domain structure
            const domainRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
            return domainRegex.test(url);
        }, {
            message: "Please enter a valid website URL with proper domain."
        })
        .refine((url) =>
        {
            // Check for common Australian business domains or international
            const validTlds = ['.com.au', '.org.au', '.net.au', '.gov.au', '.edu.au', '.com', '.org', '.net', '.biz', '.info'];
            return validTlds.some(tld => url.toLowerCase().includes(tld));
        }, {
            message: "Please enter a valid business website URL."
        }),

    OrganisationEmail: z
        .string({
            required_error: "Organisation email is required."
        })
        .min(1, "Organisation email is required.")
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) =>
        {
            // Should not be a personal email domain for business context
            const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
            const domain = email.toLowerCase().split('@')[1];
            return !personalDomains.includes(domain);
        }, {
            message: "Please use a business email address rather than personal email."
        })
        .refine((email) =>
        {
            // Additional validation for consecutive dots
            const trimmed = email.trim().toLowerCase();
            return !trimmed.includes('..');
        }, {
            message: "Email address format is invalid (consecutive dots not allowed)."
        }),

    OrganisationType: z
        .string({
            required_error: "Organisation type is required."
        })
        .min(1, "Please select an organisation type.")
        .refine((type) =>
        {
            // Validate against the allowed organisation types
            const validTypes = [
                "Individual (Sole Trader)",
                "Trustees & Beneficiaries",
                "Domestic Pty Ltd or Ltd Company",
                "Registered Foreign Company",
                "Foreign Company Not Registered in Australia",
                "Partners & Partnerships",
                "Associations",
                "Registered Co-Operatives",
                "Government Body",
                "School or Education Institute",
                "Church or Religious Organisation"
            ];
            return validTypes.includes(type);
        }, {
            message: "Please select a valid organisation type."
        }),

    Address: z
        .string({
            required_error: "Head office address is required."
        })
        .min(1, "Head office address is required.")
        .min(10, "Address must be at least 10 characters long.")
        .max(500, "Address is too long (maximum 500 characters).")
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should contain both letters and numbers (typical address format)
            return /[A-Za-z]/.test(trimmed) && /[0-9]/.test(trimmed);
        }, {
            message: "Address must contain both letters and numbers."
        })
        .refine((address) =>
        {
            const trimmed = address.trim();
            // Should have at least 3 words (number, street, suburb/city)
            const words = trimmed.split(/\s+/);
            return words.length >= 3;
        }, {
            message: "Please enter a complete address (street number, street name, suburb/city)."
        }),

    State: z
        .string({
            required_error: "State/Territory is required."
        })
        .min(1, "Please select a state or territory.")
        .refine((state) =>
        {
            // Validate against Australian states and territories + NZ
            const validStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "NZ"];
            return validStates.includes(state);
        }, {
            message: "Please select a valid state or territory."
        }),

    Personnel: z
        .string({
            required_error: "Personnel information is required."
        })
        .min(1, "Personnel information is required.")
        .min(10, "Please provide more detailed personnel information (minimum 10 characters).")
        .max(2000, "Personnel information is too long (maximum 2000 characters).")
        .refine((personnel) =>
        {
            const trimmed = personnel.trim();
            // Should contain at least one name (letters with possible spaces/apostrophes)
            return /[A-Za-z]{2,}/.test(trimmed);
        }, {
            message: "Please provide valid personnel names and positions."
        })
    ,

    BotField: z
        .string()
        .max(0, "Bot detected!"), // Honeypot field must be empty
});

// Default values for the form
export const AUSTRAC_DEFAULT_VALUES = {
    Organisation: "",
    ABN: "",
    Website: "",
    OrganisationEmail: "",
    OrganisationType: "",
    Address: "",
    State: "",
    Personnel: "",
    BotField: "",
};

/**
 * Field priority order for sequential error display
 * Used with priority error resolver if needed
 */
export const AUSTRAC_FIELD_PRIORITY = [
    'Organisation',
    'ABN',
    'Website',
    'OrganisationEmail',
    'OrganisationType',
    'Address',
    'State',
    'Personnel'
];

/**
 * Alternative schema factory for different validation requirements
 * E.g., for different regions or business types
 */
export const createAustracSchemaForRegion = (region = 'AU') =>
{
    if (region === 'NZ') {
        // New Zealand variant - different business number validation
        return AustracFormSchema.extend({
            ABN: z
                .string({
                    required_error: "NZBN (New Zealand Business Number) is required."
                })
                .min(1, "NZBN is required.")
                .regex(/^[0-9]+$/, "NZBN must contain only digits.")
                .refine((nzbn) =>
                {
                    // NZBN is 13 digits
                    return nzbn.length === 13;
                }, {
                    message: "NZBN must be exactly 13 digits."
                }),

            OrganisationEmail: z
                .string({
                    required_error: "Organisation email is required."
                })
                .min(1, "Organisation email is required.")
                .email("Please enter a valid email address.")
                .max(254, "Email address is too long.")
            // Remove Australian business email restriction for NZ
        });
    }

    return AustracFormSchema;
};

/**
 * Schema for partial validation (useful for multi-step forms)
 */
export const AustracPartialSchema = AustracFormSchema.partial();

export default AustracFormSchema;