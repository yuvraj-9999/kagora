import { TMDB_IMAGE_BASE_URL } from "../../integrations/tmdb/tmdb.constants.js";

export const getImageUrl = (path) => {
    if(!path){
        return null;
    }

    return `${TMDB_IMAGE_BASE_URL}${path}`;
}