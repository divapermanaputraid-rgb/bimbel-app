# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- **Install:** `npm install` (run in `bimbel-app/`)
- **Dev:** `npm run dev` (run in `bimbel-app/`)
- **Build:** `npm run build` (run in `bimbel-app/`)
- **Lint:** `npm run lint` (run in `bimbel-app/`)

## Architecture & Structure
- **Framework:** Next.js 14 App Router (`src/app/`)
- **Styling:** Tailwind CSS (`src/app/globals.css`, `tailwind.config.ts`)
- **Auth & DB:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`), migrations in `supabase/migrations/`
- **AI Tutor:** Groq API (`src/app/api/ai-tutor/`)
- **Offline / PWA:** Service worker (`public/sw.js`) caches interactive books for offline reading
- **Content:** Interactive HTML books in `public/buku/` with assets in `public/assets/`
- **Middleware:** `src/middleware.ts` handles auth routing/protection

## Workflow
- **DB Migrations:** Apply SQL scripts in `supabase/migrations/` via Supabase SQL Editor/CLI.
- **Roles:** Separate dashboards for students and teachers under `src/app/dashboard/`.
- **Progress Tracking:** Students read `public/buku/` HTML files online, complete inline quizzes, then click complete to save progress.
