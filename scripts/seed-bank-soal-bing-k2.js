const fs = require('fs');
const path = require('path');

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas2/bahasa-inggris');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k2-bing-01': '#FFFDE7', 'k2-bing-02': '#FCE4EC', 'k2-bing-03': '#E3F2FD',
  'k2-bing-04': '#E8F5E9', 'k2-bing-05': '#F3E5F5', 'k2-bing-06': '#FFF3E0',
  'k2-bing-07': '#FFFDE7', 'k2-bing-08': '#FCE4EC', 'k2-bing-09': '#E3F2FD',
  'k2-bing-10': '#E8F5E9',
};

function esc(t) {
  return t.replace(/'/g, "\\'");
}

function renderBook(data) {
  const bg = bgColors[data.id];
  const jawaban = [
    data.bagian1.quiz.jawabanIdx,
    data.bagian2.quiz.jawabanIdx,
    data.latihan[0].jawabanIdx,
    data.latihan[1].jawabanIdx,
    data.latihan[2].jawabanIdx,
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — Grade 2 English</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas2 { font-size:18px; line-height:1.8; }
    .kelas2 .section-header { font-size:20px; }
    .kelas2 .section-body { font-size:18px; }
    .kelas2 .quiz-box p { font-size:18px; }
    .kelas2 .feedback { font-size:18px; }
    .kelas2 h1 { font-size:26px; }
    .vocab-grid { display: flex; flex-wrap: wrap; gap: 12px; margin: 12px 0; }
    .vocab-card { background: white; border-radius: 12px; padding: 12px; text-align: center; flex: 1 0 45%; min-width: 120px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
    .vocab-card .emoji { font-size: 40px; margin-bottom: 4px; }
    .vocab-card .word { font-weight: bold; font-size: 18px; color: #1565c0; }
    .vocab-card .meaning { font-size: 14px; color: #888; }
    .vocab-card .audio-btn { background: #4CAF50; color: white; border: none; border-radius: 50%; width: 36px; height: 36px; font-size: 18px; cursor: pointer; margin-top: 4px; }
    .vocab-card .audio-btn:hover { background: #388E3C; }
    .dialogue-box { background: #fff8e1; padding: 16px; border-radius: 12px; margin: 12px 0; border-left: 4px solid #fbc02d; font-size: 18px; }
    .dialogue-box p { margin: 8px 0; }
    .dialogue-box .speaker { display: inline-block; margin-right: 8px; font-weight: bold; }
    .dialogue-box .audio-btn { background: #FF9800; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 14px; cursor: pointer; vertical-align: middle; }
    .song-box { background: #e0f7fa; padding: 16px; border-radius: 12px; margin: 12px 0; text-align: center; font-size: 20px; }
    .song-box .audio-btn { background: #00BCD4; color: white; border: none; border-radius: 50%; width: 44px; height: 44px; font-size: 22px; cursor: pointer; margin-top: 8px; }
  </style>
  <script>
    function speakK2(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.7;
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      }
    }
  </script>
</head>
<body class="kelas2" data-kelas="2" data-pelajaran="bing" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Main Page <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 26px;">${data.judul}</h1>
        <p style="color: #666; font-size: 18px;">Bahasa Inggris — Kelas 2</p>
        <p style="margin-top: 16px; font-size: 18px;">${data.deskripsi}</p>
k2-bing-01.html
k2-bing-02.html
k2-bing-03.html
k2-bing-04.html
k2-bing-05.html
k2-bing-06.html
k2-bing-07.html
k2-bing-08.html
k2-bing-09.html
k2-bing-10.html
8:  'k2-bing-01': '#FFFDE7', 'k2-bing-02': '#FCE4EC', 'k2-bing-03': '#E3F2FD',
9:  'k2-bing-04': '#E8F5E9', 'k2-bing-05': '#F3E5F5', 'k2-bing-06': '#FFF3E0',
10:  'k2-bing-07': '#FFFDE7', 'k2-bing-08': '#FCE4EC', 'k2-bing-09': '#E3F2FD',
11:  'k2-bing-10': '#E8F5E9',
33:  <title>${data.judul} — Grade 2 English</title>
78:        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 26px;">${data.judul}</h1>
98:      <div class="section-header">📖 Part 1: ${data.bagian1.judul} <span>▼</span></div>
127:      <div class="section-header">📖 Part 2: ${data.bagian2.judul} <span>▼</span></div>
181:        <p>Great job! Kamu sudah belajar <strong>${data.judul}</strong>! 🌟</p>
217:  // ===== k2-bing-01: Hello, How Are You? =====
219:    id: 'k2-bing-01',
220:    judul: 'Hello, How Are You?',
227:      judul: 'Greetings (Salam)',
242:      judul: 'More Greetings (Lagi Salam)',
262:  // ===== k2-bing-02: Numbers and Colors =====
264:    id: 'k2-bing-02',
265:    judul: 'Numbers and Colors',
272:      judul: 'Numbers 1-10 (Angka 1-10)',
293:      judul: 'Numbers 11-20 & Colors',
318:  // ===== k2-bing-03: My Family =====
320:    id: 'k2-bing-03',
321:    judul: 'My Family',
328:      judul: 'Family Members (Anggota Keluarga)',
343:      judul: 'More Family (Lagi Keluarga)',
363:  // ===== k2-bing-04: My Classroom =====
365:    id: 'k2-bing-04',
366:    judul: 'My Classroom',
373:      judul: 'Classroom Objects (Benda di Kelas)',
388:      judul: 'More Objects (Lagi Benda)',
408:  // ===== k2-bing-05: Stand Up, Please! =====
410:    id: 'k2-bing-05',
411:    judul: 'Stand Up, Please!',
418:      judul: 'Commands (Perintah)',
433:      judul: 'More Commands (Lagi Perintah)',
453:  // ===== k2-bing-06: Head, Shoulders, Knees =====
455:    id: 'k2-bing-06',
456:    judul: 'Head, Shoulders, Knees',
463:      judul: 'Body Parts (Anggota Tubuh)',
480:      judul: 'More Body Parts',
500:  // ===== k2-bing-07: My Daily Activities =====
      { id: "k3-bing-05-q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["is", "classroom", "My", "clean"], jawaban_benar: "My classroom is clean", penjelasan_id: "My classroom is clean = Kelasku bersih. ✨ Subject + is + adjective.", level: 1, xp: 15 },
      { id: "k3-bing-05-q5", tipe: "choose_correct", soal: "The schoolyard is ___. (luas)", soal_id: "Halaman sekolahnya ___ . (luas)", pilihan: ["wide", "narrow", "dirty"], jawaban_benar: "wide", penjelasan_id: "Wide = lebar/luas ↔ Narrow = sempit. The schoolyard is wide = Halaman sekolahnya luas. 🏫", level: 1, xp: 10 },
      { id: "k3-bing-05-q6", tipe: "true_false", soal: "'Beautiful' artinya indah.", soal_id: "'Beautiful' artinya indah.", pilihan: ["True", "False"], jawaban_benar: "True", penjelasan_id: "Betul! Beautiful = indah ✨. My school is beautiful = Sekolahku indah. 🌸", level: 1, xp: 10 },
      { id: "k3-bing-05-q7", tipe: "fill_blank", soal: "The restroom is ___. (kotor)", soal_id: "Toiletnya ___ . (kotor)", kalimat: "The restroom is ___.", pilihan: ["dirty", "clean", "beautiful"], jawaban_benar: "dirty", penjelasan_id: "Dirty = kotor. But we should keep it clean! 🧹 Let's make it clean! ✨", level: 2, xp: 10 },
      { id: "k3-bing-05-q8", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["is", "school", "My", "beautiful"], jawaban_benar: "My school is beautiful", penjelasan_id: "My school is beautiful = Sekolahku indah. 🌸✨", level: 2, xp: 15 }
    ]
  },
  // Unit 10: There Are Twenty Books on the Shelf
  {
    id: "k3-bing-10", questions: [
      { id: "k3-bing-05-q1", tipe: "match", soal: "Match the number with the word!", soal_id: "Cocokkan angka dengan kata!", data: {"25": ["twenty-five", "thirty-five", "forty-five"], "33": ["thirty-three", "twenty-three", "forty-three"], "47": ["forty-seven", "thirty-seven", "fifty-seven"]}, jawaban_benar: {"25": "twenty-five", "33": "thirty-three", "47": "forty-seven"}, penjelasan_id: "25 = twenty-five, 33 = thirty-three, 47 = forty-seven. 🔢", level: 1, xp: 10 },
      { id: "k3-bing-05-q2", tipe: "choose_correct", soal: "'Thirty' artinya...", soal_id: "'Thirty' artinya...", pilihan: ["30", "40", "50"], jawaban_benar: "30", penjelasan_id: "Thirty = 30, Forty = 40, Fifty = 50. 🔢", level: 1, xp: 10 },
      { id: "k3-bing-05-q3", tipe: "fill_blank", soal: "There ___ 20 books on the shelf.", soal_id: "Ada ___ 20 buku di rak.", kalimat: "There ___ 20 books on the shelf.", pilihan: ["are", "is", "am"], jawaban_benar: "are", penjelasan_id: "'There ARE' untuk banyak (books = jamak). 'There IS' untuk satu. 📚📚📚", level: 1, xp: 10 },
      { id: "k3-bing-05-q4", tipe: "arrange", soal: "Arrange into a sentence!", soal_id: "Susun menjadi kalimat!", kata: ["are", "There", "chairs", "thirty", "the", "in", "classroom"], jawaban_benar: "There are thirty chairs in the classroom", penjelasan_id: "There are thirty chairs in the classroom = Ada 30 kursi di kelas. 🪑", level: 1, xp: 15 },
      { id: "k3-bing-05-q5", tipe: "choose_correct", soal: "There is ___ pencil on the table.", soal_id: "Ada ___ pensil di meja.", pilihan: ["a", "two", "three"], jawaban_benar: "a", penjelasan_id: "'There IS a pencil' = Ada satu pensil. 'A' untuk satu. ✏️ 'There ARE' untuk banyak.", level: 2, xp: 10 },
      { id: "k3-bing-05-q6", tipe: "true_false", soal: "'Forty-two' artinya 42.", soal_id: "'Forty-two' artinya 42.", pilihan: ["True", "False"], jawaban_benar: "True", penjelasan_id: "Betul! Forty-two = 42. Forty = 40, two = 2. 40 + 2 = 42! 🔢", level: 1, xp: 10 },
      { id: "k3-bing-05-q7", tipe: "fill_blank", soal: "___ there 25 students in the class?", soal_id: "___ ada 25 siswa di kelas?", kalimat: "___ there 25 students in the class?", pilihan: ["Are", "Is", "Do"], jawaban_benar: "Are", penjelasan_id: "'Are there...?' untuk bertanya tentang banyak benda/orang. 'Are' untuk jamak (students). ❓", level: 2, xp: 10 },
      { id: "k3-bing-05-q8", tipe: "listen_choose", soal: "Listen and choose!", soal_id: "Dengar dan pilih!", audio_text: "thirty-five", pilihan: ["35", "45", "25"], jawaban_benar: "35", penjelasan_id: "Thirty-five = 35. Thirty = 30, five = 5. 30 + 5 = 35! 🔢", level: 1, xp: 10 }
    ]
  }
];

let sql = `-- ==========================================
-- 022_soal_bing_k3_duolingo.sql
-- Seed Duolingo-style questions for B.Inggris K3
-- ==========================================

DELETE FROM public.questions WHERE material_id LIKE 'k3-bing-%';

INSERT INTO public.questions (
  id, material_id, tipe, soal, soal_id, data, audio_text, pilihan, jawaban_benar, penjelasan_id, kalimat, kata, level, xp
) VALUES
`;

const jsonUnit1_3 = require('./user-prompt-units-1-3.json'); // the units 1-3 from user

const allUnits = [...jsonUnit1_3.units, ...units];
const rows = [];

for (const unit of allUnits) {
  const matId = unit.id || unit.unit_id;
  const questions = unit.questions || unit.soal;
  for (const q of questions) {
    const id = q.id.startsWith(matId) ? q.id : `${matId}-${q.id}`;
    const tipe = q.tipe;
    const soal = q.soal;
    const soal_id = q.soal_id;
    const data = q.data;
    const audio_text = q.audio_text;
    const pilihan = q.pilihan;
    const jawaban_benar = q.jawaban_benar;
    const penjelasan_id = q.penjelasan_id;
    const kalimat = q.kalimat;
    const kata = q.kata;
    const level = q.level;
    const xp = q.xp;

    rows.push(`(
  ${escapeSql(id)},
  ${escapeSql(matId)},
  ${escapeSql(tipe)},
  ${escapeSql(soal)},
  ${escapeSql(soal_id)},
  ${escapeJson(data)},
  ${escapeSql(audio_text)},
  ${escapeJson(pilihan)},
  ${escapeJson(jawaban_benar)},
  ${escapeSql(penjelasan_id)},
  ${escapeSql(kalimat)},
  ${escapeJson(kata)},
  ${level},
  ${xp}
)`);
  }
}

sql += rows.join(',\n') + ';\n';
fs.writeFileSync('supabase/migrations/022_soal_bing_k3_duolingo.sql', sql);
console.log('✅ Generated 022_soal_bing_k3_duolingo.sql for 80 questions.');
supabase/migrations/026_seed_k2_bing.sql
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