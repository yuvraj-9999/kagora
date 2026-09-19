import * as conversationRepository from "./conversation.repository.js";

export const createConversation = async (userId, message) => {
    const title = message.trim().slice(0,100);

    return conversationRepository.create({
        userId,
        title,
    });
};

export const getConversationById = async (userId, conversationId) => {
    const conversation = await conversationRepository.findById(
        conversationId,
        userId,
    );

    if(!conversation){
        throw new Error("COnversation not found");
    }

    return conversation;
};

export const getConversations = async (userId) => {
    const conversations = await conversationRepository.findAllByUserId(userId);

    return conversations;
};

export const addMessage = async (conversationId, userId, message) => {
    const conversation = await conversationRepository.findById(userId, conversationId,);

    if(!conversation){
        throw new Error("Conversation not found");
    }

    return conversationRepository.addMessage(
        conversationId,
        message,
    );
};

export const deleteConversation = async (userId, conversationId) => {
    const conversation = await conversationRepository.findById(userId, conversationId);

    if(!conversation){
        throw new Error("Conversation not found");
    }

    await conversationRepository.remove(conversationId);

    return {
        message: "Conversation deleted successfully",
    };
};