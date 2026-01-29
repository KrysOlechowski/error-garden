# PR Guide 🚦

## Philosophy

- Small PRs, fast reviews, no scope creep.
- Keep domain pure, keep UI thin.

## Branch naming

- `feat/<topic>`
- `fix/<topic>`
- `chore/<topic>`

## Commit messages (suggested)

- `feat/scope- ...`
- `fix/scope- ...`
- `chore/scope- ...`
- `docs/scope- ...`
- `test/scope- ...`

## PR description template

- **What:** (1–3 sentences)
- **Why:** (reason / value)
- **How:** (key choices)
- **Tests:** `npm run test`
- **Screens:** (if UI visible changes)

## Checklist

- [ ] PR scope is focused
- [ ] Domain (`src/core/domain`) remains pure
- [ ] URL is the contract for filter (UI does not re-implement filtering)
- [ ] No accidental seed imports via index/entry files
- [ ] Unit tests added/updated
- [ ] Docs updated if conventions changed (ARCHITECTURE/AGENTS/README)
