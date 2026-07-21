"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  soal: string;
  pilihan: Record<string, string>;
};

type QuizClientProps = {
  assignmentId: string;
  materialTitle: string;
  questions: Question[];
};

export function QuizClient({ assignmentId, materialTitle, questions }: QuizClientProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ skor: number; xpEarned: number } | null>(null);

  const handleSelect = (qId: number, optionKey: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Jawab semua soal dulu ya! 😊");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submit-latihan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResult({ skor: data.skor, xpEarned: data.xpEarned });
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
      <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Selesai!</h2>
        <p className="text-slate-600 mb-6">Skor kamu: <span className="font-bold text-indigo-600 text-xl">{result.skor}</span></p>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl font-bold mb-8 inline-block">
          +{result.xpEarned} XP
        </div>
        <button
          onClick={() => router.push("/dashboard/siswa")}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="font-bold text-slate-800 text-lg mb-1">📝 Latihan: {materialTitle}</h1>
        <p className="text-slate-500 text-sm">Kerjakan dengan teliti ya!</p>
      </div>

      {questions.map((q, idx) => (
        <div key={q.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="font-bold text-slate-800 mb-4">{idx + 1}. {q.soal}</p>
          <div className="space-y-3">
            {Object.entries(q.pilihan).map(([key, text]) => {
              const isSelected = answers[q.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(q.id, key)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold"
                      : "border-slate-100 hover:border-indigo-200 text-slate-700"
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-bold uppercase">{key}.</span> {text}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-2xl hover:bg-indigo-700 shadow-md disabled:opacity-50"
      >
        {loading ? "Mengirim..." : "Kumpulkan Jawaban 🚀"}
      </button>
    </div>
  );
}
