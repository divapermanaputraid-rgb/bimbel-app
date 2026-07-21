"use client";

import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string | null;
  type: string | null;
  is_read: boolean;
};

export function NotificationDropdown({ notifications }: { notifications: Notification[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-100"
        title="Notifikasi"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white p-3 shadow-xl ring-1 ring-slate-100 z-50">
          <h3 className="mb-2 text-xs font-bold text-slate-800 border-b pb-2">Notifikasi</h3>
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">Belum ada notifikasi baru.</p>
          ) : (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="rounded-lg bg-slate-50 p-2 text-xs border border-slate-100">
                  <div className="font-bold text-slate-800">{n.title}</div>
                  {n.message && <div className="text-slate-600 mt-0.5">{n.message}</div>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
