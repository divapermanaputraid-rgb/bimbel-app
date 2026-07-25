-- Migration 014_materials_k3_mtk_1_9.sql
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k3-mtk-01', 3, 'mtk', 'Membaca & Menulis Bilangan sampai 1.000', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-01.html', 1),
  ('k3-mtk-02', 3, 'mtk', 'Nilai Tempat: Ratusan, Puluhan, Satuan', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-02.html', 2),
  ('k3-mtk-03', 3, 'mtk', 'Membandingkan & Mengurutkan Bilangan', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-03.html', 3),
  ('k3-mtk-04', 3, 'mtk', 'Penjumlahan sampai 1.000', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-04.html', 4),
  ('k3-mtk-05', 3, 'mtk', 'Pengurangan sampai 1.000', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-05.html', 5),
  ('k3-mtk-06', 3, 'mtk', 'Perkalian Bilangan Cacah', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-06.html', 6),
  ('k3-mtk-07', 3, 'mtk', 'Pembagian Bilangan Cacah', 'Bab 1 — Bilangan Cacah', '/buku/kelas3/matematika/k3-mtk-07.html', 7),
  ('k3-mtk-08', 3, 'mtk', 'Kalimat Matematika: Penjumlahan', 'Bab 2 — Kalimat Matematika', '/buku/kelas3/matematika/k3-mtk-08.html', 8),
  ('k3-mtk-09', 3, 'mtk', 'Kalimat Matematika: Pengurangan', 'Bab 2 — Kalimat Matematika', '/buku/kelas3/matematika/k3-mtk-09.html', 9)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;
