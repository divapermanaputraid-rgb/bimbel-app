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