# ListWA

**ListWA** adalah web app untuk membuat daftar terstruktur, mengeditnya dengan mudah, lalu menghasilkan teks yang rapi dan siap ditempel ke WhatsApp.

Contoh penggunaan:

- Qur’anan / khataman
- daftar peserta
- piket
- iuran / donasi
- konsumsi
- inventaris
- tugas
- daftar custom lainnya

> **Status saat ini:** MVP local-first. Data list disimpan di browser perangkat pengguna. Supabase sudah disiapkan sebagai jalur persistence cloud berikutnya, tetapi **tidak wajib** untuk menjalankan atau deploy MVP.

---

## 1. Fitur MVP

- Template list: Qur’anan, Piket, Iuran, Peserta, Custom
- Smart Paste untuk mengubah teks WhatsApp menjadi baris terstruktur
- Auto numbering
- Tambah, edit, hapus, dan ubah urutan item
- Status emoji/custom status
- WhatsApp preview secara langsung
- Salin hasil dengan satu klik
- Simpan otomatis ke browser
- Import/export JSON
- API parser tervalidasi dengan Zod
- Error handling terpusat
- Structured JSON logging
- Responsive desktop/mobile

---

## 2. Persyaratan Sistem

Direkomendasikan:

- Node.js **20+** (LTS)
- npm 10+
- Git
- Browser modern: Chrome, Edge, Firefox, atau Safari

Cek versi:

```bash
node -v
npm -v
git --version
```

---

# 3. Jalankan Secara Lokal

## A. Ekstrak ZIP

Ekstrak file `listwa.zip` ke folder kerja.

Contoh:

```bash
unzip listwa.zip -d listwa
cd listwa
```

Jika menggunakan file manager, cukup extract lalu buka folder `listwa` di terminal.

## B. Install dependency

```bash
npm install
```

## C. Jalankan development server

```bash
npm run dev
```

Buka:

**http://localhost:3000**

---

# 4. Environment Variables

Untuk MVP **tidak ada environment variable wajib**.

File contoh tersedia di:

```text
.env.example
```

Salin menjadi `.env.local` bila diperlukan:

```bash
cp .env.example .env.local
```

Isi `.env.local` saat nanti mengaktifkan Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Penting

- Jangan commit `.env.local`.
- Jangan menaruh secret/service-role key Supabase di browser.
- `NEXT_PUBLIC_*` memang bersifat public dan tidak boleh dipakai untuk menyimpan secret.
- Pada MVP saat ini, kamu bisa membiarkan `.env.local` kosong.

---

# 5. Struktur Project

```text
listwa/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── list-workspace.tsx
├── lib/
│   ├── domain/
│   ├── errors/
│   ├── logging/
│   ├── schemas/
│   └── storage/
├── scripts/
│   └── test.mjs
├── tests/
│   └── domain.test.mjs
├── .env.example
├── ARCHITECTURE.md
├── ASSUMPTIONS.md
├── FIXES.md
├── TASKS.md
├── next.config.ts
├── package.json
├── tsconfig.json
└── vercel.json
```

---

# 6. Perintah Development

## Development

```bash
npm run dev
```

## Test

```bash
npm test
```

## Typecheck

```bash
npm run typecheck
```

## Lint

```bash
npm run lint
```

## Production build

```bash
npm run build
```

## Jalankan hasil production build

```bash
npm run start
```

Lalu buka:

```text
http://localhost:3000
```

---

# 7. Deploy ke Vercel — Cara Termudah

## Opsi A — Import GitHub Repository (Direkomendasikan)

### Langkah 1 — Buat repository GitHub

Di folder project:

```bash
git status
git add .
git commit -m "chore: initial ListWA release"
```

Buat repository baru di GitHub, misalnya:

```text
listwa
```

Lalu hubungkan:

```bash
git remote add origin https://github.com/USERNAME/listwa.git
git branch -M main
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kamu.

### Langkah 2 — Buka Vercel

Masuk ke:

**https://vercel.com/**

Login menggunakan GitHub.

### Langkah 3 — Import project

Pilih:

**Add New → Project → Import Git Repository**

Pilih repository:

```text
listwa
```

### Langkah 4 — Konfigurasi project

Vercel seharusnya otomatis mendeteksi:

```text
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
```

Untuk MVP tidak perlu mengubah apa pun.

### Langkah 5 — Environment Variables

**Kosongkan dulu** karena MVP tidak membutuhkan environment variable.

Klik:

**Deploy**

Vercel akan melakukan install dependency → build → deploy.

Setelah berhasil, Vercel memberikan URL seperti:

```text
https://listwa-xxxxx.vercel.app
```

Buka URL tersebut dan aplikasi siap digunakan.

---

# 8. Deploy ke Vercel dari CLI

Alternatif jika kamu lebih nyaman menggunakan terminal.

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Dari root project:

```bash
vercel
```

Untuk production:

```bash
vercel --prod
```

Saat CLI bertanya:

```text
Set up and deploy?
```

jawab `Y`.

Jika diminta memilih project, gunakan project baru atau project Vercel yang sudah ada.

---

# 9. Deploy Ulang Setelah Ada Perubahan

Jika repository sudah terhubung ke Vercel, workflow normalnya cukup:

```bash
git add .
git commit -m "feat: improve list editor"
git push
```

Vercel otomatis membuat deployment baru.

Untuk production branch yang umum:

```text
main → Production
feature/* → Preview
```

---

# 10. Supabase — Belum Wajib untuk MVP

Arsitektur project sudah menyiapkan Supabase sebagai jalur persistence cloud.

**Versi MVP saat ini:**

```text
Browser
   ↓
ListWA
   ↓
local persistence
```

Target cloud berikutnya:

```text
Browser
   ↓
Next.js
   ↓
Supabase
   ↓
PostgreSQL
```

Dengan Supabase nanti kita dapat menambahkan:

- login/register
- list tersimpan lintas perangkat
- share link
- collaboration
- cloud backup
- template milik user

### Setup Supabase nanti

1. Buka **https://supabase.com/**
2. Buat project baru.
3. Ambil URL project.
4. Ambil publishable key.
5. Masukkan ke Vercel → **Project Settings → Environment Variables**.
6. Gunakan nama:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Setelah menambahkan environment variable di Vercel, lakukan **Redeploy**.

> Fitur cloud persistence membutuhkan implementasi schema/database dan auth tambahan. Jangan menganggap pengisian dua variable ini saja sudah mengaktifkan seluruh fitur cloud.

---

# 11. Cara Menggunakan Aplikasi

## Workflow normal

```text
Buat List
   ↓
Pilih template
   ↓
Paste list lama / isi manual
   ↓
Edit data
   ↓
Atur status
   ↓
Lihat Preview WhatsApp
   ↓
Salin
   ↓
Paste ke WhatsApp
```

## Smart Paste

Misalnya kamu punya:

```text
01. Mb Halim
02. Mb Saroh Pkl
03. Mb Aminah
04. Mb Hamidah 🕋
```

Paste ke Smart Paste.

Aplikasi mencoba mengubahnya menjadi item terstruktur sehingga nomor dan status lebih mudah diedit.

---

# 12. Format WhatsApp

Renderer mempertahankan format yang cocok untuk WhatsApp, misalnya:

```text
*LIST QUR'ANAN*

*Juz       Nama*

01. Mb Halim
02. Mb Saroh
03. Mb Aminah
04. Mb Hamidah 🕋
```

Hasil akhir tinggal:

```text
Salin → buka WhatsApp → Paste
```

Aplikasi **tidak otomatis mengirim pesan WhatsApp** dan MVP tidak menggunakan WhatsApp Business API.

---

# 13. Troubleshooting

## `npm: command not found`

Install Node.js LTS terlebih dahulu:

https://nodejs.org/

Lalu tutup dan buka terminal kembali.

## Port 3000 sedang digunakan

Jalankan:

```bash
npm run dev -- -p 3001
```

Kemudian buka:

```text
http://localhost:3001
```

## `npm install` gagal

Coba:

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm install
```

Jika masih gagal, pastikan koneksi internet dan registry npm normal:

```bash
npm config get registry
```

Seharusnya:

```text
https://registry.npmjs.org/
```

## Vercel gagal build

Urutan pengecekan:

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
```

Perbaiki error lokal terlebih dahulu sebelum push ulang.

## Perubahan tidak muncul setelah deploy

Pastikan commit sudah di-push:

```bash
git status
git log -1
```

Lalu cek deployment terbaru di:

**Vercel Dashboard → Deployments**

---

# 14. Security Notes

- Tidak ada secret hard-coded.
- `.env.local` tidak boleh di-commit.
- Input boundary divalidasi menggunakan schema.
- Error response memakai pattern terpusat.
- Logging menggunakan structured JSON.
- Jangan menambahkan `SUPABASE_SERVICE_ROLE_KEY` sebagai `NEXT_PUBLIC_*`.
- Jangan mempercayai data dari browser sebagai authorization.

---

# 15. Production Checklist

Sebelum dianggap production-ready, jalankan:

```bash
npm install
npm test
npm run typecheck
npm run lint
npm run build
```

Kemudian cek secara manual:

- halaman utama terbuka
- template dapat dipilih
- Smart Paste bekerja
- tambah/edit/hapus row bekerja
- status bekerja
- preview WhatsApp sesuai
- Copy berhasil
- responsive mobile tidak overflow
- tidak ada error di browser console

---

# 16. Update Workflow yang Disarankan

Gunakan branch untuk perubahan:

```bash
git checkout -b feature/nama-fitur
```

Setelah selesai:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Lalu commit:

```bash
git add .
git commit -m "feat: nama fitur"
git push -u origin feature/nama-fitur
```

Buat Pull Request ke `main`.

Setelah merge ke `main`, Vercel akan membuat production deployment.

---

# 17. Dokumentasi Engineering

Dokumen arsitektur dan keputusan ada di:

- `ARCHITECTURE.md` — arsitektur dan layer aplikasi
- `ASSUMPTIONS.md` — asumsi requirement yang belum eksplisit
- `TASKS.md` — task implementasi dan acceptance criteria
- `FIXES.md` — audit, temuan, dan perbaikan

---

# 18. Roadmap Berikutnya

Prioritas pengembangan setelah MVP stabil:

1. Supabase Auth
2. Cloud persistence
3. Shareable list link
4. Collaborative editing
5. Template custom milik pengguna
6. Import Excel/CSV
7. Export PDF/PNG
8. WhatsApp deep-link/share workflow
9. Version history
10. AI Smart Paste untuk format WhatsApp yang sangat berantakan

---

## License

Private project / proprietary. Tambahkan lisensi publik hanya jika memang diperlukan.
