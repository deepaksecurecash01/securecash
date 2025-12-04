import { z } from "zod";
import { CommonValidations, ValidationHelpers } from "./validationHelpers";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_DOCUMENT_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const createFileValidation = (fieldName, acceptedTypes = ACCEPTED_IMAGE_TYPES, isRequired = true) =>
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
            return acceptedTypes.includes(file.type);
        }, `Only ${acceptedTypes.includes('application/pdf') ? 'image files or PDF' : 'image files'} are allowed for ${fieldName.toLowerCase()}`);
};

const createDateValidation = (fieldName, allowFuture = false) =>
{
    return z
        .date({
            required_error: `${fieldName} is required`,
            invalid_type_error: `${fieldName} must be a valid date`,
        })
        .refine((date) =>
        {
            if (allowFuture) return true;
            return date <= new Date();
        }, `${fieldName} must be in the past or today`);
};

export const IcaFormSchema = z.object({
    Name: z
        .string()
        .min(2, "Full name is required")
        .max(100, "Full name must be less than 100 characters")
        .trim(),

    OrganisationType: z
        .string()
        .min(1, "Organization type is required")
        .refine((value) => value !== "" && value !== "default", "Please select an organization type"),

    ABN: z
        .string()
        .min(11, "ABN must be at least 11 digits")
        .max(14, "ABN format is invalid")
        .refine((value) =>
        {
            const digits = value.replace(/\s/g, '');
            return /^\d{11}$/.test(digits);
        }, "ABN must contain exactly 11 digits"),

    Phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number is too long")
        .refine((value) =>
        {
            const digits = value.replace(/[\s\-\(\)\+]/g, '');
            return /^\d{10,15}$/.test(digits);
        }, "Phone number must contain only digits and common formatting characters"),

    Email: CommonValidations.email("Email address"),

    Address: z
        .string()
        .min(10, "Physical address is required")
        .max(500, "Physical address must be less than 500 characters")
        .trim(),

    AddressPostal: z
        .string()
        .min(10, "Postal address is required")
        .max(500, "Postal address must be less than 500 characters")
        .trim(),

    DateCommencement: createDateValidation("Agreement commencement date", false),

    AcceptAgreement: z
        .array(z.string())
        .min(1, "You must accept the agreement terms to continue")
        .refine((value) => value.length > 0, "Agreement acceptance is required"),

    DateDeed: createDateValidation("Date of deed", false),

    NameConfirm: z
        .string()
        .min(2, "Name confirmation is required")
        .max(100, "Name confirmation must be less than 100 characters")
        .trim()
        .refine((value) => value.length > 0, "Full name confirmation is required"),

    AddressResidential: z
        .string()
        .min(10, "Residential address is required")
        .max(500, "Residential address must be less than 500 characters")
        .trim(),

    GovernmentID: createFileValidation("Government ID", ACCEPTED_DOCUMENT_TYPES, true),

    BusinessName: z
        .string()
        .min(2, "Business/company name is required")
        .max(200, "Business/company name must be less than 200 characters")
        .trim(),

    WitnessName: z
        .string()
        .min(2, "Witness name is required")
        .max(100, "Witness name must be less than 100 characters")
        .trim(),

    WitnessAddress: z
        .string()
        .min(10, "Witness address is required")
        .max(500, "Witness address must be less than 500 characters")
        .trim(),

    WitnessID: createFileValidation("Witness ID", ACCEPTED_IMAGE_TYPES, true),

    SecurityLicense: createFileValidation("Security license", ACCEPTED_DOCUMENT_TYPES, true),

    CITInsurance: createFileValidation("Cash in transit insurance", ACCEPTED_DOCUMENT_TYPES, true),

    eDocketsContractorCode: z
        .string()
        .min(1, "eDockets contractor code is required")
        .max(50, "eDockets contractor code is too long")
        .refine((value) => value.trim().length > 0, "eDockets contractor code cannot be empty"),
});

export const ICA_DEFAULT_VALUES = {
    Name: "",
    OrganisationType: "",
    ABN: "",
    Phone: "",
    Email: "",
    Address: "",
    AddressPostal: "",
    DateCommencement: null,
    AcceptAgreement: [],
    DateDeed: null,
    NameConfirm: "",
    AddressResidential: "",
    GovernmentID: null,
    BusinessName: "",
    WitnessName: "",
    WitnessAddress: "",
    WitnessID: null,
    SecurityLicense: null,
    CITInsurance: null,
    eDocketsContractorCode: "",
};

export const IcaValidationHelpers = {
    validateNameMatch: (name, nameConfirm) =>
    {
        if (!name || !nameConfirm) return true;
        return name.trim().toLowerCase() === nameConfirm.trim().toLowerCase();
    },

    formatABN: ValidationHelpers.abnFormat,

    isValidFileType: (file, acceptedTypes) =>
    {
        return file instanceof File && acceptedTypes.includes(file.type);
    }
};

export const IcaFormSchemaWithCrossValidation = IcaFormSchema.refine((data) =>
{
    return IcaValidationHelpers.validateNameMatch(data.Name, data.NameConfirm);
}, {
    message: "Name confirmation must match the full name",
    path: ["NameConfirm"],
});

export default IcaFormSchema;