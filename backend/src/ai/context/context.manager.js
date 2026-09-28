import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";
import { RECENT_CONTEXT_TOKEN_BUDGET, CONTEXT_COMPACTION_THRESHOLD, CONTEXT_TOKEN_BUDGET } from "./context.config.js";
import { generateSummary } from "./summarizer.js";
import { updateConversationSummary } from "../../modules/conversations/conversation.service.js";

const selectRecentMessages = async (messages, tokenBudget) => {
    const recentMessages = [];
    let recentTokenCount = 0;
    let startIndex = null;

    for (let i = messages.length - 1; i >= 0;) {
        const current = messages[i];

        if (current._getType() === "human") {
            const messageTokens = await countMessageTokens([current]);

            if (recentTokenCount + messageTokens > tokenBudget) {
                break;
            }

            recentMessages.unshift(current);
            recentTokenCount += messageTokens;
            startIndex = i

            i--;
            continue;
        }

        if (current._getType() === "ai") {
            const previous = messages[i - 1];

            if (previous?._getType() === "human") {
                const turnTokens = await countMessageTokens([
                    current,
                    previous,
                ]);

                if (recentTokenCount + turnTokens > tokenBudget) {
                    break;
                }

                recentMessages.unshift(previous, current);

                recentTokenCount += turnTokens;
                startIndex = i - 1;
                i -= 2;
                continue;
            }

            const messageTokens = await countMessageTokens(current)

            if (recentTokenCount + messageTokens > tokenBudget) {
                break;
            }

            recentMessages.unshift(current);
            recentTokenCount += messageTokens;
            startIndex = i
            i--;
        }
    }

    return {
        messages: recentMessages,
        tokenCount: recentTokenCount,
        startIndex,
    };
};


export const buildContext = async (conversation, currentMessage) => {
    const messages = conversation.messages.map((message) => {
        if (message.role === "user") {
            return new HumanMessage(message.content);
        }

        return new AIMessage(message.content);
    });

    messages.push(new HumanMessage(currentMessage));

    let contextMessages = messages;

    console.time("Token count");

    const tokenCount = await countMessageTokens(messages);

    console.timeEnd("Token count");

    const needsCompaction =
        tokenCount >= CONTEXT_COMPACTION_THRESHOLD;

    if (!needsCompaction) {
        return {
            messages,
            tokenCount,
            needsCompaction,
        };
    }

    const recentContext = await selectRecentMessages(
        messages,
        RECENT_CONTEXT_TOKEN_BUDGET
    );

    if (
    recentContext.startIndex !== null &&
    recentContext.startIndex > 0
) {
    if (conversation.summary) {
        contextMessages = [
            new SystemMessage(
                `Conversation summary:\n${conversation.summary}`
            ),
            ...recentContext.messages,
        ];
    } else {
        contextMessages = recentContext.messages;
    }
}

    const contextTokenCount =
        await countMessageTokens(contextMessages);

    return {
        messages: contextMessages,
        contextTokenCount,
    };
};