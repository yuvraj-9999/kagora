import dotenv from "dotenv"

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,
    TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN,
};

export default env;