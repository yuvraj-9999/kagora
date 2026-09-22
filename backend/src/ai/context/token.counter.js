import { model } from "../agents/model.js";

export const countMessageTokens = async (messages) => {
    let totalTokens = 0;

    for(const message of messages){
        totalTokens += await model.getNumTokens(message.content);
    }

    return totalTokens;
};