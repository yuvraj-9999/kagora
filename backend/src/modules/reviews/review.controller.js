import {
    createReview,
    getMovieReviews,
    updateReview,
    deleteReview,
} from "./review.service.js";


export const createReviewController = async (req, res, next) => {
    try {
        const { tmdbId, rating, review } = req.validated;

        const result = await createReview(
            req.user.id,
            Number(tmdbId),
            {
                rating,
                review,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};


export const getMovieReviewsController = async (req, res, next) => {
    try {
        const { tmdbId } = req.validated;

        const reviews = await getMovieReviews(Number(tmdbId));

        return res.status(200).json({
            success: true,
            data: reviews,
        });

    } catch (error) {
        next(error);
    }
};


export const updateReviewController = async (req, res, next) => {
    try {
        const { reviewId, rating, review } = req.validated;

        const result = await updateReview(
            req.user.id,
            reviewId,
            {
                rating,
                review,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};


export const deleteReviewController = async (req, res, next) => {
    try {
        const { reviewId } = req.validated;

        const result = await deleteReview(
            req.user.id,
            reviewId
        );

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
};