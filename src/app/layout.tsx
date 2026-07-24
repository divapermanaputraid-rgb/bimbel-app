"use client";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { OfflineIndicator } from "@/components/offline-indicator";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only run in browser/capacitor environment
    if (typeof window !== "undefined") {
      import("@capacitor/status-bar").then(({ StatusBar }) => {
        StatusBar.setBackgroundColor({ color: "#4F46E5" }).catch(() => {});
        StatusBar.setStyle({ style: "DARK" as any }).catch(() => {});
      });

      import("@capacitor/splash-screen").then(({ SplashScreen }) => {
        SplashScreen.hide().catch(() => {});
      });
      
      import("@capacitor/app").then(({ App }) => {
        App.addListener('backButton', ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            App.exitApp();
          }
        });
        
        App.addListener('appUrlOpen', (data) => {
          const url = new URL(data.url);
          if (url.pathname) {
            window.location.href = url.pathname;
          }
        });
      });
    }
  }, []);

  return (
    <html lang="id">
      <head>
        <title>Bimbel Interaktif</title>
        <meta name="description" content="Bimbel interaktif SD Kelas 2 & 6" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body 
        className="min-h-screen bg-slate-50 text-slate-900 antialiased"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <OfflineIndicator />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
