'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-5xl" aria-hidden>🔥</p>
      <h1 className="text-xl font-bold text-slate-900">Ups! Ada yang salah</h1>
      <p className="text-sm text-slate-600">
        {error.message ?? 'Terjadi kesalahan di server. Coba lagi.'}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        🔄 Coba Lagi
      </button>
    </main>
  );
}
