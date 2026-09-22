import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { countMessageTokens } from "./token.counter.js";

const messages = [
    new HumanMessage("Tell me about Christopher Nolan."),
    new AIMessage("Christopher Nolan is a filmmaker known for movies such as Inception and Interstellar."),
    new HumanMessage("Which one should I watch first?"),
];

const toatlTokens = await countMessageTokens(messages);

console.log("Total tokens:", toatlTokens);
