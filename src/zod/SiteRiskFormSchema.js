import { z } from "zod";

export const SiteRiskFormSchema = z.object({
    Amount: z.string().min(1, "Please select your average collection amount."),
    Parking: z.array(z.string()).optional(),
    Security: z.array(z.string()).optional(),
    External: z.array(z.string()).optional(),
    Internal: z.array(z.string()).optional(),
});