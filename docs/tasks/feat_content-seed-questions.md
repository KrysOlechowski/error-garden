1. PR
   - name: feat/content-seed-questions
   - scope: Add a domain questions module with explicit seed questions and unit tests.

2. Summary
  - Add questions types and explicit seed list.
  - Provide seed listing helper for consumers.
  - Add tests covering shape, base tags, and count.
  - Export questions types from the domain index.

3. Files
   - New:
     - src/core/domain/questions/types.ts
     - src/core/domain/questions/seedQuestions.ts
     - src/core/domain/questions/index.ts
     - src/core/domain/questions/__tests__/seedQuestions.test.ts
     - src/docs/tasks/feat_content-seed-questions.md
  - Updated:
    - src/core/domain/index.ts

4. Changes
  - New files: add question types, explicit seed questions, and tests.
  - Existing files: export questions from the domain entry point.

5. Tests
   - `npm run test` — runs seed question tests.

6. Notes
   - Plan:
     1) Define question types.
     2) Add explicit seed questions list.
     3) Export questions types from the domain entry point.
     4) Add tests for seed shape, base tags, and count.

7. Docs
   - None.
