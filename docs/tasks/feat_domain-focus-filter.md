1. PR
   - name: feat/domain-focus-filter
   - scope: Add domain helpers to normalize focus filters and filter questions by tag matching (any/all).

2. Summary
   - Add focus filter types to the engine module.
   - Implement tag normalization plus any/all matching helpers.
   - Expose focus filter helpers through the engine index.
   - Add unit tests for normalization and filter matching.

3. Files
   - New:
     - src/core/domain/engine/focusFilter.ts
     - src/core/domain/engine/__tests__/focusFilter.test.ts
     - docs/tasks/feat_domain-focus-filter.md
   - Updated:
     - src/core/domain/engine/types.ts
     - src/core/domain/engine/index.ts

4. Changes
   - New files: focus filter helpers with normalization and tests.
   - Existing files: add focus filter types and exports.

5. Tests
   - `npm run test` — runs domain unit tests.

6. Notes
   - Plan:
     1. Define focus filter types (match + tags) in the engine types module.
     2. Implement normalization and matching helpers in a new engine helper.
     3. Export the new helpers from the engine index.
     4. Add unit tests covering normalization and any/all matching behavior.

7. Docs
   - None.
