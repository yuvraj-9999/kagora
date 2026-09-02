import { verifyAccessToken } from "./auth.tokens.js";

const authMiddleware = (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1];

        const payload = verifyAccessToken(token);

        req.user = {
            id: payload.userId
        };

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
};

export default authMiddleware;