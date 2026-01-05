# Feature Specification: Personal Expense Tracker (Static SPA)

**Feature Branch**: `001-personal-expense`  
**Created**: 2026-01-05  
**Status**: Draft  
**Input**: User description: "Tạo spec cho ứng dụng quản lý chi tiêu cá nhân responsive mobile; Transactions (income/expense), Category, Dashboard Day/Week/Month, Filter/Search, CSV export; client-only localStorage"

## User Scenarios & Testing (mandatory)

Priority P1 stories deliver a minimal, usable product: the user can record transactions, view summaries,
filter/search, and export CSV. P2 and P3 expand convenience and polish.

### User Story 1 - Add and Manage Transactions (Priority: P1)

As a single user of my personal expense page, I want to create, edit, and delete Transactions (income/expense)
so that I can keep a record of money flows.

Why this priority: Core functionality — without it the product has no value.

Independent Test: Using the UI, create a Transaction, edit its amount/category/notes, then delete it.

Acceptance Scenarios:
1. Given an empty app, when the user opens the Add Transaction form and submits a valid Transaction,
   then the Transaction appears in the list and is persisted to localStorage.
2. Given an existing Transaction, when the user edits fields and saves, then the change is reflected in the
   list and persisted.
3. Given an existing Transaction, when the user deletes it, then it is removed from the list and localStorage.

---

### User Story 2 - Categorize Transactions (Priority: P1)

As a user I want to assign or create a Category for each Transaction so I can group spending and income.

Why this priority: Categorization enables meaningful reporting and filtering.

Independent Test: Create a new Category, assign to a Transaction, and verify it shows in reports and filters.

Acceptance Scenarios:
1. Given the Add Transaction form, when the user selects an existing Category or creates a new one,
   then the Transaction stores the Category name and the Category is available in filters.

---

### User Story 3 - Dashboard: Day/Week/Month Views (Priority: P1)

As a user I want to view my spending and income by Day, Week, and Month so I can understand trends.

Why this priority: Reporting is core value — helps users make decisions.

Independent Test: With sample Transactions across dates, switch dashboard view and validate aggregated totals.

Acceptance Scenarios:
1. Given Transactions across multiple dates, when the user selects "Month" view, then the dashboard shows
   totals per month and a chart or list of categories for that month.
2. When the user selects "Week" or "Day" view, aggregates and charts reflect the selected granularity.

---

### User Story 4 - Filter, Search, and Sort (Priority: P2)

As a user I want to filter Transactions by date range, category, and type and search by free-text (notes)
so I can quickly find records.

Independent Test: Apply filters and search terms and confirm displayed Transactions match criteria.

Acceptance Scenarios:
1. Given multiple Transactions, when the user sets a date range and category filter, then only matching
   Transactions are shown.
2. Given notes containing keyword "tax", when the user searches "tax", then matching Transactions appear.

---

### User Story 5 - Export and Import (Priority: P2)

As a user I want to export my Transactions to CSV and import a CSV backup so I can move or archive data.

Independent Test: Export CSV, inspect header and rows, then import a well-formed CSV and confirm Transactions imported.

Acceptance Scenarios:
1. When the user clicks "Export CSV" from the dashboard, a UTF-8 CSV with header row is downloaded
   containing the visible Transactions (respecting current filters if chosen).
2. When the user imports a CSV with valid columns, Transactions are added (duplicate detection is optional but noted).

---

### User Story 6 - Mobile-First Responsive Experience (Priority: P1)

As a mobile user, I need the UI to be usable on small screens with clear controls for adding Transactions
so that I can manage finances on my phone.

Independent Test: Use mobile viewport, add a Transaction, switch dashboard views, and run basic accessibility checks.

Acceptance Scenarios:
1. All primary flows (add transaction, dashboard, filter/search, export) are reachable and usable on a 360x800 viewport.

---

### Edge Cases

- Importing malformed CSV: the importer should detect missing columns and provide a user-friendly error.
- Large dataset: verify UI responsiveness and localStorage size limits (warn or suggest splitting/export).
- Timezone handling: Transactions created near midnight should be associated with the user-visible local date.
- Duplicate Transactions on import: either deduplicate heuristically or document that duplicates may be created.
- Storage quota exceeded: show user-friendly error and guidance to export and clear space.

## Requirements (mandatory)

### Functional Requirements

- **FR-001**: The system MUST allow the user to create Transactions with fields: `id`, `date`, `amount`,
  `type` (income|expense), `category` (string), and optional `notes`.
- **FR-002**: The system MUST allow editing and deletion of existing Transactions.
- **FR-003**: The system MUST allow the user to create, rename, and delete Categories (simple label with optional color).
- **FR-004**: The system MUST persist all data to the browser using client-side storage (`localStorage` or `IndexedDB`) so
  data survives page reloads without any server.
- **FR-005**: The system MUST present a Dashboard with Day/Week/Month aggregations showing totals and category breakdowns.
- **FR-006**: The system MUST support filtering by date range, category, and type, and free-text search across `notes` and `category`.
- **FR-007**: The system MUST support exporting visible Transactions to a UTF-8 CSV with a header row and the following columns:
  `id,date,amount,type,category,notes`.
- **FR-008**: The system SHOULD support importing Transactions from a well-formed CSV and present friendly errors for malformed files.
- **FR-009**: The UI MUST be responsive and usable on common mobile viewports; primary flows must be accessible within two interactions.
- **FR-010**: The system MUST sanitize imported CSV fields to avoid injecting unsafe HTML when rendering notes.

### Non-Functional Requirements

- **NFR-001**: Initial app shell load time should be perceived sub-2s on mobile 3G emulation for a small dataset.
- **NFR-002**: The app should remain responsive with up to 5,000 Transactions stored locally.
- **NFR-003**: Accessibility: key screens (add transaction, dashboard, export) must meet basic a11y checks (labels, focus order).
- **NFR-004**: Privacy: no data leaves the user's browser unless the user explicitly exports or triggers an opt-in upload.

### Key Entities

- **Transaction**: id (string/uuid), date (ISO date), amount (number), type (enum: income|expense), category (string), notes (string)
- **Category**: id (string), name (string), color (optional string)
- **UserSettings**: preferred currency, start-of-week, timezone (optional), import/export preferences

## Success Criteria (mandatory)

### Measurable Outcomes

- **SC-001**: Users can add a Transaction and see it persisted across a page reload in under 30 seconds (including any first-run setup).
- **SC-002**: 95% of primary flows (add Transaction, view Dashboard, apply filter, export CSV) complete without visible errors during manual testing with a dataset of 1–500 Transactions.
- **SC-003**: Dashboard displays correct totals for Day/Week/Month views for a provided canonical dataset of 50 sample Transactions (automated testable dataset).
- **SC-004**: CSV export produces a UTF-8 file with a header and the number of exported rows matching the number of visible Transactions (100% parity in tests).
- **SC-005**: Mobile usability: Primary flows are reachable within two interactions from app root on a 360x800 viewport during manual QA.

## Assumptions

- Single-user personal app — no authentication or multi-user concerns.
- Default storage is browser localStorage; IndexedDB can be used if needed for performance.
- Currency formatting and locale are driven by `UserSettings` with reasonable defaults (user's browser locale).

## Open Questions / NEEDS CLARIFICATION (limit 3)

1. [NEEDS CLARIFICATION] Import duplicate handling: Should the importer attempt deduplication (by id+date+amount) or always append?  
   Suggested default: append and warn about duplicates; offer dedupe as a future enhancement.

2. [NEEDS CLARIFICATION] Date/time zones: Use the browser local timezone for display and storage (default), or store UTC and convert?  
   Suggested default: store ISO local date-only with timezone awareness for display; store timestamps in ISO-8601.

3. [NEEDS CLARIFICATION] Category colors: Should color be mandatory for categories or optional?  
   Suggested default: optional, used only for visualization on the dashboard.

## Acceptance Test Examples

- Add 3 sample Transactions across three different months and verify Month view shows three separate month aggregates.
- Create Category "Groceries" and assign two Transactions, then filter by "Groceries" and verify only those Transactions appear.
- Export CSV while a date filter is active and verify exported rows match the filtered list and header columns are correct.

## Implementation Notes (non-normative)

- Storage schema: one top-level key `expense_tracker:v1` containing JSON with arrays for `transactions`, `categories`, and `settings`.
- For performance with large datasets prefer IndexedDB; fallback to localStorage for prototypes.
- UI: mobile-first layout with a bottom navigation bar (Add, Dashboard, Search/Filter, Export) and list+fab pattern for adding Transactions.

## Out of Scope

- Authentication and multi-user syncing.
- Server-side backups or cloud sync (unless explicitly opt-in later).
- Advanced budgeting rules, reports beyond Day/Week/Month, or predictive analytics.
