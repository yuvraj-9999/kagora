import { tmdbClient } from "../../integrations/tmdb/index.js";
import { mapMovieDetails, mapMovieSearch, mapMovieList } from "./movie.mapper.js";
import { getOrSetCache } from "../../shared/cache/cache.js";
import { movieSearchKey, movieDetailsKey, trendingMoviesKey, popularMoviesKey, recommendationsKey } from "../../integrations/redis/redis.keys.js";

export const searchMovies = async (query, page) => {
    const key = movieSearchKey(query, page);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get("/search/movie", {
                params: {
                    query,
                    page,
                },
            });

            return mapMovieSearch(response.data);
        },
        3600
    );
};

export const getMovieDetails = async (id) => {

    const key = movieDetailsKey(id);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get(`/movie/${id}`, {
                params: {
                    append_to_response: "credits",
                },
            });

            return mapMovieDetails(response.data);
        },
        86400,
    )
};

export const getTrendingMovies = async (page) => {
    const key = trendingMoviesKey(page);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get("/trending/movie/day", {
        params: {
            page,
        },
    });

    return mapMovieList(response.data);
        },
        3600,
    )
};

export const getPopularMovies = async (page) => {
    const key = popularMoviesKey(page);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get("/movie/popular", {
        params: {
            page,
        },

    });
    return mapMovieList(response.data);
        },
        21600,
    )
};

export const getMovieRecommendations = async (id, page) => {
    const key = recommendationsKey(id, page);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get(`/movie/${id}/recommendations`, {
        params: {
            page,
        },
    });

    return mapMovieList(response.data);
        },
        86400,
    )
};