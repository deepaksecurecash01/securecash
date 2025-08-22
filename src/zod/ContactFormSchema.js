// /schemas/contactFormSchema.js
import { z } from "zod";

// Reusable field validators
const validators = {
    // Basic text field with minimum length
    requiredText: (fieldName, minLength = 2) =>
        z.string()
            .min(1, `${fieldName} is required.`)
            .min(minLength, `${fieldName} must be at least ${minLength} characters long.`)
            .trim(),

    // Email field with proper validation
    email: () =>
        z.string()
            .min(1, "Email is required.")
            .email("Please enter a valid email address.")
            .trim()
            .toLowerCase(),

    // Phone number with international format support
    phone: () =>
        z.string()
            .min(1, "Phone number is required.")
            .regex(/^[0-9\s\-\+\(\)]+$/, "Please enter a valid phone number.")
            .min(8, "Phone number must be at least 8 digits."),

    // Department selection
    department: () =>
        z.string()
            .min(1, "Please select a department."),

    // Message/textarea field
    message: () =>
        z.string()
            .min(1, "Please tell us how we can help you.")
            .min(10, "Please provide more details about how we can help.")
            .trim(),

    // Optional callback checkbox
    callback: () =>
        z.string().optional(),

    // Optional callback date
    callbackDate: () =>
        z.any().optional(),

    // Optional callback time
    callbackTime: () =>
        z.string().optional(),

    // Optional callback state
    callbackState: () =>
        z.string().optional(),

    // Honeypot field
    honeypot: () =>
        z.string().max(0, "Bot detected!").optional(),
};

// Base schema without refinements
const BaseContactFormSchema = z.object({
    Department: validators.department(),
    FullName: validators.requiredText("Full name"),
    Organisation: validators.requiredText("Organisation name"),
    Phone: validators.phone(),
    Email: validators.email(),
    ChkCallBack: validators.callback(),
    CallbackDate: validators.callbackDate(),
    CallbackTime: validators.callbackTime(),
    CallbackState: validators.callbackState(),
    Message: validators.message(),
    BotField: validators.honeypot(),
});

// Helper function to check if callback is requested
const isCallbackRequested = (data) => data.ChkCallBack === 'Yes, please.';

// Callback validation refinements
const callbackRefinements = [
    // Main callback fields validation
    {
        condition: (data) =>
        {
            if (isCallbackRequested(data)) {
                return data.CallbackDate &&
                    data.CallbackTime &&
                    data.CallbackTime !== '' &&
                    data.CallbackState &&
                    data.CallbackState !== '';
            }
            return true;
        },
        message: "When requesting a callback, please select a date, time, and state.",
        path: ["CallbackDate"],
    },

    // Callback time specific validation
    {
        condition: (data) =>
        {
            if (isCallbackRequested(data) && (!data.CallbackTime || data.CallbackTime === '')) {
                return false;
            }
            return true;
        },
        message: "Please select a callback time.",
        path: ["CallbackTime"],
    },

    // Callback state specific validation
    {
        condition: (data) =>
        {
            if (isCallbackRequested(data) && (!data.CallbackState || data.CallbackState === '')) {
                return false;
            }
            return true;
        },
        message: "Please select your state.",
        path: ["CallbackState"],
    }
];

// Apply all refinements to create the final schema
const ContactFormSchema = callbackRefinements.reduce(
    (schema, { condition, message, path }) =>
        schema.refine(condition, { message, path }),
    BaseContactFormSchema
);

// Form field configurations
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

// Default form values
export const defaultValues = {
    Department: "",
    FullName: "",
    Organisation: "",
    Phone: "",
    Email: "",
    ChkCallBack: "",
    CallbackDate: "",
    CallbackTime: "",
    CallbackState: "",
    Message: "",
    BotField: "",
};

// Export the main schema and utilities
export default ContactFormSchema;

// Export validators for reuse in other forms
export { validators };