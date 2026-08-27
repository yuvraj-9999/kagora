import { searchPeople, getPersonDetails, getPersonCredits } from "./people.service.js";

export const searchPeopleController = async (req, res, next) => {
    try {
        const { query, page } = req.validated;

        const people = await searchPeople(query, page);
        
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
        const { id } = req.validated;

        const person = await getPersonDetails(id);
        
        res.status(200).json({
            success:true,
            message: "Person fetched successfully",
            data: person,
        })



    } catch (error) {
        next(error);
    }
};

export const getPersonCreditsController = async (req, res, next) => {
    try {
        const { id } = req.validated;

        const credits = await getPersonCredits(id);

        res.status(200).json({
            success: true,
            message: "Person credits fetched successfully",
            data: credits,
        });
    } catch (error) {
        next(error);
    }
};