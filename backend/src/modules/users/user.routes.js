import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import { getMe } from "./user.controller.js";

const router = Router();

router.get("/me", authMiddleware, getMe);

export default router;