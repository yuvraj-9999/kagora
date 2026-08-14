import { Movie } from "./movie.model.js";

export const findByTmdbId = async (tmdbId) => {
    return Movie.findOne({ tmdbId });
};

export const create = async (movieData) => {
    return Movie.create(movieData);
};

export const findOrCreate = async (movieData) => {
    const existingMovie = await findByTmdbId(movieData.tmdbId);

    if(existingMovie){
        return existingMovie;
    }

    return create(movieData);
};