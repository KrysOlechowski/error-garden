# AI Task Playbook 🤖🌿

This document describes the procedure for working with AI on the next tasks in the Error Garden repo.
This is an operational playbook. Non negotiable rules live in `AGENTS.md`.

## Goals

- Ship small, focused PRs quickly
- Keep a domain first architecture
- Avoid drift between the plan, the code, and the docs

## Work mode

- AI delivers ready to copy files and minimal patches immediately when context is sufficient
- AI asks only when a missing file or a decision blocks progress

## Before you start

The AI agent must always check these files

- `ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `AGENTS.md`
- `PR_GUIDE.md`

## Entering a task

AI starts by finding a specific PR in `ROADMAP.md`

- choose a stage
- choose a PR from the PRs list
- keep the rule 1 PR equals 1 focused decision

Then AI briefly lists

- what we are changing
- why
- which files will be touched

## Procedure for one PR

1. Define the scope
   - what is in scope
   - what is out of scope
   - which layers are affected

2. Gather code context
   - if files are missing, AI asks for the exact paths
   - AI does not guess APIs or file structure

3. Make a plan in 3 to 7 steps
   - steps are short
   - in execution order
     - create a new file in `docs/tasks` named after the PR name
     - example PR name `docs/foundation-agents-roadmap` becomes `docs_foundation-agents-roadmap.md`
     - example PR name `fix/scope-xxx` becomes `fix_scope-xxx.md`
     - write the plan using the template from `docs/tasks/TASK_TEMPLATE.md`

4. Deliver changes
   - new files
   - existing files
     - minimal patch diff

5. Test plan
   - which commands to run
   - what they test

6. Doc update
   - update docs only when the contract or conventions change
   - avoid duplication, ARCHITECTURE is the single source of truth

## Explaining tricky parts

AI should explain complex lines in chat

- show intent and effect
- do not explain obvious things

Suggested format

- what the line does
- why it is needed
- what to watch out for

## Code comments

AI should add code comments in English

- comments only where they help maintenance
- avoid comments that describe obvious statements
- prefer comments about intent and constraints

Examples

- good
  - `// Domain-only: keep this module free of I/O and frameworks.`
  - `// Normalize tags once to avoid UI/URL/store drift.`
- avoid
  - `// Increment i by 1.`

## Layers and boundaries

Quick cheat sheet

- `src/core/domain` pure logic
- `src/app` UI and app layer state
- URL is the contract for the filter
- category is a UI concept, in code it is a base tag in `tags`

If AI sees a risk of breaking boundaries

- stop
- explain why
- ask for a decision or a file

## When AI must ask

AI must ask when

- a required file to change is missing
- a new dependency would be added
- a task requires product decisions, UX, or copy
- a change touches domain and UI at the same time and cannot be split
- there is a risk of violating domain purity

## Exiting a task

At the end AI should leave

- list of changed files
- short justification of key decisions
- test commands to run
- a note for docs if the contract changed
