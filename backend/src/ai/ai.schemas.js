import { z } from "zod";

export const aiRequestSchema = z.object({
    message: z.string().trim().min(1, "Message is required").max(500, "Message must be less than 500 characters"),

    conversationId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid conversation ID").optional(),
});