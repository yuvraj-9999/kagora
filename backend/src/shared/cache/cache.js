import { redis } from "../../integrations/redis/redis.client.js";

export const getOrSetCache = async (key, fetchData, ttl) => {
    const cached = await redis.get(key);

    if(cached){
        return cached;
    }

    const data = await fetchData();

    await redis.set(key, data, {
        ex: ttl,
    });

    return data;
}