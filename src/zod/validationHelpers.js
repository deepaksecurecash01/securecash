import { z } from "zod";

export const ValidationHelpers = {
    abnFormat: (abn) =>
    {
        const digits = abn.replace(/\D/g, '');
        if (digits.length <= 2) return digits;
        if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
        if (digits.length <= 8) return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
        return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 11)}`;
    },

    cleanABN: (abn) => abn.replace(/\s/g, ''),

    cleanPhone: (phone) => phone.replace(/[^0-9]/g, ''),

    isValidDomain: (url, validTlds) =>
    {
        return validTlds.some(tld => url.toLowerCase().includes(tld));
    },

    isPastDate: (date) => date <= new Date(),

    isMinAge: (date, minAge) =>
    {
        const minAgeDate = new Date();
        minAgeDate.setFullYear(minAgeDate.getFullYear() - minAge);
        return date <= minAgeDate;
    },

    isValidDateRange: (date, minYears, maxYears) =>
    {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - maxYears);
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - minYears);
        return date >= minDate && date <= maxDate;
    }
};

export const CommonValidations = {
    abn: () => z
        .string()
        .min(1, "ABN number is required.")
        .regex(/^[0-9\s]+$/, "ABN must contain only digits and spaces.")
        .refine((abn) =>
        {
            const cleanABN = abn.replace(/\s/g, '');
            return cleanABN.length === 11;
        }, "ABN must be exactly 11 digits."),

    email: (fieldName = "Email") => z
        .string()
        .min(1, `${fieldName} is required.`)
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) => !email.includes('..'),
            "Email address format is invalid (consecutive dots not allowed)."),

    businessEmail: (fieldName = "Organisation email") => z
        .string()
        .min(1, `${fieldName} is required.`)
        .email("Please enter a valid email address.")
        .max(254, "Email address is too long.")
        .refine((email) =>
        {
            const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
            const domain = email.toLowerCase().split('@')[1];
            return !personalDomains.includes(domain);
        }, "Please use a business email address rather than personal email.")
        .refine((email) => !email.includes('..'),
            "Email address format is invalid (consecutive dots not allowed)."),

    phone: (minDigits = 8, maxDigits = 15) => z
        .string()
        .min(1, "Phone number is required.")
        .min(minDigits, `Phone number must be at least ${minDigits} digits.`)
        .max(20, "Phone number is too long.")
        .refine((phone) =>
        {
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            return cleanPhone.length >= minDigits && cleanPhone.length <= maxDigits;
        }, `Phone number must be between ${minDigits}-${maxDigits} digits.`),

    fullName: () => z
        .string()
        .min(1, "Full name is required.")
        .min(2, "Full name must be at least 2 characters long.")
        .max(100, "Full name is too long (maximum 100 characters).")
        .refine((name) =>
        {
            const trimmed = name.trim();
            const words = trimmed.split(/\s+/).filter(word => word.length > 0);
            return /[A-Za-z]/.test(trimmed) && words.length >= 2;
        }, "Please enter your full name (first and last name).")
        .refine((name) =>
        {
            const trimmed = name.trim();
            const invalidNames = ['test test', 'john doe', 'jane doe', 'example name'];
            return !invalidNames.includes(trimmed.toLowerCase());
        }, "Please enter a valid full name."),

    address: (minLength = 5) => z
        .string()
        .min(1, "Address is required.")
        .min(minLength, `Address must be at least ${minLength} characters long.`)
        .max(500, "Address is too long (maximum 500 characters).")
        .refine((address) =>
        {
            const trimmed = address.trim();
            return /[A-Za-z]/.test(trimmed) && (/[0-9]/.test(trimmed) || /street|road|avenue|lane|drive|place|court|way/i.test(trimmed));
        }, "Please enter a valid address with street details.")
        .refine((address) =>
        {
            const trimmed = address.trim();
            const words = trimmed.split(/\s+/);
            return words.length >= 2;
        }, "Please enter a complete address."),

    australianState: () => z
        .string()
        .min(1, "Please select a state or territory.")
        .refine((state) =>
        {
            const validStates = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT", "NZ"];
            return validStates.includes(state);
        }, "Please select a valid state or territory."),

    birthdate: (minAge = 13, maxAge = 150) => z
        .date({
            required_error: "Date of Birth is required",
            invalid_type_error: "Date of Birth is required",
        })
        .refine((date) => date <= new Date(), "Date of Birth must be in the past or today")
        .refine((date) => ValidationHelpers.isMinAge(date, minAge), `You must be at least ${minAge} years old`)
        .refine((date) => ValidationHelpers.isValidDateRange(date, minAge, maxAge), "Please enter a valid birth date"),

    botField: () => z.string().max(0, "Bot detected!"),

    selectRequired: (fieldName = "This field") => z
        .string()
        .min(1, `${fieldName} is required.`)
        .refine((value) => value !== "" && value !== "select" && value !== "default",
            `Please select ${fieldName.toLowerCase()}.`)
};