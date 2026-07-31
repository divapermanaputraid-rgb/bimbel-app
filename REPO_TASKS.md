# REPO_TASKS.md — Inventaris Pekerjaan, Modul, dan Track Kerja

> Dihasilkan dari pemindaian literal repositori `/Users/macbook/workspace/portofolio/BIMBEL` (kode, migrasi, buku HTML, skrip, konteks, specs/plans lokal, git status/history, README checklist, dan marker TODO/FIXME).
>
> Tanggal scan konteks sesi: **2026-07-30**.
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
| `REPO_TASKS.md` | Inventaris tugas (file ini) | **BARU** |

### 1.2 Aplikasi `bimbel-app/` — konfigurasi & tooling

| Path | Status |
|------|--------|
| `package.json` | **AKTIF** — Next 14, Supabase, Capacitor 8.x plugins, scripts: `dev`, `build`, `lint`, `build:web`, `sync:android`, `build:apk`, `build:aab`, `patch:book-viewport` |
| `package-lock.json` | **AKTIF** |
| `tsconfig.json` / `tsconfig.tsbuildinfo` | **AKTIF** |
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
| `data/bank-soal-bing-k6.json` | Bank soal B.Inggris K6 (80 soal) | **ADA** (commit `e4c7ced`) |
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
| `src/app/fonts/GeistVF.woff` / `GeistMonoVF.woff` | Fonts | **AKTIF** |
| `src/app/favicon.ico` | Favicon | **AKTIF** |

#### Dashboard Siswa — `src/app/dashboard/siswa/`

| Path | Peran | Status |
|------|-------|--------|
| `layout.tsx` | Layout siswa + navbar | **AKTIF** |
| `page.tsx` | Beranda siswa | **AKTIF** |
| `learn/page.tsx` | Halaman Belajar (subject → kelas → unit) | **AKTIF** |
| `practice/page.tsx` | Halaman Latihan | **AKTIF** |
| `badges/page.tsx` | Badges | **AKTIF** |
| `profile/page.tsx` | Profil | **AKTIF** |
| `latihan/[assignmentId]/page.tsx` | Latihan assignment legacy path | **ADA** (model Duolingo menghapus `assignments`; path residual) |
| `latihan/[assignmentId]/quiz-client.tsx` | Client quiz assignment | **ADA** (residual) |
| `latihan/cepat/page.tsx` | Latihan cepat | **AKTIF** |
| `materi/[subjectId]/page.tsx` | List materi per subject (legacy-ish) | **ADA** |
| `materi/[subjectId]/material-list-client.tsx` | Client list materi | **ADA** |
| `achievement-grid.tsx` | Grid achievement | **AKTIF** |
| `learning-history.tsx` | Riwayat belajar | **AKTIF** |
| `logout-button.tsx` | Logout | **AKTIF** |
| `material-list.tsx` | List materi | **ADA** |
| `notification-dropdown.tsx` | Notifikasi | **AKTIF** |
| `profile-card.tsx` | Kartu profil | **AKTIF** |
| `subject-grid.tsx` | Grid subject | **ADA** |

#### Dashboard Guru — `src/app/dashboard/guru/`

| Path | Peran | Status |
|------|-------|--------|
| `layout.tsx` | Layout guru | **AKTIF** |
| `page.tsx` | Beranda guru + count per kelas + siswa stuck | **AKTIF** (K1 styling/filter support) |
| `summary-cards.tsx` | Summary cards | **AKTIF** |
| `reports/page.tsx` | Laporan + filter kelas (1,2,3,6) | **AKTIF** |
| `students/page.tsx` | Daftar siswa | **AKTIF** |
| `siswa/page.tsx` | Alias/path siswa | **ADA** |
| `profile/page.tsx` | Profil guru | **AKTIF** |

### 1.4 API Routes — `src/app/api/`

| Path | Peran | Status |
|------|-------|--------|
| `ai-tutor/route.ts` | Groq AI tutor | **AKTIF** |
| `progress/route.ts` | Simpan progress buku/unit | **AKTIF** |
| `submit-latihan/route.ts` | Submit hasil latihan + auto-unlock | **AKTIF** |
| `assign/route.ts` | Assign (legacy residual setelah drop assignments) | **ADA** — perlu verifikasi masih dipakai |
| `notifications/read/route.ts` | Tandai notif dibaca | **AKTIF** |
| `guru/assign/route.ts` | Guru assign | **ADA** — residual vs model Duolingo |
| `guru/level/route.ts` | Ubah level siswa | **AKTIF** |
| `guru/semangat/route.ts` | Kirim notif semangat | **AKTIF** |
| `guru/siswa/route.ts` | Data siswa untuk guru | **AKTIF** |
| `guru/unlock/route.ts` | Unlock unit manual | **AKTIF** |

### 1.5 Components — `src/components/`

| Path | Peran | Status |
|------|-------|--------|
| `capacitor-native-shell.tsx` | StatusBar, Splash, Back (Keluar/Batal), deep link | **AKTIF** |
| `offline-indicator.tsx` | Banner offline (Capacitor Network) | **AKTIF** |
| `service-worker-register.tsx` | Register SW | **AKTIF** |
| `navbar/StudentNavbar.tsx` | Bottom nav siswa | **AKTIF** |
| `navbar/GuruNavbar.tsx` | Bottom nav guru | **AKTIF** |
| `learn/LearnClient.tsx` | Alur Belajar generik + **COMING_SOON IPAS locked** | **AKTIF** |
| `learn/SubjectCard.tsx` | Kartu mapel | **AKTIF** |
| `learn/ClassTabs.tsx` | Tab kelas | **AKTIF** |
| `learn/UnitGrid.tsx` | Grid unit (+ prop `kelas`) | **AKTIF** |
| `learn/UnitCard.tsx` | Kartu unit (+ styling K1) | **AKTIF** |
| `practice/PracticeClient.tsx` | Alur latihan | **AKTIF** |
| `practice/SubjectSelector.tsx` | Pilih mapel latihan | **AKTIF** |
| `practice/UnitList.tsx` | List unit latihan | **AKTIF** |
| `practice/UnitCard.tsx` | Kartu unit latihan | **AKTIF** |
| `practice/QuickPracticeButton.tsx` | Tombol latihan cepat | **AKTIF** |
| `latihan/LatihanContainer.tsx` | Container quiz Duolingo-style | **AKTIF** |
| `latihan/ProgressBar.tsx` | Progress bar latihan | **AKTIF** |
| `latihan/LivesIndicator.tsx` | Nyawa ❤️ | **AKTIF** |
| `latihan/FeedbackScreen.tsx` | Feedback benar/salah | **AKTIF** |
| `latihan/ChooseCorrectSoal.tsx` | Tipe soal pilih | **AKTIF** |
| `latihan/TrueFalseSoal.tsx` | Tipe soal B/S | **AKTIF** |

### 1.6 Lib / hooks / utils / middleware

| Path | Peran | Status |
|------|-------|--------|
| `src/middleware.ts` | Auth routing protection | **AKTIF** |
| `src/lib/supabase/client.ts` | Supabase browser client | **AKTIF** |
| `src/lib/supabase/server.ts` | Supabase server client | **AKTIF** |
| `src/lib/supabase/middleware.ts` | Supabase middleware helper | **AKTIF** |
| `src/lib/groq-client.ts` | Groq round-robin multi-key | **AKTIF** |
| `src/lib/native-shell.ts` | Native shell helpers | **AKTIF** |
| `src/lib/native-shell.test.mjs` | Test native shell | **ADA** |
| `src/utils/supabase/client.ts` | Duplikat/util supabase client | **ADA** (paralel `src/lib/supabase`) |
| `src/utils/supabase/server.ts` | Duplikat/util supabase server | **ADA** |
| `src/utils/supabase/middleware.ts` | Duplikat/util supabase middleware | **ADA** |
| `src/hooks/useSound.ts` | Sound hook latihan | **AKTIF** |
| `src/hooks/useSpeech.ts` | Speech hook latihan | **AKTIF** |

### 1.7 Buku interaktif HTML — `public/buku/` (total **117** file `.html`)

#### Kelas 1 — **33 buku** — STATUS: **SELESAI (konten file)**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| Matematika | `public/buku/kelas1/matematika/` | 18 | `k1-mtk-01` … `k1-mtk-18` | **SELESAI** |
| Bahasa Indonesia | `public/buku/kelas1/bahasa-indonesia/` | 8 | `k1-bind-01` … `k1-bind-08` | **SELESAI** |
| Bahasa Inggris | `public/buku/kelas1/bahasa-inggris/` | 7 | `k1-bing-01` … `k1-bing-07` | **SELESAI** |

#### Kelas 2 — **30 buku** — STATUS: **SELESAI (konten file yang ada)** / **MTK belum 18 unit penuh**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| Matematika | `public/buku/kelas2/matematika/` | 12 | `k2-mtk-01`…`10` + `k2-mtk-03-eval`, `k2-mtk-06-eval` | **SELESAI batch 1–10 + 2 eval**; **BELUM** unit 11–18 jika target disamakan K1/K3/K6 |
| Bahasa Indonesia | `public/buku/kelas2/bahasa-indonesia/` | 8 | `k2-bind-01` … `k2-bind-08` | **SELESAI** |
| Bahasa Inggris | `public/buku/kelas2/bahasa-inggris/` | 10 | `k2-bing-01` … `k2-bing-10` | **SELESAI** |

#### Kelas 3 — **44 buku** — STATUS: **SELESAI (konten file)**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| Matematika | `public/buku/kelas3/matematika/` | 18 | `k3-mtk-01` … `k3-mtk-18` | **SELESAI** |
| Bahasa Indonesia | `public/buku/kelas3/bahasa-indonesia/` | 8 | `k3-bind-01` … `k3-bind-08` | **SELESAI** (commit `dce3615`) |
| Bahasa Inggris | `public/buku/kelas3/bahasa-inggris/` | 10 | `k3-bing-01` … `k3-bing-10` | **SELESAI** |
| **IPAS** | `public/buku/kelas3/ipas/` | **8** | `k3-ipas-01` … `k3-ipas-08` | **SELESAI** (commit `42a37bd`) |

#### Kelas 4 — **8 buku** — STATUS: **SELESAI (IPAS)**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| **IPAS** | `public/buku/kelas4/ipas/` | **8** | `k4-ipas-01` … `k4-ipas-08` | **SELESAI** (commit `cc3f643`) |

#### Kelas 5 — **5 buku** — STATUS: **SELESAI (IPAS)**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| **IPAS** | `public/buku/kelas5/ipas/` | **5** | `k5-ipas-01` … `k5-ipas-05` | **SELESAI** (commit `85e8e3c`) |

#### Kelas 6 — **42 buku** — STATUS: **LENGKAP 4 MAPEL (IPAS selesai)**

| Mapel | Path | Jumlah | ID pattern | Status |
|-------|------|--------|------------|--------|
| Matematika | `public/buku/kelas6/matematika/` | 18 | `k6-mtk-01` … `k6-mtk-18` | **SELESAI** |
| Bahasa Indonesia | `public/buku/kelas6/bahasa-indonesia/` | 6 | `k6-bind-01` … `k6-bind-06` | **SELESAI** (commit `1ff5013`) |
| Bahasa Inggris | `public/buku/kelas6/bahasa-inggris/` | 10 | `k6-bing-01` … `k6-bing-10` | **SELESAI** (commit `e4c7ced`) |
| **IPAS** | `public/buku/kelas6/ipas/` | **8** | `k6-ipas-01` … `k6-ipas-08` | **SELESAI** |
| IPA / IPS / PPKn / Seni / PJOK | — | 0 | — | **BELUM ADA** |

### 1.8 Generator scripts — `bimbel-app/scripts/`

| File | Baris (approx) | Output target | Status |
|------|----------------|---------------|--------|
| `generate-books-k1.js` | 1024 | K1 MTK 18 buku | **ADA** |
| `generate-books-k2.js` | 351 | K2 MTK | **ADA** |
| `generate-books-k3.js` | 693 | K3 MTK | **ADA** |
| `generate-books-k6.js` | 376 | K6 MTK batch | **ADA** |
| `generate-books-k6-part2.js` | 352 | K6 MTK lanjutan | **ADA** |
| `generate-books-bind-k1.js` | 612 | K1 B.Indo 8 | **ADA** |
| `generate-books-bind-k2.js` | 606 | K2 B.Indo 8 | **ADA** |
| `generate-books-bind-k3.js` | 611 | K3 B.Indo 8 | **ADA** |
| `generate-books-bing-k1.js` | 513 | K1 B.Inggris 7 | **ADA** |
| `generate-books-bing-k2.js` | 692 | K2 B.Inggris 10 | **ADA** |
| `generate-books-bing-k3.js` | 594 | K3 B.Inggris 10 | **ADA** |
| `generate-books-bind-k6.js` | ~710 | K6 B.Indo 6 | **ADA** (commit `1ff5013`) |
| `generate-books-bing-k6.js` | ~920 | K6 B.Inggris 10 | **ADA** (commit `e4c7ced`) |
| `generate-duolingo-seed.js` | 170 | Seed model Duolingo | **ADA** |
| `patch-book-viewport.mjs` | — | Patch `viewport-fit=cover` | **ADA** |
| `user-prompt-units-1-3.json` | — | Prompt data units | **ADA** |
| `generate-books-ipas-k3.js` | ~550 | K3 IPAS 8 | **ADA** (commit `42a37bd`) |
| `generate-books-ipas-k4.js` | ~650 | K4 IPAS 8 | **ADA** (commit `cc3f643`) |
| `generate-books-ipas-k5.js` | ~580 | K5 IPAS 5 | **ADA** (commit `85e8e3c`) |
| `generate-books-ipas-k6.js` | ~1140 | K6 IPAS 8 | **ADA** |

### 1.9 Supabase migrations — `bimbel-app/supabase/migrations/`

| File | Isi ringkas literal | Status di repo |
|------|---------------------|----------------|
| `001_foundation.sql` | Foundation schema | **ADA** |
| `002_siswa_dashboard.sql` | Dashboard siswa | **ADA** |
| `003_gamification.sql` | Gamification | **ADA** |
| `004_materi_k2_mtk.sql` | Materi K2 MTK | **ADA** |
| `004b_evaluasi_k2_mtk.sql` | Evaluasi K2 MTK | **ADA** |
| `005_ai_tutor.sql` | AI tutor | **ADA** |
| `006_users_gamification.sql` | Users gamification | **ADA** |
| `007_soal_k2_mtk_1_10.sql` | Soal K2 MTK 1–10 | **ADA** |
| `008_*.sql` | — | **TIDAK ADA** (lompat nomor) |
| `009_*.sql` | — | **TIDAK ADA** (lompat nomor) |
| `010_materials_k6_mtk_1_9.sql` | Materials K6 MTK 1–9 | **ADA** |
| `011_soal_k6_mtk_1_9.sql` | Soal K6 MTK 1–9 | **ADA** |
| `012_materials_k6_mtk_10_18.sql` | Materials K6 MTK 10–18 | **ADA** |
| `013_soal_k6_mtk_10_18.sql` | Soal K6 MTK 10–18 | **ADA** |
| `014_materials_k3_mtk_1_9.sql` | Materials K3 MTK 1–9 | **ADA** |
| `015_soal_k3_mtk_1_9.sql` | Soal K3 MTK 1–9 | **ADA** |
| `016_materials_k3_mtk_10_18.sql` | Materials K3 MTK 10–18 | **ADA** |
| `017_soal_k3_mtk_10_18.sql` | Soal K3 MTK 10–18 | **ADA** |
| `018_fix_constraints.sql` | `kelas IN (1,2,3,6)` untuk users/subjects/materials/achievements | **ADA** |
| `019_materials_bing_k3.sql` | Materials B.Inggris K3 | **ADA** |
| `020_*.sql` | — | **TIDAK ADA** (lompat nomor) |
| `021_duolingo_model.sql` | Drop assignments; `unit_progress`, `latihan_results`, `user_streaks`, notifications model | **ADA** |
| `022_soal_bing_k3_duolingo.sql` | Soal B.Inggris K3 Duolingo | **ADA** |
| `023_fix_security_rls.sql` | RLS security fix | **ADA** |
| `024_seed_k1_mtk_new.sql` | Seed K1 MTK + B.Indo + B.Inggris subjects/materials/questions | **ADA** |
| `025_seed_k2_bind.sql` | Seed K2 B.Indo (8 materials + 24 questions) | **ADA** |
| `026_seed_k2_bing.sql` | Seed K2 B.Inggris (10 materials + 30 questions) | **ADA** |
| `027_seed_k3_bind.sql` | Seed K3 B.Indo (8 materials + 32 questions) | **ADA** (commit `dce3615`) |
| `028_seed_k6_bind.sql` | Seed K6 B.Indo (6 materials + 30 questions) | **ADA** (commit `1ff5013`) |
| `029_seed_k6_bing.sql` | Seed K6 B.Inggris (10 materials + 80 questions) | **ADA** (commit `e4c7ced`) |
| `030_seed_k3_ipas.sql` | Seed K3 IPAS (8 materials + 32 questions) | **ADA** (commit `42a37bd`) |
| `031_seed_k4_ipas.sql` | Seed K4 IPAS (8 materials + 32 questions) | **ADA** (commit `cc3f643`) |
| `032_seed_k5_ipas.sql` | Seed K5 IPAS (5 materials + 25 questions) | **ADA** (commit `85e8e3c`) |
| `033_seed_k6_ipas.sql` | Seed K6 IPAS (8 materials + 40 questions) | **ADA** |

**Catatan penerapan DB:** file migrasi **ADA di repo**; status “sudah di-apply ke project Supabase production/staging” **TIDAK bisa diverifikasi dari filesystem saja** — harus dicek di Supabase SQL history / CLI.

### 1.10 Dokumentasi `konteks/` (lokal)

| File | Status konten vs kode |
|------|------------------------|
| `PROJECT.md` | **USANG sebagian** — masih sebut scope utama K1/K2/K6 MTK; belum mencerminkan penuh B.Indo/B.Inggris K1–K3 |
| `ARCHITECTURE.md` | **ADA** — arsitektur umum |
| `DATABASE.md` | **USANG sebagian** — contoh constraint `kelas IN (2,6)`, masih model assignments; kode sudah `1,2,3,6` + Duolingo `unit_progress` |
| `BOOK_TEMPLATE.md` | **ADA** |
| `AI_TUTOR.md` | **ADA** |
| `API_SPEC.md` | **ADA** |
| `GROQ_SETUP.md` | **ADA** |
| `FRONTEND_GUIDE.md` | **ADA** |
| `FLOW_APLIKASI_DUO.md` | **ADA** — flow Duolingo student-driven; sebut IPAS di UI concept |
| `KURIKULUM_MTK_KELAS2.md` | **ADA** |
| `KURIKULUM_MTK_KELAS6.md` | **ADA** |
| `NAVBAR_REKOMENDASI.md` | **ADA** — rekomendasi 5-tab siswa/guru |
| `PROMPT_IMPLEMENTASI_DUO.md` | **ADA** |
| `PROMPT_LATIHAN_DUO_STYLE.md` | **ADA** |

### 1.11 Specs & plans agent — `docs/superpowers/` (lokal, gitignored)

#### Specs (`docs/superpowers/specs/`)

- `2026-07-25-android-native-feel-design.md`
- `2026-07-25-k2-mtk-01-thick-book-design.md`
- `2026-07-26-bing-kelas3-design.md`
- `2026-07-26-kelas3-mtk-part1-design.md`
- `2026-07-26-kelas3-mtk-part2-design.md`
- `2026-07-26-latihan-duolingo-design.md`
- `2026-07-28-integrasi-guru-dashboard.md`
- `2026-08-03-k6-mtk-batch1-thick-book-design.md`
- `2026-08-03-k6-mtk-batch2-thick-book-design.md`
- `2026-08-03-k6-mtk-batch3-thick-book-design.md`
- `2026-08-04-k1-mtk-batch2-design.md`
- `2026-08-04-k6-mtk-batch4-thick-book-design.md`
- `2026-08-04-k6-mtk-batch5-thick-book-design.md`
- `2026-08-04-k6-mtk-batch6-thick-book-design.md`

#### Plans (`docs/superpowers/plans/`)

- `2026-07-25-android-native-feel.md`
- `2026-07-25-k2-mtk-01-thick-book.md`
- `2026-07-26-bing-kelas3.md`
- `2026-07-26-kelas3-mtk-part1.md`
- `2026-07-26-kelas3-mtk-part2.md`
- `2026-07-28-integrasi-guru-dashboard.md`
- `2026-07-28-latihan-duolingo.md`
- `2026-08-03-k6-mtk-batch1.md`
- `2026-08-04-k1-mtk-batch2.md`

#### SDD ledger (`.superpowers/sdd/progress.md`) — literal

```
# SDD progress — Android native feel (2026-07-25)
# Plan: docs/superpowers/plans/2026-07-25-android-native-feel.md
# (Prior ledger entries for PWA session are obsolete for this plan.)
Task 1: complete (commits 3a24842..c08ec30, review clean)
Task 2: complete (commits c08ec30..b68e55d, review clean)
Task 3: complete (commits b68e55d..a454802 + tsconfig exclude, review clean; minor uncommitted tsconfig fixed by controller)
Task 4: complete (commits 775c083..d864806, review clean)
Task 5: complete (commits d864806..5afe16f, review clean; package.json syntax fix included)
Task 6: complete (commits 5afe16f..6ee3b78, review clean)
Final review: Critical App sync + Important progress-bar CSS fixed (commits after 6ee3b78)
Final review: Critical App sync + Important progress-bar CSS fixed (cc97a90..4b76bd6)
```

### 1.12 Git status (saat scan)

- Branch app: `master` tracking `origin-diva/master`
- Working tree: **clean — nothing to commit**
- Head terkait konten terbaru: `e4c7ced feat: generate 10 B.Inggris Kelas 6 interactive books (k6-bing-01..10) + bank soal 80 + seed SQL`
- Commit sebelumnya terkait batch konten:
  - `1ff5013 feat: generate 6 B.Indonesia Kelas 6 interactive books (k6-bind-01..06) + seed 30 soal`
  - `dce3615 Tambah 8 buku bahasa indonesia kelas 3 + 32 soal`
  - `23d18e8 Tambah 10 buku bahasa inggris kelas 2 plus 30 soal`

### 1.13 Memory agent (bukan produk, tapi track kerja agent)

File di `~/.claude/projects/-Users-macbook-workspace-portofolio-BIMBEL/memory/`:

- `MEMORY.md` — index
- `humanize-commits.md` — commit messages must sound human; no Sesi/generate/AI wording
- `no-ai-docs-in-commits.md` — never commit AI/agent docs (`docs/superpowers`, `konteks`)

---

## 2. Semua catatan TODO, FIXME, atau rencana fitur yang tertulis di kode

### 2.1 Marker klasik `TODO` / `FIXME` / `HACK` / `XXX` / `WIP` / `@todo` / `@fixme` / `ponytail:`

**Hasil pemindaian** pada `bimbel-app/src`, `public/assets`, `scripts`, `supabase` (exclude `node_modules`, `.git`, `.next`, `android`, HTML buku massal):

> **TIDAK DITEMUKAN** string marker `TODO`, `FIXME`, `HACK`, `XXX`, `WIP`, `@todo`, `@fixme`, atau `ponytail:` di source TypeScript/JavaScript/SQL yang dipindai.

Artinya: **tidak ada daftar TODO/FIXME literal di kode produk** pada saat scan ini.

### 2.2 Rencana fitur / placeholder yang tertulis eksplisit di kode

#### A. `src/components/learn/LearnClient.tsx` — COMING_SOON IPAS (literal)

```ts
const COMING_SOON: GroupedSubject[] = [
  {
    kode: "ipas",
    nama: "IPAS",
    icon: "🌿",
    kelasList: [],
    subjectIds: [],
    totalUnits: 0,
    completedUnits: 0,
    locked: true,
  },
];
```

- Digabung ke daftar subject di UI Belajar sebagai kartu **terkunci**.
- **Rencana fitur tertulis:** mapel **IPAS** belum dibuka (locked placeholder).

#### B. `bimbel-app/README.md` — Checklist uji manual (semua masih unchecked, literal)

```markdown
- [ ] Login siswa & guru redirect benar
- [ ] Buku HTML terbuka, kuis inline jalan, tombol selesai aktif setelah kuis
- [ ] Progress/API tidak error di network tab saat online
- [ ] AI tutor membalas (atau pesan fallback jika key kosong)
- [ ] DevTools → Application → Manifest terbaca
- [ ] Service worker terdaftar
- [ ] Buka satu buku online, lalu offline: buku itu masih bisa dibuka
- [ ] Banner offline muncul saat jaringan diputus
- [ ] `npm run build` lulus
```

#### C. `konteks/FLOW_APLIKASI_DUO.md` — rencana UI mapel

- Menyebut pilihan pelajaran termasuk **`[IPAS 🌿]`** di wireframe Belajar.
- Menyebut kelas **`[1] [2] [3] [6]`**.
- Model: siswa pilih sendiri; guru monitor; unlock unit; buku vs latihan terpisah.

#### D. `konteks/DATABASE.md` — seed subject “rencana” lama (literal di doc, belum tentu di DB)

Seed contoh di dokumen (model lama, constraint `kelas IN (2,6)`):

**Kelas 2 subjects direncanakan di doc:**
- `mtk` Matematika
- `bin` Bahasa Indonesia
- `ppkn` PPKn
- `seni` Seni
- `pjok` PJOK

**Kelas 6 subjects direncanakan di doc:**
- `mtk` Matematika
- `bin` Bahasa Indonesia
- `ipa` IPA
- `ips` IPS
- `ppkn` PPKn
- `seni` Seni
- `pjok` PJOK

> Di kode/migrasi aktual yang terlihat: subjects yang di-seed kuat untuk **mtk / bind / bing** pada kelas 1–3 dan mtk kelas 6; **PPKn/Seni/PJOK/IPA/IPS/IPAS sebagai buku + seed penuh belum ada** di `public/buku` dan migrasi seed yang ada.

#### E. `konteks/NAVBAR_REKOMENDASI.md` — spesifikasi navbar (sudah diimplement sebagian di `StudentNavbar`/`GuruNavbar`)

- Maksimal 5 tab siswa: Beranda, Learn, Tasks/Practice, Badges, Me
- Badge notification
- Safe area
- Fixed bottom

#### F. `konteks/PROJECT.md` — scope tertulis (sebagian sudah terlampaui kode)

Literal scope realisasi di doc:

- Kelas 1 MTK 18 buku — SELESAI
- Kelas 2 MTK 10 buku — SELESAI
- Kelas 6 MTK 18 buku — SELESAI
- Capacitor Android — SELESAI
- Database seeding K1/K2/K6 MTK — SELESAI (menurut doc)

Doc **belum** mendaftarkan selesai-nya B.Indo/B.Inggris multi-kelas yang sudah ada di filesystem.

#### G. Duplikasi util Supabase

- `src/lib/supabase/*` dan `src/utils/supabase/*` keduanya ada.
- Bukan TODO tertulis, tetapi **debt struktural** teramati dari tree file.

#### H. API residual model assignment

- Setelah `021_duolingo_model.sql` **DROP** `assignments` / `assigned_tasks`, file route berikut **masih ada di tree**:
  - `src/app/api/assign/route.ts`
  - `src/app/api/guru/assign/route.ts`
  - `src/app/dashboard/siswa/latihan/[assignmentId]/*`
- Tidak ada komentar TODO di file-file ini dari hasil grep marker; status fungsional: **perlu audit apakah mati/residual**.

### 2.3 Specs/plans yang merekam pekerjaan historis (bukan TODO di kode, tapi track fitur)

Setiap file di §1.11 adalah catatan desain/implementasi. Yang **sudah punya artefak kode/buku** vs yang hanya doc:

| Track spec/plan | Artefak kode/buku terkait | Status ringkas |
|-----------------|---------------------------|----------------|
| Android native feel | `capacitor-native-shell`, offline, patch viewport | **Selesai** (SDD progress complete) |
| K2 MTK thick book | `public/buku/kelas2/matematika`, migrasi 004/007 | **Selesai batch 01–10 + eval** |
| K3 MTK part1/part2 | 18 buku + migrasi 014–017 | **Selesai** |
| B.Inggris K3 | 10 buku + 019/022 | **Selesai** |
| Latihan Duolingo | components/latihan + route `/latihan/[unit-id]` + 021 | **Selesai (inti)** |
| Integrasi guru dashboard | guru pages + reports + semangat/unlock | **Selesai (inti)** |
| K6 MTK batches 1–6 | 18 buku + 010–013 | **Selesai** |
| K1 MTK batch2 | 18 buku + 024 | **Selesai** |
| K1/K2 B.Indo & B.Inggris, K2 B.Inggris, K3 B.Indo | generators + HTML + 024–027 | **Selesai di kode**; **specs superpowers khusus batch ini tidak semua ada sebagai file bertanggal** |

---

## 3. Rincian track pengerjaan saat ini

### 3.1 Yang SELESAI / AKTIF di codebase (terverifikasi dari file + git log)

#### Platform & app shell
- [x] Next.js 14 App Router dashboard siswa/guru
- [x] Supabase auth + middleware proteksi route
- [x] Tailwind + globals
- [x] PWA service worker `public/sw.js`
- [x] Capacitor Android shell (StatusBar, Splash, Back Keluar/Batal, network offline)
- [x] Bottom navbar siswa & guru
- [x] AI Tutor API Groq + widget di buku (`book-engine.js` + `/api/ai-tutor`)
- [x] Progress POST `/api/progress`
- [x] Submit latihan + auto-unlock next unit
- [x] Guru: reports filter kelas, semangat, unlock, level, list siswa
- [x] Learn flow generik (subject → class tabs → unit grid) + K1 card styling
- [x] Practice flow + quick practice
- [x] Latihan Duolingo-style (lives, progress, choose, true/false, feedback)
- [x] Constraint DB kelas `1,2,3,6` (migrasi 018)
- [x] Model Duolingo DB: `unit_progress`, drop assignments (migrasi 021)
- [x] RLS fixes (023)

#### Konten buku HTML (file ada)
- [x] K1 Matematika 18
- [x] K1 Bahasa Indonesia 8
- [x] K1 Bahasa Inggris 7
- [x] K2 Matematika 10 + 2 eval (12 file)
- [x] K2 Bahasa Indonesia 8
- [x] K2 Bahasa Inggris 10
- [x] K3 Matematika 18
- [x] K3 Bahasa Indonesia 8
- [x] K3 Bahasa Inggris 10
- [x] K6 Matematika 18

#### Seed SQL di repo
- [x] 024 K1 mtk+bind+bing
- [x] 025 K2 bind
- [x] 026 K2 bing
- [x] 027 K3 bind
- [x] K2/K3/K6 MTK materials+soal (004–017, 010–013)
- [x] K3 bing materials+soal (019, 022)

#### Batch sesi terbaru (git)
- [x] Dashboard K1 support (`395fbd0`)
- [x] K2 B.Indo (`c6eab68`)
- [x] K2 B.Inggris (`23d18e8`)
- [x] K3 B.Indo (`dce3615`)
- [x] K6 B.Indo 6 (`1ff5013`)
- [x] K6 B.Inggris 10 + bank soal (`e4c7ced`)

### 3.2 Yang SEDANG BERJALAN / UPDATE SESI INI

| Item | Status sesi |
|------|-------------|
| Generate 6 buku B.Indonesia Kelas 6 (`k6-bind-01`…`06`) | **Selesai** — HTML + `scripts/generate-books-bind-k6.js` |
| Seed SQL 30 soal K6 B.Indo (`028_seed_k6_bind.sql`) | **Selesai** |
| Commit/push K6 B.Indo (`1ff5013`) | **Selesai** (Diva) |
| Generate 10 buku B.Inggris Kelas 6 (`k6-bing-01`…`10`) | **Selesai** — HTML + `scripts/generate-books-bing-k6.js` |
| Bank soal JSON K6 B.Inggris (`data/bank-soal-bing-k6.json` — 80 soal) | **Selesai** |
| Seed SQL 80 soal K6 B.Inggris (`029_seed_k6_bing.sql`) | **Selesai** |
| Commit/push K6 B.Inggris (`e4c7ced`) | **Selesai** (Diva) |
| Update `REPO_TASKS.md` | **Sedang dikerjakan → file ini** |

### 3.3 Yang TERTUNDA / BELUM DIVERIFIKASI OPERASIONAL

| Item | Keterangan literal |
|------|--------------------|
| Apply migrasi 024–029 ke Supabase remote | File ada di repo; **apply production belum terverifikasi dari disk** |
| README checklist uji manual | Semua 9 item masih `- [ ]` |
| Apakah route `assign` / halaman `latihan/[assignmentId]` masih hidup | Residual setelah drop table assignments — **audit tertunda** |
| Duplikasi `src/lib/supabase` vs `src/utils/supabase` | Debt — **belum dirapikan** |
| Sinkronisasi `konteks/PROJECT.md` & `DATABASE.md` dengan realita multi-mapel K1–K3 | Doc **usang** — update tertunda |
| README masih bilang “Kelas 2 & 6” di tagline | **Usang copy** vs konten K1/K3 |
| Bank soal JSON di `data/` | Hanya `bank-soal-bing-k1.json`; **belum ada** bank JSON setara untuk mapel/kelas lain (latihan engine bisa ambil dari DB `questions`) |
| Nomor migrasi 008, 009, 020 | **Missing** (gap penomoran; bukan error otomatis) |

### 3.4 Yang BELUM DIKERJAKAN (gap konten / fitur dari doc + UI placeholder + absensi folder)

#### A. Mapel belum ada bukunya sama sekali
- [ ] **IPAS** — ada di UI sebagai `COMING_SOON` locked di `LearnClient.tsx`; **0 HTML**, **0 seed materials**
- [ ] **PPKn** — disebut di `DATABASE.md` seed rencana; **0 HTML**
- [ ] **Seni** — disebut di doc; **0 HTML**
- [ ] **PJOK** — disebut di doc; **0 HTML**
- [ ] **IPA** (Kelas 6) — disebut di doc; **0 HTML**
- [ ] **IPS** (Kelas 6) — disebut di doc; **0 HTML**

#### B. Kelas 6 non-MTK
- [x] Bahasa Indonesia Kelas 6 (6 buku + seed 30)
- [x] Bahasa Inggris Kelas 6 (10 buku + seed 80 + bank soal)
- [ ] Mapel lain Kelas 6 di luar MTK (IPA, IPS, PPKn, Seni, PJOK)

#### C. Kelas 2 Matematika kelanjutan
- [ ] Jika target kurikulum disamakan 18 unit: **k2-mtk-11 … k2-mtk-18** belum ada sebagai file HTML (saat ini hanya s/d 10 + 2 eval)
- [ ] Seed soal K2 MTK di repo: `007_soal_k2_mtk_1_10.sql` — **tidak ada** file soal 11–18

#### D. Latihan Duolingo — tipe soal
Komponen yang **sudah ada**: `ChooseCorrectSoal`, `TrueFalseSoal`.
Yang sering disebut di prompt/bank (B.Inggris dsb.) tetapi **tidak ada file komponen terpisah di tree**:
- [ ] Arrange / susun kata (komponen dedicated)
- [ ] Match / cocokkan
- [ ] Fill blank (komponen dedicated)
- [ ] Listen & choose (selain hook speech generik)

> Mungkin sebagian di-handle di container generik — **perlu audit runtime**; sebagai file komponen, hanya choose + truefalse yang eksplisit.

#### E. Dashboard / produk
- [ ] IPAS unlock + konten
- [ ] ProgressTable terpisah (spek lama guru) — reports saat ini inline `<table>` di `reports/page.tsx` (bukan missing wajib)
- [ ] Update dokumentasi user-facing (README) agar mencakup Kelas 1 & 3 multi-mapel
- [ ] Pastikan Practice page memuat bank soal K1/K2 bind/bing dari DB setelah seed applied
- [ ] Unit progress auto-seed untuk siswa kelas 1 (disebut di task dashboard lama: 33 row per siswa K1) — **implementasi di app/migration lanjutan perlu dicek** (021 membuat tabel; auto-generate rows per siswa tidak terlihat sebagai migrasi dedicated di list 001–027)

#### F. Android / release
- [ ] Checklist native feel di README (deskriptif, bukan checkbox) — verifikasi device real
- [ ] Build APK/AAB & Play Store listing — di luar tree konten
- [ ] Push notification end-to-end (dependency Capacitor ada; flow produk penuh belum ditandai selesai di checklist README)

#### G. Quality / ops
- [ ] Semua item checklist README (§2.2.B)
- [ ] Tidak ada automated test suite besar (hanya `native-shell.test.mjs` teramati)
- [ ] CI status tidak dipindai di sini

### 3.5 Urutan track konten historis (dari git log + sesi) — literal alur kerja

1. Fondasi app + dashboard + gamification + K2/K6 MTK  
2. K3 MTK part 1–2  
3. B.Inggris K3 + speakEnglish + Duolingo model  
4. Latihan Duolingo UI  
5. Guru dashboard monitoring  
6. Android native feel (SDD complete)  
7. K1 MTK 18  
8. K1 B.Indo 8 + K1 B.Inggris 7  
9. Dashboard K1 support (UnitCard kelas prop, guru filter)  
10. K2 B.Indo 8  
11. K2 B.Inggris 10  
12. K3 B.Indo 8
13. K6 B.Indo 6 (`1ff5013`)
14. K6 B.Inggris 10 + bank soal + seed (`e4c7ced`)
15. **Berikutnya (belum ditetapkan):** kandidat natural dari gap §3.4 (IPAS, K2 MTK 11-18, K6 mapel lain, tipe soal latihan, apply migrasi, update docs)

### 3.6 Aturan kerja wajib yang masih mengikat track (dari `CLAUDE.md` / memory)

- Rotasi git user harian: Diva max 10 commit/hari, Robert max 30; prioritas Diva dulu.
- Jangan commit `docs/superpowers/**`, `.superpowers/**`, `konteks/**`, `QA_NOTES.md`, skill locks.
- Commit message human, imperatif; tanpa wording AI/Sesi/generate.
- Jangan force-push kecuali diminta user.
- Prefix perintah shell dengan `rtk` (aturan RTK di CLAUDE user).

### 3.7 Ringkasan eksekutif track (satu layar)

| Area | Selesai | Tertunda | Belum |
|------|---------|----------|-------|
| App shell (Next/Supabase/Capacitor/PWA) | Ya | Audit residual assign routes | — |
| Belajar/Latihan/Guru UI inti | Ya | IPAS card locked | IPAS konten |
| Buku K1 (3 mapel) | Ya | — | — |
| Buku K2 (3 mapel; MTK s/d 10) | Ya (yang ada) | — | MTK 11–18 jika diminta |
| Buku K3 (4 mapel) | Ya | — | — |
| Buku K4 (1 mapel) | Ya (IPAS 8) | — | Mapel lain (IPA, IPS, PPKn) |
| Buku K5 (1 mapel) | Ya (IPAS 5) | — | Mapel lain (IPA, IPS, PPKn) |
| Buku K6 (3 mapel) | Ya (MTK 18 + B.Indo 6 + B.Inggris 10) | — | Mapel lain (IPA, IPS, PPKn) |
| Seed SQL di repo | Banyak (s/d 032) | Apply remote | Seed mapel belum ada |
| TODO/FIXME di kode | Tidak ada marker | — | — |
| QA checklist README | — | Semua unchecked | — |
| Docs konteks | Ada | Sinkronisasi usang | — |

---

## Appendix A — Perintah scan yang mendasari file ini

- Enumerasi tree `src/`, `public/buku/`, `scripts/`, `supabase/migrations/`
- Hitung HTML per kelas/mapel
- `git log` / `git status` di `bimbel-app`
- Grep marker TODO/FIXME/HACK/XXX/WIP/COMING_SOON/ipas
- Baca `README.md`, `CLAUDE.md`, `konteks/PROJECT.md`, `DATABASE.md`, `FLOW_APLIKASI_DUO.md`, `.superpowers/sdd/progress.md`, memory index
- Baca cuplikan `LearnClient.tsx` COMING_SOON, migrasi 018 & 021

## Appendix B — Total hitungan konten buku

```
kelas1: 33  (mtk 18 + bind 8 + bing 7)
kelas2: 30  (mtk 12 termasuk 2 eval + bind 8 + bing 10)
kelas3: 44  (mtk 18 + bind 8 + bing 10 + ipas 8)
kelas4:  8  (ipas 8)
kelas5:  5  (ipas 5)
kelas6: 42  (mtk 18 + bind 6 + bing 10 + ipas 8)
TOTAL:  172 HTML books
```

---

*Akhir REPO_TASKS.md — isi disusun harfiah dari temuan scan; tidak menghapus gap hanya karena “mungkin sudah di production”.*
