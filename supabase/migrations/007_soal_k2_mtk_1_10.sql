-- bimbel-app/supabase/migrations/007_soal_k2_mtk_1_10.sql
-- Seed data 5 soal (level 1-3) untuk k2-mtk-01 sampai k2-mtk-10

INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
-- k2-mtk-01
('k2-mtk-01', 'Lambang bilangan dari "Tiga puluh empat" adalah?', '{"a":"34","b":"43","c":"40","d":"30"}', 'a', 1, '34 dibaca Tiga puluh empat.'),
('k2-mtk-01', 'Sesudah angka 41 adalah?', '{"a":"40","b":"42","c":"43","d":"39"}', 'b', 1, 'Setelah 41 adalah 42.'),
('k2-mtk-01', 'Angka sebelum 20 adalah?', '{"a":"18","b":"19","c":"21","d":"22"}', 'b', 2, 'Sebelum 20 adalah 19.'),
('k2-mtk-01', 'Urutan dari terkecil: 15, 23, 12, 30.', '{"a":"12, 15, 23, 30","b":"30, 23, 15, 12","c":"12, 23, 15, 30","d":"15, 12, 23, 30"}', 'a', 2, 'Cari yang paling kecil dulu yaitu 12.'),
('k2-mtk-01', 'Ada bilangan lebih dari 35 dan kurang dari 37. Bilangan apa itu?', '{"a":"34","b":"36","c":"38","d":"39"}', 'b', 3, 'Di antara 35 dan 37 adalah 36.'),

-- k2-mtk-02
('k2-mtk-02', 'Angka 45 terdiri dari...', '{"a":"4 puluhan 5 satuan","b":"5 puluhan 4 satuan","c":"4 puluhan 0 satuan","d":"0 puluhan 45 satuan"}', 'a', 1, 'Angka depan adalah puluhan.'),
('k2-mtk-02', '3 puluhan + 8 satuan = ...', '{"a":"83","b":"38","c":"30","d":"11"}', 'b', 1, '3 puluhan dan 8 satuan digabung jadi 38.'),
('k2-mtk-02', 'Nilai angka 2 pada bilangan 27 adalah...', '{"a":"2","b":"20","c":"7","d":"27"}', 'b', 2, '2 menempati puluhan, jadi nilainya 20.'),
('k2-mtk-02', 'Mana yang puluhan-nya paling besar?', '{"a":"19","b":"28","c":"35","d":"21"}', 'c', 2, '35 punya puluhan 3 (paling besar).'),
('k2-mtk-02', 'Budi punya 4 kotak pensil (isi 10) dan 6 pensil lepas. Berapa pensil Budi?', '{"a":"64","b":"46","c":"10","d":"40"}', 'b', 3, '4 puluhan + 6 satuan = 46.'),

-- k2-mtk-03
('k2-mtk-03', 'Tanda yang tepat: 20 ... 15', '{"a":">","b":"<","c":"=","d":"+"}', 'a', 1, '20 lebih besar dari 15.'),
('k2-mtk-03', 'Tanda yang tepat: 12 ... 32', '{"a":">","b":"<","c":"=","d":"-"}', 'b', 1, '12 lebih kecil dari 32.'),
('k2-mtk-03', '25, 26, 27. Angka yang paling besar adalah?', '{"a":"25","b":"26","c":"27","d":"Semua sama"}', 'c', 2, '27 adalah yang paling besar.'),
('k2-mtk-03', 'Anton punya 20 apel, Siti punya 25 apel. Siapa yang punya lebih sedikit?', '{"a":"Anton","b":"Siti","c":"Sama saja","d":"Tidak tahu"}', 'a', 2, '20 < 25, jadi Anton lebih sedikit.'),
('k2-mtk-03', 'Bilangan genap antara 15 dan 19 yang lebih kecil dari 18 adalah?', '{"a":"16","b":"17","c":"18","d":"20"}', 'a', 3, 'Di antara 15 & 19 genapnya 16 dan 18. Yang lebih kecil dari 18 adalah 16.'),

-- k2-mtk-04/
('k2-mtk-04', '14 + 4 = ...', '{"a":"17","b":"18","c":"19","d":"20"}', 'b', 1, 'Habis 14 hitung 4 lagi: 15, 16, 17, 18.'),
('k2-mtk-04', '20 + 10 = ...', '{"a":"20","b":"30","c":"40","d":"50"}', 'b', 1, 'Dua puluhan + satu puluhan = tiga puluhan (30).'),
('k2-mtk-04', '15 + 7 = ...', '{"a":"21","b":"22","c":"23","d":"24"}', 'b', 2, 'Menyimpan 1 puluhan.'),
('k2-mtk-04', 'Rina punya 12 bunga, dipetik lagi 9 bunga. Totalnya?', '{"a":"20","b":"21","c":"19","d":"22"}', 'b', 2, '12 + 9 = 21.'),
('k2-mtk-04', '... + 5 = 20. Titik-titik isinya?', '{"a":"10","b":"15","c":"25","d":"14"}', 'b', 3, '15 + 5 baru menjadi 20.'),

-- k2-mtk-05
('k2-mtk-05', '18 - 5 = ...', '{"a":"13","b":"12","c":"14","d":"10"}', 'a', 1, 'Hitung mundur 5 dari 18, jadi 13.'),
('k2-mtk-05', '30 - 10 = ...', '{"a":"10","b":"20","c":"30","d":"40"}', 'b', 1, 'Tiga puluhan dikurang satu puluhan = 20.'),
('k2-mtk-05', '24 - 7 = ...', '{"a":"16","b":"17","c":"18","d":"19"}', 'b', 2, 'Mengurang dengan pinjam.'),
('k2-mtk-05', 'Budi bawa 25 kue, dimakan teman 6 kue. Sisa?', '{"a":"18","b":"19","c":"20","d":"21"}', 'b', 2, '25 - 6 = 19.'),
('k2-mtk-05', '30 - ... = 22. Titik-titik isinya?', '{"a":"6","b":"7","c":"8","d":"9"}', 'c', 3, '22 ditambah 8 jadi 30.'),

-- k2-mtk-06
('k2-mtk-06', 'Ibu beli 15 telur, lalu beli lagi 5. Total telur Ibu?', '{"a":"10","b":"20","c":"25","d":"15"}', 'b', 1, '15 + 5 = 20.'),
('k2-mtk-06', 'Ada 20 burung di pohon, terbang 4. Sisa burung?', '{"a":"24","b":"15","c":"16","d":"14"}', 'c', 1, '20 - 4 = 16.'),
('k2-mtk-06', 'Anton punya 12 mobil mainan, kakaknya memberi 8 mobil. Totalnya?', '{"a":"18","b":"19","c":"20","d":"22"}', 'c', 2, '12 + 8 = 20.'),
('k2-mtk-06', 'Siti punya kue 30, lalu ia bagikan 12 ke tetangga. Sisa kuenya?', '{"a":"18","b":"28","c":"42","d":"16"}', 'a', 2, '30 - 12 = 18.'),
('k2-mtk-06', 'Di bus ada 15 orang. Naik 5 orang, lalu turun 3 orang. Berapa orang sekarang?', '{"a":"15","b":"17","c":"23","d":"13"}', 'b', 3, '15 + 5 = 20. Lalu 20 - 3 = 17.'),

-- k2-mtk-07
('k2-mtk-07', 'Bentuk papan tulis biasanya?', '{"a":"Lingkaran","b":"Segitiga","c":"Persegi Panjang","d":"Persegi"}', 'c', 1, 'Papan tulis panjang di satu sisinya.'),
('k2-mtk-07', 'Uang koin berbentuk?', '{"a":"Lingkaran","b":"Persegi","c":"Segitiga","d":"Oval"}', 'a', 1, 'Koin itu bundar alias lingkaran.'),
('k2-mtk-07', 'Segitiga punya berapa sisi?', '{"a":"1","b":"2","c":"3","d":"4"}', 'c', 2, 'Sesuai namanya, segi TIGA.'),
('k2-mtk-07', 'Persegi punya sisi yang...', '{"a":"Beda panjang","b":"Sama panjang semua","c":"Tidak punya sisi","d":"Lengkung"}', 'b', 2, 'Keempat sisinya sama panjang.'),
('k2-mtk-07', 'Aku punya 4 sisi, tapi 2 panjang dan 2 pendek. Aku adalah?', '{"a":"Persegi","b":"Segitiga","c":"Persegi panjang","d":"Lingkaran"}', 'c', 3, 'Ciri-ciri persegi panjang.'),

-- k2-mtk-08
('k2-mtk-08', 'Dua buah persegi panjang sama besar digabung jadi apa?', '{"a":"Persegi","b":"Lingkaran","c":"Segitiga","d":"Oval"}', 'a', 1, 'Bisa menjadi sebuah persegi besar.'),
('k2-mtk-08', 'Kertas persegi dipotong dari ujung ke ujung miring, jadi 2...', '{"a":"Lingkaran","b":"Persegi","c":"Segitiga","d":"Tabung"}', 'c', 1, 'Potongan miring membagi jadi 2 segitiga.'),
('k2-mtk-08', 'Kalau 2 segitiga siku-siku disatukan, akan menjadi?', '{"a":"Lingkaran","b":"Persegi/Persegi Panjang","c":"Segi lima","d":"Bola"}', 'b', 2, 'Menjadi bangun segi empat.'),
('k2-mtk-08', 'Pola ubin di lantai bentuknya?', '{"a":"Segitiga","b":"Persegi","c":"Lingkaran","d":"Bintang"}', 'b', 2, 'Ubin biasanya berbentuk persegi panjang / persegi.'),
('k2-mtk-08', 'Berapa segitiga kecil yang butuh digabung buat 1 persegi?', '{"a":"1","b":"2","c":"3","d":"5"}', 'b', 3, '2 segitiga cukup untuk membuat 1 persegi.'),

-- k2-mtk-09
('k2-mtk-09', 'Bola basket berbentuk bangun ruang apa?', '{"a":"Bola","b":"Kubus","c":"Tabung","d":"Balok"}', 'a', 1, 'Bentuknya jelas, bola.'),
('k2-mtk-09', 'Kotak susu cair berbentuk?', '{"a":"Bola","b":"Kerucut","c":"Balok","d":"Tabung"}', 'c', 1, 'Kotak susu memanjang seperti balok.'),
('k2-mtk-09', 'Bangun yang bisa menggelinding dengan mudah?', '{"a":"Kubus","b":"Bola","c":"Balok","d":"Segitiga"}', 'b', 2, 'Bola tidak punya sudut jadi mudah menggelinding.'),
('k2-mtk-09', 'Dadu permainan ular tangga bentuknya?', '{"a":"Kubus","b":"Balok","c":"Tabung","d":"Bola"}', 'a', 2, 'Semua sisinya kotak sama persis = kubus.'),
('k2-mtk-09', 'Gelas minum berbentuk seperti bangun...', '{"a":"Tabung","b":"Bola","c":"Balok","d":"Kerucut"}', 'a', 3, 'Punya alas lingkaran = tabung.'),

-- k2-mtk-10
('k2-mtk-10', 'Buku ada di ... meja.', '{"a":"Dalam","b":"Atas","c":"Terbang","d":"Jauh"}', 'b', 1, 'Biasanya buku ditaruh di atas meja.'),
('k2-mtk-10', 'Kucing sembunyi di ... tempat tidur.', '{"a":"Atas","b":"Bawah","c":"Luar","d":"Jauh"}', 'b', 1, 'Sembunyi di kolong/bawah tempat tidur.'),
('k2-mtk-10', 'Kalau kita menghadap Utara, belakang kita arah?', '{"a":"Barat","b":"Timur","c":"Selatan","d":"Utara"}', 'c', 2, 'Kebalikan utara adalah selatan.'),
('k2-mtk-10', 'Rumah sakit ada di sebelah ... kantor polisi (lihat peta panah ke kiri)', '{"a":"Kanan","b":"Kiri","c":"Atas","d":"Bawah"}', 'b', 2, 'Kiri arah panah.'),
('k2-mtk-10', 'Budi berdiri, tangan memegang pensil. Tangan manakah itu?', '{"a":"Kanan","b":"Kiri","c":"Dua-duanya","d":"Kaki"}', 'a', 3, 'Umumnya menulis pakai tangan kanan.')

;
