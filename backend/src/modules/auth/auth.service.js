import * as userRepository from "../users/user.repository.js"
import { hashPassword, comparePassword} from "./auth.password.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "./auth.tokens.js";

export const register = async ({ name, email, password }) => {
    const existingUser = await userRepository.findByEmail(email);

    if(existingUser){
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
}

export const login = async ({ email, password }) => {
    const user = await userRepository.findByEmailWithPassword(email);

    if(!user){
        throw new Error("Invalid email or password");
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
