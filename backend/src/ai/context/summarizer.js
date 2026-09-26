import { summarizerModel } from "./summarizer.model.js";
import { SUMMARY_TOKEN_BUDGET } from "./context.config.js";

export const generateSummary = async (existingSummary, olderMessages) => {
    const conversation = olderMessages.map((message) => {
        const role = message._getType() === "human" ? "User" : "Assistant";

        return `${role}: ${message.content}`;
    }).join("\n ");

    const prompt = `
    You are a conversation summarizer.

    Your task is to update the existing conversation summary using
    the older conversation provided below.

    Preserve:
        - important user preferences
        - important facts and conclusions
        - relevant movies, actors, directors, and other entities
        - unresolved questions or context
        - important relationships between topics

    Keep the updated summary within approximately ${SUMMARY_TOKEN_BUDGET} tokens.

    Do not:
        - invent information
        - add information from your own knowledge
        - preserve greetings or unnecessary filler
        - include raw tool/API responses
        - include internal reasoning
            - reproduce the conversation verbatim

    Existing summary:
    ${existingSummary || "No existing summary."}

    Older conversation:
    ${conversation}

    Return only the updated summary as plain text.
    `;

    const response = await summarizerModel.invoke(prompt);

    return response.content.trim();
};