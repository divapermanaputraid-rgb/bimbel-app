"use client";

import { useMemo, useState } from "react";
import { SubjectSelector } from "./SubjectSelector";
import { UnitList, type StarFilter } from "./UnitList";
import { QuickPracticeButton } from "./QuickPracticeButton";
import type { PracticeUnit, PracticeUnitStatus } from "./UnitCard";

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
  attempts: number;
};

type PracticeClientProps = {
  subjects: SubjectRow[];
  materials: MaterialRow[];
  progress: ProgressRow[];
  studentKelas: number | null;
};

const BADGE_BY_UNIT: Record<string, string> = {
  "k3-bing-01": "🍔 Foodie Explorer",
  "k3-bing-02": "👍 Like Master",
  "k3-bing-03": "🍳 Meal Expert",
  "k3-bing-04": "🏊 Hobby Hero",
  "k3-bing-05": "📅 Day Master",
  "k3-bing-06": "🏫 School Scout",
  "k3-bing-07": "🧭 Preposition Pro",
  "k3-bing-08": "🧃 Activity Ace",
  "k3-bing-09": "✨ Adjective Artist",
  "k3-bing-10": "🔢 Number Ninja",
};

function deriveStatus(
  material: MaterialRow,
  sorted: MaterialRow[],
  progressMap: Record<string, ProgressRow>
): PracticeUnitStatus {
  const row = progressMap[material.id];
  if (row?.status === "completed" || (row?.stars ?? 0) >= 1) return "completed";
  if (row?.status === "in_progress") return "in_progress";
  if (row?.status === "available") return "available";
  if (row?.status === "locked") return "locked";

  const idx = sorted.findIndex((m) => m.id === material.id);
  if (idx <= 0) return "available";
  const prev = sorted[idx - 1];
  const prevRow = progressMap[prev.id];
  if (prevRow?.status === "completed" || (prevRow?.stars ?? 0) >= 1) return "available";
  return "locked";
}

export function PracticeClient({
  subjects,
  materials,
  progress,
  studentKelas,
}: PracticeClientProps) {
  const [activeKode, setActiveKode] = useState<string | null>(null);
  const [filter, setFilter] = useState<StarFilter>("all");

  const progressMap = useMemo(() => {
    const map: Record<string, ProgressRow> = {};
    progress.forEach((p) => {
      map[p.unit_id] = p;
    });
    return map;
  }, [progress]);

  const groups = useMemo(() => {
    const byKode = new Map<
      string,
      {
        kode: string;
        nama: string;
        icon: string;
        kelasList: number[];
        subjectIds: string[];
        totalUnits: number;
        completedUnits: number;
        locked?: boolean;
      }
    >();

    subjects.forEach((s) => {
      const g = byKode.get(s.kode);
      if (!g) {
        byKode.set(s.kode, {
          kode: s.kode,
          nama: s.nama,
          icon: s.icon ?? "📖",
          kelasList: [s.kelas],
          subjectIds: [s.id],
          totalUnits: 0,
          completedUnits: 0,
        });
      } else {
        if (!g.kelasList.includes(s.kelas)) g.kelasList.push(s.kelas);
        if (!g.subjectIds.includes(s.id)) g.subjectIds.push(s.id);
      }
    });

    const list = Array.from(byKode.values());
    list.forEach((g) => {
      const mats = materials.filter((m) => g.subjectIds.includes(m.subject_id));
      g.totalUnits = mats.length;
      g.completedUnits = mats.filter((m) => {
        const row = progressMap[m.id];
        return row?.status === "completed" || (row?.stars ?? 0) >= 1;
      }).length;
    });

    list.sort((a, b) => a.nama.localeCompare(b.nama));
    list.push({
      kode: "ipas",
      nama: "IPAS",
      icon: "🌿",
      kelasList: [],
      subjectIds: [],
      totalUnits: 0,
      completedUnits: 0,
      locked: true,
    });
    return list;
  }, [subjects, materials, progressMap]);

  const activeGroup = groups.find((g) => g.kode === activeKode && !g.locked) ?? null;

  const practiceUnits: PracticeUnit[] = useMemo(() => {
    if (!activeGroup) return [];

    // Prefer student's class if available for this subject, else first class
    const preferredKelas =
      studentKelas && activeGroup.kelasList.includes(studentKelas)
        ? studentKelas
        : [...activeGroup.kelasList].sort((a, b) => a - b)[0];

    if (preferredKelas == null) return [];

    const subjectIds = subjects
      .filter((s) => s.kode === activeGroup.kode && s.kelas === preferredKelas)
      .map((s) => s.id);

    const mats = materials
      .filter((m) => subjectIds.includes(m.subject_id) && m.kelas === preferredKelas)
      .sort((a, b) => a.urutan - b.urutan);

    return mats.map((m) => {
      const row = progressMap[m.id];
      const status = deriveStatus(m, mats, progressMap);
      return {
        id: m.id,
        judul: m.judul,
        urutan: m.urutan,
        file_path: m.file_path,
        status,
        stars: row?.stars ?? 0,
        best_score: row?.best_score ?? 0,
        attempts: row?.attempts ?? 0,
        badge: BADGE_BY_UNIT[m.id],
      };
    });
  }, [activeGroup, studentKelas, subjects, materials, progressMap]);

  const completedCount = practiceUnits.filter((u) => u.stars >= 1 || u.status === "completed").length;
  const headerKelas =
    studentKelas && activeGroup?.kelasList.includes(studentKelas)
      ? studentKelas
      : activeGroup?.kelasList[0];

  if (!activeGroup) {
    return (
      <main className="mx-auto max-w-lg p-4 pt-6">
        <h1 className="text-xl font-bold text-slate-800">🎮 Latihan</h1>
        <p className="mt-1 text-sm text-slate-500">Pilih pelajaran untuk latihan soal.</p>
        <div className="mt-5">
          <SubjectSelector subjects={groups} onSelect={setActiveKode} />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-lg p-4 pt-6">
      <button
        type="button"
        onClick={() => {
          setActiveKode(null);
          setFilter("all");
        }}
        className="mb-3 text-sm font-bold text-indigo-600"
      >
        ← Kembali
      </button>

      <h1 className="text-xl font-bold text-slate-800">
        {activeGroup.icon} {activeGroup.nama}
        {headerKelas != null ? ` — Kelas ${headerKelas}` : ""} — Latihan Soal
      </h1>
      <p className="mt-1 mb-4 text-sm text-slate-500">Raih bintang, ulangi unit, naik level.</p>

      <QuickPracticeButton
        enabled={completedCount > 0}
        subjectKode={activeGroup.kode}
        completedCount={completedCount}
      />

      <UnitList units={practiceUnits} filter={filter} onFilterChange={setFilter} />
    </main>
  );
}
