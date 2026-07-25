# Android Native Feel Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Capacitor Android app feel native (safe areas, exit confirm, status bar/splash ownership) including HTML books, without visual redesign or business-logic changes.

**Architecture:** Extract Capacitor lifecycle into `CapacitorNativeShell` (back confirm modal, status bar, splash, deep links). Add shared safe-area CSS vars in app globals and `book-theme.css`. One-shot script patches all book HTML viewport metas to include `viewport-fit=cover`. No Next.js `output: 'export'`; remote Vercel URL stays.

**Tech Stack:** Next.js 14 App Router, React 18 client components, Capacitor 8 (`@capacitor/app`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/network`), static book HTML + CSS under `public/`.

**Spec:** `docs/superpowers/specs/2026-07-25-android-native-feel-design.md`

## Global Constraints

- Brand status bar color: `#4F46E5` (exact)
- Exit modal copy Indonesian: title/body + buttons **Batal** / **Keluar** (not `window.confirm`, not double-back)
- Capacitor calls must `.catch(() => {})` / no-op on web
- Do not edit quiz markup or `public/assets/book-engine.js` logic
- Do not enable Next.js `output: 'export'`
- Work from `bimbel-app/` as package root (`npm` scripts run there)
- Commit messages human, no AI/session wording
- Plans/specs under `docs/superpowers/` may be gitignored — use `git add -f` when committing those paths

## File map

| Path | Responsibility |
|:---|:---|
| `src/lib/native-shell.ts` | Pure helpers: back decision, deep-link path extract (testable) |
| `src/lib/native-shell.test.mjs` | Node assert self-check for helpers |
| `src/components/capacitor-native-shell.tsx` | Client shell: plugins + exit modal UI |
| `src/app/layout.tsx` | Mount shell; drop inline Cap `useEffect` |
| `src/app/globals.css` | `--sat/--sab/--sal/--sar` CSS vars |
| `src/components/offline-indicator.tsx` | Banner `top: var(--sat)` |
| `public/assets/book-theme.css` | Safe-area for progress, body pad, AI chat |
| `scripts/patch-book-viewport.mjs` | Idempotent viewport meta patcher |
| `public/buku/**/*.html` | Result of patcher (`viewport-fit=cover`) |
| `package.json` | Add `@capacitor/app` if missing; optional script `patch:book-viewport` |
| `README.md` | One short native-feel QA note under Android section |

---

### Task 1: Pure native-shell helpers + self-check

**Files:**
- Create: `src/lib/native-shell.ts`
- Create: `src/lib/native-shell.test.mjs`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `export type BackAction = 'history-back' | 'confirm-exit'`
  - `export function backAction(canGoBack: boolean): BackAction`
  - `export function pathFromAppUrl(url: string): string | null`

- [ ] **Step 1: Write failing self-check**

Create `src/lib/native-shell.test.mjs`:

```js
import assert from "node:assert/strict";
import { backAction, pathFromAppUrl } from "./native-shell.ts";

assert.equal(backAction(true), "history-back");
assert.equal(backAction(false), "confirm-exit");

assert.equal(
  pathFromAppUrl("https://bimbel-sd.vercel.app/dashboard/siswa"),
  "/dashboard/siswa"
);
assert.equal(
  pathFromAppUrl("https://bimbel-sd.vercel.app/dashboard/siswa?x=1"),
  "/dashboard/siswa"
);
assert.equal(pathFromAppUrl("not a url"), null);
assert.equal(pathFromAppUrl(""), null);

console.log("native-shell.test.mjs: ok");
```

- [ ] **Step 2: Run self-check — expect fail (module missing)**

Run (from `bimbel-app/`):

```bash
node --experimental-strip-types src/lib/native-shell.test.mjs
```

Expected: FAIL — cannot find module `./native-shell.ts` (or equivalent load error).

If `--experimental-strip-types` unsupported on local Node, rewrite test to import a sibling `native-shell.mjs` that re-exports plain JS, or compile via `npx tsx src/lib/native-shell.test.mjs`. Prefer:

```bash
npx --yes tsx src/lib/native-shell.test.mjs
```

Expected first run: FAIL module not found.

- [ ] **Step 3: Implement helpers**

Create `src/lib/native-shell.ts`:

```ts
export type BackAction = "history-back" | "confirm-exit";

export function backAction(canGoBack: boolean): BackAction {
  return canGoBack ? "history-back" : "confirm-exit";
}

/** Returns pathname only, or null if URL is unusable. */
export function pathFromAppUrl(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  try {
    const parsed = new URL(url);
    return parsed.pathname || null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 4: Run self-check — expect pass**

```bash
npx --yes tsx src/lib/native-shell.test.mjs
```

Expected: `native-shell.test.mjs: ok`

- [ ] **Step 5: Commit**

```bash
git add src/lib/native-shell.ts src/lib/native-shell.test.mjs
git commit -m "feat: add pure helpers for Android back and deep link path"
```

---

### Task 2: CapacitorNativeShell + wire layout

**Files:**
- Create: `src/components/capacitor-native-shell.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `package.json` (dependency `@capacitor/app`)

**Interfaces:**
- Consumes: `backAction`, `pathFromAppUrl` from `@/lib/native-shell`
- Produces: `<CapacitorNativeShell />` client component (no props); exit modal UI

- [ ] **Step 1: Ensure `@capacitor/app` is installed**

```bash
npm install @capacitor/app
```

Confirm `package.json` dependencies include `@capacitor/app`.

- [ ] **Step 2: Create shell component**

Create `src/components/capacitor-native-shell.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { backAction, pathFromAppUrl } from "@/lib/native-shell";

export function CapacitorNativeShell() {
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let removeBack: (() => void) | undefined;
    let removeUrl: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        await StatusBar.setBackgroundColor({ color: "#4F46E5" });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch {
        /* web / plugin unavailable */
      }

      try {
        const { SplashScreen } = await import("@capacitor/splash-screen");
        await SplashScreen.hide();
      } catch {
        /* web */
      }

      try {
        const { App } = await import("@capacitor/app");
        const backSub = await App.addListener("backButton", ({ canGoBack }) => {
          if (backAction(canGoBack) === "history-back") {
            window.history.back();
            return;
          }
          setShowExit(true);
        });
        const urlSub = await App.addListener("appUrlOpen", (data) => {
          const path = pathFromAppUrl(data.url);
          if (path) window.location.href = path;
        });
        if (cancelled) {
          backSub.remove();
          urlSub.remove();
          return;
        }
        removeBack = () => backSub.remove();
        removeUrl = () => urlSub.remove();
      } catch {
        /* web */
      }
    })();

    return () => {
      cancelled = true;
      removeBack?.();
      removeUrl?.();
    };
  }, []);

  async function confirmExit() {
    setShowExit(false);
    try {
      const { App } = await import("@capacitor/app");
      await App.exitApp();
    } catch {
      /* web: no-op */
    }
  }

  if (!showExit) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-lg">
        <h2 id="exit-title" className="text-lg font-bold text-slate-900">
          Keluar aplikasi?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Kamu yakin mau tutup Bimbel Interaktif?
        </p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
            onClick={() => setShowExit(false)}
          >
            Batal
          </button>
          <button
            type="button"
            className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white"
            onClick={() => void confirmExit()}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
```

Note: If `Style` is not exported on installed `@capacitor/status-bar` version, use `{ style: "DARK" as any }` and keep `.catch`/try-catch — do not invent other enums.

- [ ] **Step 3: Wire layout — remove inline Cap effect**

Replace `src/app/layout.tsx` with:

```tsx
"use client";

import "./globals.css";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { OfflineIndicator } from "@/components/offline-indicator";
import { CapacitorNativeShell } from "@/components/capacitor-native-shell";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <title>Bimbel Interaktif</title>
        <meta name="description" content="Bimbel interaktif SD Kelas 2 & 6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased pt-[env(safe-area-inset-top)]">
        <CapacitorNativeShell />
        <OfflineIndicator />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Typecheck / lint smoke**

```bash
npx tsc --noEmit
npm run lint
```

Expected: no new errors in the files above. Fix only errors introduced by this task.

- [ ] **Step 5: Browser smoke (dev)**

```bash
npm run dev
```

Open `http://localhost:3000/login` — page loads; no console errors about missing modules. Exit modal not shown on web (no hardware back).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json \
  src/components/capacitor-native-shell.tsx \
  src/app/layout.tsx
git commit -m "feat: Capacitor native shell with exit confirm modal"
```

---

### Task 3: App safe-area CSS + offline banner offset

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/offline-indicator.tsx`

**Interfaces:**
- Consumes: CSS env safe-area
- Produces: `--sat --sab --sal --sar` on `:root`; offline banner uses `top: var(--sat)`

- [ ] **Step 1: Update `globals.css`**

Replace file content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --sal: env(safe-area-inset-left, 0px);
  --sar: env(safe-area-inset-right, 0px);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 2: Offset offline banner**

In `src/components/offline-indicator.tsx`, change the banner `className` from:

```tsx
className="fixed inset-x-0 top-0 z-[100] bg-amber-500 px-3 py-2 text-center text-sm font-medium text-amber-950"
```

to:

```tsx
className="fixed inset-x-0 z-[100] bg-amber-500 px-3 py-2 text-center text-sm font-medium text-amber-950"
style={{ top: "var(--sat)" }}
```

Keep network logic unchanged.

- [ ] **Step 3: Visual check in browser**

```bash
npm run dev
```

In DevTools, force offline — banner still visible under any simulated top inset (optional: set `body` padding). No layout crash.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/offline-indicator.tsx
git commit -m "fix: safe-area CSS vars and offline banner offset"
```

---

### Task 4: Book theme safe-area rules

**Files:**
- Modify: `public/assets/book-theme.css`

**Interfaces:**
- Consumes: `env(safe-area-inset-*)` (works after `viewport-fit=cover` in Task 5)
- Produces: progress/AI/body clear of system UI

- [ ] **Step 1: Patch `:root` and layout rules in `book-theme.css`**

At top of `:root` block, ensure safe-area vars exist (books do not load app `globals.css`):

```css
:root {
  --bg: #F9FAFB;
  --primary: #667eea;
  --success: #4caf50;
  --error: #f44336;
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --sal: env(safe-area-inset-left, 0px);
  --sar: env(safe-area-inset-right, 0px);
}
```

Replace `body` rule with:

```css
body {
  margin: 0;
  padding: var(--sat) 0 calc(80px + var(--sab));
  font-family: 'Comic Sans MS', 'Nunito', sans-serif;
  background-color: var(--bg);
  font-size: 18px;
  line-height: 1.8;
  color: #333;
}
```

Replace `.progress-container` with:

```css
.progress-container {
  position: fixed;
  top: var(--sat);
  left: 0;
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  z-index: 50;
}
```

Replace `.ai-chat` with:

```css
.ai-chat {
  position: fixed;
  bottom: calc(20px + var(--sab));
  right: calc(20px + var(--sar));
  z-index: 100;
}
```

Do not change quiz/section/button colors or `.btn` sizing beyond existing rules.

- [ ] **Step 2: Spot-check one book in browser**

```bash
npm run dev
```

Open e.g. `http://localhost:3000/buku/kelas2/matematika/k2-mtk-01.html` — progress bar and content still render; no CSS break.

- [ ] **Step 3: Commit**

```bash
git add public/assets/book-theme.css
git commit -m "fix: safe-area offsets for interactive book chrome"
```

---

### Task 5: Viewport patcher + apply to all books

**Files:**
- Create: `scripts/patch-book-viewport.mjs`
- Modify: `public/buku/**/*.html` (via script)
- Modify: `package.json` (script entry)

**Interfaces:**
- Consumes: files under `public/buku`
- Produces: every book HTML viewport meta includes `viewport-fit=cover`; script idempotent

- [ ] **Step 1: Write patcher**

Create `scripts/patch-book-viewport.mjs`:

```js
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public/buku");
const TARGET =
  'content="width=device-width, initial-scale=1.0, viewport-fit=cover"';
const PATTERNS = [
  /content="width=device-width,\s*initial-scale=1\.0"/g,
  /content="width=device-width,\s*initial-scale=1"/g,
  /content="width=device-width, initial-scale=1.0, viewport-fit=cover"/g,
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let changed = 0;
let already = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("viewport-fit=cover")) {
    already += 1;
    continue;
  }
  let next = html;
  let did = false;
  for (const re of PATTERNS.slice(0, 2)) {
    if (re.test(next)) {
      next = next.replace(re, TARGET);
      did = true;
      break;
    }
  }
  // reset lastIndex side effects
  PATTERNS.forEach((re) => {
    re.lastIndex = 0;
  });
  if (!did) {
    skipped += 1;
    console.warn("skip (no matching viewport):", file);
    continue;
  }
  fs.writeFileSync(file, next);
  changed += 1;
}

console.log(
  JSON.stringify({ total: files.length, changed, already, skipped }, null, 2)
);
if (skipped > 0) process.exitCode = 1;
```

- [ ] **Step 2: Dry-run count before**

```bash
rg -n 'viewport-fit=cover' public/buku --glob '*.html' | wc -l
rg -n 'name="viewport"' public/buku --glob '*.html' | wc -l
```

Expected: cover count `0` (or low); viewport count ≈ number of HTML books (~30).

- [ ] **Step 3: Run patcher**

```bash
node scripts/patch-book-viewport.mjs
```

Expected JSON: `changed` ≈ total, `skipped` 0, `already` 0 first run.

- [ ] **Step 4: Re-run patcher (idempotent)**

```bash
node scripts/patch-book-viewport.mjs
```

Expected: `changed` 0, `already` ≈ total, `skipped` 0.

- [ ] **Step 5: Verify sample files**

```bash
rg -n 'viewport' public/buku/kelas2/matematika/k2-mtk-01.html public/buku/kelas6/matematika/k6-mtk-01.html
```

Expected both lines include `viewport-fit=cover`.

- [ ] **Step 6: Add npm script**

In `package.json` scripts add:

```json
"patch:book-viewport": "node scripts/patch-book-viewport.mjs"
```

- [ ] **Step 7: Commit**

```bash
git add scripts/patch-book-viewport.mjs package.json public/buku
git commit -m "feat: viewport-fit=cover on all interactive book HTML"
```

---

### Task 6: README QA note + final verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Append under Android section in `README.md`**

After the existing “Fitur Native” list, add:

```markdown
### Native feel checklist (Android)
- Status bar indigo; splash hides after load
- Back on root shows Keluar/Batal (not instant exit)
- Offline banner sits below status bar / notch
- Book progress bar and AI chat clear of notch and home indicator
- Desktop browser: no Capacitor console errors
```

- [ ] **Step 2: Re-run helper test + lint + build**

```bash
npx --yes tsx src/lib/native-shell.test.mjs
npm run lint
npm run build
```

Expected: test prints `ok`; lint clean for touched files; `next build` succeeds (dynamic routes OK — no `output: 'export'`).

- [ ] **Step 3: Manual device checklist (if emulator/HP available)**

| Check | Pass? |
|:---|:---|
| Cold start: splash then content | |
| Status bar `#4F46E5` | |
| Nested back → history | |
| Root back → modal Batal/Keluar | |
| Airplane mode: banner below status bar | |
| Open K2 book + K6 book: progress/AI not under system UI | |
| Login keyboard: submit usable (`adjustPan`) | |
| Desktop web: no Cap crash | |

If no device this session: note remaining checks in commit body only if partial; do not fake pass.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: Android native feel QA checklist"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|:---|:---|
| CapacitorNativeShell status bar + splash | Task 2 |
| Back confirm modal Batal/Keluar | Task 2 + helpers Task 1 |
| Deep link pathname routing | Task 1–2 |
| Safe-area CSS vars app | Task 3 |
| Offline banner offset | Task 3 |
| book-theme safe-area | Task 4 |
| viewport-fit=cover all books via script | Task 5 |
| No book-engine / quiz logic edits | All tasks (constraint) |
| No output export | Task 6 build verifies |
| Manual QA checklist | Task 6 |
| README note | Task 6 |
| Plugin no-op on web | Task 2 try/catch |

## Placeholder scan

No TBD/TODO steps; full code included; exact commands and paths.

## Type consistency

- `backAction(canGoBack: boolean): 'history-back' | 'confirm-exit'`
- `pathFromAppUrl(url: string): string | null`
- Component name `CapacitorNativeShell` used in layout import

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-25-android-native-feel.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session with executing-plans and checkpoints  

Which approach?
