import { runAI } from "./ai.service.js";

export const runAIController = async (req, res, next) => {
    try {
        const { message, conversationId } = req.validated;

        const result = await runAI(message, req.user.id, conversationId);

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error)
    }
};