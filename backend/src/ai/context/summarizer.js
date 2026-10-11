import { summarizerModel } from "./summarizer.model.js";

export const generateSummary = async (existingSummary, olderMessages) => {
    

    const conversation = olderMessages
        .map((message) => {
            const role =
                message.role === "user"
                    ? "User"
                    : "Assistant";

            return `${role}: ${message.content}`;
        })
        .join("\n");



    

    const prompt = `
You are a conversation summarizer.

Your task is to maintain an accurate, concise, rolling summary of an ongoing conversation.

Existing summary:
${existingSummary || "No existing summary."}

New conversation messages:
${conversation}

Create ONE updated summary by combining the existing summary with the new messages.

Rules:
- Preserve important information from the existing summary that remains relevant.
- Incorporate important new information from the new messages.
- If the new messages contradict, clarify, or supersede information in the existing summary, update or remove the outdated information.
- Do not preserve a claim merely because it appears in the existing summary.
- Treat the new conversation as the most recent source of truth about the user's current interests, preferences, requests, and decisions.
- Preserve important user preferences, facts, decisions, topics, and unresolved requests.
- Do not invent information.
- Do not repeat information unnecessarily.
- Keep the summary concise.

Return ONLY the updated summary.
`;

    const response = await summarizerModel.invoke(
        prompt
    );

    return response.content.trim();
};