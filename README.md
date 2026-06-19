# BenchBuddy.AI — Frontend

An AI-powered chat assistant for EPAM employees on the bench. BenchBuddy.AI lets employees ask natural-language questions about their bench status, skill profiles, project opportunities, HR policies, and career guidance — and receive structured answers from a backend LLM service.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Available Scripts](#available-scripts)
6. [API Integration](#api-integration)
7. [Application Flow](#application-flow)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Development Guidelines](#development-guidelines)
11. [Future Improvements](#future-improvements)

---

## Project Overview

BenchBuddy.AI is a React 19 single-page application built around a conversational chat interface. An employee types a question; the frontend forwards it to a backend API which processes it through an LLM and returns a structured answer with confidence metadata.

**Key features:**

- Conversational chat UI with user and bot message bubbles
- Structured response metadata cards — Confidence, Source, Status, and Escalation — rendered below each bot reply
- Animated typing indicator during in-flight API requests
- Dismissible inline error banners for all failure modes (network, validation, server)
- "New Chat" resets the session while preserving the welcome greeting
- Responsive layout: fixed header, collapsible-ready sidebar, scrollable chat area

**Target users:** EPAM employees currently on the bench who need quick answers about their status, available projects, or HR processes.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 (`createRoot` API) |
| Styling | Tailwind CSS 3 (utility-first, no custom CSS) |
| Icons | lucide-react |
| Backend communication | REST (JSON over `fetch`) |
| Build tooling | Create React App (react-scripts 5) |
| Testing | Jest + @testing-library/react |
| Language | JavaScript (ES2022+, no TypeScript) |

---

## Project Structure

```
bench-buddy-ai-fe/
├── public/                        # HTML shell and PWA assets
│   └── index.html                 # #root mount point; %PUBLIC_URL% replaced at build
├── src/
│   ├── config/
│   │   └── api.js                 # API_CONFIG — reads REACT_APP_API_URL env var
│   ├── constants/
│   │   ├── messages.js            # GREETING_MESSAGE — bot's opening line (isSystem flagged)
│   │   └── navigation.js          # NAV_ITEMS — sidebar navigation definitions
│   ├── hooks/
│   │   └── useChat.js             # Core hook: messages, loading, error, sendMessage, startNewChat
│   ├── services/
│   │   └── chatService.js         # Pure fetch layer — no React. ChatServiceError class lives here
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.js          # Top bar: logo, online indicator, user avatar
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.js         # Left panel: New Chat button + nav list + version branding
│   │   │   └── NavItem.js         # Single nav row with optional notification badge
│   │   └── ChatWindow/
│   │       ├── ChatWindow.js      # Container: message list, auto-scroll, error banner slot
│   │       ├── MessageBubble.js   # User (right-aligned) and bot (left-aligned) bubble variants
│   │       ├── MetricsRow.js      # Renders four MetricsCard tiles after each bot reply
│   │       ├── MetricsCard.js     # Single metric tile: icon + label + value
│   │       ├── ChatInput.js       # Controlled input + Send button (Enter key or click)
│   │       └── ErrorMessage.js    # Dismissible red banner for API/network errors
│   ├── App.js                     # Root layout — wires useChat into header, sidebar, chat window
│   ├── index.js                   # React root (ReactDOM.createRoot)
│   └── index.css                  # Tailwind directives only (@tailwind base/components/utilities)
├── tailwind.config.js             # Custom color tokens: navy, brand, surface palettes
├── postcss.config.js              # PostCSS plugins: tailwindcss + autoprefixer
├── .env.example                   # Committed template — shows required variable names
├── .env.local                     # Gitignored — holds real credentials
└── CLAUDE.md                      # Claude Code guidance for this repository
```

### Architectural boundaries

- **`services/`** — pure fetch, no React imports. Usable in Node scripts and tests without a DOM.
- **`hooks/`** — owns all stateful logic and error transformation. Components receive data + callbacks only.
- **`components/`** — purely presentational. No direct `fetch` calls, no hook imports from `hooks/`.
- **`config/`** — single source of truth for all environment-dependent values.

---

## Setup & Installation

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A running instance of the BenchBuddy.AI backend (see that repository for setup)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in the backend URL:

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```env
REACT_APP_API_URL=http://localhost:5000
```

> The backend must expose a `POST /api/chat` endpoint. See [API Integration](#api-integration) for the expected request/response contract.  
> `.env.local` is gitignored by Create React App. Never commit credentials.  
> All `REACT_APP_*` variables are embedded in the client bundle at build time — they are not secret at runtime.

### 3. Start the development server

```bash
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000). If port 3000 is occupied, prefix with `PORT=3001`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server with hot reload at `http://localhost:3000` |
| `npm run build` | Production bundle output to `/build` |
| `npm test` | Jest in interactive watch mode |
| `npm test -- --watchAll=false` | Single test run (CI mode) |
| `npm test -- --coverage --watchAll=false` | Coverage report |
| `npm run eject` | Exposes webpack/Babel config — **irreversible** |

ESLint runs automatically during `npm start` and `npm run build` via the `react-app` preset. No separate lint script is needed unless one is added to `package.json`.

---

## API Integration

### Service layer

All HTTP communication is isolated in `src/services/chatService.js`. Neither components nor hooks call `fetch` directly.

```
useChat.js  →  chatService.sendChatMessage(text)  →  Backend API  →  LLM
```

### Configuration

Backend URL is read from the environment once at module load:

```js
// src/config/api.js
export const API_CONFIG = {
  url: process.env.REACT_APP_API_URL || 'http://localhost:3001'
};
```

### Request

```
POST ${REACT_APP_API_URL}/api/chat
Content-Type: application/json

{ "message": "Can I update my skill profile?" }
```

### Response

The backend is expected to return:

```json
{
  "data": {
    "answer": "Yes, you can update your skill profile by navigating to...",
    "confidence": 87,
    "matchedQuestion": "How do I update my skills?",
    "additionalInfo": "Changes take effect after manager approval."
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `data.answer` | string | **Required.** The bot's reply text. |
| `data.confidence` | number | Optional. 0–100 score; defaults to `50` if absent. |
| `data.matchedQuestion` | string | Optional. FAQ question the backend matched; defaults to `''`. |
| `data.additionalInfo` | string | Optional. Appended to the answer as an italic footnote if present. |

Missing optional fields are silently defaulted — only `data.answer` being absent raises a `ChatServiceError`.

### Error contract

`chatService.js` throws a `ChatServiceError` (extends `Error`) on any failure. It carries an optional `statusCode` field so callers can distinguish categories of failures:

```js
// network failure
throw new ChatServiceError('Failed to reach server');          // statusCode: null

// HTTP error
throw new ChatServiceError('Unprocessable Entity', 422);       // statusCode: 422

// bad response shape
throw new ChatServiceError('Invalid response from server');    // statusCode: null
```

---

## Application Flow

```
App loads
  └─ useChat initialises state with GREETING_MESSAGE
       └─ ChatWindow renders the greeting bubble + empty-state prompt

User types a message → presses Enter or clicks Send
  └─ ChatInput calls onSend(text)
       └─ useChat.sendMessage(text)
            ├─ Validates text is non-empty and not already loading
            ├─ Clears any existing error
            ├─ Appends user message immediately (optimistic UI)
            ├─ Sets isLoading = true → TypingIndicator appears
            ├─ Calls chatService.sendChatMessage(text)
            │
            ├─ On success:
            │    ├─ Parses answer, confidence, matchedQuestion, additionalInfo
            │    ├─ Appends additionalInfo as italic footnote if present
            │    ├─ Builds bot message with metrics object
            │    └─ Appends to state → ChatWindow auto-scrolls to bottom
            │         └─ MetricsRow renders below the bot bubble
            │
            └─ On failure:
                 ├─ humanizeError() maps status code → user-readable string
                 └─ Sets error state → ErrorMessage banner appears above ChatInput

User dismisses error → useChat.dismissError() clears error; messages remain intact

User clicks "New Chat"
  └─ useChat.startNewChat()
       └─ Resets messages to [GREETING_MESSAGE], clears error and loading state
```

### Message object shape

```js
{
  id:        string,                  // unique identifier
  role:      'user' | 'bot',
  content:   string,
  timestamp: Date,
  metrics:   null | {
    confidence:      number,          // 0–100
    matchedQuestion: string,
    status:          'Answered',
    escalation:      'Yes' | 'No'
  },
  isSystem:  boolean                  // true for greeting; excluded from API payloads
}
```

---

## Error Handling

Errors surface at three layers and converge into a single user-facing banner:

| Layer | Mechanism |
|---|---|
| Network failure | `fetch` throws → caught, re-thrown as `ChatServiceError` (no `statusCode`) |
| HTTP error status | `response.ok === false` → `ChatServiceError(message, statusCode)` |
| Bad response shape | Missing `data.answer` → `ChatServiceError` |

`useChat.humanizeError()` maps error details to readable strings:

| Condition | Message shown to user |
|---|---|
| Status 422 | "I couldn't find relevant information for your question. Try rephrasing it." |
| Status 400 | "Invalid request format. Please check your message." |
| Status 5xx | "The AI service is temporarily unavailable. Please try again later." |
| Network error (no `statusCode`) | "Network error. Please check that the backend is running on `<url>`." |
| Other | Original `error.message`, or a generic fallback |

The error renders as a dismissible red banner (`ErrorMessage.js`) between the message list and the input bar. Dismissing clears the error without affecting any messages.

---

## Testing

Tests use **Jest** and **@testing-library/react**. The setup file `src/setupTests.js` imports `@testing-library/jest-dom` matchers automatically before every test file.

```bash
# Interactive watch mode
npm test

# Single run (CI)
npm test -- --watchAll=false

# Coverage report
npm test -- --coverage --watchAll=false
```

Test files live alongside the source they test using the `*.test.js` convention:

```
src/
  components/ChatWindow/ChatInput.test.js
  services/chatService.test.js
  hooks/useChat.test.js
```

When testing `chatService.js`, mock the global `fetch` — the service has no React dependency and does not need a render environment. When testing hooks, use `@testing-library/react`'s `renderHook` utility.

---

## Development Guidelines

### Component structure

- All components are **functional** with hooks; no class components.
- State lives in `useChat.js` and flows **down** via props. No Context API is needed — the component tree is shallow enough that direct prop threading remains readable.
- Components under `ChatWindow/` receive only the slice of state they render — they never import from `services/` or `hooks/`.

### Naming conventions

| Pattern | Convention |
|---|---|
| Components | PascalCase file and function name (`MessageBubble.js`) |
| Hooks | `use` prefix, camelCase (`useChat`) |
| Service exports | camelCase functions (`sendChatMessage`) |
| Constants | SCREAMING_SNAKE_CASE (`GREETING_MESSAGE`, `NAV_ITEMS`) |
| Config | SCREAMING_SNAKE_CASE object (`API_CONFIG`) |
| CSS classes | Tailwind utility classes only — no custom CSS files |

### Tailwind usage

Custom color tokens are defined in `tailwind.config.js` under `theme.extend.colors`:

```js
navy:    { 600: '#1e3a5f', 700: '#1a2f47', 800: '#132338', 900: '#0d1b2e' }
brand:   { blue: '#2563eb' }
surface: { bg: '#f0f2f5', card: '#ffffff' }
```

Always use these token names (e.g. `bg-navy-900`, `text-brand-blue`) rather than arbitrary Tailwind shades or raw hex values.

**Do not build class names dynamically** (e.g. `` `text-${color}-500` ``). Tailwind's JIT compiler performs static analysis — incomplete class strings will be purged and missing from the production build. Pass complete class strings as props instead.

### Reusability

- `MetricsCard` is fully generic: it receives `label`, `value`, `icon`, and `valueColor`. It has no knowledge of confidence logic or escalation rules.
- `NavItem` is data-driven: adding a new sidebar entry requires only a new object in `src/constants/navigation.js`.
- `ErrorMessage` is a pure presentational component — it can be reused anywhere a dismissible alert banner is needed.

---

## Future Improvements

- **Persisted chat history** — store messages in `localStorage` or sync with a backend. The `isSystem` flag on `GREETING_MESSAGE` already accounts for this: it must never be persisted or replayed as an API turn.
- **Streaming responses** — have `chatService.js` consume Server-Sent Events from the backend for faster perceived response time.
- **Authentication** — replace the static user avatar in `Header.js` with real session data; scope API calls per employee.
- **Dynamic metrics** — have the backend return structured JSON for Confidence/Category/Status/Escalation rather than having the frontend apply static defaults.
- **TypeScript migration** — the message shape, API config, and component props are well-defined; converting to `.tsx` is low-risk and high-value.
- **Sidebar panels** — History, FAQs, Analytics, and Settings nav items are wired up in `NAV_ITEMS` but render no content. Each can be built as a separate panel component keyed to `activeNav`.
