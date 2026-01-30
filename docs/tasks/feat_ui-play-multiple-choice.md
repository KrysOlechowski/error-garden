1. PR
   - name: feat/ui-play-multiple-choice
   - scope: Update /play UI to use multiple-choice options with auto-submit and server-side option shuffling.

2. Summary
   - Add app-layer helper to shuffle question options on the server with tests.
   - Shuffle options in /play server page before creating the session.
   - Replace open-answer UI with multiple-choice buttons and auto-submit flow.
   - Update play copy for the new selection UX.

3. Files
   - New:
     - src/app/_lib/shuffleQuestionOptions.ts
     - src/app/_lib/__tests__/shuffleQuestionOptions.test.ts
     - docs/tasks/feat_ui-play-multiple-choice.md
   - Updated:
     - src/app/play/page.tsx
     - src/app/play/PlayClient.tsx
     - src/app/play/copy.ts

4. Changes
   - New files: shuffle helper + tests, task plan.
   - Existing files: server-side shuffle usage, multiple-choice UI, and updated copy.

5. Tests
   - `npm run test` — runs app-layer unit tests.

6. Notes
   - Plan:
     1. Add a server-side option shuffle helper with deterministic tests.
     2. Shuffle options before creating the initial session on /play.
     3. Replace answer input with option buttons and auto-submit behavior.
     4. Update copy to match the new UX.

7. Docs
   - None.
