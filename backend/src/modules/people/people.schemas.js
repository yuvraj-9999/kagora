import { z } from "zod";

export const searchPeopleSchema = z.object({
    query: z.string().trim().min(1, "Search query is required"),
});

export const peopleIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "Person ID must be a positive integer"),
});