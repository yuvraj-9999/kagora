import * as userRepository from "../users/user.repository.js"
import { hashPassword, comparePassword} from "./auth.password.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./auth.tokens.js";
import crypto from "crypto";
import env from "../../config/env.js";
import { sendPasswordResetEmail, sendVerificationEmail } from "../../integrations/email/resend.js";

export const register = async ({ name, email, password }) => {
    const existingUser = await userRepository.findByEmail(email);

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");


    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
        emailVerificationToken: hashedVerificationToken,
        emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    const verificationLink = `${env.CLIENT_URL}/verify-email/${verificationToken}`;

    await sendVerificationEmail(user.email, user.name, verificationLink);

    return user;
};
export const verifyEmail = async ({ verificationToken }) => {
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    const user = await userRepository.findByVerificationToken(hashedToken);

    if(!user) {
        throw new Error("Invalid or expired verification token");
    }

    if(user.isEmailVerified){
        throw new Error("Email already verified");
    }

    await userRepository.verifyEmail(user._id);

    return {
        message: "Email verified successfully",
    };


};

export const login = async ({ email, password }) => {
    const user = await userRepository.findByEmailWithPassword(email);

    if(!user){
        throw new Error("Invalid email or password");
    }

      if(!user.isEmailVerified){
        throw new Error("Please verify your email before logging in");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const hashedRefereshToken = await hashPassword(refreshToken);

    await userRepository.updateRefreshToken(user._id, hashedRefereshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

export const refresh = async ({ refreshToken }) => {
   let payload;

   try {
        payload = verifyRefreshToken(refreshToken);
   } catch (error) {
        throw new Error("Invalid or expired refresh token");
   }

   const user = await userRepository.findByIdWithRefreshToken(payload.userId);

   if(!user || !user.refreshToken){
    throw new Error("Invalid refresh token");
   }

   const isTokenValid = await comparePassword(refreshToken, user.refreshToken);

   if(!isTokenValid){
    throw new Error("Invalid refresh token");
   }

   const newAccessToken = generateAccessToken(user._id);
   const newRefreshToken = generateRefreshToken(user._id);

   const hashedRefreshToken = await hashPassword(newRefreshToken);

   await userRepository.updateRefreshToken(
    user._id,
    hashedRefreshToken,
   );

   return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
   };
 
};

export const logout = async (userId) => {
    await userRepository.clearRefreshToken(userId)
};

export const forgotPassword = async ({ email }) => {
    const user = await userRepository.findByEmail(email);

    if(!user){
        return {
            message: "If an account exists with this email, a password reset link has been sent."
        };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const resetExpires = Date.now() + 15 * 60 * 1000;

    await userRepository.setPasswordResetToken(user._id, hashedResetToken, resetExpires);

    const resetLink = `${env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(
        user.email,
        user.name,
        resetLink,
    );

    return {
        message: "If an account exists with this email, a password reset link has been sent.",
    };
};

export const resetPassword = async ({ resetToken, newPassword }) => {
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await userRepository.findByPasswordResetToken(hashedToken);

    if(!user) {
        throw new Error("Invalid or expired password reset token");

    }

    const hashedPassword = await hashPassword(newPassword);

    await userRepository.resetPassword(user._id, hashedPassword);

    return {
        message: "Password reset successfully",
    };
};