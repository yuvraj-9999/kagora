import express from "express";
import router from "./routes/index.js"
import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

const app = express();

app.use(express.json())

app.use(router);

// 404 handler
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
