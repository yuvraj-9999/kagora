import { encodingForModel } from "js-tiktoken";

const encoding = encodingForModel("gpt-4");

export const countMessageTokens = async (messages) => {
    let totalTokens = 0;
    for(const message of messages){
        totalTokens += encoding.encode(message.content).length;
    }

    return totalTokens;
}