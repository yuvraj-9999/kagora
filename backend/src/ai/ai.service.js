import { agent } from "./agents/agent.js";

export const runAI = async (message, userId) => {
    const result = await agent.invoke({
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    },
    {
        context: {
            userId,
        },
    }
);

return result;
}