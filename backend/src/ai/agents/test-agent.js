import { agent } from "./agent.js";

const result = await agent.invoke({
    messages: [
        {
            role: "user",
            content: "Find the movie Inception and tell me its rating.",
        },
    ],
});

console.log(result);