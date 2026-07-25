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
        await StatusBar.setStyle({ style: Style?.Dark ?? ("DARK" as never) });
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