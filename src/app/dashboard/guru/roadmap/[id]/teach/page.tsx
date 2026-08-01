'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Soal {
  id: string;
  pertanyaan: string;
  tipe: string;
  pilihan: any;
  jawaban_benar: any;
  xp: number;
}

interface MateriItem {
  id: string;
  unit_id: string;
  unit_title: string;
  judul: string;
  deskripsi: string;
  tipe: 'baru' | 'review';
  review_from_pertemuan: number | null;
  catatan_guru: string | null;
  buku_path: string;
  soal: Soal[];
}

interface TeachData {
  roadmap: {
    title: string;
    kelas: number;
    subject_id: string;
  };
  pertemuanKe: number;
  scheduleId: string | null;
  materi: MateriItem[];
}

type Tab = 'buku' | 'soal';

export default function TeachPage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  const [data, setData] = useState<TeachData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [tab, setTab] = useState<Tab>('buku');
  const [elapsed, setElapsed] = useState(0); // seconds
  const [selesai, setSelesai] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSoalIdx, setShowSoalIdx] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchData();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [templateId]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/guru/roadmap/${templateId}/teach`);
    if (res.ok) {
      const json = await res.json();
      setData(json);
      // Start timer
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    setLoading(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSelesai = async () => {
    if (!confirm('Akhiri sesi mengajar dan tandai pertemuan selesai?')) return;
    setSaving(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const res = await fetch(`/api/guru/roadmap/${templateId}/meeting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pertemuan_ke: data?.pertemuanKe })
    });

    if (res.ok) {
      setSelesai(true);
      setTimeout(() => router.push(`/dashboard/guru/roadmap/${templateId}`), 2000);
    } else {
      alert('Gagal menandai pertemuan selesai.');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-white text-center">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <p className="text-lg">Memuat sesi mengajar...</p>
        </div>
      </div>
    );
  }

  if (!data || data.materi.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
        <div className="text-white text-center space-y-4">
          <div className="text-5xl">📭</div>
          <p className="text-lg">Belum ada materi untuk pertemuan ini.</p>
          <p className="text-sm text-gray-400">Isi dulu roadmap template items di halaman buat roadmap.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold"
          >
            ← Kembali
          </button>
        </div>
      </div>
    );
  }

  if (selesai) {
    return (
      <div className="fixed inset-0 bg-green-900 flex items-center justify-center z-50">
        <div className="text-white text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h1 className="text-3xl font-bold">Pertemuan Selesai!</h1>
          <p className="text-green-200">Durasi: {formatTime(elapsed)}</p>
          <p className="text-sm text-green-300">Kembali ke dashboard...</p>
        </div>
      </div>
    );
  }

  const activeMat = data.materi[activeIdx];
  const subjectLabel: Record<string, string> = {
    mtk: 'Matematika', bind: 'Bahasa Indonesia', bing: 'Bahasa Inggris', ipas: 'IPAS'
  };

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col z-50 overflow-hidden">

      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 border-b border-gray-700 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white text-sm"
          >
            ✕
          </button>
          <div>
            <p className="text-white font-semibold text-sm">
              {data.roadmap.title || `${subjectLabel[data.roadmap.subject_id]} Kelas ${data.roadmap.kelas}`}
            </p>
            <p className="text-gray-400 text-xs">Pertemuan ke-{data.pertemuanKe}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex gap-1">
              {data.materi.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${i < activeIdx ? 'bg-green-500' : i === activeIdx ? 'bg-blue-400' : 'bg-gray-600'}`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-xs">{activeIdx + 1}/{data.materi.length}</span>
          </div>

          {/* Timer */}
          <div className="bg-gray-800 px-3 py-1 rounded-lg text-green-400 font-mono text-sm">
            ⏱ {formatTime(elapsed)}
          </div>

          {/* Selesai */}
          <button
            onClick={handleSelesai}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? '...' : 'Selesai'}
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar kiri: daftar materi */}
        <aside className="w-56 bg-gray-900 border-r border-gray-700 overflow-y-auto shrink-0">
          <div className="p-3 border-b border-gray-700">
            <p className="text-xs text-gray-500 uppercase font-semibold">Materi ({data.materi.length})</p>
          </div>
          <div className="p-2 space-y-1">
            {data.materi.map((m, i) => (
              <button
                key={m.id}
                onClick={() => { setActiveIdx(i); setTab('buku'); setShowSoalIdx(null); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  i === activeIdx
                    ? 'bg-blue-600 text-white'
                    : i < activeIdx
                    ? 'bg-gray-800 text-green-400'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">
                    {i < activeIdx ? '✅' : m.tipe === 'review' ? '🔁' : '📖'}
                  </span>
                  <div>
                    <p className="font-medium leading-tight">{m.judul || m.unit_title}</p>
                    {m.tipe === 'review' && (
                      <p className="text-xs text-amber-400 mt-0.5">Review P{m.review_from_pertemuan}</p>
                    )}
                    {m.soal.length > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">{m.soal.length} soal</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Konten utama */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Header materi aktif */}
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 shrink-0 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {activeMat.tipe === 'review' ? (
                  <span className="text-xs bg-amber-900 text-amber-300 px-2 py-0.5 rounded-full font-semibold">🔁 Review</span>
                ) : (
                  <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded-full font-semibold">📖 Materi Baru</span>
                )}
                <h2 className="text-white font-bold text-lg">{activeMat.judul || activeMat.unit_title}</h2>
              </div>
              {activeMat.catatan_guru && (
                <p className="text-yellow-400 text-xs mt-1">💡 Catatan: {activeMat.catatan_guru}</p>
              )}
              {activeMat.deskripsi && (
                <p className="text-gray-400 text-xs mt-0.5">{activeMat.deskripsi}</p>
              )}
            </div>

            {/* Tab buku / soal */}
            <div className="flex bg-gray-700 p-1 rounded-lg gap-1">
              <button
                onClick={() => setTab('buku')}
                className={`px-3 py-1 rounded text-sm font-medium ${tab === 'buku' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'}`}
              >
                📚 Buku
              </button>
              <button
                onClick={() => setTab('soal')}
                className={`px-3 py-1 rounded text-sm font-medium ${tab === 'soal' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'}`}
              >
                ❓ Soal ({activeMat.soal.length})
              </button>
            </div>
          </div>

          {/* Konten tab */}
          <div className="flex-1 overflow-y-auto">

            {/* Tab Buku — iframe HTML interaktif */}
            {tab === 'buku' && (
              <iframe
                key={activeMat.unit_id}
                src={activeMat.buku_path}
                title={activeMat.judul}
                className="w-full h-full border-0 bg-white"
              />
            )}

            {/* Tab Soal — walkthrough satu per satu */}
            {tab === 'soal' && (
              <div className="p-6 space-y-4 max-w-3xl mx-auto">
                {activeMat.soal.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">Tidak ada soal untuk materi ini.</p>
                  </div>
                ) : (
                  activeMat.soal.map((soal, si) => {
                    const isOpen = showSoalIdx === si;
                    const pilihan = soal.pilihan;
                    return (
                      <div key={soal.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                        {/* Header soal */}
                        <button
                          onClick={() => setShowSoalIdx(isOpen ? null : si)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-gray-700 text-gray-300 text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full shrink-0">
                              {si + 1}
                            </span>
                            <p className="text-white text-sm font-medium leading-snug">{soal.pertanyaan}</p>
                          </div>
                          <span className="text-gray-400 text-xs ml-4 shrink-0">{isOpen ? '▲' : '▼'}</span>
                        </button>

                        {/* Detail soal */}
                        {isOpen && (
                          <div className="px-5 pb-5 border-t border-gray-700 pt-4 space-y-3">
                            {/* Pilihan (object atau array) */}
                            {pilihan && typeof pilihan === 'object' && !Array.isArray(pilihan) && (
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(pilihan).map(([key, val]) => {
                                  const isJawaban = String(soal.jawaban_benar).toLowerCase() === key.toLowerCase()
                                    || String(soal.jawaban_benar) === String(val);
                                  return (
                                    <div
                                      key={key}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                                        isJawaban
                                          ? 'bg-green-900 border-green-500 text-green-300'
                                          : 'bg-gray-700 border-gray-600 text-gray-300'
                                      }`}
                                    >
                                      <span className="font-bold uppercase text-xs w-5">{key}.</span>
                                      <span>{String(val)}</span>
                                      {isJawaban && <span className="ml-auto">✅</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {Array.isArray(pilihan) && (
                              <div className="space-y-2">
                                {pilihan.map((p: any, pi: number) => {
                                  const letter = String.fromCharCode(97 + pi);
                                  const isJawaban = String(soal.jawaban_benar).toLowerCase() === letter
                                    || String(soal.jawaban_benar) === String(p);
                                  return (
                                    <div
                                      key={pi}
                                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                                        isJawaban
                                          ? 'bg-green-900 border-green-500 text-green-300'
                                          : 'bg-gray-700 border-gray-600 text-gray-300'
                                      }`}
                                    >
                                      <span className="font-bold text-xs w-5">{letter}.</span>
                                      <span>{String(p)}</span>
                                      {isJawaban && <span className="ml-auto">✅</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {/* Jawaban singkat / true-false */}
                            {(!pilihan || (typeof pilihan === 'object' && Object.keys(pilihan).length === 0)) && (
                              <div className="bg-green-900 border border-green-600 rounded-lg px-4 py-2">
                                <p className="text-green-300 text-sm">
                                  ✅ Jawaban: <span className="font-bold">{String(soal.jawaban_benar)}</span>
                                </p>
                              </div>
                            )}

                            <p className="text-xs text-yellow-500">⭐ {soal.xp} XP</p>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* ===== BOTTOM NAV ===== */}
          <div className="bg-gray-900 border-t border-gray-700 px-6 py-3 flex items-center justify-between shrink-0">
            <button
              onClick={() => { setActiveIdx(i => Math.max(0, i - 1)); setTab('buku'); setShowSoalIdx(null); }}
              disabled={activeIdx === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-gray-600"
            >
              ← Sebelumnya
            </button>

            <div className="text-gray-500 text-sm">
              {activeIdx + 1} / {data.materi.length}
            </div>

            {activeIdx < data.materi.length - 1 ? (
              <button
                onClick={() => { setActiveIdx(i => i + 1); setTab('buku'); setShowSoalIdx(null); }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Selanjutnya →
              </button>
            ) : (
              <button
                onClick={handleSelesai}
                disabled={saving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
              >
                🎉 Selesai Mengajar
              </button>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
