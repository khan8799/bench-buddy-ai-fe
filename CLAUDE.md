# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:3000
npm test           # Jest in watch mode
npm test -- --watchAll=false  # Run tests once (CI mode)
npm run build      # Production build to /build
```

## Tech Stack

- **React 19** (uses `createRoot` API, not legacy `ReactDOM.render`)
- **Create React App** — webpack/Babel/ESLint are managed by `react-scripts`, not exposed configs
- **Testing Library** — `@testing-library/react` + `@testing-library/jest-dom` for component tests
- **ESLint** — `react-app` + `react-app/jest` presets (configured in `package.json`)

No TypeScript, no UI library, no router, no state management — this is a fresh scaffold. Add these as the application grows.

## Architecture

This is at the initial scaffolding stage (one commit from `create-react-app`).

- `src/index.js` — React root; mounts `<App>` into `#root`
- `src/App.js` — top-level component, currently CRA default placeholder
- `src/setupTests.js` — extends Jest with `@testing-library/jest-dom` matchers (imported automatically before tests)
- `public/index.html` — HTML shell; `%PUBLIC_URL%` token is replaced at build time
