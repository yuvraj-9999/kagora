import { Router } from "express";
import { runAIController } from "./ai.controller.js";
import authMiddleware from "../modules/auth/auth.middleware.js";
import validate from "../shared/validators/validate.js";
import { aiRequestSchema } from "./ai.schemas.js";

const router = Router();

router.post("/", authMiddleware, validate({ body: aiRequestSchema }), runAIController);

export default router;