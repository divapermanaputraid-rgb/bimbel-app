# REPO_TASKS.md — Inventaris Pekerjaan, Modul, dan Track Kerja

> Dihasilkan dari pemindaian literal repositori `/Users/macbook/workspace/portofolio/BIMBEL` (kode, migrasi, buku HTML, skrip, konteks, specs/plans lokal, git status/history, README checklist, dan marker TODO/FIXME).
>
> Tanggal scan konteks sesi: **2026-08-01**.
>
> Catatan struktur repo: root adalah monorepo/workspace; aplikasi aktif utama berada di **`bimbel-app/`**. `CLAUDE.md` di root adalah symlink ke `bimbel-app/CLAUDE.md`. Dokumen AI/agent di `docs/superpowers/**`, `.superpowers/**`, dan `konteks/**` di-gitignore (lokal agent only) sesuai aturan commit.

---

## 1. Daftar seluruh modul/file aktif beserta status pekerjaan

### 1.1 Root workspace (`/Users/macbook/workspace/portofolio/BIMBEL`)

| Path | Jenis | Status |
|------|-------|--------|
| `bimbel-app/` | Aplikasi Next.js + Capacitor + buku + Supabase | **AKTIF** — sumber kode produk |
| `konteks/` | Dokumentasi arsitektur/project (lokal, gitignored di app) | **ADA** — sebagian **USANG** vs kode aktual |
| `docs/superpowers/` | Specs & plans agent (lokal, gitignored) | **ADA** — track desain historis |
| `.superpowers/sdd/` | Ledger SDD Android native feel | **ADA** — task 1–6 marked complete di `progress.md` |
| `CLAUDE.md` | Symlink → `bimbel-app/CLAUDE.md` | **AKTIF** |
| `BIMBEL.code-workspace` | VS Code workspace | **AKTIF** |
| `knowledge.db` | SQLite lokal | **LOKAL** (di-gitignore pola `*.db`) |
| `.gitignore` (root) | Ignore | **AKTIF** |
| `REPO_TASKS.md` | Inventaris tugas (file ini) | **AKTIF** |

### 1.2 Aplikasi `bimbel-app/` — konfigurasi & tooling

| Path | Status |
|------|--------|
| `package.json` | **AKTIF** — Next 14, Supabase, Capacitor 8.x plugins, Drizzle ORM (baru), scripts: `dev`, `build`, `lint`, `build:web`, `sync:android`, `build:apk`, `build:aab`, `patch:book-viewport` |
| `package-lock.json` | **AKTIF** |
| `tsconfig.json` / `tsconfig.tsbuildinfo` | **AKTIF** |
| `drizzle.config.ts` | **AKTIF** — Drizzle ORM config |
| `next.config.mjs` | **AKTIF** |
| `next-env.d.ts` | **AKTIF** |
| `tailwind.config.ts` | **AKTIF** |
| `postcss.config.mjs` | **AKTIF** |
| `.eslintrc.json` | **AKTIF** |
| `vercel.json` | **AKTIF** — header cache `sw.js` |
| `capacitor.config.ts` | **AKTIF** — wrapper Android |
| `git-switch.sh` | **AKTIF** — rotasi author Diva/Robert (di-gitignore di app `.gitignore`) |
| `.env.local` / `.env.local.example` | Secrets lokal / template |
| `README.md` | **AKTIF** — deskripsi & checklist uji (semua item checklist masih `[ ]`) |
| `CLAUDE.md` | **AKTIF** — commands, arsitektur, commit rules |
| `fix_rls.patch` | Patch file residual |
| `skills-lock.json` | Lock skill lokal (gitignored) |
| `android/` | Project Capacitor Android | **ADA** — build artifacts di-gitignore |
| `resources/` | Icon/splash (di-gitignore di app) | **LOKAL** |
| `data/bank-soal-bing-k1.json` | Bank soal B.Inggris K1 (56 soal) | **ADA** |
| `data/bank-soal-bing-k6.json` | Bank soal B.Inggris K6 (80 soal) | **ADA** |
| `public/manifest.json` | PWA manifest | **AKTIF** |
| `public/sw.js` | Service worker offline | **AKTIF** |
| `public/assets/book-theme.css` | Shared CSS buku | **AKTIF** |
| `public/assets/book-engine.js` | Shared JS: quiz, progress, AI chat, `speakEnglish` | **AKTIF** |

### 1.3 Next.js App Router — `src/app/`

| Path | Peran | Status |
|------|-------|--------|
| `src/app/layout.tsx` | Root layout | **AKTIF** |
| `src/app/page.tsx` | Entry | **AKTIF** |
| `src/app/globals.css` | Global styles | **AKTIF** |
| `src/app/not-found.tsx` | 404 | **AKTIF** |
| `src/app/login/page.tsx` | Login | **AKTIF** |
| `src/app/latihan/[unit-id]/page.tsx` | Route latihan unit (Duolingo-style) | **AKTIF** |

#### Dashboard Siswa — `src/app/dashboard/siswa/`

| Path | Peran | Status |
|------|-------|--------|
| `layout.tsx` | Layout siswa + navbar | **AKTIF** |
| `page.tsx` | Beranda siswa | **AKTIF** |
| `learn/page.tsx` | Halaman Belajar (subject → kelas → unit) | **AKTIF** |
| `practice/page.tsx` | Halaman Latihan | **AKTIF** |
| `badges/page.tsx` | Badges | **AKTIF** |
| `profile/page.tsx` | Profil | **AKTIF** |
| `latihan/cepat/page.tsx` | Latihan cepat | **AKTIF** |

#### Dashboard Guru — `src/app/dashboard/guru/`

| Path | Peran | Status |
|------|-------|--------|
| `layout.tsx` | Layout guru | **AKTIF** |
| `page.tsx` | Beranda guru + count per kelas + siswa stuck + **tombol Rekap Absensi (Baru)** | **AKTIF** |
| `roadmap/create/page.tsx` | Form UI Guru buat Roadmap (Wizard 3 Step) | **BARU (G2)** |
| `roadmap/[id]/page.tsx` | Active Meeting UI (Materi Baru, Review Make It Stick, Absensi) | **BARU (G3/G5b)** |
| `absensi/page.tsx` | Dashboard Rekap Absensi 3 Tab (Bulanan, Pertemuan, Trend) | **BARU (G5c)** |
| `audit/page.tsx` | AI Audit Dashboard Mingguan Groq | **BARU (G4)** |
| `summary-cards.tsx` | Summary cards | **AKTIF** |
| `reports/page.tsx` | Laporan + filter kelas (1,2,3,6) | **AKTIF** |
| `students/page.tsx` | Daftar siswa | **AKTIF** |
| `profile/page.tsx` | Profil guru | **AKTIF** |

### 1.4 API Routes — `src/app/api/`

| Path | Peran | Status |
|------|-------|--------|
| `ai-tutor/route.ts` | Groq AI tutor | **AKTIF** |
| `progress/route.ts` | Simpan progress buku/unit | **AKTIF** |
| `submit-latihan/route.ts` | Submit hasil latihan + auto-unlock | **AKTIF** |
| `guru/roadmap/route.ts` | POST create roadmap & GET roadmap list | **BARU (G2)** |
| `guru/roadmap/[id]/meeting/route.ts` | GET meeting materials (baru+review) & POST mark done | **BARU (G3)** |
| `guru/roadmap/[id]/meeting/schedule/route.ts` | GET & Auto-Create active schedule ID | **BARU (G5b)** |
| `guru/roadmap/[id]/meeting/attendance/route.ts` | GET attendance list & POST upsert absensi | **BARU (G5a)** |
| `guru/absensi/rekap/route.ts` | GET data rekap absen bulanan/pertemuan/trend | **BARU (G5c)** |
| `guru/audit/route.ts` | GET/POST Weekly AI Audit by Groq | **BARU (G4)** |
| `guru/level/route.ts` | Ubah level siswa | **AKTIF** |
| `guru/semangat/route.ts` | Kirim notif semangat | **AKTIF** |
| `guru/siswa/route.ts` | Data siswa untuk guru | **AKTIF** |
| `guru/unlock/route.ts` | Unlock unit manual | **AKTIF** |

### 1.5 Components — `src/components/`

| Path | Peran | Status |
|------|-------|--------|
| `guru/RuangKelasCard.tsx` | Komponen Absensi & Catatan Siswa per Pertemuan | **BARU (G5b)** |
| `capacitor-native-shell.tsx` | Native shell helper | **AKTIF** |

### 1.6 Lib / hooks / utils / middleware

| Path | Peran | Status |
|------|-------|--------|
| `src/db/schema.ts` | Schema Drizzle ORM | **BARU** |
| `src/db/index.ts` | Connection Drizzle ORM PostgreSQL | **BARU** |
| `src/lib/pertemuan.ts` | Helper hitung Active Meeting & Logic Spaced Repetition (Make It Stick) | **BARU (G3)** |
| `src/lib/audit.ts` | Logic hitung statistik mingguan, cari siswa stuck, & cari materi sulit | **BARU (G4)** |
| `src/middleware.ts` | Auth routing protection | **AKTIF** |
| `src/lib/groq-client.ts` | Groq round-robin multi-key | **AKTIF** |

### 1.7 Buku interaktif HTML — `public/buku/` (total **172** file `.html`)

*(Status buku per 2026-07-31: K1 33 file, K2 30 file, K3 44 file, K4 8 file, K5 5 file, K6 42 file. Lengkap di pemindaian sebelumnya)*

### 1.8 Supabase migrations — `bimbel-app/supabase/migrations/`

| File | Isi ringkas literal | Status |
|------|---------------------|--------|
| `001` - `040` | Core, Gamification, Unit Progress, Soal, IPAS Seed, dll | **ADA** |
| `041_guru_roadmap.sql` | Tabel `roadmap_templates`, `template_items`, `pertemuan_schedule` & RLS | **BARU (G1)** |
| `042_audit_logs.sql` | Tabel `audit_logs` & RLS (G4 AI Audit) | **BARU (G4)** |
| `043_siswa_pertemuan_absensi.sql` | Tabel `siswa_pertemuan` & RLS (G5 Absensi) | **BARU (G5)** |

---

## 3. Rincian track pengerjaan saat ini

### 3.1 Yang SEDANG BERJALAN / UPDATE SESI INI (Agustus 2026)

| Item | Status |
|------|--------|
| **Drizzle ORM Setup** | **Selesai** — Packages diinstal, config dibuat, `src/db/schema.ts` dan `src/db/index.ts` disiapkan. |
| **G1: Database Roadmap Migration** | **Selesai** — File migrasi raw SQL native `041_guru_roadmap.sql` dibuat. |
| **G2: Guru Roadmap Builder UI & API** | **Selesai** — API Route `/api/guru/roadmap` dan Wizard UI `/roadmap/create/page.tsx` berhasil ditambahkan. |
| **G3: Active Meeting & Make-It-Stick** | **Selesai** — Helper `lib/pertemuan.ts` (Spaced Repetition array), API Meeting, dan UI Dashboard Pertemuan Aktif `roadmap/[id]/page.tsx` ditambahkan. |
| **G4: AI Audit Dashboard Mingguan** | **Selesai** — Tabel `audit_logs`, logic statistik `lib/audit.ts`, integrasi prompt Groq di `/api/guru/audit/route.ts`, dan UI Dashboard Audit. |
| **G5a: Migration & API Absensi** | **Selesai** — Migrasi `043_siswa_pertemuan_absensi.sql` & batch UPSERT API route. |
| **G5b: UI RuangKelasCard Absensi** | **Selesai** — Komponen `RuangKelasCard.tsx` ditaruh ke UI Meeting Aktif. |
| **G5c: UI Rekap Absensi 3 View** | **Selesai** — API rekap aggregasi data dan halaman UI Rekap (Bulanan, Pertemuan, Trend) ditambahkan di `/dashboard/guru/absensi`. |

### 3.2 Yang TERTUNDA / BELUM DIVERIFIKASI OPERASIONAL

| Item | Keterangan literal |
|------|--------------------|
| **Push / Apply Migrasi Baru (041, 042, 043)** | File SQL ada di repository, tetapi `supabase db push` dari lokal gagal karena konflik file awal `001_foundation.sql`. Harus dieksekusi **manual dari SQL Editor Supabase**. |
| Duplikasi `src/lib/supabase` vs `src/utils/supabase` | Debt — **belum dirapikan** |
| README checklist uji manual | Semua masih `- [ ]` |

---

*Akhir REPO_TASKS.md — Update pada sesi integrasi Roadmap, Audit AI Groq, & Sistem Absensi (G1-G5).*