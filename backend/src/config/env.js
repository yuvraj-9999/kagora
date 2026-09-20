import dotenv from "dotenv"

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,
    TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
    MONGODB_URI: process.env.MONGODB_URI,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
};

export default env;