import { Favorite } from "./favorite.model.js";

export const findByUserAndMovie = async (userId, MovieId) => {
    return Favorite.findOne({ userId, movieId });
};

export const create = async (userId, movieId) => {
    return Favorite.create({ userId, movieId });
};

export const remove = async (userId, movieId) => {
    return Favorite.findOneAndDelete({ userId, movieId });
};

export const findByUser = async (userId) => {
    return Favorite.find({ userId }).populate("movieId").sort({ createdAt: -1 });
}