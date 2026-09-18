import { getConversationById, getConversations, deleteConversation } from "./conversation.service.js";

export const getConversationsController = async(req, res, next) => {
    try {
        const conversations = await getConversations(req.user.id);

        return res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        next(error);
    }
};

export const getConversationByIdController = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const conversation = await getConversationById(conversationId,req.user.id);

        return res.status(200).json({
            success: true,
            data: conversation,
        });  
    } catch (error) {
        next(error);
    }
};

export const deleteConversationController = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const result = await deleteConversation(req.user.id, conversationId);

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
};