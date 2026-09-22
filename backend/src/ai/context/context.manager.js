import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";

export const buildContext = async (conversation, currentMessage) => {
    const messages = conversation.messages.map((message)=> {
        if(message.role === "user") {
            return new HumanMessage(message);
        }
        return new AIMessage(message);
    });

    messages.push(new HumanMessage(currentMessage));

    const tokenCount =  await countMessageTokens(messages)

    return {
        messages,
        tokenCount,
    };;
}