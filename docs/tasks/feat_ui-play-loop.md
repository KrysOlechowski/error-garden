1. PR
   - name: feat/ui-play-loop
   - scope: Add the /play route UI that reads focus from the URL, renders the filter controls, and runs the quiz loop using domain engine helpers.

2. Summary
   - Add app-layer helpers to parse/build focus filters from URL params with unit tests.
   - Build a /play server page that seeds a filtered session from URL params.
   - Implement the PlayClient UI for filter controls, answering, feedback, and completion states.
   - Centralize play UI copy in a single module.
   - Add play theme tokens and entry animation styles for the route.

3. Files
   - New:
     - src/app/_lib/focusFilterUrl.ts
     - src/app/_lib/__tests__/focusFilterUrl.test.ts
     - src/app/play/page.tsx
     - src/app/play/PlayClient.tsx
     - src/app/play/copy.ts
     - docs/tasks/feat_ui-play-loop.md
   - Updated:
     - src/app/globals.css

4. Changes
   - New files: URL filter helpers + tests, /play page + client UI, and centralized copy.
   - Existing files: add play theme tokens and entry animation styles.

5. Tests
   - `npm run test` — runs unit tests (including app-layer URL helper tests).

6. Notes
   - Plan:
     1. Add app-layer focus filter URL helpers and tests.
     2. Create the /play server route that seeds sessions from URL params.
     3. Build the PlayClient UI for filtering, answering, and feedback states.
     4. Add play-specific styling tokens and animations.

7. Docs
   - None.
