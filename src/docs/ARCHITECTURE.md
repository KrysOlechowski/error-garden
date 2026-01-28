# Architecture (Single Source of Truth)

## Principles

- **Domain purity**: `src/core/domain` is pure logic only.
  - No React/Next imports
  - No I/O (localStorage, fetch, filesystem)
  - No time-based globals unless injected
- **Thin UI**: UI reads state, renders, calls domain actions.
- **Explicit imports**: avoid “magic” entry points for seeds/content.

## Terminology

- Code uses normal names:
  - `trap`, `trapId`, `traps`
- UI wording:
  - traps are displayed as **weeds** (copy only, not domain naming)

- “Absurdly hard” is a normal tag:
  - `absurd`

### Category vs tags

Category is a **UI concept** only. In code there is no separate category field.

- The UI category picker maps to a **base tag** from a small whitelist.
- The base tag is stored in `tags` like any other tag.
- A question must include exactly one base tag.

Base tags whitelist:
- `js`
- `ts`
- `react`
- `absurd`

All other tags are regular tags used for refinement, for example `hooks`, `closures`, `types`.

Rule of thumb:
- If it belongs in the main navigation, it is a base tag.
- If it narrows the topic, it is a regular tag.

## Directory structure

```
src/
  app/                 # Next.js routes, UI, app-layer state
    _state/            # Zustand stores (app-layer only)
    _ui/               # UI helpers/components (optional)
    _lib/              # UI-only helpers (URL/copy normalization, etc.)
    play/              # /play route
  core/
    domain/            # Pure logic
      engine/          # quiz session, filtering, evaluation orchestration
      questions/       # question types + seed loaders
      traps/           # trap definitions (optional module, if separate)
      index.ts         # namespaced exports (engine, questions, traps, ...)
```

> Keep this structure updated here only. README should link to this doc.

## Module conventions

- `types.ts` is the **only source of types** per module.
- tests live in `__tests__/` (Vitest).
- seeds/content should be explicit:
  - `questions/index.ts` exports types only
  - seeds imported explicitly from `seedQuestions.ts` / `seedRegistry.ts`

## Import boundaries

- `src/core/domain/**` may import:
  - other domain modules
  - `vitest` only inside tests
- `src/app/**` may import:
  - domain modules
  - UI libs (React/Next)
  - app stores

## /play responsibilities

- Server route (`page.tsx`):
  - parse URL filters (`tags`, `match`)
  - create initial session (to avoid hydration mismatch)
- Client (`PlayClient.tsx`):
  - mandatory filter UI (user always sees what session is scoped to)
  - quiz loop + calling domain engine
  - no business rules embedded in components

## URL filter contract (single contract)

The URL is the contract for session scope:

- `tags=js,react,absurd`
- `match=any|all`

UI must not implement its own filtering rules. It should:

1. read current filter from URL
2. display it
3. update URL when user changes it

## State & persistence

- App-layer stores (Zustand) live in `src/app/_state`.
- Persistence (localStorage) is allowed in app-layer only.
- Persist only serializable data.

## Testing strategy

- Domain: unit tests for core logic (engine/session/evaluation).
- App-layer store: unit tests for update logic + persistence behavior via mocked storage.
- UI: minimal tests for rendering and calling actions (avoid snapshots).

## Code style / language

- Chat language: Polish
- Code comments: English
