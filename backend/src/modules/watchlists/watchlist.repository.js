import { Watchlist } from "./watchlist.model.js";

export const findByUserAndMovie = async (userId, movieId) => {
    return Watchlist.findOne({ userId, movieId });
};

export const create = async (userId, movieId) => {
    return Watchlist.create({ userId, movieId });
};

export const remove = async (userId, movieId) => {
    return Watchlist.findOneAndDelete({ userId, movieId });
};

export const findByUser = async (userId) => {
    return Watchlist.find({ userId }).populate("movieId").sort({ createdAt: -1 });
};