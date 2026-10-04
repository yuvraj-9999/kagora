import IORedis from "ioredis";
import env from "../../config/env.js";

export const bullmqConnection = new IORedis(
    env.REDIS_URL,
    {
        maxRetriesPerRequest: null,
    }
);