import { Router } from "express";
import { searchMovieController } from "./movie.controller.js";
import validate from "../../shared/validators/validate.js";
import { searchMovieSchema, movieIdSchema } from "./movie.schemas.js";
import { paginationSchema } from "../../shared/schemas/pagination.schema.js";
import { getMovieDetailsController, getTrendingMoviesController, getPopularMoviesController, getMovieRecommendationsController } from "./movie.controller.js";

const router = Router();

router.get("/search", validate({query: searchMovieSchema}), searchMovieController);
router.get("/trending", validate({query: paginationSchema}), getTrendingMoviesController);
router.get("/popular", validate({query: paginationSchema}), getPopularMoviesController);
router.get("/:id/recommendations", validate({params: movieIdSchema, query: paginationSchema}), getMovieRecommendationsController);
router.get("/:id", validate({params: movieIdSchema}), getMovieDetailsController)

export default router;