# AGENTS.md (AI Contract) 🤝🤖

This file defines strict boundaries for AI tools used with this repo.
If a rule conflicts with a suggestion, the rule wins.

## Non-negotiables (Hard rules)

1. **Domain purity**: AI must not introduce React/Next/I/O into `src/core/domain`.
2. **No hidden coupling**: no “magic” imports for seeds/content (explicit imports only).
3. **Single source of truth**:
  - architecture + folder structure: `docs/ARCHITECTURE.md`
   - roadmap stages: `ROADMAP.md`
   - README stays high-level and links out
4. **Mandatory filter**: `/play` always exposes filter UI and uses URL as the contract.
5. **No scope creep**: keep PRs small and focused.
6. **No breaking refactors** without explicit request.

## AI allowed

- Propose small, reviewable diffs and explain intent.
- Write unit tests (Vitest) for domain/store logic.
- Update docs when behavior/conventions change.
- Ask for specific file contents when needed.

## AI not allowed

- Inventing non-existent files or APIs.
- Editing multiple unrelated areas in one PR.
- Changing naming conventions silently.
- Moving business logic into React components.
- Introducing new dependencies without explicit agreement.

## Workflow rules (How AI should operate)

- If AI needs code context, it must ask for the exact file(s).
- Prefer:
  - full content for new files
  - minimal diffs for existing files
- Always include:
  - what changed
  - why
  - which tests to run
  - response format
    - PR name
    - summary bullets
    - files new and updated
    - changes full file for new and minimal diff for existing
    - tests commands
    - notes and risks
    - docs changed or none

## Naming & UI copy

- Code naming uses: `trap`, `trapId`, `traps`
- UI may label traps as: **weeds**
- “Absurdly hard” is the tag: `absurd`
- Centralize copy/helpers (avoid string scatter).

## Testing expectations

- New logic requires unit tests.
- Any PR that changes logic must add or update tests and ensure `npm run test` passes.
- Avoid E2E unless explicitly requested.
- If Next App Router hooks are used in unit tests, mock `next/navigation`.

## References

- Architecture: `docs/ARCHITECTURE.md`
- PR workflow: `PR_GUIDE.md`
- Roadmap: `ROADMAP.md`
