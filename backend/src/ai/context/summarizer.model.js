import { ChatOpenRouter } from "@langchain/openrouter";
import env from "../../config/env.js";
import { SUMMARY_TOKEN_BUDGET } from "./context.config.js";

export const summarizerModel = new ChatOpenRouter({
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    apiKey: env.OPENROUTER_API_KEY,
    maxTokens: SUMMARY_TOKEN_BUDGET,

    openrouter_provider: {
        sort: "throughput",
    },
});