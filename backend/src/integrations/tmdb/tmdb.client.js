import axios from "axios";
import env from "../../config/env.js";
import { TMDB_BASE_URL } from "./tmdb.constants.js";

const tmdb_client = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${env.TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
    },
    timeout: 10000,
});

export default tmdb_client;