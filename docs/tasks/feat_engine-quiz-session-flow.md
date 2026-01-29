1. PR
   - name: feat/engine-quiz-session-flow
   - scope: Add a domain quiz session flow that orchestrates answer evaluation and question progression.

2. Summary
   - Add quiz session types to the engine domain module.
   - Implement session flow helpers for create, submit, and advance.
   - Add a progress summary helper for remaining questions.
   - Add a required selections helper for questions.
   - Add a required selections helper for the current question and nullable currentNumber on completion.
   - Clamp currentIndex on completion to avoid out-of-range values.
   - Add unit tests covering the core quiz loop and edge cases.

3. Files
   - New:
     - src/core/domain/engine/quizSession.ts
     - src/core/domain/engine/__tests__/quizSession.test.ts
     - docs/tasks/feat_engine-quiz-session-flow.md
   - Updated:
     - src/core/domain/engine/types.ts
     - src/core/domain/engine/evaluateAnswer.ts
     - src/core/domain/engine/index.ts

4. Changes
   - New files: quiz session flow helpers and tests.
   - Existing files: add session types, progress summary, required selections helper, nullable current number, clamp completion index, and exports.

5. Tests
   - `npm run test` — runs domain unit tests.

6. Notes
   - Plan:
     1. Define quiz session types (session, phase, answer).
     2. Implement session flow helpers (create, submit, advance, getters).
     3. Export the new engine API.
     4. Add unit tests for the quiz loop and edge cases.

7. Docs
   - None.
