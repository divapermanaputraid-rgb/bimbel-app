-- Migration 019_materials_bing_k3.sql
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES
  ('k3-bing', 'BING3', 'Bahasa Inggris', '📗', 3, 2)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k3-bing-01', 3, 'k3-bing', 'I Like Mi Aceh', 'Unit 1 — Food & Drink (Makanan & Minuman)', '/buku/kelas3/bahasa-inggris/k3-bing-01.html', 1),
  ('k3-bing-02', 3, 'k3-bing', 'I Don''t Like Rice', 'Unit 2 — Like & Dislike (Suka & Tidak Suka)', '/buku/kelas3/bahasa-inggris/k3-bing-02.html', 2),
  ('k3-bing-03', 3, 'k3-bing', 'I Have Fried Chicken for Breakfast', 'Unit 3 — Meals & Time (Waktu Makan)', '/buku/kelas3/bahasa-inggris/k3-bing-03.html', 3),
  ('k3-bing-04', 3, 'k3-bing', 'Do You Like Swimming?', 'Unit 4 — Hobbies & Sports (Hobi & Olahraga)', '/buku/kelas3/bahasa-inggris/k3-bing-04.html', 4),
  ('k3-bing-05', 3, 'k3-bing', 'I Like Riding a Bike on Sunday', 'Unit 5 — Days & Activities (Hari & Kegiatan)', '/buku/kelas3/bahasa-inggris/k3-bing-05.html', 5),
  ('k3-bing-06', 3, 'k3-bing', 'Is It the Canteen?', 'Unit 6 — School Places (Tempat di Sekolah)', '/buku/kelas3/bahasa-inggris/k3-bing-06.html', 6),
  ('k3-bing-07', 3, 'k3-bing', 'My Class Is Behind the Office', 'Unit 7 — Prepositions (Kata Depan Posisi)', '/buku/kelas3/bahasa-inggris/k3-bing-07.html', 7),
  ('k3-bing-08', 3, 'k3-bing', 'I Drink Orange Juice in the Canteen', 'Unit 8 — School Activities (Kegiatan Sekolah)', '/buku/kelas3/bahasa-inggris/k3-bing-08.html', 8),
  ('k3-bing-09', 3, 'k3-bing', 'My Classroom Is Clean', 'Unit 9 — Adjectives (Kata Sifat Keadaan)', '/buku/kelas3/bahasa-inggris/k3-bing-09.html', 9),
  ('k3-bing-10', 3, 'k3-bing', 'There Are Twenty Books on the Shelf', 'Unit 10 — Numbers 21-50 (Angka & Benda)', '/buku/kelas3/bahasa-inggris/k3-bing-10.html', 10)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;
