import { Router } from "express";
import { searchMovieController } from "./movie.controller.js";
import validate from "../../shared/validators/validate.js";
import { searchMovieSchema, movieIdSchema } from "./movie.schemas.js";
import { getMovieDetailsController } from "./movie.controller.js";

const router = Router();

router.get("/search", validate(searchMovieSchema, "query"), searchMovieController);
router.get("/:id", validate(movieIdSchema, "params"), getMovieDetailsController)

export default router;