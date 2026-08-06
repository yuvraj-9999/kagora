import { response } from "express";
import { tmdbClient } from "../../integrations/tmdb/index.js";
import { mapMovieDetails, mapMovieSearch, mapMovieList } from "./movie.mapper.js";

export const searchMovies = async(query, page) => {
    const response = await tmdbClient.get("/search/movie", {
        params: {
            query,
            page,
        },
    });
    
    return mapMovieSearch(response.data);
};

export const getMovieDetails = async(id) => {
    const response = await tmdbClient.get(`/movie/${id}`,{
        params: {
            append_to_response: "credits",
        },
    });

    return mapMovieDetails(response.data);
};

export const getTrendingMovies = async (page) => {
    const response = await tmdbClient.get("/trending/movie/day", {
        params: {
            page,
        },
    });

    return mapMovieList(response.data);
};

export const getPopularMovies = async (page) => {
    const response = await tmdbClient.get("/movie/popular",{
        params: {
            page,
        },

    });
    return mapMovieList(response.data);
};

export const getMovieRecommendations = async (id, page) => {
    const response = await tmdbClient.get(`/movie/${id}/recommendations`, {
        params: {
            page,
        },
    });

    return mapMovieList(response.data);
}