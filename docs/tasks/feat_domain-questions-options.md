1. PR
   - name: feat/domain-questions-options
   - scope: Add 4-option multiple-choice questions in the domain model and update seeds/tests to enforce option correctness.

2. Summary
   - Extend Question with a required options array (exactly 4 choices).
   - Update seed questions to include four options with at least one correct answer.
   - Strengthen seed tests to validate options and correct answer coverage.
   - Update quiz session test fixtures to include options.

3. Files
   - New:
     - docs/tasks/feat_domain-questions-options.md
   - Updated:
     - src/core/domain/questions/types.ts
     - src/core/domain/questions/seedQuestions.ts
     - src/core/domain/questions/__tests__/seedQuestions.test.ts
     - src/core/domain/engine/__tests__/quizSession.test.ts

4. Changes
   - New files: task plan only.
   - Existing files: add options to Question, update seeds and tests for options constraints.

5. Tests
   - `npm run test` — runs domain unit tests.

6. Notes
   - Plan:
     1. Add options to Question type and update seeds with 4 options each.
     2. Update seed tests to enforce options length and correct answer membership.
     3. Update quiz session test fixtures to include options.

7. Docs
   - None.
