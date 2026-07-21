-- 004_materi_k2_mtk.sql
-- Seed Bab 1 & 2 Kelas 2 MTK

INSERT INTO public.materials (
  id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan
) VALUES
(
  'k2-mtk-02', 2, 'k2-mtk', 'Rumah Angka: Puluhan dan Satuan',
  'Mengenal nilai tempat puluhan dan satuan dari suatu bilangan.',
  '/buku/kelas2/matematika/k2-mtk-02.html', 8, 2
),
(
  'k2-mtk-03', 2, 'k2-mtk', 'Siapa yang Lebih Besar?',
  'Membandingkan dua bilangan menggunakan tanda lebih besar, lebih kecil, atau sama dengan.',
  '/buku/kelas2/matematika/k2-mtk-03.html', 8, 3
),
(
  'k2-mtk-04', 2, 'k2-mtk', 'Menambah dengan Berbagai Cara',
  'Belajar penjumlahan dengan cara mendatar dan bersusun.',
  '/buku/kelas2/matematika/k2-mtk-04.html', 8, 4
),
(
  'k2-mtk-05', 2, 'k2-mtk', 'Mengurangi dengan Berbagai Cara',
  'Belajar pengurangan dengan cara mendatar dan bersusun.',
  '/buku/kelas2/matematika/k2-mtk-05.html', 8, 5
),
(
  'k2-mtk-06', 2, 'k2-mtk', 'Petualangan Anton dan Kelereng',
  'Memecahkan masalah sehari-hari dengan soal cerita matematika.',
  '/buku/kelas2/matematika/k2-mtk-06.html', 8, 6
);

-- Soal untuk k2-mtk-02 (Puluhan & Satuan)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-02', 'Pada angka 35, angka 3 menempati nilai tempat apa?', '{"a":"Satuan", "b":"Ratusan", "c":"Puluhan"}', 'c', 1, 'Angka di depan adalah puluhan.'),
('k2-mtk-02', 'Nilai dari angka 7 pada bilangan 27 adalah...', '{"a":"7", "b":"70", "c":"17"}', 'a', 1, 'Angka 7 di belakang adalah satuan, nilainya 7.'),
('k2-mtk-02', '4 puluhan dan 2 satuan menjadi angka berapa?', '{"a":"24", "b":"42", "c":"402"}', 'b', 2, 'Gabungkan puluhan (4) dan satuan (2) menjadi 42.'),
('k2-mtk-02', 'Bentuk panjang dari 48 adalah...', '{"a":"40 + 8", "b":"4 + 8", "c":"80 + 4"}', 'a', 2, '48 adalah 4 puluhan (40) dan 8 satuan.'),
('k2-mtk-02', 'Dari bilangan 36, 42, 28, manakah yang memiliki puluhan paling besar?', '{"a":"36", "b":"42", "c":"28"}', 'b', 3, 'Puluhan paling besar adalah 4 dari angka 42.');

-- Soal untuk k2-mtk-03 (Membandingkan)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-03', 'Tanda yang tepat untuk 38 ... 42 adalah?', '{"a":">", "b":"=", "c":"<"}', 'c', 1, '38 lebih kecil dari 42, jadi pakai <.'),
('k2-mtk-03', 'Mana yang paling banyak: 15 permen atau 25 permen?', '{"a":"15 permen", "b":"25 permen", "c":"Sama saja"}', 'b', 1, '25 lebih besar dari 15.'),
('k2-mtk-03', 'Urutkan dari yang terkecil: 24, 18, 31', '{"a":"18, 24, 31", "b":"31, 24, 18", "c":"18, 31, 24"}', 'a', 2, 'Lihat puluhannya dulu: 10an, 20an, 30an.'),
('k2-mtk-03', 'Angka di antara 39 dan 41 adalah?', '{"a":"38", "b":"40", "c":"42"}', 'b', 2, 'Setelah 39 adalah 40, sebelum 41 adalah 40.'),
('k2-mtk-03', 'Anton punya 23 kelereng. Budi punya kelereng lebih banyak dari Anton tapi kurang dari 25. Berapa kelereng Budi?', '{"a":"22", "b":"24", "c":"26"}', 'b', 3, 'Lebih dari 23 dan kurang dari 25 adalah 24.');

-- Soal untuk k2-mtk-04 (Penjumlahan)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-04', 'Hasil dari 12 + 5 adalah...', '{"a":"16", "b":"17", "c":"18"}', 'b', 1, '12 ditambah 5 jadi 17.'),
('k2-mtk-04', '20 + 10 = ?', '{"a":"20", "b":"40", "c":"30"}', 'c', 1, 'Dua puluhan tambah satu puluhan jadi tiga puluhan (30).'),
('k2-mtk-04', 'Berapa hasil dari 24 + 13?', '{"a":"37", "b":"47", "c":"36"}', 'a', 2, 'Satuan 4+3=7. Puluhan 2+1=3. Jadi 37.'),
('k2-mtk-04', 'Anton punya 15 apel. Beli lagi 12 apel. Totalnya?', '{"a":"27", "b":"37", "c":"28"}', 'a', 2, '15 + 12 = 27 apel.'),
('k2-mtk-04', '18 + 25 = ? (Gunakan simpan puluhan)', '{"a":"33", "b":"43", "c":"44"}', 'b', 3, '8+5=13, simpan 1. 1+1+2=4. Jadi 43.');

-- Soal untuk k2-mtk-05 (Pengurangan)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-05', 'Hasil dari 15 - 4 adalah...', '{"a":"10", "b":"11", "c":"12"}', 'b', 1, '15 dikurang 4 sisa 11.'),
('k2-mtk-05', '30 - 10 = ?', '{"a":"20", "b":"10", "c":"40"}', 'a', 1, 'Tiga puluhan kurangi satu puluhan sisa dua puluhan (20).'),
('k2-mtk-05', 'Berapa hasil dari 38 - 15?', '{"a":"23", "b":"13", "c":"33"}', 'a', 2, 'Satuan 8-5=3. Puluhan 3-1=2. Jadi 23.'),
('k2-mtk-05', 'Ada 25 burung. 12 terbang. Sisa burung?', '{"a":"12", "b":"13", "c":"14"}', 'b', 2, '25 - 12 = 13 burung.'),
('k2-mtk-05', '42 - 18 = ? (Gunakan pinjam puluhan)', '{"a":"24", "b":"34", "c":"26"}', 'a', 3, 'Pinjam 1 puluhan jadi 12-8=4. Puluhan sisa 3-1=2. Jadi 24.');

-- Soal untuk k2-mtk-06 (Soal Cerita)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-06', 'Ibu punya 20 kue, dimakan adik 5. Apakah ini ditambah atau dikurang?', '{"a":"Ditambah", "b":"Dikurang", "c":"Sama saja"}', 'b', 1, 'Karena dimakan (hilang/berkurang), maka dikurang.'),
('k2-mtk-06', 'Budi punya 10 pensil, Ayah membelikan 5 pensil lagi. Berapa total pensil Budi?', '{"a":"5", "b":"15", "c":"20"}', 'b', 1, '10 ditambah 5 = 15.'),
('k2-mtk-06', 'Di toko ada 35 permen. Terjual 12 permen. Sisa permen sekarang?', '{"a":"47", "b":"23", "c":"25"}', 'b', 2, 'Terjual artinya berkurang. 35 - 12 = 23.'),
('k2-mtk-06', 'Anton punya 18 kelereng. Menang main kelereng 11 butir. Berapa kelerengnya sekarang?', '{"a":"29", "b":"7", "c":"28"}', 'a', 2, 'Menang artinya bertambah. 18 + 11 = 29.'),
('k2-mtk-06', 'Anton punya 45 kelereng. Hilang 12 kelereng. Lalu Ibu memberinya 8 kelereng. Berapa totalnya sekarang?', '{"a":"33", "b":"41", "c":"35"}', 'b', 3, 'Pertama 45 - 12 = 33. Lalu ditambah 8 = 41 kelereng.');
