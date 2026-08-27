import { z } from "zod";

export const tmdbIdSchema = z.object({
    tmdbId: z.string().regex(
        /^\d+$/,
        "TMDB ID must be a positive integer"
    ),
});