import {
    toggleFavorite,
    getFavorites,
    getFavoriteStatus
} from "./favorite.service.js";

export const toggleFavoriteController = async (req, res, next) => {
    const { tmdbId } = req.validated;

    try {
        const result = await toggleFavorite(
            req.user.id,
            Number(tmdbId)
        );

        return res.status(200).json({
            success: true,
            message: result.message,
            data: {
                favorited: result.favorited,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getFavoritesController = async (req, res, next) => {
    try {
        const favorites = await getFavorites(req.user.id);

        return res.status(200).json({
            success: true,
            data: favorites,
        });
    } catch (error) {
        next(error);
    }
};

export const getFavoriteStatusController = async (req, res, next) => {
    const { tmdbId } = req.validated;

    try {
        const result = await getFavoriteStatus(
            req.user.id,
            Number(tmdbId)
        );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};