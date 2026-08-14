import { getImageUrl } from "../../shared/utils/image.js";

const mapMovieCard = (movie) => {
    return {
        id: movie.id,

        title: movie.title,

        originalTitle: movie.original_title,

        overview: movie.overview,

        releaseDate: movie.release_date,

        releaseYear: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : null,

        rating: movie.vote_average,

        posterUrl: getImageUrl(movie.poster_path),

        backdropUrl: getImageUrl(movie.backdrop_path),

        language: movie.original_language,
    }
};

export const mapMovieList = (response) => {
    return {
        page: response.page,

        totalPages: response.total_pages,

        totalResults: response.total_results,

        movies: response.results.map(mapMovieCard),

    };
}


export const mapMovieSearch = (response) => {
    return mapMovieList(response);
};


const mapCrewMember = (member) => ({
    id: member.id,
    name: member.name,
    profileUrl: getImageUrl(member.profile_path),
});

const getCrewByJobs = (crew, jobs) => {
    return crew
        .filter((member) => jobs.includes(member.job))
        .map(mapCrewMember);
};

const mapCastMember = (actor) => ({
    id: actor.id,
    name: actor.name,
    character: actor.character,
    profileUrl: getImageUrl(actor.profile_path),
});

export const mapMovieDetails = (movie) => {

    const directors = getCrewByJobs(movie.credits.crew, ["Director"]);

    const writers = getCrewByJobs(movie.credits.crew, ["Writer", "Screenplay"]);

    const cast = movie.credits.cast.slice(0, 10).map(mapCastMember);

    return {
       ...mapMovieCard(movie),

    tagline: movie.tagline,

    runtime: movie.runtime,

    status: movie.status,

    homepage: movie.homepage,

    imdbId: movie.imdb_id,

    credits: {
        directors,
        writers,
        cast,
    }
    };
};

