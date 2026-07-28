"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Question = {
  id: string;
  soal: string;
  pilihan: Record<string, string> | string[] | null;
  tipe?: string;
  data?: unknown;
  audio_text?: string | null;
  kalimat?: string | null;
  kata?: string[] | null;
  xp?: number;
  level?: number;
};

type QuizClientProps = {
  mode: "unit" | "assignment";
  unitId?: string;
  subjectId?: string;
  assignmentId?: string;
  materialTitle: string;
  bookPath?: string | null;
  questions: Question[];
};

function optionEntries(pilihan: Question["pilihan"]): Array<[string, string]> {
  if (!pilihan) return [];
  if (Array.isArray(pilihan)) {
    return pilihan.map((text, idx) => {
      const key = String.fromCharCode(97 + idx); // a, b, c...
      return [key, text];
    });
  }
  return Object.entries(pilihan);
}

function speak(text: string) {
  if (typeof window === "undefined") return;
  if ("speakEnglish" in window && typeof (window as unknown as { speakEnglish: (t: string) => void }).speakEnglish === "function") {
    (window as unknown as { speakEnglish: (t: string) => void }).speakEnglish(text);
    return;
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

export function QuizClient({
  mode,
  unitId,
  subjectId,
  assignmentId,
  materialTitle,
  bookPath,
  questions,
}: QuizClientProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ skor: number; xpEarned: number; stars: number } | null>(
    null
  );

  const total = questions.length;

  const answeredCount = useMemo(
    () => Object.keys(answers).filter((k) => answers[k] != null && answers[k] !== "").length,
    [answers]
  );

  const handleSelect = (qId: string, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmit = async () => {
    if (answeredCount < total) {
      alert("Jawab semua soal dulu ya! 😊");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit-latihan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          unitId,
          subjectId,
          assignmentId,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal submit");

      setResult({
        skor: data.skor,
        xpEarned: data.xpEarned,
        stars: data.stars ?? 0,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Gagal mengirim jawaban: " + err.message);
      } else {
        alert("Gagal mengirim jawaban.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-6xl">🎉</div>
        <h2 className="mb-2 text-2xl font-bold text-slate-800">Selesai!</h2>
        <p className="mb-2 text-slate-600">
          Skor kamu:{" "}
          <span className="text-xl font-bold text-indigo-600">{result.skor}%</span>
        </p>
        <p className="mb-4 text-2xl text-amber-500">
          {"⭐".repeat(result.stars)}
          {"☆".repeat(Math.max(0, 3 - result.stars))}
        </p>
        <div className="mb-8 inline-block rounded-xl bg-emerald-50 px-4 py-2 font-bold text-emerald-700">
          +{result.xpEarned} XP
        </div>
        <div className="flex w-full flex-col gap-2">
          <button
            type="button"
            onClick={() => router.push("/dashboard/siswa/practice")}
            className="w-full rounded-2xl bg-indigo-600 py-4 font-bold text-white hover:bg-indigo-700"
          >
            Kembali ke Latihan
          </button>
          {bookPath && (
            <a
              href={bookPath}
              className="w-full rounded-2xl border border-indigo-200 py-3 font-bold text-indigo-700"
            >
              📖 Buka Buku Unit
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <Link href="/dashboard/siswa/practice" className="mb-3 inline-block text-sm font-bold text-indigo-600">
          ← Kembali
        </Link>
        <h1 className="mb-1 text-lg font-bold text-slate-800">📝 Latihan: {materialTitle}</h1>
        <p className="text-sm text-slate-500">
          {answeredCount}/{total} terjawab · Kerjakan dengan teliti ya!
        </p>
      </div>

      {questions.map((q, idx) => {
        const entries = optionEntries(q.pilihan);
        const prompt =
          q.tipe === "fill_blank" && q.kalimat ? q.kalimat : q.soal;

        return (
          <div key={q.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              Soal {idx + 1}
              {q.tipe ? ` · ${q.tipe}` : ""}
            </p>
            <p className="mb-4 font-bold text-slate-800">
              {idx + 1}. {prompt}
            </p>

            {q.audio_text && (
              <button
                type="button"
                onClick={() => speak(q.audio_text || "")}
                className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700"
              >
                🔊 Dengar
              </button>
            )}

            {entries.length > 0 ? (
              <div className="space-y-3">
                {entries.map(([key, text]) => {
                  const isSelected = answers[q.id] === key || answers[q.id] === text;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelect(q.id, Array.isArray(q.pilihan) ? text : key)}
                      className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50 font-bold text-indigo-900"
                          : "border-slate-100 text-slate-700 hover:border-indigo-200"
                      }`}
                    >
                      {!Array.isArray(q.pilihan) && (
                        <span className="inline-block w-6 font-bold uppercase text-slate-400">
                          {key}.
                        </span>
                      )}
                      {text}
                    </button>
                  );
                })}
              </div>
            ) : q.kata && q.kata.length > 0 ? (
              <ArrangeQuestion
                qId={q.id}
                words={q.kata}
                value={answers[q.id] || ""}
                onChange={(val) => handleSelect(q.id, val)}
              />
            ) : (
              <p className="text-sm text-slate-400">Format soal belum didukung di UI ini.</p>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Mengirim..." : "Kumpulkan Jawaban 🚀"}
      </button>
    </div>
  );
}

function ArrangeQuestion({
  qId,
  words,
  value,
  onChange,
}: {
  qId: string;
  words: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const selected = value ? value.split(" ").filter(Boolean) : [];
  const remaining = words.filter((w) => {
    const countSelected = selected.filter((s) => s === w).length;
    const countTotal = words.filter((x) => x === w).length;
    return countSelected < countTotal;
  });

  return (
    <div>
      <div className="mb-3 min-h-[48px] rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-3 text-sm font-bold text-indigo-900">
        {selected.length > 0 ? selected.join(" ") : "Susun kata di sini..."}
      </div>
      <div className="mb-2 flex flex-wrap gap-2">
        {remaining.map((w, i) => (
          <button
            key={`${qId}-rem-${w}-${i}`}
            type="button"
            onClick={() => onChange([...selected, w].join(" "))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
          >
            {w}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-xs font-bold text-slate-500 underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}
