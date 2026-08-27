import * as favoriteRepository from "./favorite.repository.js";
import * as movieRepository from "../movies/movie.repository.js";
import { getMovieDetails } from "../movies/movie.service.js";

export const toggleFavorite = async (userId, tmdbId) => {
    let movie = await movieRepository.findByTmdbId(tmdbId);

    if(!movie){
        const movieData = await getMovieDetails(tmdbId);
        movie = await  movieRepository.create(movieData)
    }

    const existingFavorites = await favoriteRepository.findByUserAndMovie(userId, movie._id);

    if(existingFavorites){
        await favoriteRepository.remove(userId, movie._id);

        return {
            favorited: false,
            message: "Movie removed from favorites"
        };
    }

    await favoriteRepository.create(
        userId,
        movie._id,
    );
    
    return {
        favorited: true,
        message: "Movie added to favorites",
    };

};

export const getFavorites = async (userId) => {

    const favorites = await favoriteRepository.findByUser(userId);

    return favorites.map((favorite) => favorite.movieId);
};

export const getFavoriteStatus = async(userId, tmdbId) => {
    const movie = await movieRepository.findByTmdbId(tmdbId)

    if(!movie){
        return {
            favorited: false,
        };
    }

    const favorite = await favoriteRepository.findByUserAndMovie(
        userId,
        movie._id
    );

    return{
        favorited : !!favorite
    };
};