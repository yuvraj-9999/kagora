import { Router } from "express"
import { movieRoutes } from "../modules/movies/index.js";
import { peopleRoutes } from "../modules/people/index.js";


const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Kagora api is running",
    })
});

router.use("/movies", movieRoutes);
router.use("/people", peopleRoutes);

export default router