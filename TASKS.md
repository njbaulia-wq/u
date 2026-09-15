# Task Plan

- [x] T01 — Architecture baseline. Behavior: required engineering conventions and scope are explicit. Files: `ARCHITECTURE.md`, `ASSUMPTIONS.md`.
- [x] T02 — Domain schemas. Behavior: valid list definitions and rows pass; malformed input fails. Files: `lib/list-engine/types.ts`, `lib/validation/schemas.ts`, `tests/schemas.test.ts`.
- [x] T03 — Smart Paste parser. Behavior: numbered rows, ranges, emojis, blank lines parse deterministically. Files: `lib/list-engine/parser.ts`, `tests/parser.test.ts`.
- [x] T04 — Renderer/normalizer. Behavior: numbering and WhatsApp formatting are deterministic. Files: `lib/list-engine/engine.ts`, `tests/renderer.test.ts`.
- [x] T05 — Persistence adapter. Behavior: list state survives reload in browser. Files: `lib/storage/local-store.ts`, `lib/storage/storage.ts`.
- [x] T06 — API boundary. Behavior: malformed parse requests return structured 4xx; valid request returns normalized rows + request-id. Files: `app/api/parse/route.ts`, logger/error utilities, tests.
- [x] T07 — Product UI. Behavior: user can create/edit/delete/reorder rows, paste text, choose status, preview, and copy WhatsApp output. Files: `app/page.tsx`, `components/list-workspace.tsx`, `app/globals.css`.
- [x] T08 — Templates. Behavior: common list types can be created without configuring columns from scratch. Files: `lib/list-engine/templates.ts`, UI template picker.
- [x] T09 — Import/export. Behavior: JSON export/import round-trips valid list data. Files: `lib/list-engine/transfer.ts`, UI controls, tests.
- [x] T10 — Audit and packaging. Behavior: lint/type/test/build configs are present, docs and deployment instructions are complete. Files: `README.md`, `.env.example`, `vercel.json`, `FIXES.md`, package config.
