import { z } from "zod";

const ChangeSchema = z.object({
  ChangeFrequency: z.enum(["Weekly", "Fortnightly", "Monthly", "Ad Hoc"], {
    errorMap: () => ({ message: "Please select a frequency for change." }),
  }),
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
    .nonempty("Please enter the average coins value."),
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
});

export default ChangeSchema;
