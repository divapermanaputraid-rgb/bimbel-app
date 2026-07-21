"use client";

import { LogoutButton } from "./logout-button";
import { NotificationDropdown } from "./notification-dropdown";

type ProfileProps = {
  nama: string;
  kelas: number | null;
  level: number;
  avatar?: string;
  xp_total?: number;
  streakCount?: number;
  notifications?: {
    id: string;
    title: string;
    message: string | null;
    type: string | null;
    is_read: boolean;
  }[];
};

const LEVEL_LABEL: Record<number, { label: string; icon: string; target: number }> = {
  1: { label: "Pemula", icon: "🌱", target: 100 },
  2: { label: "Berkembang", icon: "🌿", target: 300 },
  3: { label: "Mahir", icon: "🌳", target: 600 },
};

export function ProfileCard({ nama, kelas, level, avatar = "🦁", xp_total = 0, streakCount = 0, notifications = [] }: ProfileProps) {
  const currentLevelInfo = LEVEL_LABEL[level] || { label: `Level ${level}`, icon: "🌱", target: 100 };
  const targetXp = currentLevelInfo.target;
  const progressPct = Math.min(100, Math.round((xp_total / targetXp) * 100));

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 mb-6 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl shadow-inner">
            {avatar}
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">{nama}</h1>
            <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1 flex-wrap">
              <span>Kelas {kelas ?? "—"}</span>
              <span className="text-slate-300">|</span>
              <span>{currentLevelInfo.icon} {currentLevelInfo.label}</span>
              <span className="text-slate-300">|</span>
              <span className="text-orange-500 font-bold">🔥 Streak {streakCount}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NotificationDropdown notifications={notifications} />
          <LogoutButton />
        </div>
      </div>

      {/* XP Progress Bar */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
          <span>Progress Level</span>
          <span>{xp_total} / {targetXp} XP ({progressPct}%)</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
