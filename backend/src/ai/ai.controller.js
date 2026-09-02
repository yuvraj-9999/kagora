import { runAI } from "./ai.service.js";

export const runAIController = async (req, res, next) => {
    try {
        const { message } = req.validated;

        const result = await runAI(message, req.user.id);

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        next(error)
    }
};