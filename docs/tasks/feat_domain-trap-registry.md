1. PR
   - name: feat/domain-trap-registry
   - scope: Add a domain trap registry with initial traps and unit tests, plus Vitest setup.

2. Summary
   - Add traps module with types and registry helpers.
   - Seed registry with a starter set of traps.
   - Add unit tests for registry behavior.
   - Configure Vitest and expose `npm run test`.

3. Files
   - New:
     - src/core/domain/traps/types.ts
     - src/core/domain/traps/registry.ts
     - src/core/domain/traps/index.ts
     - src/core/domain/index.ts
     - src/core/domain/traps/__tests__/registry.test.ts
     - vitest.config.ts
     - src/docs/tasks/feat_domain-trap-registry.md
   - Updated:
     - package.json

4. Changes
   - New files: add trap types + registry helpers, domain exports, tests, and Vitest config.
   - Existing files: add `test` script and Vitest dev dependency.

5. Tests
   - `npm run test` (Vitest) — runs domain registry tests.

6. Notes
   - Plan:
     1) Add Vitest config + test script.
     2) Create trap types and registry functions.
     3) Export traps from the domain entry point.
     4) Add unit tests for list/get/has.

7. Docs
   - None.
