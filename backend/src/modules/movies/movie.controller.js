import { searchMovies, getMovieDetails } from "./movie.service.js";

export const searchMovieController = async (req, res, next) => {
    try {
        const { query } = req.validatedData;

        const movies = await searchMovies(query);

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
        const { id } = req.validatedData;

        const movie = await getMovieDetails(id);

        res.status(200).json({
            success: true,
            message: "Movie fetched successfully",
            data: movie,
        });
        
    } catch (error) {
        next(error);
    }
}