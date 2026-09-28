import { agent } from "./agents/agent.js";
import { buildContext } from "./context/context.manager.js";
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

    console.time("Context");

    const { messages, contextTokenCount } = await buildContext(conversation, message);

    console.timeEnd("Context");

    console.log("Context token count:", contextTokenCount);

    console.time("Agent");

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

    console.timeEnd("Agent");

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