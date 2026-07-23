import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-5xl" aria-hidden>
        🙈
      </p>
      <h1 className="text-xl font-bold text-slate-900">Halaman tidak ketemu</h1>
      <p className="text-sm text-slate-600">
        Link-nya salah atau halaman sudah dipindah.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
