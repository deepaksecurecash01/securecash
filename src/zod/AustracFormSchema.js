import { z } from "zod";
import { CommonValidations } from "./validationHelpers";

const AustracFormSchema = z.object({
    Organisation: z
        .string()
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long.")
        .max(200, "Organisation name is too long (maximum 200 characters).")
        .refine((org) => /[A-Za-z]/.test(org.trim()),
            "Organisation name must contain at least one letter.")
        .refine((org) =>
        {
            const invalidNames = ['test', 'example', 'company', 'business', 'organisation'];
            return !invalidNames.includes(org.trim().toLowerCase());
        }, "Please enter a valid organisation name."),

    ABN: CommonValidations.abn(),

    Website: z
        .string()
        .min(1, "Website URL is required.")
        .url("Please enter a valid website URL (including http:// or https://)")
        .refine((url) => /^https?:\/\/.+/.test(url.toLowerCase()),
            "Website URL must start with http:// or https://")
        .refine((url) =>
        {
            const domainRegex = /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
            return domainRegex.test(url);
        }, "Please enter a valid website URL with proper domain.")
        .refine((url) =>
        {
            const validTlds = ['.com.au', '.org.au', '.net.au', '.gov.au', '.edu.au', '.com', '.org', '.net', '.biz', '.info'];
            return validTlds.some(tld => url.toLowerCase().includes(tld));
        }, "Please enter a valid business website URL."),

    OrganisationEmail: CommonValidations.businessEmail("Organisation email"),

    OrganisationType: z
        .string()
        .min(1, "Please select an organisation type.")
        .refine((type) =>
        {
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
        }, "Please select a valid organisation type."),

    Address: CommonValidations.address(10),

    State: CommonValidations.australianState(),

    Personnel: z
        .string()
        .min(1, "Personnel information is required.")
        .min(10, "Please provide more detailed personnel information (minimum 10 characters).")
        .max(2000, "Personnel information is too long (maximum 2000 characters).")
        .refine((personnel) => /[A-Za-z]{2,}/.test(personnel.trim()),
            "Please provide valid personnel names and positions."),

    BotField: CommonValidations.botField(),
});

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

export const createAustracSchemaForRegion = (region = 'AU') =>
{
    if (region === 'NZ') {
        return AustracFormSchema.extend({
            ABN: z
                .string()
                .min(1, "NZBN (New Zealand Business Number) is required.")
                .regex(/^[0-9]+$/, "NZBN must contain only digits.")
                .refine((nzbn) => nzbn.length === 13, "NZBN must be exactly 13 digits."),

            OrganisationEmail: CommonValidations.email("Organisation email")
        });
    }
    return AustracFormSchema;
};

export const AustracPartialSchema = AustracFormSchema.partial();

export default AustracFormSchema;