import { tmdbClient } from "../../integrations/tmdb/index.js";
import { mapMovieDetails, mapMovieSearch } from "./movie.mapper.js";

export const searchMovies = async(query) => {
    const response = await tmdbClient.get("/search/movie", {
        params: {
            query,
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
}