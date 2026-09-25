import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { generateSummary } from "./summarizer.js";

const existingSummary = `
The user is interested in Christopher Nolan's movies and is exploring
his filmography.
`;

const olderMessages = [
    new HumanMessage(
        "I've been getting into Christopher Nolan movies lately. I really liked Inception."
    ),

    new AIMessage(
        "Inception is a 2010 science-fiction thriller directed by Christopher Nolan. It follows Dom Cobb, a specialist in extracting and planting information through dreams."
    ),

    new HumanMessage(
        "I also watched Interstellar. I liked the emotional side of it more than I expected."
    ),

    new AIMessage(
        "Interstellar is a 2014 science-fiction film directed by Christopher Nolan. It focuses on space exploration, relativity, humanity's survival, and the relationship between Cooper and his daughter Murph."
    ),

    new HumanMessage(
        "So I guess I prefer Nolan's more emotional movies rather than just the complicated ones."
    ),

    new AIMessage(
        "That suggests you may be particularly interested in Nolan films where the emotional relationships are as important as the conceptual or structural elements."
    ),

    new HumanMessage(
        "What should I watch next?"
    ),

    new AIMessage(
        "Dunkirk could be a good next film if you want something different. It is a 2017 World War II film with three interwoven timelines and relatively little dialogue. If you want something closer to the emotional and science-fiction elements of Interstellar, you could also consider The Prestige."
    ),

    new HumanMessage(
        "Wait, don't recommend based only on what you think I'd like. I want to explore his filmography chronologically."
    ),

    new AIMessage(
        "Understood. If you're exploring Nolan chronologically, some major films include Following, Memento, Insomnia, Batman Begins, The Prestige, The Dark Knight, Inception, The Dark Knight Rises, Interstellar, Dunkirk, Tenet, and Oppenheimer."
    ),

    new HumanMessage(
        "Actually, I already watched Memento before starting this conversation."
    ),

    new AIMessage(
        "Got it. Since you've already watched Memento, you can treat it as completed and continue with the films that follow it chronologically."
    ),

    new HumanMessage(
        "I haven't watched The Prestige, The Dark Knight, or Oppenheimer yet."
    ),

    new AIMessage(
        "Those three films remain unwatched based on what you've told me. The Prestige is a 2006 psychological thriller, The Dark Knight is a 2008 superhero crime film, and Oppenheimer is a 2023 biographical drama."
    ),

    new HumanMessage(
        "I definitely want to watch The Prestige, but I'm not sure whether I should watch The Dark Knight before continuing with the rest."
    ),

    new AIMessage(
        "Since you want to explore Nolan chronologically, The Dark Knight comes before Inception. However, you have not said that you want to strictly follow the chronology without exceptions."
    ),

    new HumanMessage(
        "Yeah, chronology is my preference, but I don't want the conversation to forget that I care about emotional storytelling too."
    ),

    new AIMessage(
        "Your current preference is to explore Nolan's filmography chronologically while also paying attention to the emotional storytelling in his films."
    ),

    new HumanMessage(
        "Also, don't treat your earlier suggestion of Dunkirk as something I agreed to. I never said I wanted to watch it next."
    ),

    new AIMessage(
        "Understood. Dunkirk was only a previous recommendation and should not be treated as a decision or commitment from you."
    ),

    new HumanMessage(
        "Anyway, what was the first Nolan movie I told you I watched?"
    ),

    new AIMessage(
        "You first mentioned watching Inception, although you later clarified that you had already watched Memento before starting this conversation."
    ),

    new HumanMessage(
        "Right. And I don't really care about release dates unless they help with the chronological order."
    ),

    new AIMessage(
        "Understood. Release dates are useful mainly for determining the chronological viewing order rather than as information you need independently."
    ),

    new HumanMessage(
        "One more thing: I don't want recommendations to override what I've explicitly told you. If I say I haven't chosen a movie, remember that I haven't chosen it."
    ),

    new AIMessage(
        "Understood. Explicit user decisions and preferences should take priority over previous recommendations."
    ),
];

const summary = await generateSummary(
    existingSummary,
    olderMessages
);

console.log("\n========== EXISTING SUMMARY ==========");
console.log(existingSummary);

console.log("\n========== GENERATED SUMMARY ==========");
console.log(summary);

console.log("\n========== ORIGINAL MESSAGE COUNT ==========");
console.log(olderMessages.length);

console.log("============================================\n");