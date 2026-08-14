export const getMe = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
            userId: req.user.id,
        },
    });
};