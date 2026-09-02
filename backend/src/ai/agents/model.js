import { ChatOpenRouter } from "@langchain/openrouter";
import env from "../../config/env.js";

export const model = new ChatOpenRouter({
    model: "openrouter/free",
    apiKey: env.OPENROUTER_API_KEY,
});