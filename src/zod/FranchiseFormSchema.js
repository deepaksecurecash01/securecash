// /zod/FranchiseFormSchema.js
import { z } from "zod";

const FranchiseFormSchema = z.object({
    FullName: z
        .string()
        .min(1, "Full name is required.")
        .min(2, "Full name must be at least 2 characters long."),
    Phone: z
        .string()
        .min(1, "Phone number is required.")
        .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number.")
        .min(8, "Phone number must be at least 8 digits."),
    Email: z
        .string()
        .min(1, "Email is required.")
        .email("Please enter a valid email address."),
    Address: z
        .string()
        .min(1, "Address is required.")
        .min(5, "Please enter a complete address."),
    InterestedArea: z
        .string()
        .min(1, "Territory/area/suburb of interest is required.")
        .min(2, "Please specify the area you're interested in."),
    ReasonForInterest: z
        .string()
        .min(1, "Please tell us what interests you in a SecureCash franchise.")
        .min(20, "Please provide more details about your interest."),
    ReferralSource: z
        .string()
        .min(1, "Please tell us how you heard about this opportunity.")
        .min(2, "Please provide details about how you heard about us."),
    BotField: z.string().max(0, "Bot detected!").optional(),
});

export const FRANCHISE_DEFAULT_VALUES = {
    FullName: "",
    Phone: "",
    Email: "",
    Address: "",
    InterestedArea: "",
    ReasonForInterest: "",
    ReferralSource: "",
    BotField: "",
};

export default FranchiseFormSchema;