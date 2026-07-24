# Bimbel Interaktif SD

Aplikasi bimbel interaktif untuk siswa SD Kelas 2 & 6 — buku matematika HTML ringan, dashboard siswa/guru, dan tutor AI.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + PostgreSQL)
- Groq (AI tutor API)
- PWA service worker (offline books after first open)
- Capacitor 6 (Android native wrapper)

## Fitur

- Buku interaktif Kelas 2 & Kelas 6 (`public/buku`)
- Login + dashboard siswa & guru
- Assign tugas, progress, XP/streak (sesuai migrasi DB)
- AI tutor lewat `/api/ai-tutor`
- Offline: aset buku yang pernah dibuka bisa dibaca tanpa jaringan

## 📱 Aplikasi Android

### Build APK
```bash
npm run build:apk
```
APK akan muncul di `android/app/release/app-release.apk`

### Build App Bundle (Play Store)
```bash
npm run build:aab
```

### Install ke HP
```bash
adb install android/app/release/app-release.apk
```

### Fitur Native
- ✅ Offline mode (buku tersimpan lokal)
- ✅ Push notification (tugas baru, deadline)
- ✅ Splash screen & icon custom
- ✅ Deep linking dari URL tugas
- ✅ Back button Android native

## Setup lokal

```bash
npm install
cp .env.local.example .env.local
# isi URL/key Supabase + key Groq
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Database

Migrasi SQL ada di `supabase/migrations/`. Terapkan lewat Supabase SQL Editor atau CLI yang sudah di-link ke project.

Urutan: foundation → dashboard/gamification → materi/soal per batch.

## Deploy (Vercel)

1. Import repo ke Vercel (framework Next.js)
2. Set environment variables sama seperti `.env.local`
3. Deploy production

`vercel.json` mengatur header `sw.js` agar service worker tidak di-cache agresif.

**Jangan** pakai `output: 'export'` — API routes butuh runtime server. (Kecuali untuk build Capacitor di mana kita ganti sementara menjadi static export di `next.config.mjs`).

## Cara pakai singkat

**Guru:** login → dashboard guru → assign tugas → pantau status.

**Siswa:** login → dashboard siswa → buka tugas/buku → kerjakan kuis → selesai menyimpan progress saat online.

## Checklist uji manual

- [ ] Login siswa & guru redirect benar
- [ ] Buku HTML terbuka, kuis inline jalan, tombol selesai aktif setelah kuis
- [ ] Progress/API tidak error di network tab saat online
- [ ] AI tutor membalas (atau pesan fallback jika key kosong)
- [ ] DevTools → Application → Manifest terbaca
- [ ] Service worker terdaftar
- [ ] Buka satu buku online, lalu offline: buku itu masih bisa dibuka
- [ ] Banner offline muncul saat jaringan diputus
- [ ] `npm run build` lulus

## Struktur penting

```
src/app/          # routes + API
src/components/   # SW register, offline indicator
public/buku/      # HTML buku
public/assets/    # book-theme + book-engine
public/sw.js      # service worker
supabase/migrations/
```
