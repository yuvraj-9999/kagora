import { z } from "zod";
import { paginationSchema } from "../../shared/schemas/pagination.schema.js";

export const searchPeopleSchema = paginationSchema.extend({
    query: z.string().trim().min(1, "Search query is required"),
});

export const peopleIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Person ID must be a positive integer"),
});