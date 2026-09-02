import { z } from "zod";

export const aiRequestSchema = z.object({
    message: z.string().trim().min(1, "Message is required").max(500, "Message must be less than 500 characters"),
});