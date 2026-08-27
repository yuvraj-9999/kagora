import * as movieRepository from "../movies/movie.repository.js";
import * as watchlistRepository from "./watchlist.repository.js";
import { getMovieDetails } from "../movies/movie.service.js";

export const toggleWatchlist = async (userId, movieId) => {
    let movie = await movieRepository.findByTmdbId(movieId);

    if(!movie){
        const movieData = await getMovieDetails(movieId);
        movie = await movieRepository.create(movieData);
    }

    const existingWatchlist = await watchlistRepository.findByUserAndMovie(userId, movie._id);

    if(existingWatchlist){
        await watchlistRepository.remove(userId, movie._id);

        return{
            watchlisted: false,
            message: "Movie removed from watchlist",
        };
    }

    await watchlistRepository.create(userId, movie._id);

    return {
        watchlisted: true,
        message: "Movie added to watchlist",
    };
};

export const getWatchlist = async (userId) => {
    const watchlist = await watchlistRepository.findByUser(userId);

    return watchlist.map((item) => item.movieId);
};


export const getWatchlistStatus = async (userId, tmdbId) => {
    const movie = await movieRepository.findByTmdbId(tmdbId);

    if (!movie) {
        return {
            watchlisted: false,
        };
    }

    const watchlist = await watchlistRepository.findByUserAndMovie(
        userId,
        movie._id
    );

    return {
        watchlisted: !!watchlist,
    };
};