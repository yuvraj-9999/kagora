import { ChatOpenRouter } from "@langchain/openrouter";
import env from "../../config/env.js";

export const summarizerModel = new ChatOpenRouter({
    model: "nvidia/nemotron-3.5-lightning:free",
    apiKey: env.OPENROUTER_API_KEY,
});