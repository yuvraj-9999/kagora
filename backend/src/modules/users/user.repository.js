import { User } from "./user.model.js";

export const findByEmail = async (email) => {
    return User.findOne({ email });
};

export const findByEmailWithPassword = async (email) => {
    return User.findOne({ email }).select("+password");
};

export const findById = async (id) => {
    return User.findById(id);
};

export const findByIdWithRefreshToken = async (id) => {
    return User.findById(id).select("+refreshToken");
};

export const create = async (userData) => {
    return User.create(userData);
};

export const updateRefreshToken = async (userId, refreshToken) => {
    return User.findByIdAndUpdate(
        userId,
        { refreshToken },
        { new: true },
    );
};

export const clearRefreshToken = async (userId) => {
    return User.findByIdAndUpdate(
        userId,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );
};