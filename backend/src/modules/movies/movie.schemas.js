import { z } from "zod";

export const searchMovieSchema = z.object({
    query: z.string().trim().min(1, "Search query is required"),
});

export const movieIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Movie ID must be a positive integer"),
});