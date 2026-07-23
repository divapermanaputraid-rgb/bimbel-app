"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Student = { id: string; nama: string; kelas: number; level: number };
type Subject = { id: string; nama: string; kelas: number };
type Material = { id: string; judul: string; kelas: number; subject_id: string };

export function WizardForm({ 
  students, 
  subjects, 
  materials 
}: { 
  students: Student[], 
  subjects: Subject[], 
  materials: Material[] 
}) {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState<number | "">("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [includeChallenge, setIncludeChallenge] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Filters
  const filteredStudents = selectedClass ? students.filter(s => s.kelas === selectedClass) : students;
  const filteredSubjects = selectedClass ? subjects.filter(s => s.kelas === selectedClass) : subjects;
  const filteredMaterials = selectedSubject ? materials.filter(m => m.subject_id === selectedSubject) : [];

  const handleStudentSelect = (id: string) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAllFiltered = () => {
    setSelectedStudentIds(filteredStudents.map(s => s.id));
  };

  const handleAssign = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guru/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentIds: selectedStudentIds,
          materialId: selectedMaterial,
          includeChallenge,
          dueDate: dueDate || null,
          notes
        })
      });
      if (res.ok) {
        alert("✅ Tugas berhasil di-assign! Siswa akan mendapat notifikasi.");
        router.push("/dashboard/guru/tugas");
        router.refresh();
      } else {
        const err = await res.json();
        alert(`Gagal: ${err.error}`);
      }
    } catch {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  const materialTitle = materials.find(m => m.id === selectedMaterial)?.judul;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      {/* Progress Indicator */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full transition-colors ${step >= s ? 'bg-indigo-600' : 'bg-slate-100'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> Pilih Siswa</h3>
          
          <div className="mb-4 flex gap-4 items-center">
            <label className="text-sm font-medium text-slate-700">Filter Kelas:</label>
            <select 
              className="p-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500"
              value={selectedClass} 
              onChange={e => {
                setSelectedClass(e.target.value ? Number(e.target.value) : "");
                setSelectedStudentIds([]); // reset selection if class changes
              }}
            >
              <option value="">Semua Kelas</option>
              <option value={2}>Kelas 2</option>
              <option value={6}>Kelas 6</option>
            </select>

            <button onClick={selectAllFiltered} className="text-sm text-indigo-600 hover:underline font-medium ml-auto">
              Pilih Semua di List
            </button>
          </div>

          <div className="border border-slate-200 rounded-lg max-h-64 overflow-y-auto divide-y divide-slate-100 mb-6">
            {filteredStudents.length === 0 ? (
              <p className="p-4 text-center text-sm text-slate-500">Tidak ada siswa.</p>
            ) : (
              filteredStudents.map(s => (
                <label key={s.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    checked={selectedStudentIds.includes(s.id)}
                    onChange={() => handleStudentSelect(s.id)}
                  />
                  <div>
                    <p className="font-medium text-slate-800">{s.nama}</p>
                    <p className="text-xs text-slate-500">Kelas {s.kelas} • Level {s.level}</p>
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500 font-medium">{selectedStudentIds.length} siswa dipilih</span>
            <button 
              onClick={() => setStep(2)} 
              disabled={selectedStudentIds.length === 0} 
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Lanjut
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> Pilih Materi</h3>
          
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran</label>
              <select 
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setSelectedMaterial("");
                }}
              >
                <option value="">-- Pilih Mata Pelajaran --</option>
                {filteredSubjects.map(s => (
                  <option key={s.id} value={s.id}>{s.nama} (Kelas {s.kelas})</option>
                ))}
              </select>
            </div>

            {selectedSubject && (
              <div className="animate-in fade-in duration-300">
                <label className="block text-sm font-medium text-slate-700 mb-1">Buku / Materi</label>
                <select 
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                  <option value="">-- Pilih Materi --</option>
                  {filteredMaterials.map(m => (
                    <option key={m.id} value={m.id}>{m.judul}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">Kembali</button>
            <button onClick={() => setStep(3)} disabled={!selectedMaterial} className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition ml-auto">Lanjut</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span> Pengaturan & Deadline</h3>
          
          <div className="space-y-6 mb-8">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 w-4 h-4 text-indigo-600 rounded border-amber-300 focus:ring-indigo-500"
                  checked={includeChallenge} 
                  onChange={e => setIncludeChallenge(e.target.checked)} 
                />
                <div>
                  <p className="font-bold text-amber-900 text-sm">Sertakan 1 Soal Tantangan (Level 3)</p>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">Jika dicentang, sistem akan menyelipkan 1 soal sulit di akhir latihan terlepas dari level dasar siswa saat ini.</p>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Batas Waktu (Opsional)</label>
              <input 
                type="datetime-local" 
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={dueDate} 
                onChange={e => setDueDate(e.target.value)} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Catatan untuk Siswa (Opsional)</label>
              <textarea 
                rows={3}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="Misal: Kerjakan pelan-pelan saja ya..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">Kembali</button>
            <button onClick={() => setStep(4)} className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition ml-auto">Lanjut Konfirmasi</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span> Konfirmasi Akhir</h3>
          
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 mb-8 text-sm">
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500 font-medium">Siswa Penerima</span>
              <span className="font-bold text-slate-800">{selectedStudentIds.length} Siswa</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500 font-medium">Materi</span>
              <span className="font-bold text-slate-800 text-right">{materialTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-3">
              <span className="text-slate-500 font-medium">Leveling Soal</span>
              <span className="font-bold text-slate-800 text-right">
                Otomatis by Profil Siswa
                {includeChallenge && <span className="block text-xs text-amber-600 mt-0.5">+ 1 Soal Tantangan</span>}
              </span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-slate-500 font-medium">Tenggat Waktu</span>
              <span className="font-bold text-slate-800">{dueDate ? new Date(dueDate).toLocaleString("id-ID") : "Tidak Ada Batas"}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">Kembali</button>
            <button 
              onClick={handleAssign} 
              disabled={loading} 
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition ml-auto disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? "Memproses..." : "Assign Tugas Sekarang ✨"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
