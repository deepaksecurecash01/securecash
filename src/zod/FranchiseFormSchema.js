import { z } from "zod";

export const FranchiseFormSchema = z.object({
    FullName: z
        .string()
        .nonempty("Full Name is required.")
        .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
        .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
    Phone: z
        .string()
        .nonempty("Phone Number is required.")
        .regex(/^\d+$/, "Phone Number must contain only digits."),
    Email: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address."),
    Address: z
        .string()
        .nonempty("Please enter your address."),
    InterestedArea: z
        .string()
        .nonempty("Please specify what territory/area/suburb you are interested in."),
    ReasonForInterest: z
        .string()
        .nonempty("Please briefly tell us why you're interested in a SecureCash franchise.")
        .max(500, "Please keep your response under 500 characters."),
    ReferralSource: z.string().nonempty("Please let us know how you heard about this opportunity."),
});