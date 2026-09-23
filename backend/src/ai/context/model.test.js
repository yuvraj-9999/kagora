const originalFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
    const [url, options] = args;

    console.log("\n===== LANGCHAIN REQUEST =====");
    console.log("URL:", url);
    console.log("BODY:");

    try {
        console.dir(JSON.parse(options.body), { depth: null });
    } catch {
        console.log(options.body);
    }

    const response = await originalFetch(...args);

    console.log("\n===== OPENROUTER RESPONSE =====");
    console.log("STATUS:", response.status);

    const clonedResponse = response.clone();
    const responseText = await clonedResponse.text();

    console.log("RAW RESPONSE:");
    console.log(responseText);

    return response;
};

const { model } = await import("../agents/model.js");

const { HumanMessage } = await import("@langchain/core/messages");

const response = await model.invoke([
    new HumanMessage("Tell me about Joseph Kosinski"),
]);

console.log("\n===== FINAL RESPONSE =====");
console.dir(response, { depth: null });