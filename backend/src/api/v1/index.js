import { Router } from "express";

import { movieRoutes } from "../../modules/movies/index.js";
import { peopleRoutes } from "../../modules/people/index.js";
import { authRoutes } from "../../modules/auth/index.js";
import { userRoutes } from "../../modules/users/index.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Kagora API is running",
    });
});

router.use("/movies", movieRoutes);
router.use("/people", peopleRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;