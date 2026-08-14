import { login, logout, refresh, register } from "./auth.service.js";

export const registerController = async (req, res, next) => {
    try {
        const user = await register(req.validated);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        next(error);
    }
}

export const loginController = async (req, res, next) => {
    try {
        const { user, accessToken, refreshToken } = await login(req.validated);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                accessToken,
                refreshToken,
            },
        });
        
    } catch (error) {
        next(error)
    }
};

export const refreshController = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await refresh(req.validated);

       res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
            data: {
                accessToken,
                refreshToken,
            },
        });
        
    } catch (error) {
        next(error);
    }
}

export const logoutController = async (req,res,next) => {
    try {
        await logout(req.user.id);

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        next(error);
    }
}