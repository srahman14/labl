# CLAUDE.md

Guidance for Claude Code when working in this repo. Keep this file current: if a convention changes, update it in the same PR.

## Project

**labl** tells a user whether a product is okay for _them_. The user builds a personal rules profile (halal, vegan, kosher, allergies, "no jalapeños", "avoid fragrance"), scans a product by barcode or label photo, and gets **Safe**, **Avoid** or **Can't tell**, with the exact ingredient(s) responsible and the data source.

Food comes first. Skin & Beauty is a stretch goal. Full context: `docs/labl-project-context.md`.

Built for the Qodo 30 Day Hackathon (Nov 2 – Dec 2, 2026).

## Core principles (never violate)

1. **The LLM reads; rules decide.** Gemini may extract and normalise ingredients, and may compile a user's plain-language rule into structured rules. It must **never** produce the final verdict. Verdicts come from the deterministic rules engine only.
2. **Three outcomes, not two.** Safe, Avoid, Can't tell. If data is missing, ambiguous or low confidence, the answer is Can't tell, never a guess.
3. **Show the evidence.** Every verdict returns the triggering ingredient(s), the data source (barcode DB or label photo) and a confidence value.
4. **Allergies are safety-critical.** Strict handling, clear disclaimers, never claim safety on traces or cross-contamination.
5. **No single authority.** Categories such as halal and kosher have differing standards. Use strictness presets, and state that a verdict is about ingredients, not certification.

## Stack

- Next.js (App Router), TypeScript (strict), Tailwind CSS
- Supabase (Auth, Postgres, Storage) with Row Level Security
- Gemini API (vision OCR and rule compilation only)
- Open Food Facts / Open Beauty Facts for barcode lookups

## Commands

```bash
npm install
npm run dev      # local dev server
npm run lint     # lint
npm run build    # production build
```

Tests: TODO. Add a test runner (e.g. Vitest) on Day 1 or 2 and document `npm test` here. The golden-label suite must run in CI.

## Intended structure

```
src/
  app/                 # routes and UI (App Router)
  lib/
    rules/             # deterministic rules engine (pure functions, no I/O)
    ingredients/       # normaliser: synonyms, E-numbers, aliases -> canonical IDs
    resolvers/         # barcode (Open Food Facts) and photo (Gemini) product resolvers
    supabase/          # client helpers
  components/
docs/
  labl-project-context.md
  journal.md           # one line per day: built / broke / learned
tests/
  golden-labels/       # tricky real-world labels with expected verdicts
```

Adjust this section if the layout changes.

## Conventions

- TypeScript strict; no `any` without a comment explaining why.
- The rules engine is **pure**: same inputs give the same output, no network or database calls inside it. This is what makes it testable.
- Validate all external data (Open Food Facts responses, Gemini output) with a schema (e.g. Zod) before use. Treat LLM output as untrusted input.
- Every Supabase table has RLS enabled. Users may only read and write their own profiles, rules and scans. Never use the service-role key in client code.
- Keep secrets in `.env.local`; never commit them. Document required variables in `.env.example`.
- Uploaded label photos: validate type and size, store under a per-user path, and never trust the file name.
- Small, focused commits. Conventional prefixes: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.

## Testing

- Any change to the rules engine or normaliser needs tests.
- Add a golden-label case for every bug found in a verdict: label text, expected verdict, notes.
- The README publishes the golden-suite accuracy number; do not hand-edit it, generate it from the suite.

## Git workflow

- Never commit directly to `main`. Work on a branch (`feat/...`, `fix/...`, `chore/...`).
- Open a PR for every change. Qodo reviews each PR; address its findings or explain in the PR why a finding does not apply.
- Run lint and build locally before pushing.

## Code review with Qodo

Before opening a PR, run an independent review of local changes. This assumes the Qodo review skill is installed in your Claude Code setup; check its name there, because it may differ from the one below.

Prompt:

```
Use Qodo's qodo-review skill to independently review my current local changes.

Focus particularly on:
1. Security vulnerabilities.
2. Incorrect Supabase RLS assumptions.
3. Authentication and authorisation issues.
4. Potential regressions.
5. Error handling and edge cases.
6. Architectural inconsistencies, especially anything that lets LLM output
   influence a verdict outside the rules engine.

Pay particular attention to the label-photo upload flow and the product
resolvers (Open Food Facts and Gemini).

Do not modify any files.

Return findings ranked by severity, explaining:
- The affected file and location.
- Why it is an issue.
- How it could affect the application.
- A recommended fix.

Only report genuine issues, not stylistic preferences.
```

If the skill is not available, ask Claude Code for the same review directly with the same instructions.

## Do not

- Do not let the LLM decide a verdict, or add a code path where it can.
- Do not return "Safe" when ingredient data is missing or unparsed.
- Do not call the Gemini or Open Food Facts APIs from the rules engine.
- Do not weaken RLS policies to make something work.
- Do not commit `.env*` files, API keys or user data.
