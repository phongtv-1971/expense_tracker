# Expense Tracker (web)

Quickstart

```bash
cd web
pnpm install
pnpm dev
# open http://localhost:3000 (or the port printed by Next)
```

Build & static export

```bash
cd web
pnpm build
pnpm export
# static files emitted to out/
```

Tests

```bash
cd web
pnpm test   # runs unit tests (Vitest)
pnpm test:e2e # run Playwright tests (if configured)
```

Notes

- Storage is client-side only (`localStorage` / IndexedDB fallback)
- CSV import deduplicates by `date|amount|notes`.
# Expense Tracker (web)

This is a static Next.js app (TypeScript) scaffold for the Personal Expense Tracker feature.

Quickstart

```bash
cd web
pnpm install
pnpm dev
```
