// /zod/IcaFormSchema.js - UPDATED WITH PROPER DEFAULT VALUES
import { z } from "zod";

export const IcaFormSchema = z.object({
    // Personal Details fields
    Name: z.string().min(1, "Full name is required"),
    OrganisationType: z
        .string()
        .min(1, "Organization type is required")
        .refine((value) => value !== "", "Please select an organization type"),
    ABN: z.string().min(11, "ABN number must be at least 11 digits"),
    Phone: z.string().min(10, "Phone number must be at least 10 digits"),
    Email: z.string().email("Invalid email address"),
    Address: z.string().min(1, "Physical address is required"),
    AddressPostal: z.string().min(1, "Postal address is required"),

    // Agreement Term fields
    DateCommencement: z
        .date({
            required_error: "Agreement commencement date is required",
            invalid_type_error: "Agreement commencement date is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Agreement commencement date must be in the past or today",
        }),
    AcceptAgreement: z
        .array(z.string()),
     

    // Deed of Guarantee fields
    DateDeed: z
        .date({
            required_error: "Date of deed is required",
            invalid_type_error: "Date of deed is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Date of deed must be in the past or today",
        }),

    NameConfirm: z.string().min(1, "Full name confirmation is required"),
    AddressResidential: z.string().min(1, "Residential address is required"),

    // File fields - Made optional initially and validated conditionally
    GovernmentID: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a government ID file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/");
        }, "Only image files are allowed for government ID"),

    // Executed as Deed fields
    BusinessName: z.string().min(1, "Business/company name is required"),
    WitnessName: z.string().min(1, "Witness name is required"),
    WitnessAddress: z.string().min(1, "Witness address is required"),

    WitnessID: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a witness ID file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/");
        }, "Only image files are allowed for witness ID"),

    // Licensing & Insurance fields
    SecurityLicense: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a security license file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/") || file.type === "application/pdf";
        }, "Only image files or PDF are allowed for security license"),

    CITInsurance: z
        .any()
        .optional()
        .refine((file) =>
        {
            if (!file) return false;
            if (!(file instanceof File)) return false;
            return file.size > 0;
        }, "Please upload a cash in transit insurance file")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.size <= 10 * 1024 * 1024;
        }, "File size must be less than 10MB")
        .refine((file) =>
        {
            if (!file || !(file instanceof File)) return true;
            return file.type.startsWith("image/") || file.type === "application/pdf";
        }, "Only image files or PDF are allowed for insurance document"),

    // eDockets field
    eDocketsContractorCode: z.string().min(1, "eDockets contractor code is required"),
});

// Updated default values to match schema
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
    AcceptAgreement: false,

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

