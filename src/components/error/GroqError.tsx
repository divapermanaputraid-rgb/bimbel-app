'use client';

export function GroqError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤖💤</span>
        <div>
          <p className="font-medium text-yellow-800">AI Tutor sedang istirahat</p>
          <p className="text-sm text-yellow-600">Coba lagi dalam beberapa detik.</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 text-sm bg-yellow-200 px-3 py-1 rounded-lg hover:bg-yellow-300"
      >
        🔄 Coba Lagi
      </button>
    </div>
  );
}
