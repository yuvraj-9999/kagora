import { Router } from "express"

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Kagora api is running",
    })
})

export default router