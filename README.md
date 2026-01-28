# Error Garden 🌿

A small app for practicing JavaScript/TypeScript **traps** (shown as **weeds** in the UI) using fast, repeatable quiz sessions.

## What it does
- You pick a **filter** (tags + match mode) and start a focused session.
- You answer short questions (“seeds”).
- You get immediate feedback (correct answer + explanation + the trap).
- You repeat, learn patterns, and build intuition for edge cases.

## Key ideas
- **Domain-first architecture**: pure logic lives outside React/Next.
- **Thin UI**: UI renders state and calls domain actions, but does not implement business rules.
- **Consistent naming**:
  - Code: `trap`, `trapId`, `traps`
  - UI: traps are displayed as **weeds**
- **AI-assisted, human-owned**: strict AI boundaries are defined in `AGENTS.md`.

## Quick start
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` – run locally
- `npm run build` – production build
- `npm run test` – unit tests (Vitest)
- `npm run lint` – linting

## Architecture (high level)
- `src/core/domain` – pure logic (no React/Next, no I/O)
- `src/app` – Next.js UI + app-layer state

Full details (single source of truth):
- See `docs/ARCHITECTURE.md`

## Roadmap
- See `ROADMAP.md`

## AI usage
Strict AI contract (boundaries + workflow):
- See `AGENTS.md`

## Contributing
PR workflow and conventions:
- See `PR_GUIDE.md`

## License
TBD (MIT recommended for open-source).
