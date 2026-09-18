import { Conversation } from "./conversation.model";

export const create = async(data) => {
    return Conversation.create(data);
};

export const findById = async(userId, conversationId) => {
    return Conversation.findOne({
        _id: conversationId,
        userId,
    });
};

export const findAllByUserId = async (userId) => {
    return Conversation.find({ userId })
        .sort({ updatedAt: -1 });
};

export const addMessage = async (conversationId, message) => {
    return Conversation.findByIdAndUpdate(
        conversationId,
        {
            $push: {
                messages: message,
            },
        },
        {
            new: true,
        }
    );
};

export const remove = async (conversationId) => {
    return Conversation.findByIdAndDelete(conversationId);
};