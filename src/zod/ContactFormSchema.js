// /zod/ContactFormSchema.js
import { z } from "zod";

const ContactFormSchema = z.object({
    Department: z
        .string()
        .min(1, "Please select a department."),

    FullName: z
        .string()
        .min(1, "Full name is required.")
        .min(2, "Full name must be at least 2 characters long."),

    Organisation: z
        .string()
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long."),

    Phone: z
        .string()
        .min(1, "Phone number is required.")
        .min(8, "Phone number must be at least 8 digits."),

    Email: z
        .string()
        .min(1, "Email address is required.")
        .email("Please enter a valid email address."),

    ChkCallBack: z
        .array(z.string())
        .optional()
        .default([]),

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
        .min(1, "Please let us know how we can help.")
        .min(10, "Please provide more detail (minimum 10 characters)."),

    BotField: z
        .string()
        .max(0, "Bot detected!")
}).superRefine((data, ctx) =>
{
    // If callback is requested, validate callback fields
    const callbackRequested = data.ChkCallBack && data.ChkCallBack.length > 0;

    if (callbackRequested) {
        if (!data.CallbackDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["CallbackDate"],
                message: "Please select a callback date."
            });
        }

        if (!data.CallbackTime || data.CallbackTime === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["CallbackTime"],
                message: "Please select a callback time."
            });
        }

        if (!data.CallbackState || data.CallbackState === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["CallbackState"],
                message: "Please select your state."
            });
        }

        // Validate date is in future
        if (data.CallbackDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(data.CallbackDate);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["CallbackDate"],
                    message: "Please select a future date for your callback."
                });
            }
        }
    }
});

// Default values for the form
export const CONTACT_DEFAULT_VALUES = {
    Department: "",
    FullName: "",
    Organisation: "",
    Phone: "",
    Email: "",
    ChkCallBack: [],
    CallbackDate: null,
    CallbackTime: "",
    CallbackState: "",
    Message: "",
    BotField: "",
};

export const formConfig = {
    departments: [
        { value: "", label: "Please select a department..." },
        { value: "customers", label: "Customer Service" },
        { value: "sales", label: "Sales" },
        { value: "operations", label: "Operations" },
    ],

    callBackTimes: [
        { value: "", label: "Please Select" },
        { value: "9:30am", label: "9:30am" },
        { value: "10:00am", label: "10:00am" },
        { value: "10:30am", label: "10:30am" },
        { value: "11:00am", label: "11:00am" },
        { value: "11:30am", label: "11:30am" },
        { value: "12:00pm", label: "12:00pm" },
        { value: "12:30pm", label: "12:30pm" },
        { value: "1:00pm", label: "1:00pm" },
        { value: "1:30pm", label: "1:30pm" },
        { value: "2:00pm", label: "2:00pm" },
        { value: "2:30pm", label: "2:30pm" },
        { value: "3:00pm", label: "3:00pm" },
        { value: "3:30pm", label: "3:30pm" },
        { value: "4:00pm", label: "4:00pm" },
        { value: "4:30pm", label: "4:30pm" },
        { value: "5:00pm", label: "5:00pm" },
        { value: "5:30pm", label: "5:30pm" },
        { value: "6:00pm", label: "6:00pm" },
        { value: "6:30pm", label: "6:30pm" },
        { value: "7:00pm", label: "7:00pm" },
    ],

    states: [
        { value: "", label: "Please Select" },
        { value: "NSW", label: "NSW" },
        { value: "VIC", label: "VIC" },
        { value: "QLD", label: "QLD" },
        { value: "WA", label: "WA" },
        { value: "SA", label: "SA" },
        { value: "TAS", label: "TAS" },
        { value: "ACT", label: "ACT" },
        { value: "NT", label: "NT" },
        { value: "NZ", label: "NZ" },
    ],
};

export const CONTACT_FIELD_PRIORITY = [
    'Department',
    'FullName',
    'Organisation',
    'Phone',
    'Email',
    'ChkCallBack',
    'CallbackDate',
    'CallbackTime',
    'CallbackState',
    'Message'
];

// Create base schema for partial validation
const BaseSchema = z.object({
    Department: z.string().optional(),
    FullName: z.string().optional(),
    Organisation: z.string().optional(),
    Phone: z.string().optional(),
    Email: z.string().optional(),
    ChkCallBack: z.array(z.string()).optional(),
    CallbackDate: z.date().optional().nullable(),
    CallbackTime: z.string().optional(),
    CallbackState: z.string().optional(),
    Message: z.string().optional(),
    BotField: z.string().optional(),
});

export const ContactPartialSchema = BaseSchema;

export default ContactFormSchema;