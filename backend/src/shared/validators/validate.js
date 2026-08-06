const validate = (schemas) => {
    return (req, res, next) => {
       const validatedData = [];

       for (const [ source, schema ] of Object.entries(schemas)){
        const result = schema.safeParse(req[source]);
        
        if(!result.success){
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten(),
            });
        }
        Object.assign(validatedData, result.data);
       }


        req.validated = validatedData;

        next();
    };
};

export default validate;