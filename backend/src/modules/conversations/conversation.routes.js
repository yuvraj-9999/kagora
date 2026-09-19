import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import validate from "../../shared/validators/validate.js";
import { conversationIdSchema } from "./conversation.schemas.js";
import { getConversationByIdController, getConversationsController, deleteConversationController } from "./conversation.controller.js";

const router = Router();

router.get("/", authMiddleware, getConversationsController);
router.get("/:conversationId", authMiddleware, validate({ params: conversationIdSchema }), getConversationByIdController);
router.delete("/:conversationId", authMiddleware, validate({ params: conversationIdSchema }), deleteConversationController);

export default router;