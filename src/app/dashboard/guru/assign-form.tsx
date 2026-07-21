"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AssignFormProps = {
  students: { id: string; nama: string; kelas: number; level: number }[];
  materials: { id: string; judul: string; kelas: number }[];
};

export function AssignForm({ students, materials }: AssignFormProps) {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, materialId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal assign");

      setMessage("✅ Tugas berhasil di-assign!");
      setStudentId("");
      setMaterialId("");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`❌ ${err.message}`);
      } else {
        setMessage(`❌ Gagal assign tugas`);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedStudent = students.find(s => s.id === studentId);
  const filteredMaterials = materials.filter(m => !selectedStudent || m.kelas === selectedStudent.kelas);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
      <h2 className="font-bold text-slate-800 flex items-center gap-2"><span>📝</span> Beri Tugas Baru</h2>

      <label className="flex flex-col text-sm text-slate-600 font-medium">
        Pilih Siswa
        <select required value={studentId} onChange={e => setStudentId(e.target.value)} className="mt-1 p-2 rounded-lg border border-slate-200 bg-slate-50">
          <option value="">-- Pilih Siswa --</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.nama} (Kelas {s.kelas} - Lv {s.level})</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-sm text-slate-600 font-medium">
        Pilih Materi
        <select required value={materialId} onChange={e => setMaterialId(e.target.value)} disabled={!studentId} className="mt-1 p-2 rounded-lg border border-slate-200 bg-slate-50 disabled:opacity-50">
          <option value="">-- Pilih Materi --</option>
          {filteredMaterials.map(m => (
            <option key={m.id} value={m.id}>{m.judul}</option>
          ))}
        </select>
      </label>

      {message && <p className="text-sm font-medium">{message}</p>}

      <button type="submit" disabled={loading || !studentId || !materialId} className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50">
        {loading ? "Menyimpan..." : "Assign Tugas"}
      </button>
    </form>
  );
}
