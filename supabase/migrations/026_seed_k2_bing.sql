-- Migration 026: Seed subject, materials, and questions for K2 B.Inggris
-- 1 subject (bing, kelas 2) + 10 materials × 3 questions = 30 questions

-- Subject B.Inggris Kelas 2
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k2-bing', 'bing', 'Bahasa Inggris', '🇬🇧', 2, 2)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (10 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k2-bing-01', 2, 'k2-bing', 'Hello, How Are You?', 'Unit 1 — Greetings', '/buku/kelas2/bahasa-inggris/k2-bing-01.html', 1),
  ('k2-bing-02', 2, 'k2-bing', 'Numbers and Colors', 'Unit 2 — Numbers & Colors', '/buku/kelas2/bahasa-inggris/k2-bing-02.html', 2),
  ('k2-bing-03', 2, 'k2-bing', 'My Family', 'Unit 3 — Family', '/buku/kelas2/bahasa-inggris/k2-bing-03.html', 3),
  ('k2-bing-04', 2, 'k2-bing', 'My Classroom', 'Unit 4 — Classroom Objects', '/buku/kelas2/bahasa-inggris/k2-bing-04.html', 4),
  ('k2-bing-05', 2, 'k2-bing', 'Stand Up, Please!', 'Unit 5 — Commands', '/buku/kelas2/bahasa-inggris/k2-bing-05.html', 5),
  ('k2-bing-06', 2, 'k2-bing', 'Head, Shoulders, Knees', 'Unit 6 — Body Parts', '/buku/kelas2/bahasa-inggris/k2-bing-06.html', 6),
  ('k2-bing-07', 2, 'k2-bing', 'My Daily Activities', 'Unit 7 — Daily Routines', '/buku/kelas2/bahasa-inggris/k2-bing-07.html', 7),
  ('k2-bing-08', 2, 'k2-bing', 'Do You Like Apples?', 'Unit 8 — Fruits & Food', '/buku/kelas2/bahasa-inggris/k2-bing-08.html', 8),
  ('k2-bing-09', 2, 'k2-bing', 'Animals Around Me', 'Unit 9 — Animals', '/buku/kelas2/bahasa-inggris/k2-bing-09.html', 9),
  ('k2-bing-10', 2, 'k2-bing', 'My House', 'Unit 10 — Rooms in a House', '/buku/kelas2/bahasa-inggris/k2-bing-10.html', 10)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (3 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k2-bing-01: Hello, How Are You?
('k2-bing-01', '"Goodbye" artinya... 👋', '["Halo", "Selamat tinggal", "Terima kasih"]', 'Selamat tinggal', 1, 'Goodbye = selamat tinggal. ✅'),
('k2-bing-01', 'How do you say "Terima kasih" in English?', '["Please", "Sorry", "Thank you"]', 'Thank you', 1, 'Thank you = terima kasih. ✅'),
('k2-bing-01', 'Answer: "How are you?" → "I am ___"', '["Fine", "Five", "Book"]', 'Fine', 1, '"I am fine" = Aku baik. ✅'),

-- k2-bing-02: Numbers and Colors
('k2-bing-02', '🍋 Lemon is ___ in color.', '["Red", "Yellow", "Blue"]', 'Yellow', 1, 'Lemon is yellow. ✅'),
('k2-bing-02', 'After 7 comes... (setelah 7)...', '["Six", "Eight", "Nine"]', 'Eight', 1, 'After 7 is 8 (eight). ✅'),
('k2-bing-02', '🌿 Grass is ___ in color.', '["Green", "Blue", "Red"]', 'Green', 1, 'Grass is green. ✅'),

-- k2-bing-03: My Family
('k2-bing-03', '"Brother" in Indonesian is...', '["Kakak/adik laki-laki", "Kakak/adik perempuan", "Ayah"]', 'Kakak/adik laki-laki', 1, 'Brother = saudara laki-laki. ✅'),
('k2-bing-03', '"Grandmother" in Indonesian is...', '["Kakek", "Nenek", "Ibu"]', 'Nenek', 1, 'Grandmother = nenek. ✅'),
('k2-bing-03', 'This is ___ father. (Ini ayahku)', '["my", "your", "his"]', 'my', 1, 'My father = ayahku. ✅'),

-- k2-bing-04: My Classroom
('k2-bing-04', '"Ruler" in Indonesian is...', '["Pulpen", "Penggaris", "Krayon"]', 'Penggaris', 1, 'Ruler = penggaris. ✅'),
('k2-bing-04', '"Bag" artinya...', '["Buku", "Tas", "Pensil"]', 'Tas', 1, 'Bag = tas. ✅'),
('k2-bing-04', 'This is ___ eraser.', '["a", "an", "the"]', 'an', 1, '"an" before vowel sound (eraser). ✅'),

-- k2-bing-05: Stand Up, Please!
('k2-bing-05', '"Open the door" artinya...', '["Tutup pintu", "Buka pintu", "Buka buku"]', 'Buka pintu', 1, 'Open the door = buka pintu. ✅'),
('k2-bing-05', '"Be quiet" artinya...', '["Berdiri", "Diam", "Buka"]', 'Diam', 1, 'Be quiet = diam. ✅'),
('k2-bing-05', 'The teacher says "___ your book."', '["Close", "Open", "Sit"]', 'Open', 1, 'Open your book = buka bukumu. ✅'),

-- k2-bing-06: Head, Shoulders, Knees
('k2-bing-06', '"Nose" in Indonesian is...', '["Telinga", "Hidung", "Mulut"]', 'Hidung', 1, 'Nose = hidung. ✅'),
('k2-bing-06', 'I can see with my ___', '["Ears", "Eyes", "Mouth"]', 'Eyes', 1, 'I see with my eyes. ✅'),
('k2-bing-06', 'I can hear with my ___', '["Ears", "Eyes", "Nose"]', 'Ears', 1, 'I hear with my ears. ✅'),

-- k2-bing-07: My Daily Activities
('k2-bing-07', '"I brush my teeth" artinya...', '["Aku gosok gigi", "Aku mandi", "Aku makan"]', 'Aku gosok gigi', 1, 'Brush my teeth = gosok gigi. ✅'),
('k2-bing-07', '"I go to school" artinya...', '["Aku pergi ke sekolah", "Aku pulang", "Aku tidur"]', 'Aku pergi ke sekolah', 1, 'Go to school = pergi ke sekolah. ✅'),
('k2-bing-07', 'I ___ up at 6 o''clock.', '["wake", "get", "go"]', 'wake', 1, 'Wake up = bangun tidur. ✅'),

-- k2-bing-08: Do You Like Apples?
('k2-bing-08', '🍎 "Apple" in Indonesian is...', '["Pisang", "Apel", "Jeruk"]', 'Apel', 1, 'Apple = apel. ✅'),
('k2-bing-08', '"Do you like milk?" — "No, ___ don''t."', '["I", "you", "she"]', 'I', 1, '"No, I don''t." ✅'),
('k2-bing-08', '🍉 "Watermelon" = ___', '["Anggur", "Semangka", "Pisang"]', 'Semangka', 1, 'Watermelon = semangka. ✅'),

-- k2-bing-09: Animals Around Me
('k2-bing-09', '"Elephant" in Indonesian is...', '["Singa", "Gajah", "Harimau"]', 'Gajah', 1, 'Elephant = gajah. ✅'),
('k2-bing-09', '🐮 "Cow" gives us ___', '["Milk", "Eggs", "Honey"]', 'Milk', 1, 'Cow gives milk. ✅'),
('k2-bing-09', '🐱 "I see a ___"', '["Dog", "Cat", "Bird"]', 'Cat', 1, 'Cat = kucing. ✅'),

-- k2-bing-10: My House
('k2-bing-10', '"Bedroom" in Indonesian is...', '["Kamar mandi", "Kamar tidur", "Dapur"]', 'Kamar tidur', 1, 'Bedroom = kamar tidur. ✅'),
('k2-bing-10', '"Bathroom" artinya...', '["Kamar mandi", "Kamar tidur", "Ruang tamu"]', 'Kamar mandi', 1, 'Bathroom = kamar mandi. ✅'),
('k2-bing-10', '"The book is on the desk." Buku ___ meja.', '["di bawah", "di atas", "di dalam"]', 'di atas', 1, '"On" = di atas. ✅');
