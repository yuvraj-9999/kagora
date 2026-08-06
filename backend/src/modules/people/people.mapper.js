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