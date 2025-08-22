import { z } from "zod";

// Austrac Form Schema
const AustracFormSchema = z.object({
    Organisation: z
        .string()
        .nonempty("Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long."),
    ABN: z
        .string()
        .nonempty("ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            // Remove spaces and check if it's 11 digits
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, {
            message: "ABN must be exactly 11 digits.",
        }),
    Website: z
        .string()
        .nonempty("Website is required.")
        .url("Please enter a valid URL."),
    OrganisationEmail: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address."),
    OrganisationType: z
        .string()
        .nonempty("Organisation type is required."),
    Address: z
        .string()
        .nonempty("Address is required.")
        .min(5, "Address must be at least 5 characters long."),
    State: z
        .string()
        .nonempty("State is required."),
    Personnel: z
        .string()
        .nonempty("Personnel information is required.")
        .min(10, "Please provide detailed personnel information."),
    BotField: z.string().max(0, "Bot detected!"), // honeypot field must be empty
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

export default AustracFormSchema;