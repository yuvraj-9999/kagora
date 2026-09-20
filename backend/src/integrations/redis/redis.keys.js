export const movieSearchKey = (query, page) => {
    const normalizedQuery = query.trim().toLowerCase();

    return `tmdb:movie:search:${normalizedQuery}:${page}`;
};

export const movieDetailsKey = (id) => {
    return `tmdb:movie:details:${id}`;
};

export const trendingMoviesKey = (page) => {
    return `tmdb:movie:trending:${page}`;
};

export const popularMoviesKey = (page) => {
    return `tmdb:movie:popular:${page}`;
};

export const recommendationsKey = (id, page) => {
    return `tmdb:movie:recommendations:${id}:${page}`;
};

export const peopleSearchKey = (query, page) => {
    const normalizedQuery = query.trim().toLowerCase();

    return `tmdb:person:search:${normalizedQuery}:${page}`;
};

export const personDetailsKey = (id) => {
    return `tmdb:person:details:${id}`;
};

export const personCreditsKey = (id) => {
    return `tmdb:person:credits:${id}`;
};