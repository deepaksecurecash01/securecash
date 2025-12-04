import { z } from "zod";
import { CommonValidations } from "./validationHelpers";

const FranchiseFormSchema = z.object({
    FullName: CommonValidations.fullName(),

    Phone: CommonValidations.phone(8, 15),

    Email: CommonValidations.email("Email address"),

    Address: CommonValidations.address(5),

    InterestedArea: z
        .string()
        .min(1, "Territory/Area/Suburb of interest is required.")
        .min(2, "Please specify the area of interest (minimum 2 characters).")
        .max(100, "Area of interest is too long (maximum 100 characters).")
        .refine((area) => /[A-Za-z]/.test(area.trim()),
            "Please enter a valid territory, area, or suburb name.")
        .refine((area) =>
        {
            const genericTerms = ['area', 'suburb', 'territory', 'location', 'place'];
            return !genericTerms.includes(area.trim().toLowerCase());
        }, "Please specify the actual area/suburb you're interested in."),

    ReasonForInterest: z
        .string()
        .min(1, "Please explain your interest in a SecureCash franchise.")
        .min(10, "Please provide more detail about your interest (minimum 10 characters).")
        .max(1000, "Response is too long (maximum 1000 characters)."),

    ReferralSource: z
        .string()
        .min(1, "Please tell us where you heard about this opportunity.")
        .refine((value) => value !== "", "Please select where you heard about us."),

    ReferralSourceOther: z.string().optional(),

    BotField: CommonValidations.botField(),
})
    .refine((data) =>
    {
        if (data.ReferralSource === "Other") {
            return data.ReferralSourceOther && data.ReferralSourceOther.trim().length > 0;
        }
        return true;
    }, {
        message: "Please specify where you heard about us.",
        path: ["ReferralSourceOther"],
    });

export const FRANCHISE_DEFAULT_VALUES = {
    FullName: "",
    Phone: "",
    Email: "",
    Address: "",
    InterestedArea: "",
    ReasonForInterest: "",
    ReferralSource: "",
    ReferralSourceOther: "",
    BotField: "",
};

export const FRANCHISE_FIELD_PRIORITY = [
    'FullName',
    'Phone',
    'Email',
    'Address',
    'InterestedArea',
    'ReasonForInterest',
    'ReferralSource',
    'ReferralSourceOther'
];

export const createFranchiseSchemaForRegion = (region = 'AU') =>
{
    if (region === 'US') {
        return FranchiseFormSchema.extend({
            Phone: z
                .string()
                .min(1, "Phone number is required.")
                .regex(/^[\d\s\-\(\)\+]+$/, "Phone number contains invalid characters.")
                .refine((phone) =>
                {
                    const cleanPhone = phone.replace(/[^0-9]/g, '');
                    return cleanPhone.length === 10;
                }, "Please enter a valid 10-digit US phone number."),
        });
    }
    return FranchiseFormSchema;
};

export const FranchisePartialSchema = z.object({
    FullName: z.string().optional(),
    Phone: z.string().optional(),
    Email: z.string().optional(),
    Address: z.string().optional(),
    InterestedArea: z.string().optional(),
    ReasonForInterest: z.string().optional(),
    ReferralSource: z.string().optional(),
    ReferralSourceOther: z.string().optional(),
    BotField: z.string().optional(),
});

export default FranchiseFormSchema;