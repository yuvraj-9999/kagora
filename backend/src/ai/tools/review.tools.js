import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getMovieReviews, getReviewsByUser } from "../../modules/reviews/review.service.js";

export const getMovieReviewsAITool = tool(
    async ({ tmdbId }) => {
    const reviews = await getMovieReviews(tmdbId);

    return {
        count: reviews.length,
        items: reviews,
    }
},
{
    name: "get_movie_reviews",
    description: "Get all reviews for a movie using its TMDB ID.",
    schema: z.object({
        tmdbId: z.string().regex(/^\d+$/, "TMDB ID must be a positive integer"),
    }),
}
);

export const getMyReviewsAITool = tool(
    async (_, runtime) => {
        const myReviews = await getReviewsByUser(runtime.context.userId);

        return {
            count: myReviews.length,
            items: myReviews,
        };
    },
    {
        name: "get_my_reviews",
        description:
            "Get all reviews written by the currently authenticated user.",
        schema: z.object({}),
    }
);