import mongoose from "mongoose";
import env from "../../config/env.js";
import { en } from "zod/v4/locales";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1);
    }
};
