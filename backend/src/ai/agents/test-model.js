import { model } from "./model.js";
import { searchMoviesAITool } from "../tools/movie.tools.js";

const modelWithTools = model.bindTools([
    searchMoviesAITool,
]);

const response = await modelWithTools.invoke(
    "Find the movie Inception."
);

console.log(response);