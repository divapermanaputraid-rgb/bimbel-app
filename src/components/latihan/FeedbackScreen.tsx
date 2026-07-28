"use client";

export function FeedbackScreen({
  isCorrect,
  correctAnswer,
  explanation,
  onContinue,
}: {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  onContinue: () => void;
}) {
  const bgClass = isCorrect ? "bg-emerald-100 text-emerald-900" : "bg-red-100 text-red-900";
  const btnClass = isCorrect ? "bg-emerald-500 shadow-[0_4px_0_#10b981]" : "bg-red-500 shadow-[0_4px_0_#ef4444]";
  const icon = isCorrect ? "✅✅✅ CORRECT!" : "❌❌❌ OOPS!";

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6 ${bgClass} shadow-2xl transition-all`}>
      <div className="mx-auto max-w-lg">
        <h2 className="mb-4 text-2xl font-black">{icon}</h2>
        {!isCorrect && (
          <div className="mb-4">
            <p className="text-sm font-bold text-red-700">Jawaban benar:</p>
            <p className="text-lg font-bold">{correctAnswer}</p>
          </div>
        )}
        {explanation && (
          <div className="mb-6 rounded-xl bg-white/50 p-4 text-lg leading-[1.8] font-medium">
            💡 {explanation}
          </div>
        )}
        <button
          onClick={onContinue}
          className={`w-full rounded-2xl py-4 text-xl font-bold text-white ${btnClass}`}
        >
          LANJUTKAN ➡️
        </button>
      </div>
    </div>
  );
}
