import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js"
import validate from "../../shared/validators/validate.js";
import { tmdbIdSchema } from "../../shared/schemas/tmdbId.schema.js";
import { paginationSchema } from "../../shared/schemas/pagination.schema.js";
import { toggleFavoriteController, getFavoritesController, getFavoriteStatusController } from "./favorite.controller.js";

const router = Router();

router.post("/:tmdbId", authMiddleware, validate({ params: tmdbIdSchema }), toggleFavoriteController);
router.get("/", authMiddleware, validate({ query: paginationSchema }), getFavoritesController);
router.get("/:tmdbId", authMiddleware, validate({ params: tmdbIdSchema }), getFavoriteStatusController);


export default router;
