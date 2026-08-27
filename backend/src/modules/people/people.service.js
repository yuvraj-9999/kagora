import { tmdbClient } from "../../integrations/tmdb/index.js"
import { mapPeopleSearch, mapPersonDetails, mapPersonCredits } from "./people.mapper.js";

export const searchPeople = async (query, page) => {
    const response = await tmdbClient.get("/search/person", {
        params: {
            query,
            page,
        },
    });

    return mapPeopleSearch(response.data);
};

export const getPersonDetails = async (id) => {
    const response = await tmdbClient.get(`/person/${id}`);

    return mapPersonDetails(response.data);
};

export const getPersonCredits = async (id) => {
    const response = await tmdbClient.get(`/person/${id}/combined_credits`);

    return mapPersonCredits(response.data);
};