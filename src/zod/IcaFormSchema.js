// /zod/IcaFormSchema.js - REFINED WITH CONSISTENT VALIDATION
import { z } from "zod";

// File validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ACCEPTED_DOCUMENT_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

// Reusable file validation schema
const createFileValidation = (fieldName, acceptedTypes = ACCEPTED_IMAGE_TYPES, isRequired = true) =>
{
    const baseValidation = z.any();

    if (!isRequired) {
        return baseValidation.optional();
    }

    return baseValidation
        .refine((file) =>
        {
            return file instanceof File && file.size > 0;
        }, `Please upload a ${fieldName.toLowerCase()} file`)
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

// Enhanced date validation
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
        }, {
            message: `${fieldName} must be in the past or today`,
        });
};

// Enhanced string validation
const createStringValidation = (fieldName, minLength = 1, maxLength = null) =>
{
    let validation = z.string()
        .min(minLength, `${fieldName} is required`)
        .trim();

    if (maxLength) {
        validation = validation.max(maxLength, `${fieldName} must be less than ${maxLength} characters`);
    }

    return validation;
};

export const IcaFormSchema = z.object({
    // Personal Details - Enhanced validation
    Name: createStringValidation("Full name", 2, 100),

    OrganisationType: z
        .string()
        .min(1, "Organization type is required")
        .refine((value) => value !== "" && value !== "default", "Please select an organization type"),

    ABN: z
        .string()
        .min(11, "ABN must be at least 11 digits")
        .max(14, "ABN format is invalid") // Includes spaces: "12 345 678 901"
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

    Email: z
        .string()
        .min(1, "Email address is required")
        .email("Invalid email address")
        .max(254, "Email address is too long"), // RFC 5321 limit

    Address: createStringValidation("Physical address", 10, 500),
    AddressPostal: createStringValidation("Postal address", 10, 500),

    // Agreement Term - Enhanced checkbox validation
    DateCommencement: createDateValidation("Agreement commencement date", false),

    AcceptAgreement: z
        .array(z.string())
        .min(1, "You must accept the agreement terms to continue")
        .refine((value) => value.length > 0, "Agreement acceptance is required"),

    // Deed of Guarantee - Enhanced validation
    DateDeed: createDateValidation("Date of deed", false),

    NameConfirm: createStringValidation("Name confirmation", 2, 100)
        .refine((value) =>
        {
            // You could add cross-field validation here to ensure it matches Name
            return value.length > 0;
        }, "Full name confirmation is required"),

    AddressResidential: createStringValidation("Residential address", 10, 500),

    // FIXED: Complete GovernmentID validation
    GovernmentID: createFileValidation("Government ID", ACCEPTED_DOCUMENT_TYPES, true),

    // Executed as Deed - Enhanced validation
    BusinessName: createStringValidation("Business/company name", 2, 200),
    WitnessName: createStringValidation("Witness name", 2, 100),
    WitnessAddress: createStringValidation("Witness address", 10, 500),

    WitnessID: createFileValidation("Witness ID", ACCEPTED_IMAGE_TYPES, true),

    // Licensing & Insurance - Consistent validation
    SecurityLicense: createFileValidation("Security license", ACCEPTED_DOCUMENT_TYPES, true),
    CITInsurance: createFileValidation("Cash in transit insurance", ACCEPTED_DOCUMENT_TYPES, true),

    // eDockets - Enhanced validation
    eDocketsContractorCode: z
        .string()
        .min(1, "eDockets contractor code is required")
        .max(50, "eDockets contractor code is too long")
        .refine((value) =>
        {
            // Add specific format validation if you know the expected format
            return value.trim().length > 0;
        }, "eDockets contractor code cannot be empty"),
});

// REFINED: Updated default values with proper types
export const ICA_DEFAULT_VALUES = {
    // Personal Details
    Name: "",
    OrganisationType: "",
    ABN: "",
    Phone: "",
    Email: "",
    Address: "",
    AddressPostal: "",

    // Agreement Term
    DateCommencement: null,
    AcceptAgreement: [], // Changed from false to empty array

    // Deed of Guarantee
    DateDeed: null,
    NameConfirm: "",
    AddressResidential: "",
    GovernmentID: null,

    // Executed as Deed
    BusinessName: "",
    WitnessName: "",
    WitnessAddress: "",
    WitnessID: null,

    // Licensing & Insurance
    SecurityLicense: null,
    CITInsurance: null,

    // eDockets
    eDocketsContractorCode: "",
};

// BONUS: Export validation helpers for reuse
export const ValidationHelpers = {
    // Cross-field validation helper
    validateNameMatch: (name, nameConfirm) =>
    {
        if (!name || !nameConfirm) return true; // Let individual field validation handle empty values
        return name.trim().toLowerCase() === nameConfirm.trim().toLowerCase();
    },

    // ABN helper
    formatABN: (abn) =>
    {
        const digits = abn.replace(/\D/g, '');
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
        if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
        return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
    },

    // File validation helper
    isValidFileType: (file, acceptedTypes) =>
    {
        return file instanceof File && acceptedTypes.includes(file.type);
    }
};

// OPTIONAL: Schema with cross-field validation
export const IcaFormSchemaWithCrossValidation = IcaFormSchema.refine((data) =>
{
    return ValidationHelpers.validateNameMatch(data.Name, data.NameConfirm);
}, {
    message: "Name confirmation must match the full name",
    path: ["NameConfirm"], // This will attach the error to the NameConfirm field
});