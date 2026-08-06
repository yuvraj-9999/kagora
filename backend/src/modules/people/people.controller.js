import { searchPeople, getPersonDetails } from "./people.service.js";

export const searchPeopleController = async (req, res, next) => {
    try {
        const { query } = req.validatedData;

        const people = await searchPeople(query);
        
        res.status(200).json({
            success:true,
            message: "People fetched successfully",
            data: people,
        })



    } catch (error) {
        next(error);
    }
};


export const getPersonDetailsController = async (req, res, next) => {
    try {
        const { id } = req.validatedData;

        const person = await getPersonDetails(id);
        
        res.status(200).json({
            success:true,
            message: "Person fetched successfully",
            data: person,
        })



    } catch (error) {
        next(error);
    }
}