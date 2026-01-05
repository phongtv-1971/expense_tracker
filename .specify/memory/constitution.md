<!--
Sync Impact Report

- Version change: TEMPLATE -> 1.0.0
- Modified principles: (added) User Data Ownership & Privacy; Transaction-Centric Model;
	Mobile-First Responsive UI; Discoverability & Minimalism; Testability & Observability
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Templates requiring updates:
	- .specify/templates/plan-template.md ✅ updated
	- .specify/templates/tasks-template.md ✅ updated
	- .specify/templates/spec-template.md ⚠ pending
	- .specify/templates/agent-file-template.md ⚠ pending
	- .specify/templates/checklist-template.md ⚠ pending
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): confirm original ratification if different from 2026-01-05
	- Update spec-template.md and agent-file-template.md to include explicit constitution checks
-->

# Expense Tracker Constitution

## Core Principles

### User Data Ownership & Privacy
All user data created in the application is owned by the user. By default, data MUST be kept client-side
(localStorage or IndexedDB) and MUST NOT be sent to remote servers or telemetry systems without explicit,
documented user opt-in. The system MUST provide an export/import mechanism (CSV at minimum) and a clear
way for users to delete their data.

### Transaction-Centric Model
The product is transaction-first: the primary entity is a Transaction with the following minimal fields:
`date`, `amount`, `type` (income/expense), `category`, and optional `notes`. The system MUST allow users to
create, read, update, and delete Transactions and MUST allow Transactions to be associated with a Category.

### Mobile-First Responsive UI
The UI MUST be mobile-first and responsive: layouts, navigation, and input controls MUST work comfortably on
small screens and scale up for desktop. The UI MUST meet common accessibility guidelines (contrast, focus
states, semantic HTML) and degrade gracefully where features are unavailable.

### Discoverability & Minimalism
Keep the product focused and minimal: primary flows (add transaction, view dashboard, filter/search, export)
MUST be discoverable within two interactions from the app root. Filtering and search MUST be fast and
intuitive; CSV export MUST be available from key views.

### Testability & Observability
Core user journeys (create/modify/delete Transaction, category assignment, dashboard views, filter/search,
export) MUST have automated tests (unit or E2E) and clear acceptance criteria. Client-side error conditions
MUST be observable via local logs and optionally surfaced to the user; any analytic or telemetry collection is
opt-in only.

## Additional Constraints

- Project type: Static web application (single-page app) delivered as static assets.
- Storage: Default client-only storage (IndexedDB preferred for scale; fallback to localStorage allowed for
	simple prototypes). Server-side storage is allowed only when explicitly required and opt-in by the user.
- CSV Export: Provide a simple, well-formed CSV export of Transactions with UTF-8 and a header row.
- Dashboard: Provide Day/Week/Month views and support timezone-aware date handling.
- Filtering & Search: Support filtering by date range, category, and type; support free-text search across
	notes and category names.
- Performance: Initial load for the core app shell MUST be under 2s on mobile 3G emulation; subsequent
	operations should be near-instant for datasets up to 5k Transactions.
- Security: Sanitize user input where rendering HTML or importing CSV; avoid remote code execution vectors.

## Development Workflow

- Use Git with feature branches and PRs. All PRs touching UX-critical flows MUST include a short testing
	checklist referencing the acceptance scenarios from the spec.
- Tests: Write automated tests for core flows (create/edit/delete Transaction, dashboard render, CSV export,
	filter/search). Prefer reproducible E2E tests (Playwright or Cypress) for major journeys.
- Accessibility: Run basic a11y checks on key pages (dashboard, add transaction form, export UI).
- Releases: Ship site as versioned static build (e.g., via GitHub Pages or static host). Include a `CHANGELOG`
	entry for visible changes to user-facing behavior.

## Governance

Amendments to this constitution MUST be proposed as a documented GitHub/GitLab PR referencing the change
rationale, impacted user journeys, and any migration steps. A simple majority (or at least one maintainer)
approval is required for non-breaking clarifications; MAJOR changes (removing or redefining core principles)
require written justification and at least two maintainer approvals.

Versioning policy:
- MAJOR: Breaking changes to governance or removal/redefinition of principles.
- MINOR: Addition of a new principle or material expansion of guidance.
- PATCH: Clarifications, wording fixes, or non-semantic refinements.

**Version**: 1.0.0 | **Ratified**: 2026-01-05 | **Last Amended**: 2026-01-05
