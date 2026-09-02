import { Review } from "./review.model.js";

export const create = async (data) => {
    return Review.create(data);
};

export const findByUserAndMovie = async (userId, movieId) => {
    return Review.findOne({
        userId,
        movieId,
    });
};

export const findByMovie = async (movieId) => {
    return Review.find({movieId}).populate("userId", "name avatar").sort({ createdAt: -1 });
};

export const findById = async(reviewId) => {
    return Review.findById(reviewId);
};

export const findByUser = async (userId) => {
    return Review.find({ userId })
        .populate("userId", "name avatar")
        .sort({ createdAt: -1 });
};

export const update = async (reviewId, data) => {
    return Review.findByIdAndUpdate(
        reviewId,
        data,
        {
            new: true,
            runValidators: true,
        }

    );
};

export const remove = async (reviewId) => {
    return Review.findByIdAndDelete(reviewId);
};
