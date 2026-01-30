1. PR
   - name: feat/ui-play-tag-counts
   - scope: Show global tag counts in /play filter buttons (independent of current filter).

2. Summary
   - Add an app-layer helper to count tags from a question list with tests.
   - Compute tag counts from the full question list (global counts).
   - Display counts next to each tag in the filter UI.

3. Files
   - New:
     - src/app/_lib/tagCounts.ts
     - src/app/_lib/__tests__/tagCounts.test.ts
     - docs/tasks/feat_ui-play-tag-counts.md
   - Updated:
     - src/app/play/PlayClient.tsx

4. Changes
   - New files: tag count helper + tests, task plan.
   - Existing files: compute global counts and render them in UI.

5. Tests
   - `npm run test` — runs app-layer unit tests.

6. Notes
   - Plan:
     1. Create helper to count tags from questions.
     2. Add tests for tag counting.
     3. Use filtered questions to compute counts in PlayClient and render them.

7. Docs
   - None.
