"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "@/hooks/useSound";
import { ProgressBar } from "./ProgressBar";
import { LivesIndicator } from "./LivesIndicator";
import { ChooseCorrectSoal } from "./ChooseCorrectSoal";
import { TrueFalseSoal } from "./TrueFalseSoal";
import { FeedbackScreen } from "./FeedbackScreen";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Soal = any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LatihanContainer({ unitId, questions }: { unitId: string; questions: Soal[] }) {
  const router = useRouter();
  const { playCorrect, playWrong, playComplete } = useSound();

  const [screen, setScreen] = useState<"start" | "soal" | "feedback" | "gameover" | "selesai">("start");
  const [idx, setIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);

  const [lastCorrect, setLastCorrect] = useState(false);

  const soal = questions[idx];

  const handleStart = () => setScreen("soal");

  const checkAnswer = (ans: string) => {
    // Normalisasi check sederhana (bisa dipercanggih nanti)
    let isBenar = false;
    let expected = soal.jawaban_benar;
    if (typeof expected === "object") expected = JSON.stringify(expected); // placeholder for match
    if (typeof expected === "string" && ans.toLowerCase() === expected.toLowerCase()) {
      isBenar = true;
    }

    setLastCorrect(isBenar);
    if (isBenar) {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(50);
      playCorrect();
      setXp(x => x + (soal.xp || 10));
    } else {
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([100, 50, 100]);
      playWrong();
      setLives(l => l - 1);
    }
    setScreen("feedback");
  };

  const handleNext = () => {
    if (lives <= 0 && !lastCorrect) {
      setScreen("gameover");
      return;
    }
    if (idx + 1 >= questions.length) {
      playComplete();
      setScreen("selesai");
      // TODO: Simpan ke database via API
      return;
    }
    setIdx(i => i + 1);
    setScreen("soal");
  };

  if (screen === "start") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-50 p-6 text-center">
        <h1 className="mb-4 text-3xl font-black text-indigo-900">Latihan Unit</h1>
        <p className="mb-8 text-lg font-medium text-indigo-700">8 Soal • Target 3 Bintang ⭐</p>
        <div className="flex w-full flex-col gap-3">
          <button onClick={handleStart} className="w-full rounded-2xl bg-indigo-600 py-4 text-xl font-bold text-white shadow-[0_4px_0_#4338ca] active:translate-y-1 active:shadow-none transition-all">
            🚀 MULAI LATIHAN
          </button>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = `/buku/kelas3/bahasa-inggris/${unitId}.html`;
              }
            }}
            className="w-full rounded-2xl border-2 border-indigo-200 bg-white py-4 text-xl font-bold text-indigo-700 transition-all hover:bg-indigo-50"
          >
            📖 Baca Buku Dulu
          </button>
        </div>
      </div>
    );
  }

  if (screen === "gameover") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-6 text-center">
        <h1 className="mb-4 text-4xl font-black text-red-600">💔 NYAWA HABIS!</h1>
        <p className="mb-8 text-lg font-medium text-red-500">Jangan menyerah! Coba lagi 💪</p>
        <button onClick={() => window.location.reload()} className="w-full mb-3 rounded-2xl bg-red-500 py-4 text-xl font-bold text-white shadow-[0_4px_0_#b91c1c]">🔄 COBA LAGI</button>
        <button onClick={() => router.push("/dashboard/siswa/practice")} className="w-full rounded-2xl border-2 border-slate-200 bg-white py-4 text-xl font-bold text-slate-700">🏠 KEMBALI</button>
      </div>
    );
  }

  if (screen === "selesai") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-50 p-6 text-center">
        <h1 className="mb-4 text-4xl font-black text-emerald-600">🎉 SELESAI!</h1>
        <p className="mb-8 text-lg font-bold text-emerald-700">Skor: {xp} XP</p>
        <button onClick={() => router.push("/dashboard/siswa/practice")} className="w-full rounded-2xl bg-emerald-500 py-4 text-xl font-bold text-white shadow-[0_4px_0_#047857]">🏠 KEMBALI</button>
      </div>
    );
  }

  // Soal Screen
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-lg">
        <div className="mb-6 flex items-center justify-between">
          <ProgressBar current={idx} total={questions.length} />
          <LivesIndicator lives={lives} />
        </div>

        <div className="mb-24">
          {soal.tipe === "true_false" ? (
            <TrueFalseSoal soal={soal} onSubmit={checkAnswer} />
          ) : (
            <ChooseCorrectSoal soal={soal} onSubmit={checkAnswer} />
          )}
        </div>

        {screen === "feedback" && (
          <FeedbackScreen
            isCorrect={lastCorrect}
            correctAnswer={typeof soal.jawaban_benar === 'string' ? soal.jawaban_benar : JSON.stringify(soal.jawaban_benar)}
            explanation={soal.penjelasan_id}
            onContinue={handleNext}
          />
        )}
      </div>
    </div>
  );
}
