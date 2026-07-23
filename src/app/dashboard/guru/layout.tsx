import Link from "next/link";
import { LogoutButton } from "../siswa/logout-button";

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 bg-indigo-900 text-white p-6 shrink-0">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2"><span>👨‍🏫</span> Bimbel Guru</h2>
        <nav className="space-y-4">
          <Link href="/dashboard/guru" className="block py-2 px-4 rounded hover:bg-indigo-800 transition">Dashboard</Link>
          <Link href="/dashboard/guru/siswa" className="block py-2 px-4 rounded hover:bg-indigo-800 transition">Daftar Siswa</Link>
          <Link href="/dashboard/guru/assign" className="block py-2 px-4 rounded hover:bg-indigo-800 transition">Assign Tugas</Link>
          <Link href="/dashboard/guru/tugas" className="block py-2 px-4 rounded hover:bg-indigo-800 transition">Monitoring</Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800">Ruang Guru</h1>
          <LogoutButton />
        </header>
        {children}
      </main>
    </div>
  );
}
