# Kagora

> **Kagora** is an AI-powered movie discovery and exploration platform. It combines rich cinematic metadata from TMDb with personalized user experiences and an intelligent conversational AI agent powered by LangChain and OpenRouter.

---

## Features Implemented So Far

### 1. Authentication & User Management
- **JWT-Based Authentication**: Secure access and refresh token lifecycle.
- **Password Hashing**: Secure password encryption using `bcrypt`.
- **User Profile**: Protected `/me` endpoint to retrieve user profile details.
- **Session Management**: Token refresh and secure logout endpoints.

### 2. Movie Discovery & Details (TMDb Integration)
- **Search**: Search movies by title with pagination support.
- **Trending & Popular**: Fetch trending movies of the day and popular releases.
- **Comprehensive Movie Details**: Detailed movie metadata including cast, crew, runtime, genres, budget, revenue, and ratings.
- **Recommendations**: TMDb-backed recommendation engine for similar movies.
- **Local Persistence & Caching**: Automatic synchronization and storage of movie records in MongoDB.

### 3. People & Filmography
- **Search People**: Search actors, directors, and crew members.
- **Person Details**: Biographies, birth details, and career information.
- **Credits & Filmography**: Combined cast and crew credits for any person.
- **Local Caching**: Person metadata persistence in MongoDB.

### 4. Favorites
- **Toggle Favorites**: Add or remove movies to/from a user's personal favorites.
- **Favorites List**: Paginated view of user's favorited movies with populated details.
- **Favorite Status**: Quick check endpoint to verify if a movie is favorited.

### 5. Watchlists
- **Toggle Watchlist**: Easily save movies to watch later.
- **Watchlist Retrieval**: Paginated list of watchlisted movies.
- **Watchlist Status Check**: Instant verification of a movie's presence in the user's watchlist.

### 6. Reviews & Ratings
- **Movie Reviews**: Post reviews with ratings (1 to 10 scale) and comments.
- **Movie Review Feed**: View all community reviews for a given movie.
- **Manage Reviews**: Update and delete existing reviews with user ownership verification.

### 7. AI Agent & Conversational Assistant

- **LangChain & OpenRouter Integration**: Conversational AI assistant for natural-language movie discovery and exploration.

- **Tool-Based AI Architecture**: The agent can interact with Kagora's movie, people, favorites, watchlist, and review data through specialized tools.

- **Context-Aware Tool Calling**: AI Agent equipped with specialized tools:
  - `searchMoviesAITool`
  - `getMovieDetailsAITool`
  - `getTrendingMoviesAITool`
  - `getPopularMoviesAITool`
  - `getMovieRecommendationsAITool`
  - `searchPeopleAITool`
  - `getPersonDetailsAITool`
  - `getPersonCreditsAITool`
  - `getFavoritesAITool`
  - `getFavoriteStatusAITool`
  - `getWatchlistAITool`
  - `getWatchlistStatusAITool`
  - `getMovieReviewsAITool`
  - `getMyReviewsAITool`

- **Authenticated AI Context**: User-specific AI tools resolve data using the authenticated user's identity rather than relying on user-provided identifiers.

- **Persistent Conversations**: Conversations are stored in MongoDB, allowing users to maintain multiple independent chat sessions.

- **Conversation Management**: Supports creating, retrieving, listing, and deleting user conversations.

- **Token-Aware Context Management**: Conversation history is analyzed using model-aware token counting rather than blindly sending the entire history to the model.

- **Turn-Aware Context Selection**: When context becomes large, recent conversational turns are preserved while handling consecutive user messages and incomplete/orphaned messages safely.

- **Conversation Summarization**: Older conversation history can be compressed into a persistent summary while recent messages remain available verbatim.

- **Dual-Model AI Architecture**:
  - **Main Agent**: Qwen3 235B A22B for tool usage, reasoning, and conversational interaction.
  - **Summarizer**: Nemotron 3.5 Lightning for compressing older conversation history.

- **Free AI Inference**: AI inference uses free OpenRouter model endpoints without paid model usage.

---

## Tech Stack

- **Runtime & Framework**: Node.js, Express.js (ES Modules)
- **Database & ODM**: MongoDB, Mongoose
- **External Data**: TMDb (The Movie Database) API via Axios
- **AI & LLM Orchestration**: LangChain (`@langchain/core`, `@langchain/openrouter`), OpenRouter API
- **AI Models**: Qwen3 235B A22B (main agent), Nemotron 3.5 Lightning (conversation summarization)
- **Validation**: Zod (request body, query parameters, route params)
- **Security & Utilities**: JSON Web Tokens (`jsonwebtoken`), `bcrypt`, `dotenv`

---

## Project Structure

```
kagora/
├── backend/
│   ├── src/
│   │   ├── ai/               # AI agent, OpenRouter model, and LangChain tools
│   │   │   ├── agents/       # Agent and model definitions
│   │   │   └── tools/        # Modular AI tools for movies, people, lists, etc.
│   │   ├── api/              # API router versioning (v1)
│   │   ├── config/           # Environment variables configuration
│   │   ├── integrations/     # External integrations (MongoDB, TMDb)
│   │   ├── middlewares/      # Error handler, 404, auth middlewares
│   │   ├── modules/          # Feature modules (Controller-Service-Repository)
│   │   │   ├── auth/         # Authentication & token management
│   │   │   ├── conversations/# Conversation schemas & persistence
│   │   │   ├── favorites/    # User favorites
│   │   │   ├── movies/       # Movies discovery & TMDb synchronization
│   │   │   ├── people/       # Cast & crew discovery
│   │   │   ├── reviews/      # Movie ratings and user reviews
│   │   │   ├── users/        # User profile
│   │   │   └── watchlists/   # Watchlist management
│   │   ├── shared/           # Shared schemas, validators, and utilities
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # HTTP server entry point
│   └── package.json
├── frontend/                 # Client application
├── docs/                     # Documentation
└── README.md
```

---

## API Endpoints Summary (`/api/v1`)

### Health Check
- `GET /api/v1/health` — API status check

### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` — Register a new account
- `POST /api/v1/auth/login` — Log in and receive access/refresh tokens
- `POST /api/v1/auth/refresh` — Refresh access token
- `POST /api/v1/auth/logout` — Invalidate refresh token *(Auth required)*

### Users (`/api/v1/users`)
- `GET /api/v1/users/me` — Current user profile *(Auth required)*

### Movies (`/api/v1/movies`)
- `GET /api/v1/movies/search?query=:q&page=:page` — Search movies
- `GET /api/v1/movies/trending?page=:page` — Get daily trending movies
- `GET /api/v1/movies/popular?page=:page` — Get popular movies
- `GET /api/v1/movies/:id` — Get detailed movie info & credits
- `GET /api/v1/movies/:id/recommendations?page=:page` — Get recommendations

### People (`/api/v1/people`)
- `GET /api/v1/people/search?query=:q&page=:page` — Search people
- `GET /api/v1/people/:id` — Get person details
- `GET /api/v1/people/:id/credits` — Get person credits

### Favorites (`/api/v1/favorites`) *(Auth required)*
- `POST /api/v1/favorites/:tmdbId` — Toggle favorite
- `GET /api/v1/favorites?page=:page` — List user's favorites
- `GET /api/v1/favorites/:tmdbId` — Check favorite status

### Watchlists (`/api/v1/watchlists`) *(Auth required)*
- `POST /api/v1/watchlists/:tmdbId` — Toggle watchlist
- `GET /api/v1/watchlists?page=:page` — List user's watchlist
- `GET /api/v1/watchlists/:tmdbId` — Check watchlist status

### Reviews (`/api/v1/reviews`)
- `POST /api/v1/reviews/:tmdbId` — Add a review & rating *(Auth required)*
- `GET /api/v1/reviews/movie/:tmdbId` — Get reviews for a movie
- `PATCH /api/v1/reviews/:reviewId` — Update a review *(Auth required)*
- `DELETE /api/v1/reviews/:reviewId` — Delete a review *(Auth required)*

### AI Assistant (`/api/v1/ai`) *(Auth required)*
- `POST /api/v1/ai` — Chat with the Kagora AI movie assistant

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or MongoDB Atlas)
- TMDb API Read Access Token
- OpenRouter API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
   OPENROUTER_API_KEY=your_openrouter_api_key
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```
4. Start the server in development mode:
   ```bash
   npm run dev
   ```

---

## In Progress

- AI context performance and inference optimization
- Frontend application
- AI interaction and UX improvements
- BullMQ background job architecture
- End-to-end testing and production stabilization

---

## More Coming Soon

Kagora is actively evolving into a complete AI-powered movie discovery platform.

New features, improvements, and optimizations are coming soon.
