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


export const mapMovieDetails = (movie) => {

    const director = movie.credits.crew.find(
        (member) => member.job === "Director"
    );

    const cast = movie.credits.cast.slice(0, 10).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profileUrl: getImageUrl(actor.profile_path),
    })) 

    return {
       ...mapMovieCard(movie),

    tagline: movie.tagline,

    runtime: movie.runtime,

    status: movie.status,

    homepage: movie.homepage,

    imdbId: movie.imdb_id,

    director,

    cast,
    };
};

