import { ChatOpenRouter } from "@langchain/openrouter";
import env from "../../config/env.js";

const model = new ChatOpenRouter({
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    apiKey: env.OPENROUTER_API_KEY,

    openrouter_provider: {
        sort: "throughput",
    },
});

const convo = `
User: Hi my name is Yuvraj
Assistant: Hi Yuvraj! How can I help you today? Are you looking for movie recommendations, information about a specific film, or something else?
User: So what did i say my name was ?
Assistant: You said your name was **Yuvraj**.       
User: So what did i say my name was ?
Assistant: You said your name was **Yuvraj**.       
User: Can you tell me about The Dark Knight
Assistant: # **The Dark Knight (2008)**

**Tagline:** *"Some men just want to watch the world burn."*

## **Basic Information**
- **Release Date:** July 16, 2008
- **Runtime:** 152 minutes (2h 32m)
- **Rating:** 8.5/10 (TMDB)
- **Status:** Released
- **Language:** English
- **IMDb ID:** [tt0468569](https://www.imdb.com/title/tt0468569/)
- **Official Website:** [Warner Bros. Page](https://www.warnerbros.com/movies/dark-knight/)

## **Overview**
Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.

## **Key Creative Team**
| Role | Name |
|------|------|
| **Director** | Christopher Nolan |
| **Writers** | Christopher Nolan, Jonathan Nolan | 

## **Main Cast**
| Actor | Character |
|-------|-----------|
| Christian Bale | Bruce Wayne / Batman |
| **Heath Ledger** | **Joker** |
| Aaron Eckhart | Harvey Dent / Two-Face |
| Michael Caine | Alfred Pennyworth |
| Maggie Gyllenhaal | Rachel Dawes |
| Gary Oldman | Lt. James Gordon |
| Morgan Freeman | Lucius Fox |
| Cillian Murphy | Dr. Jonathan Crane / Scarecrow | 

## **Why It's Significant**
- **Heath Ledger's Joker** – Won a posthumous Academy Award for Best Supporting Actor
- **Critical Acclaim** – Widely considered one of the greatest superhero films ever made
- **Box Office** – Grossed over $1 billion worldwide
- **Cultural Impact** – Redefined the superhero genre with its grounded, crime-thriller tone

## **Poster**
![The Dark Knight Poster](https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg)

*Would you like to know about the other films in Nolan's Batman trilogy, similar movie recommendations, or any specific details about this film?*
User: Tell me the movies directed by christopher nolan
Assistant: Christopher Nolan has directed the following feature films (in chronological order):

## **Feature Films Directed by Christopher Nolan**  

| Year | Title | Genre | TMDB Rating | Key Notes |  
|------|-------|-------|-------------|-----------|  
| **1998** | **Following** | Neo-noir thriller | 7.1 | Debut feature, micro-budget ($6,000) |
| **2000** | **Memento** | Psychological thriller | 8.2 | Non-linear narrative; Oscar-nominated screenplay |
| **2002** | **Insomnia** | Crime thriller | 7.0 | Remake of Norwegian film; stars Pacino, Williams, Swank |
| **2005** | **Batman Begins** | Superhero/origin | 7.7 | Rebooted Batman franchise; grounded realism | 
| **2006** | **The Prestige** | Mystery/drama | 8.2 | Period piece about rival magicians; Bale, Jackman, Bowie |
| **2008** | **The Dark Knight** | Superhero/crime | **8.5** | Heath Ledger's iconic Joker; $1B+ gross |
| **2010** | **Inception** | Sci-fi heist | 8.4 | Dream-sharing concept; 4 Oscars (technical) |
| **2012** | **The Dark Knight Rises** | Superhero/epic | 7.8 | Conclusion to Batman trilogy; Bane as villain |
| **2014** | **Interstellar** | Sci-fi epic | 8.5 | Space exploration; Kip Thorne scientific consultant |
| **2017** | **Dunkirk** | War/thriller | 7.5 | WWII evacuation; minimal dialogue, maximal tension |    
| **2020** | **Tenet** | Sci-fi/spy | 7.2 | Time inversion concept; pandemic-era release |
| **2023** | **Oppenheimer** | Biographical thriller | 8.0 | Manhattan Project; **7 Oscars** including Best Picture |
| **2026** | **The Odyssey** | Mythic epic | 8.0 | *Upcoming* - Homer adaptation; Matt Damon, Tom Holland |

## **Early Short Films**
- **Tarantella** (1989) - Student film at UCL       
- **Larceny** (1996) - Short thriller
- **Doodlebug** (1997) - 3-minute psychological short

## **Signature Style**
- **Non-linear storytelling** (Memento, Dunkirk, Tenet)
- **Practical effects** over CGI (Interstellar's corn fields, Dark Knight's truck flip)
- **IMAX cinematography** (pioneered blockbuster IMAX use)
- **Time as theme** (memory, relativity, inversion, Subjective time)
- **Recurring collaborators**: Christian Bale, Michael Caine, Christian Bale, Hans Zimmer, Wally Pfister/Hoyte van Hoytema

## **Awards & Recognition**
- **8 Academy Award nominations** for directing/writing
- **Oppenheimer** won **Best Picture & Best Director** (2024)
- **$5.6+ billion** worldwide box office
- Consistently rated among greatest living directors

*Would you like details on any specific film, his producing/writing credits, or recommendations based on your favorites?*
User: Tell me about interstellar
User: Tell me about interstellar
User: Can you tell me more about David Fincher      
Assistant: # **David Fincher: The Architect of Modern Psychological Thrillers**

## **Biography**
- **Born:** August 28, 1962 (Denver, Colorado, USA) 
- **Background:** Started in visual effects (ILM) → Music videos (Madonna's "Express Yourself," "Vogue") → Commercials → Feature films
- **Signature:** Meticulous perfectionist (famously does 50+ takes), technical innovator, master of dark psychological narratives

---

## **Feature Filmography (Director)**

| Year | Film | Genre | TMDB Rating | Key Notes |   
|------|------|-------|-------------|-----------|   
| **1992** | **Alien³** | Sci-fi/Horror | 6.4 | Troubled production; studio interference; disowned by Fincher |
| **1995** | **Se7en** | Crime/Thriller | **8.4** | Breakthrough; "What's in the box?"; rain-soaked neo-noir |
| **1997** | **The Game** | Mystery/Thriller | 7.6 | Paranoid thriller; reality-bending corporate satire |
| **1999** | **Fight Club** | Drama/Thriller | **8.4** | Cult classic; anti-consumerist manifesto; twist ending |
| **2002** | **Panic Room** | Thriller | 6.8 | Real-time home invasion; digital compositing innovations |
| **2007** | **Zodiac** | Crime/Mystery | 7.5 | Obsessive procedural; 70s period perfection; case-file structure |
| **2008** | **The Curious Case of Benjamin Button** | Fantasy/Romance | 7.6 | Reverse-aging VFX pioneer; 13 Oscar nominations |
| **2010** | **The Social Network** | Biographical/Drama | 7.4 | **Golden Globe/BAFTA Best Director**; Sorkin dialogue at 1.5x speed |
| **2011** | **The Girl with the Dragon Tattoo** | Crime/Thriller | 7.4 | Swedish winter aesthetic; Rooney Mara's transformative performance |
| **2014** | **Gone Girl** | Mystery/Thriller | 7.9 | Marriage as performance; "Cool Girl" monologue; twist machinery |
| **2020** | **Mank** | Biographical/Drama | 6.7 | Black-and-white 1930s Hollywood; Citizen Kane backstory; 10 Oscar noms |
| **2023** | **The Killer** | Action/Thriller | 6.6 | Methodical assassin; voiceover internal monologue; Netflix |

---

## **Television (Executive Producer & Director)**   
| Series | Years | Role | Notes |
|--------|-------|------|-------|
| **House of Cards** | 2013–2018 | EP + Directed Pilot | **Emmy for Directing**; launched Netflix originals era |
| **Mindhunter** | 2017–2019 | EP + Directed 7 eps | FBI serial killer profiling; period-perfect 70s; cancelled too soon |
| **Love, Death & Robots** | 2019–present | EP | Animated anthology; "Bad Travelling" (S3) directed by Fincher |

---

## **Visual & Narrative Signature**

### **Technical Mastery**
- **Digital Pioneer:** Early adopter (Zodiac - first major digital feature; Benjamin Button - aging VFX)
- **Color Palettes:** Desaturated greens (Se7en), cold blues (Zodiac), warm ambers (Benjamin Button)    
- **Camera Movement:** Precise, controlled, often computer-programmed (motion control)
- **Lighting:** Practical sources, deep shadows, "Fincher darkness" (underexposed by design)

### **Thematic Obsessions**
- **Obsession & Procedure:** Detectives, journalists, killers following rigid systems
- **Identity Construction:** Facebook profiles, fight club personas, reverse-aging, fabricated narratives
- **Institutional Failure:** Police, corporations, media, family structures collapsing
- **Control vs. Chaos:** Characters creating order (investigations, algorithms) against entropy

### **Collaborative Constants**
| Collaborator | Role | Films Together |
|--------------|------|----------------|
| **Jeff Cronenweth** | Cinematographer | Fight Club → Gone Girl (7 films) |
| **Kirk Baxter** | Editor | Social Network → The Killer (6 films, 2 Oscars) |
| **Trent Reznor/Atticus Ross** | Composers | Social Network → The Killer (Oscar winners) |
| **Donald Graham Burt** | Production Designer | Zodiac → Mank (Oscar winner) |
| **Ren Klyce** | Sound Designer | Se7en → present (immersive audio pioneer) |

---

## **Awards & Recognition**
- **3× Oscar Nominee** (Best Director): *Curious Case, Social Network, Mank*
- **40 Total Oscar Nominations** across his films   
- **2× Golden Globe Winner** (Director): *Social Network, Mank*
- **BAFTA Winner:** *Social Network*
- **Emmy Winner:** *House of Cards* Pilot
- **Cannes Palm d'Or Nominee:** *Fight Club*        
- **Critical Consensus:** Consistently ranked among greatest living directors (Sight & Sound, Cahiers du Cinéma)

---

## **Why He Matters**
1. **Elevated Genre** - Turned serial killer thrillers (Se7en), conspiracy paranoia (The Game), and superhero-adjacent (Fight Club) into art-house events   
2. **Digital Cinema Architect** - Proved digital could surpass film aesthetically (Zodiac, Benjamin Button)
3. **Streaming Pioneer** - House of Cards established the "prestige TV" model; Mindhunter showed cinematic TV
4. **Process as Art** - His making-of docs (Wreckage and Rage, Zodiac Deciphered) are film school curriculum
5. **Actors' Director** - Elicits career-defining work: Pitt (Se7en/Fight Club), Gyllenhaal (Zodiac), Eisenberg (Social Network), Rosamund Pike (Gone Girl), Gary Oldman (Mank)

---

## **Essential Viewing Order for Newcomers**        
1. **Se7en** (1995) - The masterpiece
2. **Zodiac** (2007) - The mature masterpiece       
3. **The Social Network** (2010) - The modern classic
4. **Fight Club** (1999) - The cultural phenomenon  
5. **Gone Girl** (2014) - The commercial peak       
6. **Mank** (2020) - The personal passion project   

*Would you like deep dives on any specific film, his music video/commercial work, or comparisons with other directors like Nolan or Fincher's influence on modern thriller aesthetics?*
User: can you tell me about the best movie of david fincher ?
Assistant: Determining David Fincher's "best" film is **highly subjective**, but there are **four films that consistently battle for the top spot** in critical polls, director rankings, and fan debates. Here's the breakdown of the contenders:

---

## **The "Big Four" Contenders**

| Film | Year | The Case for "Best" | Major Accolades |
|------|------|----------------------|-----------------|
| **Se7en** | 1995 | **The definitive Fincher thriller.** Perfect fusion of style, atmosphere, and narrative. The rain-soaked neo-noir aesthetic, the methodical procedural structure, and *that* ending cemented his auteur status. | • **#17 on IMDb Top 250**<br>• 2 Oscar noms (Editing, Sound)<br>• **Cahiers du Cinéma Top 10 (1995)** |
| **Zodiac** | 2007 | **His most mature, disciplined work.** A 157-minute obsession procedural that *is* about obsession. Rejects thriller catharsis for journalistic rigor. The "basement scene" is pure tension cinema. | • **#1 on *Sight & Sound* 2012 "Best Films of the Decade"**<br>• **#12 on *The Guardian*'s 100 Best Films of 21st Century**<br>• 0 Oscar noms (famously snubbed) |
| **The Social Network** | 2010 | **The perfect modern screenplay film.** Sorkin's dialogue at Fincher's pacing (1.5x speed). Eisenberg's Mark Zuckerberg is a tragic antihero. The "creation myth of the 21st century" with Reznor/Ross's iconic score. | • **3 Oscars** (Adapted Screenplay, Editing, Score)<br>• **Golden Globe/BAFTA/DGA Best Director**<br>• **#1 on *Film Comment* & *Sight & Sound* 2010 polls** |       
| **Fight Club** | 1999 | **The cultural phenomenon.** Misunderstood on release, now a generational touchstone. Anti-consumerist satire, toxic masculinity deconstruction, unreliable narrator mastery. "I am Jack's [noun]" entered the lexicon. | • **#11 on IMDb Top 250**<br>• 1 Oscar nom (Sound)<br>• **Empire's #10 Greatest Movie of All Time (2008)** |

---

## **Critical & Peer Consensus**

| Poll/Source | #1 Fincher Film | Notes |
|-------------|----------------|-------|
| **Directors' Poll (IndieWire, 2023)** | **Zodiac** | Voted by 100+ working directors |
| **Sight & Sound (2012, 2022)** | **Zodiac** | Only 21st-century film in critics' Top 50 (2012) |      
| **IMDb User Ratings** | **Se7en** (8.6) / **Fight Club** (8.8) | Massive sample sizes |
| **Rotten Tomatoes Critics** | **The Social Network** (96%) | Highest Tomatometer |
| **Metacritic** | **The Social Network** (95) | Highest Metascore |
| **Fincher Himself** | **"The one I haven't made yet"** | Per multiple interviews; calls *Zodiac* "the closest to what I intended" |

---

## **Why Each Might Be YOUR Favorite**

| If you value… | Start with… |
|---------------|-------------|
| **Atmosphere, dread, perfect thriller mechanics** | **Se7en** |
| **Intellectual rigor, process-as-cinema, rewatch density** | **Zodiac** |
| **Dialogue velocity, modern mythmaking, editing as music** | **The Social Network** |
| **Subversion, philosophy, cultural impact, twist rewatchability** | **Fight Club** |
| **Visual innovation, period immersion, tragic grandeur** | **The Curious Case of Benjamin Button** |  
| **Narrative puzzle-box, toxic relationship anatomy** | **Gone Girl** |

---

## **The "Hidden Gem" Case**
**The Game (1997)** – Often called "Fincher's most underrated." A paranoid thriller where the *viewer* is the mark. Pre-*Fight Club* deconstruction of control/identity. Michael Douglas's best late-career performance.

---

## **My Algorithmic "Consensus Pick"**
**Zodiac** edges it for **critical/historical consensus**, **Se7en** for **pure cinematic craft**, **The Social Network** for **screenplay+direction synthesis**, **Fight Club** for **cultural gravity**.      

---

**Which matters more to you: critical mastery, cultural impact, rewatchability, or personal resonance?** I can tailor a recommendation.
User: has brad pitt and fincher worked together ?   
User: has brad pitt and fincher worked together ?   
User: tell me about brad pitt?
`;

console.time("Summarizer");

const response = await model.invoke(`
You are a conversation summarizer.

Your task is to maintain an accurate, concise, rolling summary of an ongoing conversation.

Existing summary: "No existing summary."

New conversation messages:
${convo}

Create ONE updated summary by combining the existing summary with the new messages.

Rules:
- Preserve important information from the existing summary that remains relevant.
- Incorporate important new information from the new messages.
- If the new messages contradict, clarify, or supersede information in the existing summary, update or remove the outdated information.
- Do not preserve a claim merely because it appears in the existing summary.
- Treat the new conversation as the most recent source of truth about the user's current interests, preferences, requests, and decisions.
- Preserve important user preferences, facts, decisions, topics, and unresolved requests.
- Do not invent information.
- Do not repeat information unnecessarily.
- Keep the summary concise.

Return ONLY the updated summary.
`);

console.timeEnd("Summarizer");

console.log("\nSummary:\n");
console.log(response.content);