import { z } from "zod";

export const QuoteFormSchema = z.object({
  Name: z
    .string()
    .nonempty("Full Name is required.")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces.")
    .regex(/^\S+\s\S+$/, "Name must include both first and last name."),
  Organisation: z.string().nonempty("Please enter your organisation's name."),
  Phone: z
    .string()
    .nonempty("Phone Number is required.")
    .regex(/^\d+$/, "Phone Number must contain only digits."),
  Referrer: z.string().nonempty("Please enter where you heard about us."),
  Email: z
    .string()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),
  Address: z.string().nonempty("Please enter your postal address."),
  Locations: z.string().nonempty("Please enter locations for the service."),
  Service: z
    .array(z.enum(["Banking", "Change"]))
    .min(1, "Please select at least one service."),
});
