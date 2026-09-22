import { HumanMessage } from "@langchain/core/messages";
import { model } from "../agents/model.js";

const response = await model.invoke([
    new HumanMessage("Hello, respond with a short greeting.")
]);

console.log(response);