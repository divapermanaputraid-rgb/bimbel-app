'use client';

import { useState, useEffect } from 'react';

interface SiswaStuck {
  id: string;
  nama: string;
  alasan: string[];
  skor_terakhir: number;
}

interface MateriSulit {
  unit_id: string;
  rata_skor: number;
  jumlah_percobaan: number;
}

interface Statistik {
  total_siswa_aktif: number;
  rata_rata_skor: number;
  total_latihan: number;
  siswa_stuck: SiswaStuck[];
  materi_sulit: MateriSulit[];
}

interface AuditLog {
  id: string;
  kelas: number;
  subject_id: string;
  periode_start: string;
  periode_end: string;
  data: Statistik;
  rekomendasi_ai: string | null;
  diterapkan: boolean;
  created_at: string;
}

const SUBJECT_LABELS: Record<string, string> = {
  mtk: 'Matematika',
  bind: 'Bahasa Indonesia',
  bing: 'Bahasa Inggris',
  ipas: 'IPAS',
};

export default function AuditDashboardPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeAudit, setActiveAudit] = useState<AuditLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [kelas, setKelas] = useState(2);
  const [subjectId, setSubjectId] = useState('mtk');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setLoading(true);
    const res = await fetch('/api/guru/audit');
    if (res.ok) {
      const json = await res.json();
      setAuditLogs(json.data || []);
      if (json.data?.length > 0) setActiveAudit(json.data[0]);
    }
    setLoading(false);
  };

  const handleGenerateAudit = async () => {
    setGenerating(true);
    const res = await fetch('/api/guru/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kelas, subject_id: subjectId }),
    });
    if (res.ok) {
      const json = await res.json();
      setActiveAudit(json.audit);
      await fetchAuditLogs();
    } else {
      alert('Gagal generate audit. Coba lagi.');
    }
    setGenerating(false);
  };

  const handleTerapkan = async (auditId: string) => {
    const res = await fetch('/api/guru/audit', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audit_id: auditId }),
    });
    if (res.ok) {
      await fetchAuditLogs();
    }
  };

  const stat = activeAudit?.data;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📊 Audit Dashboard Mingguan</h1>
      </div>

      {/* Form Generate Audit */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="font-semibold text-lg">Generate Audit Baru</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <select
              className="border rounded-lg p-2"
              value={kelas}
              onChange={(e) => setKelas(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((k) => (
                <option key={k} value={k}>Kelas {k}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mata Pelajaran</label>
            <select
              className="border rounded-lg p-2"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              {Object.entries(SUBJECT_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGenerateAudit}
            disabled={generating}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {generating ? '⏳ Menganalisis...' : '🔍 Generate Audit Baru'}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : !activeAudit ? (
        <p className="text-center text-gray-500 italic">Belum ada audit. Generate audit pertama di atas.</p>
      ) : (
        <>
          {/* Selector audit history */}
          {auditLogs.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {auditLogs.map((log) => (
                <button
                  key={log.id}
                  onClick={() => setActiveAudit(log)}
                  className={`text-sm px-3 py-1 rounded-full border ${activeAudit.id === log.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  {log.periode_start} — Kelas {log.kelas} {SUBJECT_LABELS[log.subject_id] || log.subject_id}
                </button>
              ))}
            </div>
          )}

          {/* Ringkasan Kelas */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-4">📋 Ringkasan Kelas</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-blue-700">{stat?.total_siswa_aktif ?? 0}</p>
                <p className="text-sm text-gray-600 mt-1">Siswa Aktif</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-green-700">{stat?.rata_rata_skor ?? 0}%</p>
                <p className="text-sm text-gray-600 mt-1">Rata-rata Skor</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-700">{stat?.total_latihan ?? 0}</p>
                <p className="text-sm text-gray-600 mt-1">Total Latihan</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Periode: {activeAudit.periode_start} s/d {activeAudit.periode_end} · Kelas {activeAudit.kelas} · {SUBJECT_LABELS[activeAudit.subject_id]}
            </p>
          </div>

          {/* Siswa Stuck */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-4">⚠️ Siswa yang Butuh Perhatian</h2>
            {!stat?.siswa_stuck || stat.siswa_stuck.length === 0 ? (
              <p className="text-green-600 font-medium">✅ Semua siswa dalam kondisi baik minggu ini!</p>
            ) : (
              <div className="space-y-3">
                {stat.siswa_stuck.map((s) => (
                  <div key={s.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-red-800">{s.nama}</p>
                      <span className="text-sm text-red-600 font-medium">Skor terakhir: {s.skor_terakhir}%</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {s.alasan.map((a, i) => (
                        <li key={i} className="text-sm text-red-700">• {a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Materi Sulit */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-4">📚 Materi Paling Sulit (Top 3)</h2>
            {!stat?.materi_sulit || stat.materi_sulit.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada data materi minggu ini.</p>
            ) : (
              <div className="space-y-3">
                {stat.materi_sulit.map((m, i) => (
                  <div key={m.unit_id} className="flex items-center gap-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <span className="text-2xl font-bold text-amber-600">#{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-medium">{m.unit_id}</p>
                      <p className="text-sm text-gray-600">{m.jumlah_percobaan} percobaan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">{m.rata_skor}%</p>
                      <p className="text-xs text-gray-500">rata-rata skor</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rekomendasi AI */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg mb-4">🤖 Rekomendasi AI (Groq)</h2>
            {activeAudit.rekomendasi_ai ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                {activeAudit.rekomendasi_ai}
              </div>
            ) : (
              <p className="text-gray-500 italic">Rekomendasi AI tidak tersedia (Groq mungkin sedang down). Silakan generate ulang.</p>
            )}

            {!activeAudit.diterapkan && (
              <button
                onClick={() => handleTerapkan(activeAudit.id)}
                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                ✅ Tandai Rekomendasi Diterapkan
              </button>
            )}
            {activeAudit.diterapkan && (
              <p className="mt-3 text-green-600 font-medium text-sm">✅ Rekomendasi sudah diterapkan</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
