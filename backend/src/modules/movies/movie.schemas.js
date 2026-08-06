import { z } from "zod";
import { paginationSchema } from "../../shared/schemas/pagination.schema.js";

export const searchMovieSchema = paginationSchema.extend({
    query: z.string().trim().min(1, "Search query is required"),
});

export const movieIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Movie ID must be a positive integer"),
});