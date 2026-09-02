import { tool } from "@langchain/core/tools";
import { z } from "zod";

import {
    getFavorites,
    getFavoriteStatus,
} from "../../modules/favorites/favorite.service.js";

export const getFavoritesAITool = tool(
    async (_, runtime) => {
        const favorites = await  getFavorites(runtime.context.userId);

        return {
            count: favorites.length,
            items: favorites,
        };
    },
    {
        name: "get_favorites",
        description:
            "Get all movies that are on the authenticated user's favorites list.",
        schema: z.object({}),
    }
);

export const getFavoriteStatusAITool = tool(
    async ({ tmdbId }, runtime) => {
        return getFavoriteStatus(runtime.context.userId, tmdbId);
    },
    {
        name: "get_favorite_status",
        description:
            "Check whether a specific movie is on the authenticated user's favorites list.",
        schema: z.object({
            tmdbId: z
                .string()
                .regex(/^\d+$/, "TMDB ID must be a positive integer"),
        }),
    }
);