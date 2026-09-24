import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";
import { RECENT_CONTEXT_TOKEN_BUDGET, CONTEXT_COMPACTION_THRESHOLD } from "./context.config.js";

const selectRecentMessages = async (messages) => {
    const recentMessages = [];
    let recentTokenCount = 0;

    for (let i = messages.length - 1; i >= 0;) {
        const current = messages[i];

        if (current._getType() === "human") {
            const messageTokens = await countMessageTokens([current]);

            if (recentTokenCount + messageTokens > RECENT_CONTEXT_TOKEN_BUDGET) {
                break;
            }

            recentMessages.unshift(current);
            recentTokenCount += messageTokens;

            i--;
            continue;
        }
        
        if(current._getType() === "ai"){
            const previous = messages[i-1];

            if(previous?._getType() === "human"){
                const turnTokens = await countMessageTokens([
                    current,
                    previous,
                ]);

                if(recentTokenCount + turnTokens > RECENT_CONTEXT_TOKEN_BUDGET){
                    break;
                }

                recentMessages.unshift(previous, current);

                recentTokenCount += turnTokens;
                i-=2;
                continue;
            }

            const messageTokens = await countMessageTokens(current)

            if(recentTokenCount + messageTokens > RECENT_CONTEXT_TOKEN_BUDGET){
                break;
            }

            recentMessages.unshift(current);
            recentTokenCount += messageTokens;
            i--;
        }
    }
    
    return {
        messages: recentMessages,
        tokenCount: recentTokenCount,
    };
};


export const buildContext = async (conversation, currentMessage) => {
    const messages = conversation.messages.map((message) => {
        if (message.role === "user") {
            return new HumanMessage(message);
        }
        return new AIMessage(message);
    });

    messages.push(new HumanMessage(currentMessage));

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

    return {
        messages: recentContext.messages,
        tokenCount,
        recentTokenCount: recentContext.tokenCount,
        needsCompaction
    };

};
