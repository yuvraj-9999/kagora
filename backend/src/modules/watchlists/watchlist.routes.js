import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import validate from "../../shared/validators/validate.js";
import { tmdbIdSchema } from "../../shared/schemas/tmdbId.schema.js";
import { paginationSchema } from "../../shared/schemas/pagination.schema.js";
import { toggleWatchlistController, getWatchlistController, getWatchlistStatusController } from "./watchlist.controller.js";

const router = Router();

router.post("/:tmdbId", authMiddleware, validate({ params: tmdbIdSchema }) ,toggleWatchlistController);
router.get("/", authMiddleware, validate({ query: paginationSchema}), getWatchlistController);
router.get("/:tmdbId", authMiddleware, validate({ params: tmdbIdSchema }) ,getWatchlistStatusController);


export default router;

