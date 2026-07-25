# Android Native Feel Polish — Design

Date: 2026-07-25  
Status: approved for planning  
Scope: Capacitor Android shell + shared book HTML/CSS safe-area polish

## Goal

Make the existing Next.js + Capacitor app feel native on Android (not “browser in a wrapper”), including interactive HTML books, without a visual redesign or new product features.

## Non-goals

- Color/typography redesign of login/dashboard
- Pull-to-refresh, haptics, page transition animations
- FCM push notifications
- Quiz/progress/business-logic changes
- Static export of Next.js (`output: 'export'`) — API routes stay server-side; app continues to load from Vercel URL in Capacitor

## Constraints (current codebase)

- Capacitor loads remote URL `https://bimbel-sd.vercel.app` (`capacitor.config.ts`)
- Root layout is already `"use client"` with StatusBar / SplashScreen / App listeners
- Books: ~30 HTML files under `public/buku/**` share `public/assets/book-theme.css` + `book-engine.js`
- Book viewport meta today: `width=device-width, initial-scale=1.0` (no `viewport-fit=cover`)
- AndroidManifest already has `windowSoftInputMode="adjustPan"` and deep-link intent for the Vercel host
- Capacitor plugin calls must no-op safely in plain browser

## Approach (chosen)

**Shared native layer (Approach B)**

1. One client shell component owns all Capacitor lifecycle UI behavior.
2. Safe-area CSS vars/rules in app globals + `book-theme.css`.
3. One-shot script updates viewport meta on all book HTML files.
4. No per-screen visual redesign.

Rejected:

- **A shell-only**: leaves books under notch/home indicator (core learning surface).
- **C full redesign**: out of “feel native” scope.

## Architecture

```
src/app/layout.tsx
  └── CapacitorNativeShell (client)
        - StatusBar + SplashScreen
        - Back button + exit confirm modal
        - Deep link path routing
  └── OfflineIndicator (existing; safe-area aware)
  └── ServiceWorkerRegister
  └── children

public/assets/book-theme.css
  - viewport-fit aware safe-area padding
  - progress bar / AI chat / bottom CTA offsets

public/buku/**/*.html
  - meta viewport includes viewport-fit=cover (scripted)

scripts/patch-book-viewport.mjs
  - one-shot replace of viewport meta
```

### CapacitorNativeShell

- File: `src/components/capacitor-native-shell.tsx` (client)
- Responsibilities only:
  - `StatusBar.setBackgroundColor` / `setStyle` (indigo brand `#4F46E5`, dark content)
  - `SplashScreen.hide`
  - `App.addListener('backButton')`:
    - if `canGoBack` → `window.history.back()`
    - else → show exit confirm modal (not `window.confirm`, not double-back)
  - `App.addListener('appUrlOpen')` → navigate to `pathname` of opened URL
- All plugin imports dynamic or guarded; every call `.catch(() => {})`
- Modal: simple fixed overlay, two buttons **Batal** / **Keluar** (calls `App.exitApp()`), Indonesian copy for SD users
- Unmount removes listeners and closes modal state

### Root layout

- Keep client layout for now (already client).
- Move Capacitor side-effects out of inline `useEffect` into `CapacitorNativeShell` for clarity.
- Body keeps `paddingTop: env(safe-area-inset-top)` (or class using CSS vars).
- Do not restore server `metadata` export in this change set (would force layout split); optional follow-up.

### Safe area CSS (app)

In `src/app/globals.css`:

```css
:root {
  --sat: env(safe-area-inset-top, 0px);
  --sab: env(safe-area-inset-bottom, 0px);
  --sal: env(safe-area-inset-left, 0px);
  --sar: env(safe-area-inset-right, 0px);
}
```

- Offline banner: `top: var(--sat)` so it sits below status bar/notch when fixed.
- Main content already padded via body; verify dashboard `max-w-lg` pages still scroll fully above home indicator (`padding-bottom` using `--sab` where needed on fixed footers only — books handled in book-theme).

### Books

**Viewport meta (all HTML under `public/buku/`):**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

Applied by `scripts/patch-book-viewport.mjs` (idempotent string replace of existing viewport meta). Run once as part of implementation; commit resulting HTML diffs.

**`book-theme.css` rules:**

- `body`: add `padding-top` / `padding-bottom` using safe-area insets (keep existing `padding: 0 0 80px` intent — bottom becomes `calc(80px + var(--sab))` or equivalent).
- `.progress-container`: `top: var(--sat)` (or padding-top on body only if progress should stick under status bar).
- `.ai-chat`: `bottom: calc(20px + var(--sab)); right: calc(20px + var(--sar))`.
- Finish button / sticky bottom actions: ensure not under home indicator via body bottom padding.

Do **not** edit per-section quiz markup or `book-engine.js` logic.

## Data flow

No new backend or DB. Pure client/native presentation.

```
User presses Android Back
  → Capacitor App.backButton
  → canGoBack? history.back() : open ExitModal
  → Keluar → App.exitApp()

User opens deep link https://bimbel-sd.vercel.app/...
  → appUrlOpen → window.location.href = pathname

Book opens in WebView / browser
  → viewport-fit=cover + book-theme safe-area CSS
  → progress / AI chat / CTAs clear of system UI
```

## Error handling

- Missing Capacitor / web browser: listeners never attach or fail silently; UI unchanged.
- Plugin method failure: catch empty.
- Deep link parse failure: ignore (no redirect).
- Exit modal: focus trap not required (two buttons only); Esc not required on Android hardware path.

## Testing / QA checklist (manual)

| Check | Where |
|:---|:---|
| Splash then app content | Cold start APK |
| Status bar color indigo | Login + dashboard |
| Notch / status bar not covering header | Dashboard + book K2 + book K6 |
| Home indicator not covering AI chat / finish | Book with AI + selesai button |
| Back from nested page | history.back |
| Back on root | Exit modal Batal / Keluar |
| Offline banner below status bar | Toggle airplane mode |
| Login keyboard | Email/password not covering submit (`adjustPan`) |
| Browser desktop | No console errors from Capacitor imports |

No new test framework. Optional later: lightweight pure function tests for “should show exit modal” if extracted.

## Implementation order

1. Extract `CapacitorNativeShell` + exit modal; wire in layout.
2. Safe-area CSS vars in `globals.css`; offline banner offset.
3. Safe-area rules in `book-theme.css`.
4. Script + run viewport patch on all book HTML.
5. Manual QA checklist on device/emulator + browser smoke.
6. Update README with short “native feel” note if needed (minimal).

## Files touched (expected)

| Path | Change |
|:---|:---|
| `src/components/capacitor-native-shell.tsx` | **new** |
| `src/app/layout.tsx` | use shell; drop inline Cap effects |
| `src/components/offline-indicator.tsx` | safe-area top offset |
| `src/app/globals.css` | safe-area CSS vars |
| `public/assets/book-theme.css` | safe-area layout rules |
| `public/buku/**/*.html` | viewport-fit=cover |
| `scripts/patch-book-viewport.mjs` | **new** one-shot patcher |
| `README.md` | optional one-liner QA note |

## Success criteria

1. On Android APK, system UI never covers progress bar, primary CTAs, or offline banner.
2. Root back always confirms before exit.
3. Books K2 + K6 sample open with correct safe area after one shared CSS + meta pattern.
4. Desktop web behavior unchanged (no crashes, no forced native UI).
