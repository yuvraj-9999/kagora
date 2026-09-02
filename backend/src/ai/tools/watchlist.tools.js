import { tool } from "@langchain/core/tools";
import { z } from "zod";

import {
    getWatchlist,
    getWatchlistStatus,
} from "../../modules/watchlists/watchlist.service.js";

export const getWatchlistAITool = tool(
    async (_, runtime) => {
        const watchlist = await getWatchlist(runtime.context.userId);

        return {
            count: watchlist.length,
            items: watchlist,
        }
    },
    {
        name: "get_watchlist",
        description:
            "Get all movies that are on the authenticated user's watchlist.",
        schema: z.object({}),
    }
);

export const getWatchlistStatusAITool = tool(
    async ({ tmdbId }, runtime) => {
        return getWatchlistStatus(runtime.context.userId, tmdbId);
    },
    {
        name: "get_watchlist_status",
        description:
            "Check whether a specific movie is on the authenticated user's watchlist.",
        schema: z.object({
            tmdbId: z
                .string()
                .regex(/^\d+$/, "TMDB ID must be a positive integer"),
        }),
    }
);