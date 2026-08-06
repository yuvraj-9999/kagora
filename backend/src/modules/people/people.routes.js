import { Router } from "express";
import validate from "../../shared/validators/validate.js";
import { searchPeopleSchema, peopleIdSchema } from "./people.schemas.js";
import { searchPeopleController, getPersonDetailsController } from "./people.controller.js";

const router = Router();

router.get("/health", (req,res)=> {
    res.json({
        success: true,
        message: "People api is running",
    });
});
router.get("/search", validate(searchPeopleSchema, "query"), searchPeopleController);
router.get("/:id", validate(peopleIdSchema, "params"), getPersonDetailsController);


export default router;