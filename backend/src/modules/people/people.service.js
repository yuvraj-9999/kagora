import { tmdbClient } from "../../integrations/tmdb/index.js"
import { mapPeopleSearch, mapPersonDetails, mapPersonCredits } from "./people.mapper.js";
import { getOrSetCache } from "../../shared/cache/cache.js";
import { peopleSearchKey, personDetailsKey, personCreditsKey } from "../../integrations/redis/redis.keys.js";

export const searchPeople = async (query, page) => {
    const key = peopleSearchKey(query, page);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get("/search/person", {
                params: {
                    query,
                    page,
                },
            });

            return mapPeopleSearch(response.data);
        },
        3600,
    )
};

export const getPersonDetails = async (id) => {
    const key = personDetailsKey(id);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get(`/person/${id}`);

            return mapPersonDetails(response.data);
        },
        86400,
    )
};

export const getPersonCredits = async (id) => {
    const key = personCreditsKey(id);

    return getOrSetCache(
        key,
        async () => {
            const response = await tmdbClient.get(`/person/${id}/combined_credits`);

            return mapPersonCredits(response.data);
        },
        86400,
    )
};