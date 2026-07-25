"use client";

import { useEffect, useState } from "react";
import { Network } from '@capacitor/network';

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    // Check initial native status
    Network.getStatus().then((status) => {
      setOffline(!status.connected);
    }).catch(() => {
      // Fallback to web if native fails (e.g. running in browser)
      setOffline(!navigator.onLine);
    });

    // Native listener
    const nativeListener = Network.addListener('networkStatusChange', (status) => {
      setOffline(!status.connected);
    });

    // Web listeners as fallback
    const syncWeb = () => setOffline(!navigator.onLine);
    window.addEventListener("online", syncWeb);
    window.addEventListener("offline", syncWeb);
    
    return () => {
      nativeListener.then(l => l.remove());
      window.removeEventListener("online", syncWeb);
      window.removeEventListener("offline", syncWeb);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 z-[100] bg-amber-500 px-3 py-2 text-center text-sm font-medium text-amber-950"
      style={{ top: "var(--sat)" }}
    >
      Offline — buku yang sudah dibuka masih bisa dibaca
    </div>
  );
}
