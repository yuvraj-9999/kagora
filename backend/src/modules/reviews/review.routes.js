import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import validate from "../../shared/validators/validate.js";
import { tmdbIdSchema } from "../../shared/schemas/tmdbId.schema.js";
import { reviewBodySchema, reviewIdSchema } from "./review.schema.js";
import { createReviewController, getMovieReviewsController, updateReviewController, deleteReviewController } from "./review.controller.js";

const router = Router();

router.post("/:tmdbId", validate({ params: tmdbIdSchema, body: reviewBodySchema,}), authMiddleware, createReviewController);
router.get("/movie/:tmdbId", validate({ params: tmdbIdSchema }), getMovieReviewsController);
router.patch("/:reviewId", validate({ params: reviewIdSchema, body: reviewBodySchema, }), authMiddleware, updateReviewController);
router.delete("/:reviewId", validate({ params: reviewIdSchema }), authMiddleware, deleteReviewController);

export default router;
