import { connectDB } from "../integrations/mongodb/mongodb.connection.js";
import { runAI } from "./ai.service.js";
import "../modules/users/user.model.js";

await connectDB();

const testUserId = "6a8f0c04c3e697f6f88f1105";

const result = await runAI(
    "Show me my reviews.",
    testUserId
);

// const finalMessage = result.messages.at(-1);
console.log(result);