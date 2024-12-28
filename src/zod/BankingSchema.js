import { z } from "zod";

// Zod schema for the Banking form
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
  BankingBank: z.string().nonempty("Please enter who you bank with."),
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
});

export default BankingSchema;
