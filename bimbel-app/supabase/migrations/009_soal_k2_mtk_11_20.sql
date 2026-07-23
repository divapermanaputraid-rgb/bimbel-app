-- bimbel-app/supabase/migrations/009_soal_k2_mtk_11_20.sql

INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
-- k2-mtk-11
('k2-mtk-11', 'Lanjutkan pola: 3, 6, 9, 12, __', '{"a":"13","b":"14","c":"15","d":"16"}', 'c', 1, 'Pola naik 3 setiap langkah. 12 + 3 = 15! 🎉'),
('k2-mtk-11', 'Lanjutkan pola: 10, 20, 30, __, 50', '{"a":"35","b":"40","c":"45","d":"60"}', 'b', 1, 'Naik 10 terus.'),
('k2-mtk-11', 'Pola 🍎🍏🍎🍏🍎__. Apa yang selanjutnya?', '{"a":"🍎","b":"🍏","c":"🍌","d":"🍉"}', 'b', 2, 'Setelah merah adalah hijau.'),
('k2-mtk-11', 'Lanjutkan: 5, 7, 9, 11, __', '{"a":"12","b":"13","c":"14","d":"15"}', 'b', 2, 'Lompat 2 langkah terus.'),
('k2-mtk-11', 'Pola turun: 20, 18, 16, 14, __', '{"a":"13","b":"12","c":"11","d":"10"}', 'b', 3, 'Turun 2 dari 14 adalah 12.'),

-- k2-mtk-12
('k2-mtk-12', 'Benda yang utuh jika dipotong jadi 2 sama besar disebut?', '{"a":"Sepertiga","b":"Seperempat","c":"Setengah","d":"Utuh"}', 'c', 1, 'Dipotong dua = setengah.'),
('k2-mtk-12', 'Bagaimana menulis angka setengah?', '{"a":"2/1","b":"1/2","c":"1/4","d":"1/3"}', 'b', 1, 'Setengah = 1 dari 2.'),
('k2-mtk-12', 'Cokelat dibelah dua tidak sama besar. Apakah itu setengah?', '{"a":"Bukan","b":"Iya","c":"Mungkin","d":"Setengah lebih"}', 'a', 2, 'Setengah harus sama besar.'),
('k2-mtk-12', 'Sebuah roti dibagi dua. Anton makan satu bagian. Berapa roti yang Anton makan?', '{"a":"Semua","b":"Seperempat","c":"Setengah","d":"Dua"}', 'c', 2, 'Satu dari dua potong = setengah.'),
('k2-mtk-12', 'Dua bagian setengah kalau digabung jadi?', '{"a":"Utuh (Satu)","b":"Seperempat","c":"Tiga","d":"Dua Setengah"}', 'a', 3, 'Setengah + Setengah = 1 Utuh.'),

-- k2-mtk-13
('k2-mtk-13', 'Budi punya 10 kelereng. Setengah dari 10 adalah?', '{"a":"5","b":"6","c":"4","d":"10"}', 'a', 1, '10 bagi 2 = 5.'),
('k2-mtk-13', 'Setengah dari 4 donat adalah?', '{"a":"1","b":"2","c":"3","d":"4"}', 'b', 1, '4 bagi 2 = 2.'),
('k2-mtk-13', 'Siti punya 12 bunga. Setengahnya warna merah. Berapa bunga warna merah?', '{"a":"5","b":"6","c":"7","d":"8"}', 'b', 2, '12 bagi 2 = 6.'),
('k2-mtk-13', 'Mana kumpulan benda yang kalau dibagi dua pas jadi 7?', '{"a":"14 benda","b":"12 benda","c":"16 benda","d":"10 benda"}', 'a', 2, 'Karena 7 + 7 = 14.'),
('k2-mtk-13', 'Anton punya 20 pensil. Setengahnya dibagikan. Sisa pensil Anton?', '{"a":"20","b":"15","c":"10","d":"5"}', 'c', 3, 'Setengah dari 20 = 10, jadi sisanya 10.'),

-- k2-mtk-14
('k2-mtk-14', 'Kue dipotong jadi 4 bagian sama besar. Satu bagian disebut?', '{"a":"Setengah","b":"Seperempat","c":"Sepertiga","d":"Satuan"}', 'b', 1, '1 dari 4 = Seperempat.'),
('k2-mtk-14', 'Cara menulis seperempat adalah?', '{"a":"1/2","b":"1/3","c":"1/4","d":"4/1"}', 'c', 1, '1 per 4.'),
('k2-mtk-14', 'Mana yang lebih besar, Setengah atau Seperempat?', '{"a":"Seperempat","b":"Sama Besar","c":"Setengah","d":"Tidak Tahu"}', 'c', 2, 'Kue dipotong dua potongannya lebih besar daripada dipotong empat.'),
('k2-mtk-14', 'Sebuah roti dibagi 4 untuk Anton, Budi, Rina, Siti. Budi dapat berapa bagian?', '{"a":"Setengah","b":"Seperempat","c":"Satu Roti","d":"Tiga per empat"}', 'b', 2, 'Satu orang dapat 1 dari 4 potongan.'),
('k2-mtk-14', 'Berapa potong seperempat yang dibutuhkan agar jadi kue utuh?', '{"a":"2","b":"3","c":"4","d":"5"}', 'c', 3, 'Butuh 4 potong 1/4 agar kembali utuh.'),

-- k2-mtk-15
('k2-mtk-15', 'Gajah dan Kucing. Mana yang lebih berat?', '{"a":"Kucing","b":"Gajah","c":"Sama","d":"Tidak tahu"}', 'b', 1, 'Gajah sangat besar dan berat.'),
('k2-mtk-15', '1 kilogram sama dengan berapa ons?', '{"a":"10 ons","b":"1 ons","c":"100 ons","d":"5 ons"}', 'a', 1, '1 kg = 10 ons.'),
('k2-mtk-15', 'Ibu beli gula 2 kg. Berarti ibu beli berapa ons?', '{"a":"2 ons","b":"12 ons","c":"20 ons","d":"200 ons"}', 'c', 2, '2 kg x 10 = 20 ons.'),
('k2-mtk-15', 'Buku 5 ons ... Pensil 1 ons', '{"a":"> (lebih berat)","b":"< (lebih ringan)","c":"=","d":"+"}', 'a', 2, '5 ons > 1 ons.'),
('k2-mtk-15', 'Kapas 1 kg dengan Besi 1 kg. Mana yang lebih berat?', '{"a":"Besi","b":"Kapas","c":"Sama berat","d":"Tidak tahu"}', 'c', 3, 'Kalau sama-sama 1 kg, berarti sama berat!'),

-- k2-mtk-16
('k2-mtk-16', 'Jarum pendek jam ada di angka 8, panjang di 12. Jam berapakah ini?', '{"a":"Jam 12","b":"Jam 8","c":"Jam 6","d":"Jam 10"}', 'b', 1, 'Jarum pendek menunjukkan jam.'),
('k2-mtk-16', 'Budi main dari jam 3 sore sampai jam 5 sore. Berapa lama ia main?', '{"a":"1 jam","b":"2 jam","c":"3 jam","d":"4 jam"}', 'b', 1, '5 dikurang 3 = 2 jam.'),
('k2-mtk-16', '1 Jam sama dengan berapa menit?', '{"a":"30 menit","b":"60 menit","c":"100 menit","d":"10 menit"}', 'b', 2, 'Satu putaran penuh = 60 menit.'),
('k2-mtk-16', 'Mulai belajar jam 7. Lama belajar 2 jam. Selesai jam berapa?', '{"a":"8","b":"9","c":"10","d":"11"}', 'b', 2, '7 + 2 = 9.'),
('k2-mtk-16', 'Tidur siang setengah jam. Setengah jam itu berapa menit?', '{"a":"30 menit","b":"60 menit","c":"15 menit","d":"45 menit"}', 'a', 3, 'Setengah dari 60 menit adalah 30 menit.'),

-- k2-mtk-17
('k2-mtk-17', 'Setelah 75 adalah...', '{"a":"76","b":"74","c":"77","d":"85"}', 'a', 1, 'Hitung naik 1 angka.'),
('k2-mtk-17', 'Cara baca angka 92?', '{"a":"Sembilan dua","b":"Sembilan puluh dua","c":"Sembilan ratus dua","d":"Dua puluh sembilan"}', 'b', 1, '90 = sembilan puluh.'),
('k2-mtk-17', 'Angka yang punya nilai 6 puluhan dan 4 satuan adalah?', '{"a":"46","b":"64","c":"60","d":"40"}', 'b', 2, 'Gabungkan 6 dan 4.'),
('k2-mtk-17', 'Angka sebelum 100 adalah?', '{"a":"90","b":"98","c":"99","d":"101"}', 'c', 2, 'Mundur satu langkah dari 100.'),
('k2-mtk-17', 'Mana nilai yang memiliki angka 8 di posisi puluhan?', '{"a":"18","b":"83","c":"28","d":"10"}', 'b', 3, '8 di depan = 8 puluhan.'),

-- k2-mtk-18
('k2-mtk-18', 'Mana yang lebih besar: 80 atau 90?', '{"a":"80","b":"90","c":"Sama","d":"Tidak tahu"}', 'b', 1, '9 puluhan lebih besar dari 8.'),
('k2-mtk-18', 'Tanda yang benar: 65 ... 56', '{"a":">","b":"<","c":"=","d":"-"}', 'a', 1, '6 puluhan > 5 puluhan.'),
('k2-mtk-18', 'Urutkan dari yang terkecil: 67, 54, 89.', '{"a":"89, 67, 54","b":"54, 89, 67","c":"54, 67, 89","d":"67, 54, 89"}', 'c', 2, 'Mulai dari puluhan 5, lalu 6, lalu 8.'),
('k2-mtk-18', 'Siti punya 72 perangko, Rina punya 81 perangko. Siapa yang paling banyak?', '{"a":"Siti","b":"Rina","c":"Anton","d":"Sama saja"}', 'b', 2, '81 lebih besar dari 72.'),
('k2-mtk-18', 'Bilangan genap terbesar di bawah 100 adalah?', '{"a":"99","b":"98","c":"90","d":"100"}', 'b', 3, 'Di bawah 100 ada 99 (ganjil) dan 98 (genap).'),

-- k2-mtk-19
('k2-mtk-19', 'Di diagram, tiang buah apel naik sampai angka 8. Berapa apelnya?', '{"a":"5","b":"7","c":"8","d":"9"}', 'c', 1, 'Angka yang ditunjuk tiang adalah jumlahnya.'),
('k2-mtk-19', 'Apa itu diagram batang?', '{"a":"Gambar batang pohon","b":"Cara menyajikan data dengan kotak/tiang","c":"Menulis angka saja","d":"Cerita bergambar"}', 'b', 1, 'Menyajikan data dengan tiang lurus.'),
('k2-mtk-19', 'Kalau tiang mangga lebih tinggi dari jeruk, berarti?', '{"a":"Mangga lebih sedikit","b":"Mangga lebih banyak","c":"Sama banyak","d":"Jeruk lebih besar"}', 'b', 2, 'Lebih tinggi = lebih banyak.'),
('k2-mtk-19', 'Tinggi tiang merah 5, biru 3. Total keduanya?', '{"a":"8","b":"2","c":"5","d":"3"}', 'a', 2, '5 + 3 = 8.'),
('k2-mtk-19', 'Jika setiap tiang naik dengan kelipatan 2 (0, 2, 4, 6). Tiang B menunjuk pertengahan 4 dan 6. Berapa nilainya?', '{"a":"4","b":"5","c":"6","d":"7"}', 'b', 3, 'Di tengah 4 dan 6 adalah 5.'),

-- k2-mtk-20
('k2-mtk-20', 'Di piktogram (diagram gambar), kalau ada 4 gambar mobil 🚗🚗🚗🚗, artinya ada?', '{"a":"3 mobil","b":"4 mobil","c":"5 mobil","d":"Banyak mobil"}', 'b', 1, 'Setiap gambar = 1 benda.'),
('k2-mtk-20', 'Apa beda piktogram dengan diagram batang?', '{"a":"Sama saja","b":"Piktogram pakai gambar/icon","c":"Diagram batang pakai lingkaran","d":"Piktogram hanya angka"}', 'b', 1, 'Pikto = gambar.'),
('k2-mtk-20', 'Senin ada 3 buku 📚📚📚, Selasa 2 buku 📚📚. Hari apa yang paling sedikit?', '{"a":"Senin","b":"Selasa","c":"Rabu","d":"Kamis"}', 'b', 2, 'Selasa hanya 2.'),
('k2-mtk-20', 'Jika 1 gambar 🏀 mewakili 2 bola. Ada 3 gambar 🏀🏀🏀. Berapa jumlah bola?', '{"a":"3 bola","b":"5 bola","c":"6 bola","d":"8 bola"}', 'c', 3, '3 x 2 = 6.'),
('k2-mtk-20', 'Tabel menunjukkan Apel 5, Jeruk 3. Manakah piktogram yang benar?', '{"a":"Apel 🍎🍎🍎🍎🍎, Jeruk 🍊🍊🍊","b":"Apel 🍎🍎🍎, Jeruk 🍊🍊🍊🍊🍊","c":"Apel 🍎🍎, Jeruk 🍊🍊","d":"Apel 🍎, Jeruk 🍊"}', 'a', 3, 'Sesuai dengan jumlahnya masing-masing.')
ON CONFLICT DO NOTHING;
