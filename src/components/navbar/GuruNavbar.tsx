"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  key: string;
  icon: string;
  label: string;
  path: string;
};

const TABS: Tab[] = [
  { key: "home", icon: "🏠", label: "Beranda", path: "/dashboard/guru" },
  { key: "students", icon: "👥", label: "Siswa", path: "/dashboard/guru/students" },
  { key: "reports", icon: "📊", label: "Laporan", path: "/dashboard/guru/reports" },
  { key: "profile", icon: "👤", label: "Saya", path: "/dashboard/guru/profile" },
];

function isActive(pathname: string, path: string) {
  if (path === "/dashboard/guru") return pathname === path;
  return pathname === path || pathname.startsWith(path + "/");
}

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10);
  }
}

export function GuruNavbar() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-gray-200 bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Navigasi guru"
    >
      <ul className="mx-auto flex h-16 max-w-lg items-stretch justify-around">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.path);
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
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
