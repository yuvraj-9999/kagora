import { agent } from "./agents/agent.js";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { createConversation, getConversationById, addMessage } from "../modules/conversations/conversation.service.js";

export const runAI = async (message, userId, conversationId) => {

    let conversation;

    if(conversationId){
        
        conversation = await getConversationById(conversationId, userId);

        if(!conversation){
            throw new Error("Conversation not found");
        } 
    } else {
        conversation = await createConversation(userId, message);
        conversationId = conversation._id;
    }


    await addMessage(
        conversationId,
        userId,
        {
            role: "user",
            content: message,
        },
    );

    const messages = [
        ...conversation.messages.map((msg) => {
            if(msg.role === "user"){
                return new HumanMessage(msg.content);
            }
            return new AIMessage(msg.content);
        }),
        new HumanMessage(message),
    ];


    const result = await agent.invoke(
        {
            messages,
        },
        {
            context: {
                userId,
            },
        }
    );

    const assistantResponse = result.messages[result.messages.length - 1];

    const assistantMessage = {
        role: "assistant",
        content: assistantResponse.content,
    };

    await addMessage(
        conversationId,
        userId,
        assistantMessage
    );

return {
    conversationId,
    message: assistantMessage,
};
};