import { HumanMessage } from "@langchain/core/messages";
import { agent } from "./agent.js";

const result = await agent.invoke(
    {
        messages: [
            new HumanMessage("Hello, how are you?")
        ],
    },
    {
        context: {
            userId: "000000000000000000000000",
        },
    }
);

console.log(result.messages[result.messages.length - 1]);