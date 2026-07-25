-- Migration 016_materials_k3_mtk_10_18.sql
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k3-mtk-10', 3, 'mtk', 'Mengukur Panjang dengan Satuan Baku', 'Bab 3 — Pengukuran Panjang & Berat', '/buku/kelas3/matematika/k3-mtk-10.html', 10),
  ('k3-mtk-11', 3, 'mtk', 'Hubungan Antar Satuan Panjang', 'Bab 3 — Pengukuran Panjang & Berat', '/buku/kelas3/matematika/k3-mtk-11.html', 11),
  ('k3-mtk-12', 3, 'mtk', 'Mengukur Berat dengan Satuan Baku', 'Bab 3 — Pengukuran Panjang & Berat', '/buku/kelas3/matematika/k3-mtk-12.html', 12),
  ('k3-mtk-13', 3, 'mtk', 'Hubungan Antar Satuan Berat', 'Bab 3 — Pengukuran Panjang & Berat', '/buku/kelas3/matematika/k3-mtk-13.html', 13),
  ('k3-mtk-14', 3, 'mtk', 'Sisi pada Bangun Datar', 'Bab 4 — Bangun Datar', '/buku/kelas3/matematika/k3-mtk-14.html', 14),
  ('k3-mtk-15', 3, 'mtk', 'Sudut pada Bangun Datar', 'Bab 4 — Bangun Datar', '/buku/kelas3/matematika/k3-mtk-15.html', 15),
  ('k3-mtk-16', 3, 'mtk', 'Garis Tegak Lurus & Garis Sejajar', 'Bab 4 — Bangun Datar', '/buku/kelas3/matematika/k3-mtk-16.html', 16),
  ('k3-mtk-17', 3, 'mtk', 'Mengurutkan & Membandingkan Data', 'Bab 5 — Penyajian Data', '/buku/kelas3/matematika/k3-mtk-17.html', 17),
  ('k3-mtk-18', 3, 'mtk', 'Menyajikan Data dalam Tabel', 'Bab 5 — Penyajian Data', '/buku/kelas3/matematika/k3-mtk-18.html', 18)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;
