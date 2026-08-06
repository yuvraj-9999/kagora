const validate = (schema, source) => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten(),
            });
        }

        req.validatedData = result.data;

        next();
    };
};

export default validate;