# Error Garden Roadmap 🌿

A clear, lightweight plan for building Error Garden.
This document focuses on stages, scope, and outcomes.

---

## 🧱 Stage 0 Foundation

**Goal**

- Set conventions early to avoid chaos.

**PRs**

1. 📝 `docs/foundation-agents-roadmap`

**Done when**

- App runs locally.
- Architecture and AI contract docs exist.
- Test toolchain is ready.

**Out of scope**

- Dashboard.
- Accounts and auth.

---

## 🎮 Stage 1 MVP

**Goal**

- One satisfying loop that works every time.

**PRs**

1. 🧩 `feat/domain-trap-registry`
2. 📚 `feat/content-seed-questions`
3. 🧪 `test/domain-evaluate-answer`
4. ⚙️ `feat/engine-quiz-session-flow`
5. 🏷️ `feat/domain-focus-filter`
6. 🎮 `feat/ui-play-loop`

**Scope**

- `/play` route.
- Mandatory filter UI with a safe default, for example All.
- Filtering via URL: `tags` and `match`.
- Quiz loop: prompt → answer → feedback → next.
- Seed imports are explicit, no accidental imports via index or entry.

**Notes**

- Absurdly hard is a normal tag: `absurd`.
- UI must not implement correctness or filtering rules.

**Done when**

- No hydration mismatch.
- Deterministic tests cover the core loop.
- UI stays thin, domain does the heavy lifting.

**Out of scope**

- Progress dashboard.
- Accounts.

---

## 💾 Stage 2 v1 Guest progress

**Goal**

- Local progress for guests on a single device.

**PRs**

1. 💾 `feat/state-guest-progress`

**Scope**

- App layer persistence with Zustand persist.
- Store includes focus filter, answer history, mistakes aggregation per `trapId`.
- Minimal UI confirmation, for example Saved on this device.

**Out of scope**

- Sync across devices.

---

## 🌱 Stage 3 v2 Content and curation

**Goal**

- Better learning materials and better organization.

**PRs**

1. 🗂️ `feat/content-seed-registry`
2. 🧩 `feat/content-snippets`
3. 🧾 `docs/content-review-workflow`

**Scope**

- Seed organization improves with registry and tags.
- Code snippets per question.
- Content review workflow.

---

## 🧰 Stage 4 Supabase foundation

**Goal**

- Add Supabase to the project in a clean, testable way.
- Establish local dev workflow and safe server-only access patterns.

**PRs**

1. 🧾 `docs/supabase-setup-notes`
2. 🧰 `feat/supabase-client-server-plumbing`
3. 🧪 `test/supabase-env-and-client`

**Scope**

- Supabase project setup and environment variables.
- Optional local dev with Supabase CLI.
- A single health check query from the app layer.
- Server-only access for service role operations.

**Done when**

- Local and hosted environments are configured.
- The app can perform a minimal query safely.
- No domain code imports Supabase or performs I/O.

**Out of scope**

- Any user progress sync.

---

## 🔐 Stage 5 Auth and RLS

**Goal**

- Learn and implement Supabase Auth and RLS properly.
- Store user-owned data securely.

**PRs**

1. 🔐 `feat/auth-supabase-email`
2. 🗃️ `feat/db-schema-v1`
3. 🧱 `feat/rls-policies-v1`
4. 🧪 `test/rls-smoke`

**Scope**

- Auth flow for signed-in users.
- Initial database schema for user-owned data.
- RLS policies that block cross-user access.
- Minimal UI to sign in and sign out.

**Done when**

- A user can sign in and out.
- User-owned rows are protected by RLS.
- Tests confirm basic RLS expectations.

**Out of scope**

- Advanced roles, teams, admin panels.

---

## 🗂️ Stage 6 Database backed features

**Goal**

- Use the database for features that benefit from persistence and querying.

**PRs**

1. 📊 `feat/ui-dashboard-from-db` optional

**Scope**

- A minimal dashboard view powered by database reads.
- Query patterns that stay out of the domain layer.

**Out of scope**

- Full analytics platform.

---

## ⚠️ Risks and constraints

- Avoid mixing domain logic into React.
- Keep docs single source.
  - Architecture details live in `docs/ARCHITECTURE.md`.
- Keep Supabase access in the app layer and never in src/core/domain.
- Keep service role keys server only and never expose them to the client.

---

## 🔗 Links

- Milestones: add link
- Project board: add link
