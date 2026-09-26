import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";
import { RECENT_CONTEXT_TOKEN_BUDGET, CONTEXT_COMPACTION_THRESHOLD } from "./context.config.js";
import { generateSummary } from "./summarizer.js";
import { updateConversationSummary } from "../../modules/conversations/conversation.service.js";

const selectRecentMessages = async (messages) => {
    const recentMessages = [];
    let recentTokenCount = 0;
    let startIndex = null;

    for (let i = messages.length - 1; i >= 0;) {
        const current = messages[i];

        if (current._getType() === "human") {
            const messageTokens = await countMessageTokens([current]);

            if (recentTokenCount + messageTokens > RECENT_CONTEXT_TOKEN_BUDGET) {
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

                if (recentTokenCount + turnTokens > RECENT_CONTEXT_TOKEN_BUDGET) {
                    break;
                }

                recentMessages.unshift(previous, current);

                recentTokenCount += turnTokens;
                startIndex = i - 1;
                i -= 2;
                continue;
            }

            const messageTokens = await countMessageTokens(current)

            if (recentTokenCount + messageTokens > RECENT_CONTEXT_TOKEN_BUDGET) {
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

    const tokenCount = await countMessageTokens(messages)

    const needsCompaction = tokenCount >= CONTEXT_COMPACTION_THRESHOLD;

    if (!needsCompaction) {

        return {
            messages,
            tokenCount,
            needsCompaction,
        };
    }

    const recentContext = await selectRecentMessages(messages);


    if (
        needsCompaction &&
        recentContext.startIndex !== null &&
        recentContext.startIndex > 0
    ) {
        const olderMessages = messages.slice(
            0,
            recentContext.startIndex
        );

        const updatedSummary = await generateSummary(
            conversation.summary,
            olderMessages
        );

        await updateConversationSummary(
            conversation._id,
            conversation.userId,
            updatedSummary
        );

        contextMessages = [
            new SystemMessage(
                `Conversation summary: \n${updatedSummary}`
            ),
            ...recentContext.messages,
        ];
    }

    const contextTokenCount = await countMessageTokens(contextMessages);

    return {
        messages: contextMessages,
        contextTokenCount,
    };

};
