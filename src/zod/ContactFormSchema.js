import { z } from "zod";

export const FranchiseFormSchema = z.object({
    Department: z
        .string()
        .nonempty("Please select a department."),

    FullName: z
        .string()
        .nonempty("Full Name is required.")
        .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
        .regex(/^\S+\s\S+$/, "Name must include both first and last name."),

    Organisation: z
        .string()
        .nonempty("Organisation name is required."),

    Phone: z
        .string()
        .nonempty("Phone Number is required.")
        .regex(/^\d+$/, "Phone Number must contain only digits."),

    Email: z
        .string()
        .nonempty("Email is required.")
        .email("Please enter a valid email address."),

    BankingDays: z
        .boolean()
        .optional(),

    CallbackDate: z
        .date()
        .optional()
        .nullable(),

    CallbackTime: z
        .string()
        .optional(),

    CallbackState: z
        .string()
        .optional(),

    Message: z
        .string()
        .nonempty("Please let us know how we can help you.")
        .max(500, "Please keep your message under 500 characters.")
}).superRefine((data, ctx) =>
{
    // If callback is requested, validate callback fields
    if (data.BankingDays) {
        if (!data.CallbackDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a callback date.",
                path: ["CallbackDate"]
            });
        }

        if (!data.CallbackTime || data.CallbackTime === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a callback time.",
                path: ["CallbackTime"]
            });
        }

        if (!data.CallbackState || data.CallbackState === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select your state.",
                path: ["CallbackState"]
            });
        }
    }
});