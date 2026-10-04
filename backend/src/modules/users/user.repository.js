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

export const findByVerificationToken = async (verificationToken) => {
    return User.findOne({
        emailVerificationToken: verificationToken,
        emailVerificationExpires: { $gt: Date.now() },
    });
};

export const verifyEmail = async (userId) => {
    return User.findByIdAndUpdate(
        userId,
        {
            isEmailVerified: true,
            emailVerificationToken: null,
            emailVerificationExpires: null,
        },
        { returnDocument: "after" }
    );
};

export const setPasswordResetToken = async (userId, resetToken, resetExpires) => {
    return User.findByIdAndUpdate(
        userId,
        {
            passwordResetToken: resetToken,
            passwordResetExpires: resetExpires,
        },
        { returnDocument: "after" }
    );
};

export const findByPasswordResetToken = async (resetToken) => {
    return User.findOne({
        passwordResetToken: resetToken,
        passwordResetExpires: { $gt: Date.now() },
    })
};

export const resetPassword = async (userId, hashedPassword) => {
    return User.findByIdAndUpdate(
        userId,
        {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null,
        },
        { returnDocument: "after" }
    );
};