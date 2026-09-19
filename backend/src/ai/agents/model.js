import { ChatOpenRouter } from "@langchain/openrouter";
import env from "../../config/env.js";

export const model = new ChatOpenRouter({
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    apiKey: env.OPENROUTER_API_KEY,
});