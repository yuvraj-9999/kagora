import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { searchPeople, getPersonDetails, getPersonCredits } from "../../modules/people/people.service.js";

export const searchPeopleAITool = tool(
    async ({ query, page }) => {
    return searchPeople(query, page);
},
{
    name: "search_people",
    description: "Search for people by name or keyword.",
    schema: z.object({
        query: z.string().min(1),
        page: z.number().int().positive().default(1),
    }),
}
)

export const getPersonDetailsAITool = tool(
    async ({ tmdbId }) => {
    return getPersonDetails(tmdbId);
},
{
    name: "get_person_details",
    description: "Get detailed information about a person using their TMDB ID.",
    schema: z.object({
        tmdbId: z.string().regex(/^\d+$/, "TMDB ID must be a positive integer"),
    }),
}
)

export const getPersonCreditsAITool = tool(
    async ({ tmdbId }) => {
    return getPersonCredits(tmdbId);
},
{
    name: "get_person_credits",
    description: "Get the movie and TV credits associated with a person using their TMDB ID.",
    schema: z.object({
        tmdbId: z.string().regex(/^\d+$/, "TMDB ID must be a positive integer"),
    }),
}
);