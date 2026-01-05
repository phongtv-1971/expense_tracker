---
description: "Tasks for Personal Expense Tracker feature"
---

# Tasks: Personal Expense Tracker

**Input**: Design documents from `spec.md` and `plan.md`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize Next.js + TypeScript project in `web/` with `pnpm` (or `npm`) and commit base scaffold
- [ ] T002 [P] Add Tailwind CSS configuration and global styles in `web/` (`tailwind.config.js`, `globals.css`)
- [ ] T003 [P] Configure ESLint and Prettier in `web/` and add basic lint scripts to `package.json`
- [ ] T004 [P] Add basic CI workflow for lint and tests (`.github/workflows/ci.yml`)
- [ ] T005 [P] Add project README and Quickstart in `web/README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T006 Implement storage adapter `web/src/lib/storage.ts` using `localStorage` with a `expense_tracker:v1` key
- [ ] T007 [P] Add optional `localForage` wrapper for IndexedDB fallback in `web/src/lib/storage.localforage.ts`
- [ ] T008 Create TypeScript types for `Transaction`, `Category`, and `UserSettings` in `web/src/types/index.ts`
- [ ] T009 [P] Implement `src/hooks/useTransactions.ts` that provides CRUD and in-memory caching (persist via storage adapter)
- [ ] T010 [P] Implement `src/hooks/useCategories.ts` and `src/hooks/useSettings.ts`
- [ ] T011 [P] Add utility library `web/src/lib/date.ts` using `date-fns` for Day/Week/Month aggregations
- [ ] T012 Add CSV helpers in `web/src/lib/csv.ts` using `papaparse` for export/import and deduplication logic

**Checkpoint**: Foundational hooks + storage ready; user story work can begin.

---

## Phase 3: User Story 1 - Add and Manage Transactions (Priority: P1) 🎯 MVP

**Goal**: Implement add/edit/delete Transactions stored in client storage

**Independent Test**: Add a Transaction, reload page, verify Transaction persists and can be edited/deleted

- [ ] T013 [P] Create `web/src/components/TransactionForm.tsx` (add/edit) with validation
- [ ] T014 [P] Create `web/src/components/TransactionList.tsx` showing Transactions with delete/edit actions
- [ ] T015 [US1] Wire form and list into `web/src/app/transactions/page.tsx` (or `pages/transactions.tsx`)
- [ ] T016 [US1] Add unit tests for `useTransactions` CRUD operations in `web/src/tests/unit/useTransactions.test.ts`
- [ ] T017 [US1] Add integration test (Playwright) for adding/editing/deleting a Transaction in `tests/e2e/transactions.spec.ts`

**Checkpoint**: User Story 1 should be functional and testable independently

---

## Phase 4: User Story 2 - Categorize Transactions (Priority: P1)

**Goal**: Category CRUD and assignment in Transaction form

**Independent Test**: Create Category, assign to Transaction, filter by Category

- [ ] T018 [P] Implement `web/src/components/CategoryEditor.tsx` (create/rename/delete)
- [ ] T019 [US2] Integrate category selection into `TransactionForm.tsx` and persist categories
- [ ] T020 [US2] Add tests for `useCategories` in `web/src/tests/unit/useCategories.test.ts`

**Checkpoint**: Categories available and assignable

---

## Phase 5: User Story 3 - Dashboard: Day/Week/Month Views (Priority: P1)

**Goal**: Aggregations + visuals for Day/Week/Month

**Independent Test**: With sample data, switch dashboard views and verify totals

- [ ] T021 [US3] Implement `web/src/components/Dashboard.tsx` with aggregation logic in `web/src/lib/date.ts`
- [ ] T022 [US3] Add simple charts (SVG or small chart lib) in `web/src/components/CategoryBreakdown.tsx`
- [ ] T023 [US3] Add unit tests for aggregation functions in `web/src/tests/unit/date-aggregations.test.ts`

**Checkpoint**: Dashboard shows correct aggregates for sample dataset

---

## Phase 6: User Story 4 - Filter, Search, and Sort (Priority: P2)

**Goal**: Support filters and search over Transactions

**Independent Test**: Apply filters and confirm displayed Transactions match

- [ ] T024 [US4] Implement `web/src/components/FilterBar.tsx` for date range, category, type, and free-text search
- [ ] T025 [US4] Connect FilterBar to TransactionList and Dashboard to filter displayed results
- [ ] T026 [US4] Add tests for filtering logic in `web/src/tests/unit/filter.test.ts`

---

## Phase 7: User Story 5 - Export and Import (Priority: P2)

**Goal**: CSV export/import with deduplication

**Independent Test**: Export visible Transactions and import a CSV, ensuring deduplication works per spec

- [ ] T027 [US5] Implement `web/src/components/ExportButton.tsx` with CSV export using `papaparse` (respect filters)
- [ ] T028 [US5] Implement `web/src/components/ImportDialog.tsx` with preview, validation, and dedupe logic (report skipped)
- [ ] T029 [US5] Add unit tests for CSV helpers in `web/src/tests/unit/csv.test.ts`

---

## Phase 8: User Story 6 - Mobile-First Responsive Experience (Priority: P1)

**Goal**: Ensure mobile usability and accessibility

**Independent Test**: Validate primary flows on 360x800 viewport and run basic a11y checks

- [ ] T030 [P] Implement responsive layout and bottom navigation in `web/src/components/LayoutMobile.tsx`
- [ ] T031 [P] Run and fix accessibility issues found by axe or manual checks
- [ ] T032 [P] Add visual regression checks if a UI snapshot tool is in use

---

## Phase 9: Polish & Cross-Cutting Concerns

- [ ] T033 [P] Add Playwright E2E tests for primary journeys and CI integration
- [ ] T034 [P] Prepare `pnpm build && pnpm export` static export and deployment instructions in `web/README.md`
- [ ] T035 [P] Add `CHANGELOG.md` entry and update `spec.md` with any behavioral changes
- [ ] T036 [P] Final code cleanup, refactor, and documentation

---

## Dependencies & Execution Order

- Setup must complete before Foundational tasks.
- Foundational tasks block User Story implementation.
- User stories may proceed in parallel after foundational tasks are complete.

## Parallel Opportunities

- Many setup and foundational tasks are parallelizable (marked [P]).
- Different user stories (Transactions, Categories, Dashboard, Filters, CSV) can be implemented in parallel by different devs once foundational hooks are ready.

---

## Implementation Strategy

- MVP first: Focus on Phase 1-3 to reach a usable product quickly.
- Incremental delivery: deliver P1 stories, validate, then add P2 features.


---

