# Implementation Plan: Personal Expense Tracker

**Branch**: `001-personal-expense` | **Date**: 2026-01-05 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `spec.md`

## Summary

Build a static, mobile-first personal expense tracker as a Next.js static site with Tailwind CSS for styling
and client-side storage using `localStorage` (with IndexedDB fallback notes). The app will be a single-page
experience (SPA) exported as static assets (Next.js `export`) so it can be hosted on any static host.

MVP: Add/edit/delete Transactions, Category management, Dashboard Day/Week/Month aggregations, Filter/Search,
CSV export/import (with deduplication), responsive mobile-first UI.

## Technical Context

**Language/Version**: JavaScript/TypeScript (TypeScript recommended, Node 18+)
**Primary Dependencies**: Next.js (app router or pages OK), Tailwind CSS, date-fns (or dayjs), Papaparse (CSV),
localForage (optional wrapper for IndexedDB fallback)
**Storage**: localStorage primary; IndexedDB via localForage if dataset grows.
**Testing**: Playwright (E2E), Vitest/Jest for unit tests, Testing Library for UI tests
**Target Platform**: Static site (Netlify, Vercel static export, GitHub Pages)
**Project Type**: Web app (static SPA)
**Performance Goals**: App shell <2s perceived on simulated 3G mobile for small datasets
**Constraints**: Client-only storage only; no server or auth; CSV import must sanitize input.
**Scale/Scope**: Single-user app up to ~5k transactions locally

## Constitution Check

- Data ownership & privacy: **Client-only storage** (localStorage/IndexedDB). No remote telemetry.
- Transaction model: Transactions include `id,date,amount,type,category,notes`.
- Dashboard coverage: Day/Week/Month implemented using date-fns for local dates.
- Export & Import: CSV export conforms to spec columns; import dedupes heuristically (date+amount+notes).
- Responsiveness & Accessibility: Mobile-first layout; testing includes basic a11y checks.

## Project Structure

```text
web/                    # Next.js project root
├── public/
├── src/
│   ├── app/             # Next.js App Router pages (or pages/ if pages router)
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom hooks (useStorage, useTransactions)
│   ├── lib/             # date, csv helpers, storage adapter
│   ├── styles/          # Tailwind configs and globals
│   └── tests/
└── package.json

specs/001-personal-expense/
├── spec.md
├── plan.md
└── checklists/requirements.md
```

**Structure Decision**: Use Next.js app router with TypeScript for developer DX; components and hooks to keep UI logic testable and small.

## Complexity Tracking

No Constitution violations identified.

## Phase Plan

Phase 1: Setup (Shared Infrastructure)
- Initialize Next.js + TypeScript project
- Install Tailwind CSS and configure base styles
- Configure ESLint, Prettier, and basic CI (optional)
- Add basic folder structure and storybook/testing scaffold

Phase 2: Foundational
- Implement Storage adapter: `src/lib/storage.ts` with a simple `localStorage` API and an optional localForage wrapper.
- Implement `Transaction` and `Category` models (types) and storage methods (CRUD)
- Create shared `useTransactions` hook with in-memory caching + persistence

Phase 3: MVP User Stories (P1)
- Add Transaction UI (form, validations)
- Category management UI
- Transaction list with basic pagination or virtualized list for performance
- Dashboard with Day/Week/Month aggregation and simple charts (SVG or small chart lib)
- Mobile-first layout and accessibility fixes

Phase 4: P2 Features
- Filter/search UI and behavior
- CSV export and import with PapaParse and deduplication
- Import preview + friendly error handling

Phase 5: Polish
- E2E tests (Playwright) for primary flows
- Accessibility audit and fixes
- Performance tuning (bundle splitting, image optimizations if any)
- Prepare production export and deployment instructions

## Tasks (high level)

- T001 Init Next.js + TypeScript + Tailwind
- T002 Setup linting, formatting, basic CI
- T003 Implement storage adapter and types
- T004 Implement hooks: `useTransactions`, `useCategories`, `useSettings`
- T005 Implement Add/Edit/Delete Transaction UI and validation
- T006 Implement Category management UI
- T007 Implement Dashboard aggregations and visuals
- T008 Implement Filter/Search and list filtering
- T009 Implement CSV export/import and deduplication logic
- T010 Add tests: unit + E2E
- T011 Prepare static export and deployment steps

## Quickstart (developer)

1. Install dependencies

```bash
cd web
pnpm install    # or npm install
```

2. Local dev

```bash
pnpm dev
# open http://localhost:3000
```

3. Build static export

```bash
pnpm build && pnpm export
# outputs to out/ (Next.js static export)
```

4. Run tests

```bash
pnpm test
pnpm test:e2e
```

## Implementation notes

- Storage: Use a single top-level key `expense_tracker:v1` storing a compact JSON object.
- Deduplication algorithm: compare `date` (ISO date), `amount` (numeric), and `notes` (trimmed lower-case) to detect duplicates on import. Provide a report of skipped records.
- Date handling: Use `date-fns` (lightweight) and treat Transaction `date` as date-only in user locale.
- UI: Mobile-first; primary nav as bottom bar with Add (FAB), Dashboard, Transactions, Export.
- Accessibility: Use semantic HTML, labeled controls, and keyboard focus order.

## Risks

- localStorage limits for very large datasets — mitigate with IndexedDB fallback (localForage).
- CSV import variability — must provide robust parsing, sanitization, and a clear importer UI.

## Deliverables

- `web/` Next.js project with full MVP implementation
- `specs/001-personal-expense/spec.md`, `plan.md`, `checklists/requirements.md`
- Quickstart and CI for lint/tests

---

If you want, I can scaffold the Next.js project skeleton and implement the storage adapter and a tiny demo page that adds a Transaction and persists it to `localStorage` as the first PR/commit. Would you like me to scaffold the project now?