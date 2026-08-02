'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function GuruTeachPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [soalIdx, setSoalIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [templateId]);

  useEffect(() => {
    setSoalIdx(0);
  }, [activeIdx]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/guru/roadmap/${templateId}/teach`);
    if (res.ok) {
      const json = await res.json();
      setData(json);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <p className="text-white text-lg">Memuat sesi mengajar...</p>
    </div>
  );

  if (!data) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="text-center text-white space-y-3">
        <p className="text-4xl">⚠️</p>
        <p>Gagal memuat data roadmap.</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-white text-gray-900 rounded-lg">← Kembali</button>
      </div>
    </div>
  );

  if (!data.materi || data.materi.length === 0) return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center">
      <div className="text-center text-white space-y-4 max-w-md px-6">
        <p className="text-5xl">📭</p>
        <h2 className="text-xl font-bold">Belum ada materi untuk pertemuan ini</h2>
        <p className="text-gray-400 text-sm">Roadmap berhasil dibuat tapi belum ada materi. Hapus dan buat ulang roadmap.</p>
        <button onClick={() => router.back()} className="px-5 py-2 bg-white text-gray-900 rounded-lg font-semibold">← Kembali</button>
      </div>
    </div>
  );

  const active = data.materi[activeIdx] ?? data.materi[0];
  const currentSoal = active.soal?.[soalIdx] ?? null;

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <p className="text-white text-sm">Pertemuan {data.pertemuanKe} — {data.roadmap.title}</p>
        <button onClick={() => router.back()} className="px-4 py-2 bg-red-600 text-white text-sm rounded">
          Selesai
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto shrink-0">
          <p className="text-xs text-gray-500 mb-3">Materi ({data.materi.length})</p>
          <div className="space-y-2">
            {data.materi.map((m: any, i: number) => (
              <button
                key={m.id}
                onClick={() => { setActiveIdx(i); setSoalIdx(0); }}
                className={`w-full text-left p-3 rounded text-sm ${i === activeIdx ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
              >
                <span className="text-xs text-gray-400 block mb-0.5">P{i + 1}</span>
                {m.judul}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Materi Header */}
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 shrink-0 flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold">{active.judul}</h2>
              {active.deskripsi && <p className="text-gray-400 text-sm mt-1">{active.deskripsi}</p>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Materi {activeIdx + 1} / {data.materi.length}</span>
              {/* Toggle Buku / Soal */}
              {active.soal?.length > 0 && (
                <span className="text-xs bg-blue-800 text-blue-300 px-2 py-1 rounded-full">
                  {active.soal.length} soal
                </span>
              )}
            </div>
          </div>

          {/* Main display */}
          <div className="flex-1 overflow-hidden">
            {!active.soal || active.soal.length === 0 ? (
              // Buku HTML iframe
              <iframe
                key={active.unit_id}
                src={active.buku_path}
                className="w-full h-full border-0 bg-white"
                title={active.judul}
              />
            ) : (
              // Soal paginasi
              <div className="flex flex-col h-full p-6 bg-gray-950 text-white">
                {/* Header soal */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                  <h3 className="text-lg font-bold text-blue-400">Latihan Bersama</h3>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                    Soal {soalIdx + 1} dari {active.soal.length}
                  </span>
                </div>

                {/* Progress dots */}
                <div className="flex gap-1 mb-6 shrink-0">
                  {active.soal.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSoalIdx(i)}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${i === soalIdx ? 'bg-blue-500' : i < soalIdx ? 'bg-green-500' : 'bg-gray-700'}`}
                    />
                  ))}
                </div>

                {/* Card soal */}
                {currentSoal && (
                  <div className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col justify-center overflow-y-auto">
                    <p className="text-2xl leading-relaxed font-medium mb-8 text-center">
                      {currentSoal.pertanyaan}
                    </p>

                    {/* Pilihan (object) */}
                    {currentSoal.pilihan && typeof currentSoal.pilihan === 'object' && !Array.isArray(currentSoal.pilihan) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto w-full">
                        {Object.entries(currentSoal.pilihan).map(([key, val]) => (
                          <div key={key} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
                            <span className="bg-gray-700 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold uppercase shrink-0">{key}</span>
                            <span className="text-base">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pilihan (array) */}
                    {Array.isArray(currentSoal.pilihan) && (
                      <div className="space-y-3 max-w-2xl mx-auto w-full">
                        {currentSoal.pilihan.map((p: any, pi: number) => (
                          <div key={pi} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center gap-3">
                            <span className="bg-gray-700 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">{String.fromCharCode(65 + pi)}</span>
                            <span className="text-base">{String(p)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Kunci Jawaban */}
                    <div className="mt-10 text-center">
                      <details className="inline-block text-left">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300 select-none">
                          🔑 Lihat Kunci Jawaban
                        </summary>
                        <div className="mt-3 bg-green-900/30 border border-green-700 text-green-400 px-6 py-3 rounded-xl text-lg font-bold">
                          Kunci: {String(currentSoal.jawaban_benar).toUpperCase()}
                        </div>
                      </details>
                    </div>
                  </div>
                )}

                {/* Nav Soal */}
                <div className="flex justify-between mt-6 shrink-0">
                  <button
                    onClick={() => setSoalIdx(i => Math.max(0, i - 1))}
                    disabled={soalIdx === 0}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl font-medium disabled:opacity-30 hover:bg-gray-700"
                  >
                    ← Sebelumnya
                  </button>
                  <button
                    onClick={() => setSoalIdx(i => Math.min(active.soal.length - 1, i + 1))}
                    disabled={soalIdx === active.soal.length - 1}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold disabled:opacity-30 hover:bg-blue-700"
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
