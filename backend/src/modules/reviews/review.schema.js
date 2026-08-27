import { z } from "zod";

export const reviewBodySchema = z.object({
    rating: z.coerce.number().min(1).max(10),

    review: z.string()
        .trim()
        .min(1, "Review is required"),
});

export const reviewIdSchema = z.object({
    reviewId: z.string().regex(
        /^[a-f\d]{24}$/i,
        "Invalid review ID"
    ),
});