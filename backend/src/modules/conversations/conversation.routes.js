import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import { getConversationByIdController, getConversationsController, deleteConversationController } from "./conversation.controller.js";

const router = Router();

router.get("/", authMiddleware, getConversationsController);
router.get("/:conversationId", authMiddleware, getConversationByIdController);
router.delete("/:conversationId", authMiddleware, deleteConversationController);

export default router;