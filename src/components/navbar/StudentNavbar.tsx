"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  key: string;
  icon: string;
  label: string;
  path: string;
  badge?: "count" | "dot";
};

const TABS: Tab[] = [
  { key: "home", icon: "🏠", label: "Beranda", path: "/dashboard/siswa" },
  { key: "learn", icon: "📚", label: "Belajar", path: "/dashboard/siswa/learn" },
  { key: "practice", icon: "🎮", label: "Latihan", path: "/dashboard/siswa/practice", badge: "count" },
  { key: "badges", icon: "🏆", label: "Pencapaian", path: "/dashboard/siswa/badges", badge: "dot" },
  { key: "profile", icon: "👤", label: "Saya", path: "/dashboard/siswa/profile" },
];

type Props = {
  practiceCount?: number;
  hasNewBadge?: boolean;
};

function isActive(pathname: string, path: string) {
  if (path === "/dashboard/siswa") return pathname === path;
  return pathname === path || pathname.startsWith(path + "/");
}

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
}

export function StudentNavbar({ practiceCount = 0, hasNewBadge = false }: Props) {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-gray-200 bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navigasi siswa"
    >
      <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-around">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.path);
          const showCount = tab.badge === "count" && practiceCount > 0;
          const showDot = tab.badge === "dot" && hasNewBadge;

          return (
            <li key={tab.key} className="flex flex-1">
              <Link
                href={tab.path}
                onClick={haptic}
                className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
                  active ? "text-[#4F46E5]" : "text-gray-400"
                }`}
              >
                <span className={`leading-none transition-all duration-200 ${active ? "text-2xl" : "text-xl"}`}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-medium ${active ? "font-bold" : ""}`}>{tab.label}</span>
                {active && (
                  <span className="absolute bottom-1 h-0.5 w-6 rounded-full bg-[#4F46E5]" />
                )}
                {showCount && (
                  <span className="absolute right-1/2 top-1 translate-x-3 rounded-full bg-red-500 px-1.5 text-[9px] font-bold leading-4 text-white">
                    {practiceCount > 9 ? "9+" : practiceCount}
                  </span>
                )}
                {showDot && (
                  <span className="absolute right-1/2 top-1.5 h-2 w-2 translate-x-2.5 rounded-full bg-red-500" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
