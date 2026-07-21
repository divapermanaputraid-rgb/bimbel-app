-- 004b_evaluasi_k2_mtk.sql
-- Shift urutan materi yang sudah ada untuk memberi ruang bagi evaluasi
-- k2-mtk-04, 05, 06 -> geser +1 (menjadi 5, 6, 7)
UPDATE public.materials SET urutan = urutan + 1 WHERE subject_id = 'k2-mtk' AND urutan > 3;

-- Jika kelak ada bab 3 yang urutannya 8 ke atas, geser lagi
-- (Saat ini mentok di 7, jadi kita aman menaruh evaluasi bab 2 di urutan 8)

-- Insert Evaluasi Bab 1 & 2
INSERT INTO public.materials (
  id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan
) VALUES
(
  'k2-mtk-03-eval', 2, 'k2-mtk', 'Evaluasi Bab 1: Bilangan',
  'Uji kemampuanmu tentang bilangan, nilai tempat, dan perbandingan.',
  '/buku/kelas2/matematika/k2-mtk-03-eval.html', 8, 4
),
(
  'k2-mtk-06-eval', 2, 'k2-mtk', 'Evaluasi Bab 2: Penjumlahan & Pengurangan',
  'Uji kemampuanmu dalam operasi hitung dan soal cerita matematika.',
  '/buku/kelas2/matematika/k2-mtk-06-eval.html', 8, 8
);

-- Bank Soal Evaluasi Bab 1
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-03-eval', 'Bentuk panjang dari 37 adalah...', '{"a":"3 + 7", "b":"30 + 7", "c":"70 + 3"}', 'b', 1, '3 puluhan dan 7 satuan.'),
('k2-mtk-03-eval', 'Angka 5 pada bilangan 45 menempati nilai...', '{"a":"Puluhan", "b":"Ratusan", "c":"Satuan"}', 'c', 1, 'Angka paling belakang adalah satuan.'),
('k2-mtk-03-eval', 'Urutkan bilangan berikut dari yang terkecil: 21, 14, 35', '{"a":"14, 21, 35", "b":"35, 21, 14", "c":"21, 14, 35"}', 'a', 2, 'Paling kecil 14, lalu 21, paling besar 35.'),
('k2-mtk-03-eval', 'Tanda yang tepat untuk 42 ... 28 adalah', '{"a":"<", "b":">", "c":"="}', 'b', 2, '42 lebih besar dari 28.'),
('k2-mtk-03-eval', 'Sebuah bilangan lebih besar dari 30 dan lebih kecil dari 35. Bilangan itu genap. Angka berapakah itu?', '{"a":"31 atau 33", "b":"32 atau 34", "c":"36"}', 'b', 3, 'Angka genap antara 30 dan 35 adalah 32 dan 34.');

-- Bank Soal Evaluasi Bab 2
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
('k2-mtk-06-eval', '15 + 12 = ?', '{"a":"27", "b":"37", "c":"17"}', 'a', 1, '5+2=7, 1+1=2. Hasil 27.'),
('k2-mtk-06-eval', '28 - 13 = ?', '{"a":"15", "b":"25", "c":"12"}', 'a', 1, '8-3=5, 2-1=1. Hasil 15.'),
('k2-mtk-06-eval', '24 + 18 = ?', '{"a":"32", "b":"42", "c":"44"}', 'b', 2, '4+8=12 (simpan 1). 1+2+1=4. Hasil 42.'),
('k2-mtk-06-eval', '35 - 17 = ?', '{"a":"18", "b":"28", "c":"22"}', 'a', 2, '15-7=8, sisa 2-1=1. Hasil 18.'),
('k2-mtk-06-eval', 'Budi punya 30 kelereng. Hilang 12. Ayah memberinya lagi 15. Berapa kelereng Budi sekarang?', '{"a":"33", "b":"43", "c":"27"}', 'a', 3, '30 - 12 = 18. 18 + 15 = 33.');
