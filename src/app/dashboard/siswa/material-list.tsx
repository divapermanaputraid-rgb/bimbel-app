"use client";

type Material = {
  id: string;
  judul: string;
  deskripsi: string | null;
  file_path: string;
  urutan: number;
};

export function MaterialList({ materials }: { materials: Material[] }) {
  if (materials.length === 0) {
    return (
      <p className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
        Belum ada materi untuk kelasmu. Tanya guru ya!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {materials.map((m) => (
        <li key={m.id}>
          <button
            type="button"
            onClick={() => window.open(m.file_path, "_blank")}
            className="flex w-full items-start gap-3 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 hover:ring-indigo-300"
          >
            <span className="text-2xl" aria-hidden>
              📖
            </span>
            <span>
              <span className="block font-semibold text-slate-800">
                {m.urutan}. {m.judul}
              </span>
              {m.deskripsi && (
                <span className="mt-1 block text-sm text-slate-500">
                  {m.deskripsi}
                </span>
              )}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
