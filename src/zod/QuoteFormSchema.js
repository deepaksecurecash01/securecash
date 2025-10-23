// /zod/QuoteFormSchemas.js
import { z } from "zod";

/**
 * Quote Form Schemas - Multi-Step Validation
 * Clean declarative schemas for each step of the quote process
 */

// Step 1: Quote Information Schema
const QuoteFormSchema = z.object({
  Name: z
    .string()
    .min(1, "Full Name is required.")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
    .regex(/^\S+\s\S+$/, "Name must include both first and last name."),

  Organisation: z
    .string()
    .min(1, "Please enter your organisation's name."),

  Phone: z
    .string()
    .min(1, "Phone Number is required.")
    .regex(/^\d+$/, "Phone Number must contain only digits."),

  Referrer: z
    .string()
    .min(1, "Please enter where you heard about us."),

  Email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  Address: z
    .string()
    .min(1, "Please enter your postal address."),

  Locations: z
    .string()
    .min(1, "Please enter locations for the service."),

  Service: z
    .array(z.enum(["Banking", "Change"]))
    .min(1, "Please select at least one service."),

  // Optional fields that may be present from other steps
  BankingFrequency: z.string().optional(),
  BankingAmount: z.string().optional(),
  BankingBank: z.string().optional(),
  BankingDays: z.array(z.string()).optional(),
  BankingComments: z.string().optional(),
  ChangeFrequency: z.string().optional(),
  ChangeNotesAmount: z.string().optional(),
  ChangeCoinsAmount: z.string().optional(),
  ChangeDays: z.array(z.string()).optional(),
  ChangeComments: z.string().optional(),
});

// Step 2: Banking Services Schema
const BankingSchema = z.object({
  BankingFrequency: z.enum(
    ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"],
    {
      errorMap: () => ({ message: "Please select a collection frequency." }),
    }
  ),

  BankingAmount: z.enum(
    [
      "$0 - $1000",
      "$1000 - $5000",
      "$5000 - $20,000",
      "$20,000 - $50,000",
      "over $50,000",
    ],
    {
      errorMap: () => ({
        message: "Please select an average collection amount.",
      }),
    }
  ),

  BankingBank: z
    .string()
    .min(1, "Please enter who you bank with."),

  BankingDays: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Ad Hoc",
        "Banking",
      ])
    )
    .min(1, "Please select at least one day for collection."),

  BankingComments: z.string().optional(),

  // Include all other fields as optional for step validation
  Name: z.string().optional(),
  Organisation: z.string().optional(),
  Phone: z.string().optional(),
  Referrer: z.string().optional(),
  Email: z.string().optional(),
  Address: z.string().optional(),
  Locations: z.string().optional(),
  Service: z.array(z.string()).optional(),
  ChangeFrequency: z.string().optional(),
  ChangeNotesAmount: z.string().optional(),
  ChangeCoinsAmount: z.string().optional(),
  ChangeDays: z.array(z.string()).optional(),
  ChangeComments: z.string().optional(),
});

// Step 3: Change Services Schema
const ChangeSchema = z.object({
  ChangeFrequency: z.enum(
    ["Weekly", "Fortnightly", "Ad Hoc", "Special Event (once off)"],
    {
      errorMap: () => ({ message: "Please select a frequency for change." }),
    }
  ),

  ChangeNotesAmount: z.enum(
    [
      "$0 - $1000",
      "$1000 - $5000",
      "$5000 - $20,000",
      "$20,000 - $50,000",
      "over $50,000",
    ],
    {
      errorMap: () => ({
        message: "Please select an average notes value.",
      }),
    }
  ),

  ChangeCoinsAmount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount for coins.")
    .min(1, "Please enter the average coins value."),

  ChangeDays: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Ad Hoc",
        "Banking",
      ])
    )
    .min(1, "Please select at least one usual day for delivery."),

  ChangeComments: z.string().optional(),

  // Include all other fields as optional for step validation  
  Name: z.string().optional(),
  Organisation: z.string().optional(),
  Phone: z.string().optional(),
  Referrer: z.string().optional(),
  Email: z.string().optional(),
  Address: z.string().optional(),
  Locations: z.string().optional(),
  Service: z.array(z.string()).optional(),
  BankingFrequency: z.string().optional(),
  BankingAmount: z.string().optional(),
  BankingBank: z.string().optional(),
  BankingDays: z.array(z.string()).optional(),
  BankingComments: z.string().optional(),
});

// Export schemas object for multi-step form manager
export const QUOTE_SCHEMAS = {
  quote: QuoteFormSchema,
  banking: BankingSchema,
  change: ChangeSchema,
};

// Default values for all steps
export const QUOTE_DEFAULT_VALUES = {
  Name: "",
  Organisation: "",
  Phone: "",
  Referrer: "",
  Email: "",
  Address: "",
  Locations: "",
  Service: [],
  BankingFrequency: "",
  BankingAmount: "",
  BankingBank: "",
  BankingDays: [],
  BankingComments: "",
  ChangeFrequency: "",
  ChangeNotesAmount: "",
  ChangeCoinsAmount: "",
  ChangeDays: [],
  ChangeComments: "",
  BotField: "",
};

// Individual schema exports (for backwards compatibility)
export { QuoteFormSchema, BankingSchema, ChangeSchema };