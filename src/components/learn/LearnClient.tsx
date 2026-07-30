"use client";

import { useMemo, useState } from "react";
import { SubjectCard } from "./SubjectCard";
import { ClassTabs } from "./ClassTabs";
import { UnitGrid, type UnitItem } from "./UnitGrid";
import type { UnitStatus } from "./UnitCard";

export type SubjectRow = {
  id: string;
  kode: string;
  nama: string;
  icon: string | null;
  kelas: number;
  urutan: number;
};

export type MaterialRow = {
  id: string;
  kelas: number;
  subject_id: string;
  judul: string;
  deskripsi: string | null;
  file_path: string;
  urutan: number;
};

export type ProgressRow = {
  unit_id: string;
  subject_id: string;
  kelas: number;
  status: string;
  stars: number;
  best_score: number;
};

type GroupedSubject = {
  kode: string;
  nama: string;
  icon: string;
  kelasList: number[];
  subjectIds: string[];
  totalUnits: number;
  completedUnits: number;
  locked: boolean;
};

type LearnClientProps = {
  subjects: SubjectRow[];
  materials: MaterialRow[];
  progress: ProgressRow[];
};

const COMING_SOON: GroupedSubject[] = [
  // IPAS removed — seed migration 030 provides real data from DB
];

function unitEmoji(m: MaterialRow): string {
  const d = `${m.deskripsi ?? ""} ${m.judul}`.toLowerCase();
  if (d.includes("food") || d.includes("makanan") || d.includes("mi aceh")) return "🍜";
  if (d.includes("like") && d.includes("dislike")) return "👍";
  if (d.includes("breakfast") || d.includes("meal")) return "🍳";
  if (d.includes("swimming") || d.includes("hobb")) return "🏊";
  if (d.includes("sunday") || d.includes("days")) return "📅";
  if (d.includes("canteen") || d.includes("school place")) return "🏫";
  if (d.includes("preposition") || d.includes("behind")) return "🧭";
  if (d.includes("activity") || d.includes("juice")) return "🧃";
  if (d.includes("adjective") || d.includes("clean")) return "✨";
  if (d.includes("number") || d.includes("twenty") || d.includes("shelf")) return "🔢";
  if (d.includes("bilangan") || d.includes("angka")) return "🔢";
  if (d.includes("tambah") || d.includes("penjumlahan")) return "➕";
  if (d.includes("kurang") || d.includes("pengurangan")) return "➖";
  if (d.includes("kali") || d.includes("perkalian")) return "✖️";
  if (d.includes("bagi") || d.includes("pembagian")) return "➗";
  if (d.includes("ukur") || d.includes("panjang") || d.includes("berat")) return "📏";
  if (d.includes("bangun") || d.includes("sudut") || d.includes("sisi")) return "📐";
  if (d.includes("data") || d.includes("tabel") || d.includes("diagram")) return "📊";
  if (d.includes("pecahan") || d.includes("desimal")) return "🍕";
  if (d.includes("rasio")) return "⚖️";
  return "📖";
}

function deriveStatus(
  material: MaterialRow,
  sorted: MaterialRow[],
  progressMap: Record<string, ProgressRow>
): UnitStatus {
  const row = progressMap[material.id];
  if (row?.status === "completed") return "completed";
  if (row?.status === "in_progress") return "in_progress";
  if (row?.status === "available") return "available";
  if (row?.status === "locked") return "locked";

  // Default Duolingo unlock: first unit open; next unlocks after previous completed
  const idx = sorted.findIndex((m) => m.id === material.id);
  if (idx <= 0) return "available";
  const prev = sorted[idx - 1];
  if (progressMap[prev.id]?.status === "completed") return "available";
  return "locked";
}

export function LearnClient({ subjects, materials, progress }: LearnClientProps) {
  const [step, setStep] = useState<"subjects" | "classes" | "units">("subjects");
  const [activeKode, setActiveKode] = useState<string | null>(null);
  const [activeKelas, setActiveKelas] = useState<number | null>(null);

  const progressMap = useMemo(() => {
    const map: Record<string, ProgressRow> = {};
    progress.forEach((p) => {
      map[p.unit_id] = p;
    });
    return map;
  }, [progress]);

  const groups = useMemo(() => {
    const byKode = new Map<string, GroupedSubject>();

    subjects.forEach((s) => {
      const existing = byKode.get(s.kode);
      if (!existing) {
        byKode.set(s.kode, {
          kode: s.kode,
          nama: s.nama,
          icon: s.icon ?? "📖",
          kelasList: [s.kelas],
          subjectIds: [s.id],
          totalUnits: 0,
          completedUnits: 0,
          locked: false,
        });
      } else {
        if (!existing.kelasList.includes(s.kelas)) existing.kelasList.push(s.kelas);
        if (!existing.subjectIds.includes(s.id)) existing.subjectIds.push(s.id);
      }
    });

    const list = Array.from(byKode.values());
    list.forEach((g) => {
      const mats = materials.filter((m) => g.subjectIds.includes(m.subject_id));
      g.totalUnits = mats.length;
      g.completedUnits = mats.filter((m) => progressMap[m.id]?.status === "completed").length;
    });

    list.sort((a, b) => a.nama.localeCompare(b.nama));
    return [...list, ...COMING_SOON];
  }, [subjects, materials, progressMap]);

  const activeGroup = groups.find((g) => g.kode === activeKode && !g.locked) ?? null;

  const unitsForClass: UnitItem[] = useMemo(() => {
    if (!activeGroup || activeKelas == null) return [];
    const subjectIds = subjects
      .filter((s) => s.kode === activeGroup.kode && s.kelas === activeKelas)
      .map((s) => s.id);
    const mats = materials
      .filter((m) => subjectIds.includes(m.subject_id) && m.kelas === activeKelas)
      .sort((a, b) => a.urutan - b.urutan);

    return mats.map((m) => {
      const row = progressMap[m.id];
      return {
        id: m.id,
        judul: m.judul,
        emoji: unitEmoji(m),
        urutan: m.urutan,
        file_path: m.file_path,
        status: deriveStatus(m, mats, progressMap),
        stars: row?.stars ?? 0,
        best_score: row?.best_score ?? 0,
        kelas: activeKelas,
      };
    });
  }, [activeGroup, activeKelas, subjects, materials, progressMap]);

  function openSubject(kode: string) {
    const g = groups.find((x) => x.kode === kode);
    if (!g || g.locked) return;
    setActiveKode(kode);
    setActiveKelas(g.kelasList.sort((a, b) => a - b)[0] ?? null);
    setStep(g.kelasList.length > 1 ? "classes" : "units");
  }

  function selectKelas(kelas: number) {
    setActiveKelas(kelas);
    setStep("units");
  }

  function back() {
    if (step === "units" && (activeGroup?.kelasList.length ?? 0) > 1) {
      setStep("classes");
      return;
    }
    setStep("subjects");
    setActiveKode(null);
    setActiveKelas(null);
  }

  return (
    <main className="mx-auto max-w-lg p-4 pt-6">
      {step === "subjects" && (
        <>
          <h1 className="text-xl font-bold text-slate-800">📚 Belajar</h1>
          <p className="mt-1 text-sm text-slate-500">Pilih pelajaran untuk mulai.</p>
          <div className="mt-5 space-y-3">
            {groups.map((g) => {
              const pct =
                g.totalUnits > 0 ? Math.round((g.completedUnits / g.totalUnits) * 100) : 0;
              return (
                <SubjectCard
                  key={g.kode}
                  kode={g.kode}
                  nama={g.nama}
                  icon={g.icon}
                  kelasList={g.kelasList}
                  progressPct={pct}
                  locked={g.locked}
                  onOpen={() => openSubject(g.kode)}
                />
              );
            })}
          </div>
        </>
      )}

      {step === "classes" && activeGroup && (
        <>
          <button
            type="button"
            onClick={back}
            className="mb-3 text-sm font-bold text-indigo-600"
          >
            ← Kembali
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            {activeGroup.icon} {activeGroup.nama} — Pilih Kelas
          </h1>
          <p className="mt-1 text-sm text-slate-500">Pilih kelas yang ingin dipelajari.</p>
          <div className="mt-5">
            <ClassTabs
              kelasList={activeGroup.kelasList}
              activeKelas={activeKelas}
              onSelect={selectKelas}
            />
          </div>
        </>
      )}

      {step === "units" && activeGroup && activeKelas != null && (
        <>
          <button
            type="button"
            onClick={back}
            className="mb-3 text-sm font-bold text-indigo-600"
          >
            ← Kembali
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            {activeGroup.icon} {activeGroup.nama} — Kelas {activeKelas}
          </h1>
          <p className="mt-1 mb-4 text-sm text-slate-500">
            Tap unit terbuka untuk baca buku interaktif.
          </p>
          {(activeGroup.kelasList.length > 1) && (
            <ClassTabs
              kelasList={activeGroup.kelasList}
              activeKelas={activeKelas}
              onSelect={selectKelas}
            />
          )}
          <UnitGrid units={unitsForClass} />
        </>
      )}
    </main>
  );
}
