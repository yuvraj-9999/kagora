import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { searchMovies, getMovieDetails, getTrendingMovies, getPopularMovies, getMovieRecommendations } from "../../modules/movies/movie.service.js"

//langchain tools

export const searchMoviesAITool = tool(
    async ({ query, page }) => {
        return searchMovies(query, page);
    },
    {
        name: "search_movies",
        description: "Search for movies using a natural language movie title or keyword.",
        schema: z.object({
            query: z.string().min(1),
            page: z.number().int().positive().default(1),
        }),
    }
);

export const getMovieDetailsAITool = tool(
    async ({ tmdbId }) => {
        return getMovieDetails(tmdbId);
    },
    {
        name: "get_movie_details",
        description: "Get detailed information about a movie using its TMDB ID.",
        schema: z.object({
            tmdbId: z.string().regex(/^\d+$/, "TMDB ID must be a positive integer"),
        }),
    }
);

export const getTrendingMoviesAITool = tool(
    async ({ page }) => {
        return getTrendingMovies(page);
    },
    {
        name: "get_trending_movies",
        description: "Get the currently trending movies.",
        schema: z.object({
            page: z.number().int().positive().default(1),
        }),
    }
);

export const getPopularMoviesAITool = tool(
    async ({ page }) => {
        return getPopularMovies(page);
    },
    {
        name: "get_popular_movies",
        description: "Get the currently popular movies",
        schema: z.object({
            page: z.number().int().positive().default(1),
        }),
    }
)

export const getMovieRecommendationsAITool = tool(
    async ({ tmdbId, page }) => {
        return getMovieRecommendations(tmdbId, page);
    },
    {
        name: "get_movie_recommendations",
        description: "Get movie recommendations based on a movie's TMDB ID",
        schema: z.object({
            tmdbId: z.string().regex(/^\d+$/, "TMDB ID must be a positive integer"),
            page: z.number().int().positive().default(1),
        }),
    }
);



