# Architecture — ListWA

## Product
ListWA adalah tool web untuk mengubah daftar manual/berantakan menjadi data terstruktur yang mudah diedit dan dirender ulang menjadi teks WhatsApp siap salin. MVP menargetkan pengguna umum Indonesia: pengurus pengajian, panitia, komunitas, keluarga, sekolah, UMKM, dan organisasi kecil.

## MVP scope
- Membuat list dari template atau custom.
- Smart Paste untuk parsing nomor, rentang nomor, nama, dan status emoji.
- Editor row/column yang sederhana.
- Auto numbering dan reorder.
- Status preset + custom.
- Template reusable.
- Preview hasil WhatsApp dengan formatting `*bold*` dan spasi yang stabil.
- One-click copy.
- Local persistence tanpa akun sebagai MVP fallback.
- Export/import JSON untuk portability.
- Supabase-ready persistence adapter; belum menjadi dependency runtime wajib untuk demo local-first.

## Non-goals
- Mengirim pesan WhatsApp otomatis melalui WhatsApp API.
- CRM/chat application.
- Real-time multi-user collaboration pada MVP.
- AI generation/parsing sebagai dependency wajib.
- Billing/subscription.
- Mobile native application.
- File/Excel/PDF ingestion pada MVP.

## Architecture layers
```text
UI / routes
  ↓
Application services / actions
  ↓
Domain (pure list engine)
  ↓
Persistence adapter (localStorage now, Supabase later)
```

### Routes
- `/` — dashboard/list workspace.
- `/templates` — template browser.
- `/list/[id]` — editor + WhatsApp preview.
- `/api/parse` — validated Smart Paste endpoint.

### Services
`lib/list-engine/*` owns parsing, list normalization, numbering, statuses, and deterministic WhatsApp rendering.

### Data access
`lib/storage/*` owns persistence. MVP uses browser localStorage through an interface so the domain is not coupled to browser APIs.

## Mandatory engineering standards
- Errors use one centralized `AppError` shape and one API serializer.
- Structured JSON logging: `timestamp`, `level`, `module`, `requestId`, plus optional context.
- Every external boundary validates inputs with Zod (API body; local import payload; future Supabase DTOs).
- No secrets in source code.
- Deterministic renderer: analytics-like formatting is not delegated to AI.
- IDs are stable and generated independently from row position.

## Security baseline
- API validates payload size and schema before parsing.
- No HTML is rendered from user content; React text rendering prevents HTML injection.
- `javascript:` / data URLs are not accepted because URLs are not an MVP field.
- Future Supabase queries must use RLS and server-side authorization; client restrictions are never security boundaries.

## Deployment
Vercel + Next.js App Router. The app can run without Supabase for local/demo use. To activate cloud persistence, implement the existing storage interface with Supabase and add environment variables.
