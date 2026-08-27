import { getImageUrl } from "../../shared/utils/image.js";

const mapPersonCard = (person) => {
    return {
        id: person.id,

        name: person.name,

        originalName: person.original_name,

        knownForDepartment: person.known_for_department,

        popularity: person.popularity,

        profileUrl: getImageUrl(person.profile_path), 
    }
};

export const mapPeopleSearch = (response) => {
  return {
    page: response.page,

    totalPages: response.total_pages,

    totalResults: response.total_results,

    people: response.results.map(mapPersonCard),
  };  
};

export const mapPersonDetails = (person) => {
     return {
        ...mapPersonCard(person),

        biography: person.biography,

        birthday: person.birthday,

        deathday: person.deathday,

        placeOfBirth: person.place_of_birth,



     };
};

const mapPersonMovie = (movie) => {
    return {
        tmdbId: movie.id,

        title: movie.title || movie.name,

        originalTitle: movie.original_title || movie.original_name,

        overview: movie.overview,

        releaseDate: movie.release_date || movie.first_air_date,

        releaseYear: (movie.release_date || movie.first_air_date)
            ? new Date(movie.release_date || movie.first_air_date).getFullYear()
            : null,

        rating: movie.vote_average,

        posterUrl: getImageUrl(movie.poster_path),

        backdropUrl: getImageUrl(movie.backdrop_path),

        language: movie.original_language,
    };
};

export const mapPersonCredits = (response) => {
    return {
        cast: response.cast
            .filter((credit) => credit.media_type === "movie")
            .map(mapPersonMovie),

        crew: response.crew
            .filter((credit) => credit.media_type === "movie")
            .map(mapPersonMovie),
    };
};