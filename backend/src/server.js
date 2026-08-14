import env from "./config/env.js"
import app from "./app.js";
import { connectDB } from "./integrations/mongodb/mongodb.connection.js";

const startServer = async () => {
    await connectDB();

    app.listen(env.PORT, () => {
        console.log(`Kagora Backend running on http://localhost:${env.PORT}`);
    });
};

startServer();
