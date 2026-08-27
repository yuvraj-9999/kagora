import { toggleWatchlist, getWatchlist, getWatchlistStatus } from "./watchlist.service.js";

export const toggleWatchlistController = async (req, res, next) => {
 
    const { tmdbId } = req.validated;

    try {
        const result = await toggleWatchlist(req.user.id, Number(tmdbId));

        return res.status(200).json({
            success: true,
            message: result.message,
            data: {
                watchlisted: result.watchlisted,
            },
        })
    } catch (error) {
        next(error)
    }
};

export const getWatchlistController = async (req, res, next) => {
    try {
        const watchlist = await getWatchlist(req.user.id);

        return res.status(200).json({
            success: true,
            data: watchlist,
            
        })
    } catch (error) {
        next(error)
    }
};

export const getWatchlistStatusController = async (req, res, next) => {

    const { tmdbId } = req.validated;

    try {
        const result = await getWatchlistStatus(req.user.id, Number(tmdbId));

    return res.status(200).json({
        success: true,
        data: result,
    });
} catch(error){
    next(error)
}
};