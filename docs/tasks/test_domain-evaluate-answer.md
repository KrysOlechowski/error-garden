1. PR
   - name: test/domain-evaluate-answer
   - scope: Add domain answer evaluation with normalization, multi-answer support, and unit tests.

2. Summary
  - Add domain engine module with evaluateAnswer and normalization helpers.
  - Support multiple correct answers with required selection count.
  - Update question shape and seeds to use correctAnswers arrays.
  - Add unit tests for evaluation logic and seed integrity.

3. Files
   - New:
     - src/core/domain/engine/types.ts
     - src/core/domain/engine/evaluateAnswer.ts
     - src/core/domain/engine/index.ts
     - src/core/domain/engine/__tests__/evaluateAnswer.test.ts
     - docs/tasks/test_domain-evaluate-answer.md
   - Updated:
     - src/core/domain/questions/types.ts
     - src/core/domain/questions/seedQuestions.ts
     - src/core/domain/questions/__tests__/seedQuestions.test.ts
     - src/core/domain/index.ts

4. Changes
  - New files: add engine module with evaluation logic + tests.
  - Existing files: switch to correctAnswers[] and adjust exports/tests.

5. Tests
   - `npm run test` — runs domain unit tests.

6. Notes
   - Plan:
     1) Update Question type + seed data to correctAnswers[].
     2) Implement evaluateAnswer with normalization + completeness rule.
     3) Add evaluateAnswer unit tests (single/multi/incomplete/normalization).
     4) Update domain exports.

7. Docs
   - None.
