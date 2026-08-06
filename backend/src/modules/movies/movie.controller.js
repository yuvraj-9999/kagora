import { success } from "zod";
import { searchMovies, getMovieDetails, getTrendingMovies, getPopularMovies, getMovieRecommendations } from "./movie.service.js";

export const searchMovieController = async (req, res, next) => {
    try {
        const { query, page } = req.validated;

        const movies = await searchMovies(query, page);

        res.status(200).json({
            success: true,
            message:"Movie fetched successfully",
            data: movies,
        });

    } catch (error) {
        next(error);
    }
}

export const getMovieDetailsController = async (req, res, next) => {
    try {
        const { id } = req.validated;

        const movie = await getMovieDetails(id);

        res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie,
        });
        
    } catch (error) {
        next(error);
    }
};

export const getTrendingMoviesController = async (req, res, next) => {
    try {

        const { page } = req.validated;

        const movies = await getTrendingMovies(page);

        res.status(200).json({
            success: true,
            message:"Movies fetched successfully",
            data: movies,
        })
    } catch (error) {
        next(error)
    }
};

export const getPopularMoviesController = async (req, res, next) => {
    try {
        const { page } = req.validated;

        const movies = await getPopularMovies(page);

        res.status(200).json({
            success: true,
            message: "Popular movies fetched successfully",
            data: movies,
        });
    } catch (error) {
        next(error);
    }
};

export const getMovieRecommendationsController = async (req, res, next) => {
    try {
        const { id, page } = req.validated;

        const movies = await getMovieRecommendations(id, page);

        res.status(200).json({
            success: true,
            message: "Movie recommendations fetched successfully",
            data: movies,
        });
    } catch (error) {
        next(error);
    }
}

