import * as reviewRepository from "./review.repository.js";
import * as movieRepository from "../movies/movie.repository.js";
import { getMovieDetails } from "../movies/movie.service.js";

export const createReview = async ( userId, tmdbId, { rating, review } ) => {
    let movie = await movieRepository.findByTmdbId(tmdbId);

    if(!movie) {
        const movieData = await getMovieDetails(tmdbId);
        movie = await movieRepository.create(movieData);
    }

    const existingReview = await reviewRepository.findByUserAndMovie(userId, movie._id);

    if(existingReview){
        throw new Error("You have already reviewed this movie");
    }

    return reviewRepository.create({
        userId,
        movieId: movie._id,
        rating,
        review,
    });
};

export const getMovieReviews = async (tmdbId) => {
    const movie = await movieRepository.findByTmdbId(tmdbId);

    if(!movie){
        return [];
    };

    return reviewRepository.findByMovie(movie._id);
};

export const getReviewsByUser = async (userId) => {
    const reviews = await reviewRepository.findByUser(userId);

    return reviews;
};


export const updateReview = async (userId, reviewId, {rating, review}) => {
    const existingReview = await reviewRepository.findById(reviewId);

    if(!existingReview){
        throw new Error("Review not found");
    }

    if(existingReview.userId.toString() !== userId.toString()){
        throw new Error("You can update only your review");
    }

    return reviewRepository.update(reviewId, {
        rating, review,
    });
};

export const deleteReview = async (userId, reviewId) => {

    const existingReview = await reviewRepository.findById(reviewId);

    if (!existingReview) {
        throw new Error("Review not found");
    }

    if (existingReview.userId.toString() !== userId.toString()) {
        throw new Error("You can only delete your own review");
    }

    await reviewRepository.remove(reviewId);

    return {
        message: "Review deleted successfully",
    };
};