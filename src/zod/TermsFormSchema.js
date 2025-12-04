import { z } from "zod";
import { CommonValidations } from "./validationHelpers";

const TermsFormSchema = z.object({
    Name: z
        .string()
        .min(1, "Full Name is required.")
        .regex(/^[A-Za-z\s\-']+$/, "Name must only contain letters, spaces, hyphens, and apostrophes.")
        .refine((name) => /^\S+\s+\S+/.test(name.trim()),
            "Name must include both first and last name.")
        .refine((name) => name.trim().length <= 100,
            "Name is too long (maximum 100 characters)."),

    Position: z
        .string()
        .min(1, "Position is required.")
        .min(2, "Position must be at least 2 characters long.")
        .max(100, "Position is too long (maximum 100 characters)."),

    Email: CommonValidations.email(),

    Birthdate: CommonValidations.birthdate(13, 150),

    Organisation: z
        .string()
        .min(1, "Organisation name is required.")
        .min(2, "Organisation name must be at least 2 characters long.")
        .max(200, "Organisation name is too long (maximum 200 characters).")
        .refine((org) => /[A-Za-z]/.test(org.trim()),
            "Organisation name must contain at least one letter."),

    ABN: CommonValidations.abn(),

    BotField: CommonValidations.botField(),
});

export const TERMS_DEFAULT_VALUES = {
    Name: "",
    Position: "",
    Email: "",
    Birthdate: null,
    Organisation: "",
    ABN: "",
    BotField: "",
};

export const createTermsSchemaWithMinAge = (minAge = 13) =>
{
    return TermsFormSchema.extend({
        Birthdate: CommonValidations.birthdate(minAge, 150)
    });
};

export default TermsFormSchema;