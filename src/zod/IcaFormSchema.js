import { z } from "zod";

export const IcaFormSchema = z.object({
    // Personal Details fields - Fixed to match HTML form names
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

    // Agreement Term fields - Fixed to match HTML form names
    DateCommencement: z
        .date({
            required_error: "Agreement commencement date is required",
            invalid_type_error: "Agreement commencement date is required",
        })
        .refine((date) => date <= new Date(), {
            message: "Agreement commencement date must be in the past or today",
        }),

    AcceptAgreement: z
        .boolean()
        .refine((val) => val === true, "You must accept the agreement terms to proceed"),

    // Deed of Guarantee fields - Fixed to match HTML form names
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

    GovernmentID: z
        .instanceof(File, "Government ID file is required")
        .refine((file) => file.size > 0, "Please upload a government ID file")
        .refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
        .refine(
            (file) => file.type.startsWith("image/"),
            "Only image files are allowed for government ID"
        ),

    // Executed as Deed fields - Fixed to match HTML form names
    BusinessName: z.string().min(1, "Business/company name is required"),
    WitnessName: z.string().min(1, "Witness name is required"),
    WitnessAddress: z.string().min(1, "Witness address is required"),

    WitnessID: z
        .instanceof(File, "Witness ID file is required")
        .refine((file) => file.size > 0, "Please upload a witness ID file")
        .refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
        .refine(
            (file) => file.type.startsWith("image/"),
            "Only image files are allowed for witness ID"
        ),

    // Licensing & Insurance fields - Fixed to match HTML form names
    SecurityLicense: z
        .instanceof(File, "Security/Masters License file is required")
        .refine((file) => file.size > 0, "Please upload a security license file")
        .refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
        .refine(
            (file) => file.type.startsWith("image/") || file.type === "application/pdf",
            "Only image files or PDF are allowed for security license"
        ),

    CITInsurance: z
        .instanceof(File, "Cash in transit insurance file is required")
        .refine((file) => file.size > 0, "Please upload a cash in transit insurance file")
        .refine((file) => file.size <= 10 * 1024 * 1024, "File size must be less than 10MB")
        .refine(
            (file) => file.type.startsWith("image/") || file.type === "application/pdf",
            "Only image files or PDF are allowed for insurance document"
    ),
    eDocketsContractorCode: z.string().min(1, "eDockets contractor code is required"),

});

