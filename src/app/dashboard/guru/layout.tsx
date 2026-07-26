import Link from "next/link";
import { LogoutButton } from "../siswa/logout-button";
import { GuruNavbar } from "@/components/navbar/GuruNavbar";

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden w-full shrink-0 bg-indigo-900 p-6 text-white md:block md:w-64">
        <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
          <span>👨‍🏫</span> Bimbel Guru
        </h2>
        <nav className="space-y-2">
          <Link href="/dashboard/guru" className="block rounded px-4 py-2 transition hover:bg-indigo-800">
            🏠 Beranda
          </Link>
          <Link href="/dashboard/guru/students" className="block rounded px-4 py-2 transition hover:bg-indigo-800">
            👥 Siswa
          </Link>
          <Link href="/dashboard/guru/reports" className="block rounded px-4 py-2 transition hover:bg-indigo-800">
            📊 Laporan
          </Link>
          <Link href="/dashboard/guru/profile" className="block rounded px-4 py-2 transition hover:bg-indigo-800">
            👤 Saya
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
        <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Ruang Guru</h1>
          <LogoutButton />
        </header>
        {children}
      </main>

      <GuruNavbar />
    </div>
  );
}
