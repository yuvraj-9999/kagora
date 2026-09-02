import { createAgent } from "langchain";
import { model } from "./model.js";
import { aiTools } from "../tools/index.js";
import { z } from "zod";

export const agent = createAgent({
    model,
    tools: aiTools,

    contextSchema: z.object({
        userId : z.string(),
    }),
});

