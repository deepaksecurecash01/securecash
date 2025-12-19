import { z } from "zod";
import { CommonValidations } from "./validationHelpers";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const createFileValidation = (fieldName, isRequired = true) =>
{
    const baseValidation = z.any();

    if (!isRequired) {
        return baseValidation.optional();
    }

    return baseValidation
        .refine((file) => file instanceof File && file.size > 0,
            `Please upload a ${fieldName.toLowerCase()} file`)
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= MAX_FILE_SIZE;
        }, `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`)
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, `Only image files (JPG, PNG) are allowed for ${fieldName.toLowerCase()}`);
};

export const InductionFormSchema = z.object({
    Name: CommonValidations.fullName(),
    Phone: CommonValidations.phone(10, 15),
    Email: CommonValidations.email("Email address"),
    Address: CommonValidations.address(10),

    Photo: createFileValidation("Personal Photo", true),
    DriversLicense: createFileValidation("Drivers License", true),

    AcceptAgreement: z
        .array(z.string())
        .min(1, "You must accept the confidentiality agreement to continue")
        .refine((value) => value.length > 0 && value.includes("accepted"),
            "Agreement acceptance is required"),

    State: CommonValidations.selectRequired("State"),
    ContractorName: z
        .string()
        .min(2, "Contractor name is required")
        .max(200, "Contractor name must be less than 200 characters")
        .trim(),

    // ✅ CHANGED: Removed async .refine() - handled manually in real-time
    EdocketUsername: z
        .string()
        .min(4, "Username must be at least 4 characters")
        .max(50, "Username must be less than 50 characters")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "Username can only contain letters, numbers, underscores, and hyphens"
        ),

    EdocketPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password must be less than 50 characters"),
});

export const INDUCTION_DEFAULT_VALUES = {
    Name: "",
    Phone: "",
    Email: "",
    Address: "",
    Photo: null,
    DriversLicense: null,
    AcceptAgreement: [],
    State: "",
    ContractorName: "",
    EdocketUsername: "",
    EdocketPassword: "",
};