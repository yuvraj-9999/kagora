import { searchMoviesAITool, getMovieDetailsAITool, getTrendingMoviesAITool, getPopularMoviesAITool, getMovieRecommendationsAITool } from "./movie.tools.js";
import { searchPeopleAITool, getPersonDetailsAITool, getPersonCreditsAITool } from "./people.tools.js";
import { getFavoritesAITool, getFavoriteStatusAITool } from "./favorite.tools.js";
import { getWatchlistAITool, getWatchlistStatusAITool } from "./watchlist.tools.js";
import { getMovieReviewsAITool, getMyReviewsAITool } from "./review.tools.js";

export const aiTools = [

    searchMoviesAITool,
    getMovieDetailsAITool,
    getTrendingMoviesAITool,
    getPopularMoviesAITool,
    getMovieRecommendationsAITool,

    searchPeopleAITool,
    getPersonDetailsAITool,
    getPersonCreditsAITool,

    getFavoritesAITool,
    getFavoriteStatusAITool,

    getWatchlistAITool,
    getWatchlistStatusAITool,

    getMovieReviewsAITool,
    getMyReviewsAITool,
    
];