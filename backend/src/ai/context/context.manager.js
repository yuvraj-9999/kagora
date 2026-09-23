import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";
import { RECENT_CONTEXT_TOKEN_BUDGET, CONTEXT_COMPACTION_THRESHOLD } from "./context.config.js";

const selectRecentMessages = async (messages) => {
    const recentMessages = [];
    let tokenCount = 0;

    for(let i = messages.length - 1; i>=0; i--){

        const messageTokens = await countMessageTokens([messages[i]]);

        if(tokenCount + messageTokens > RECENT_CONTEXT_TOKEN_BUDGET){
            break;
        }

        recentMessages.unshift(messages[i]);
        tokenCount+=messageTokens;
    }

    return {
        messages: recentMessages,
        tokenCount
    }
};


export const buildContext = async (conversation, currentMessage) => {
    const messages = conversation.messages.map((message)=> {
        if(message.role === "user") {
            return new HumanMessage(message);
        }
        return new AIMessage(message);
    });

    messages.push(new HumanMessage(currentMessage));

    const tokenCount =  await countMessageTokens(messages)

    const needsCompaction = tokenCount >= CONTEXT_COMPACTION_THRESHOLD;

    if(!needsCompaction){
        
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
