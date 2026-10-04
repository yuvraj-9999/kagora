export const summarizerModel = new ChatOpenRouter({
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    apiKey: env.OPENROUTER_API_KEY,
    maxTokens: SUMMARY_TOKEN_BUDGET,

    openrouter_provider: {
        sort: "throughput",
    },
});