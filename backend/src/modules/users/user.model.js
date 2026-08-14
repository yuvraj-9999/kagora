import mongoose from "mongoose";
import { lowercase } from "zod";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        refreshToken: {
            type: String,
            default: null,
        },

        avatar: {
            type: String,
            default: null,
        },


    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model("User", userSchema);
