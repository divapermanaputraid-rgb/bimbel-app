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
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Let's Go! 🚀</button>
      </div>
    </div>

    <!-- Goals -->
    <div class="section-card">
      <div class="section-header">🎯 Learning Goals <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p>After this you can: (Setelah ini kamu bisa:)</p>
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Part 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p style="font-weight:bold;">✨ New Words (Kata Baru):</p>
        <div class="vocab-grid">
          ${data.bagian1.vocab.map(v => `
          <div class="vocab-card">
            <div class="emoji">${v.emoji}</div>
            <div class="word">${v.word}</div>
            <div class="meaning">(${v.arti})</div>
            <button class="audio-btn" onclick="speakK2('${esc(v.word)}')">🔊</button>
          </div>
          `).join('')}
        </div>

        ${data.bagian1.dialog ? `<p style="font-weight:bold;margin-top:16px;">💬 Let's Talk (Ayo Berdialog):</p><div class="dialogue-box">${data.bagian1.dialog.map(d => `<p><span class="speaker">${d.speaker}:</span> ${d.text} ${d.audio ? `<button class="audio-btn" onclick="speakK2('${esc(d.text)}')">🔊</button>` : ''}</p>`).join('')}</div>` : ''}

        <div class="quiz-box" data-idx="0" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 18px;">🤔 Checkpoint 1:</p>
          <p style="font-size: 18px;">${data.bagian1.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian1.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 18px;"></div>
        </div>
      </div>
    </div>

    <!-- Bagian 2 -->
    <div class="section-card">
      <div class="section-header">📖 Part 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p style="font-weight:bold;">✨ More Words (Kata Lainnya):</p>
        <div class="vocab-grid">
          ${data.bagian2.vocab.map(v => `
          <div class="vocab-card">
            <div class="emoji">${v.emoji}</div>
            <div class="word">${v.word}</div>
            <div class="meaning">(${v.arti})</div>
            <button class="audio-btn" onclick="speakK2('${esc(v.word)}')">🔊</button>
          </div>
          `).join('')}
        </div>

        ${data.bagian2.song ? `<p style="font-weight:bold;margin-top:16px;">🎵 Let's Sing! (Ayo Bernyanyi):</p><div class="song-box">
          <p>🎵 ${data.bagian2.song.title} 🎵</p>
          <p>${data.bagian2.song.lyrics}</p>
          <button class="audio-btn" onclick="speakK2('${esc(data.bagian2.song.lyrics)}')">🔊 Sing Along!</button>
        </div>` : ''}

        <div class="quiz-box" data-idx="1" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 18px;">🤔 Checkpoint 2:</p>
          <p style="font-size: 18px;">${data.bagian2.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian2.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 18px;"></div>
        </div>
      </div>
    </div>

    <!-- Practice -->
    <div class="section-card">
      <div class="section-header">✏️ Practice (Latihan) <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p style="font-weight:bold; font-size: 20px;">💪 Let's practice! (Ayo berlatih!)</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 2;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 18px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 18px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Summary -->
    <div class="section-card">
      <div class="section-header">🏆 Summary & Done! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 18px;">
        <p>Great job! Kamu sudah belajar <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">You got a badge:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #1565c0; font-size: 24px;">${data.badgeNama}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Done! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Answer all quizzes first ya 🧐)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">English Tutor 🤗</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Hi! Let's learn English together! Yuk belajar Bahasa Inggris bareng! 🇬🇧</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Send</button>
      </div>
    </div>
  </div>

  <script>
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = 5;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  // ===== k2-bing-01: Hello, How Are You? =====
  {
    id: 'k2-bing-01',
    judul: 'Hello, How Are You?',
    emoji: '👋',
    deskripsi: 'Let\'s learn greetings in English! Yuk belajar salam dalam Bahasa Inggris! 👋🇬🇧',
    tujuan: ['Say Hello, Hi, and Good morning in English 👋', 'Ask "How are you?" and answer 😊', 'Say Good night and Goodbye 🌙'],
    badgeEmoji: '👋',
    badgeNama: 'Greeter Pro',
    bagian1: {
      judul: 'Greetings (Salam)',
      vocab: [
        {emoji: '👋', word: 'Hello', arti: 'Halo'},
        {emoji: '✋', word: 'Hi', arti: 'Hai'},
        {emoji: '🌅', word: 'Good morning', arti: 'Selamat pagi'},
        {emoji: '🌤️', word: 'Good afternoon', arti: 'Selamat siang'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Hello! How are you?', audio: true},
        {speaker: '👦 Made', text: 'I am fine, thank you! And you?', audio: true},
        {speaker: '👩 Cici', text: 'I am fine too! Let\'s play!', audio: true},
      ],
      quiz: {soal: 'How do you say "Halo" in English? 🗣️', pilihan: ['Hello 👋', 'Goodbye 👋', 'Thank you 🙏'], jawabanIdx: 0},
    },
    bagian2: {
      judul: 'More Greetings (Lagi Salam)',
      vocab: [
        {emoji: '🌙', word: 'Good night', arti: 'Selamat malam'},
        {emoji: '👋', word: 'Goodbye', arti: 'Selamat tinggal'},
        {emoji: '🙏', word: 'Thank you', arti: 'Terima kasih'},
        {emoji: '😊', word: 'You\'re welcome', arti: 'Sama-sama'},
      ],
      song: {
        title: 'Good Morning Song',
        lyrics: 'Good morning, good morning! How are you? I am fine, thank you! How are you? 🎵',
      },
      quiz: {soal: '"Good night" artinya... 🌙', pilihan: ['Selamat pagi', 'Selamat malam 🌙', 'Selamat siang'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"Goodbye" artinya... 👋', pilihan: ['Halo', 'Selamat tinggal', 'Terima kasih'], jawabanIdx: 1},
      {soal: 'How do you say "Terima kasih" in English?', pilihan: ['Please', 'Sorry', 'Thank you 🙏'], jawabanIdx: 2},
      {soal: 'Answer: "How are you?" → "I am ___"', pilihan: ['Fine 😊', 'Five', 'Book 📖'], jawabanIdx: 0},
    ],
  },

  // ===== k2-bing-02: Numbers and Colors =====
  {
    id: 'k2-bing-02',
    judul: 'Numbers and Colors',
    emoji: '🔢',
    deskripsi: 'Let\'s count 1 to 20 and learn colors in English! Yuk hitung dan belajar warna! 🔢🌈',
    tujuan: ['Count 1 to 20 in English 🔢', 'Name colors: red, blue, green, yellow 🎨', 'Describe "What color is this?" 🌈'],
    badgeEmoji: '🔢',
    badgeNama: 'Number Wizard',
    bagian1: {
      judul: 'Numbers 1-10 (Angka 1-10)',
      vocab: [
        {emoji: '1️⃣', word: 'One', arti: 'Satu'},
        {emoji: '2️⃣', word: 'Two', arti: 'Dua'},
        {emoji: '3️⃣', word: 'Three', arti: 'Tiga'},
        {emoji: '4️⃣', word: 'Four', arti: 'Empat'},
        {emoji: '5️⃣', word: 'Five', arti: 'Lima'},
        {emoji: '6️⃣', word: 'Six', arti: 'Enam'},
        {emoji: '7️⃣', word: 'Seven', arti: 'Tujuh'},
        {emoji: '8️⃣', word: 'Eight', arti: 'Delapan'},
        {emoji: '9️⃣', word: 'Nine', arti: 'Sembilan'},
        {emoji: '🔟', word: 'Ten', arti: 'Sepuluh'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Can you count? One, two, three!', audio: true},
        {speaker: '👦 Made', text: 'Yes! Four, five, six, seven, eight, nine, ten!', audio: true},
        {speaker: '👩 Cici', text: 'Great job! Let\'s count again!', audio: true},
      ],
      quiz: {soal: '🍎🍎🍎🍎🍎🍎 = ? How many apples?', pilihan: ['Five', 'Six', 'Seven'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Numbers 11-20 & Colors',
      vocab: [
        {emoji: '🔴', word: 'Red', arti: 'Merah'},
        {emoji: '🔵', word: 'Blue', arti: 'Biru'},
        {emoji: '🟢', word: 'Green', arti: 'Hijau'},
        {emoji: '🟡', word: 'Yellow', arti: 'Kuning'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'What color is this? It is red! 🔴', audio: true},
        {speaker: '👦 Made', text: 'The sky is blue! 🔵 The grass is green! 🟢', audio: true},
        {speaker: '👩 Cici', text: 'The sun is yellow! 🟡 So beautiful!', audio: true},
      ],
      song: {
        title: 'Color Song',
        lyrics: 'Red and yellow and blue and green! Red and yellow and blue and green! I love colors! I love colors! Yay! 🎵🌈',
      },
      quiz: {soal: '"Blue" = biru. "Green" = ___ 🟢', pilihan: ['Merah', 'Biru', 'Hijau 🟢'], jawabanIdx: 2},
    },
    latihan: [
      {soal: '🍋 Lemon is ___ in color.', pilihan: ['Red 🔴', 'Yellow 🟡', 'Blue 🔵'], jawabanIdx: 1},
      {soal: 'After 7 comes... (setelah 7)...', pilihan: ['Six', 'Eight 8️⃣', 'Nine'], jawabanIdx: 1},
      {soal: '🌿 Grass is ___ in color.', pilihan: ['Green 🟢', 'Blue 🔵', 'Red 🔴'], jawabanIdx: 0},
    ],
  },

  // ===== k2-bing-03: My Family =====
  {
    id: 'k2-bing-03',
    judul: 'My Family',
    emoji: '👨‍👩‍👧‍👦',
    deskripsi: 'Let\'s learn about family in English! Yuk belajar keluarga dalam Inggris! 👨‍👩‍👧‍👦🇬🇧',
    tujuan: ['Say father, mother, sister, brother in English 👨‍👩‍👧‍👦', 'Say "This is my..." in sentences 📝', 'Describe family members 🗣️'],
    badgeEmoji: '👨‍👩‍👧‍👦',
    badgeNama: 'Family Expert',
    bagian1: {
      judul: 'Family Members (Anggota Keluarga)',
      vocab: [
        {emoji: '👨', word: 'Father', arti: 'Ayah'},
        {emoji: '👩', word: 'Mother', arti: 'Ibu'},
        {emoji: '👧', word: 'Sister', arti: 'Kakak/adik perempuan'},
        {emoji: '👦', word: 'Brother', arti: 'Kakak/adik laki-laki'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'This is my family! 👨‍👩‍👧‍👦', audio: true},
        {speaker: '👦 Made', text: 'Who is this? This is my father. He is a teacher.', audio: true},
        {speaker: '👩 Cici', text: 'This is my mother. She is a doctor. 👩‍⚕️', audio: true},
      ],
      quiz: {soal: '"Father" in Indonesian is... 👨', pilihan: ['Ibu', 'Ayah 👨', 'Kakak'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Family (Lagi Keluarga)',
      vocab: [
        {emoji: '👴', word: 'Grandfather', arti: 'Kakek'},
        {emoji: '👵', word: 'Grandmother', arti: 'Nenek'},
        {emoji: '👶', word: 'Baby', arti: 'Bayi'},
        {emoji: '🐶', word: 'Pet', arti: 'Hewan peliharaan'},
      ],
      song: {
        title: 'Family Song',
        lyrics: 'Father, mother, sister, brother! Grandfather, grandmother! I love my family! Yes I do! 🎵',
      },
      quiz: {soal: '"This is my mother." Artinya... 👩', pilihan: ['Ini ayahku', 'Ini ibuku 👩', 'Ini kakakku'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"Brother" in Indonesian is... 👦', pilihan: ['Kakak/adik laki-laki 👦', 'Kakak/adik perempuan', 'Ayah'], jawabanIdx: 0},
      {soal: '"Grandmother" in Indonesian is... 👵', pilihan: ['Kakek', 'Nenek 👵', 'Ibu'], jawabanIdx: 1},
      {soal: 'This is ___ father. (Ini ayahku)', pilihan: ['my', 'your', 'his'], jawabanIdx: 0},
    ],
  },

  // ===== k2-bing-04: My Classroom =====
  {
    id: 'k2-bing-04',
    judul: 'My Classroom',
    emoji: '🎒',
    deskripsi: 'Let\'s learn classroom objects in English! Yuk belajar benda di kelas! 🎒🇬🇧',
    tujuan: ['Name classroom objects in English 📖', 'Say "This is a..." and "I have..." 📝', 'Use "a" and "an" correctly 📚'],
    badgeEmoji: '🎒',
    badgeNama: 'Classroom Hero',
    bagian1: {
      judul: 'Classroom Objects (Benda di Kelas)',
      vocab: [
        {emoji: '📖', word: 'Book', arti: 'Buku'},
        {emoji: '✏️', word: 'Pencil', arti: 'Pensil'},
        {emoji: '🪑', word: 'Chair', arti: 'Kursi'},
        {emoji: '📐', word: 'Desk', arti: 'Meja'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'This is my classroom! It is big! 🏫', audio: true},
        {speaker: '👦 Made', text: 'I have a book and a pencil. 📖✏️', audio: true},
        {speaker: '👩 Cici', text: 'This is a chair. This is a desk. 🪑📐', audio: true},
      ],
      quiz: {soal: '"Book" in Indonesian is... 📖', pilihan: ['Pensil', 'Buku 📖', 'Tas'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Objects (Lagi Benda)',
      vocab: [
        {emoji: '🖊️', word: 'Pen', arti: 'Pulpen'},
        {emoji: '📏', word: 'Ruler', arti: 'Penggaris'},
        {emoji: '🖍️', word: 'Crayon', arti: 'Krayon'},
        {emoji: '🎒', word: 'Bag', arti: 'Tas'},
      ],
      song: {
        title: 'Classroom Song',
        lyrics: 'I have a book! I have a pen! This is my classroom! Let\'s learn again! 📖✏️🎵',
      },
      quiz: {soal: '"I have a pencil." Artinya... ✏️', pilihan: ['Aku punya pensil ✏️', 'Aku punya buku', 'Kamu punya pensil'], jawabanIdx: 0},
    },
    latihan: [
      {soal: '"Ruler" in Indonesian is... 📏', pilihan: ['Pulpen', 'Penggaris 📏', 'Krayon'], jawabanIdx: 1},
      {soal: '"Bag" artinya... 🎒', pilihan: ['Buku', 'Tas 🎒', 'Pensil'], jawabanIdx: 1},
      {soal: 'This is ___ eraser. (Ini penghapus)', pilihan: ['a', 'an', 'the'], jawabanIdx: 1},
    ],
  },

  // ===== k2-bing-05: Stand Up, Please! =====
  {
    id: 'k2-bing-05',
    judul: 'Stand Up, Please!',
    emoji: '🧍',
    deskripsi: 'Let\'s learn commands in English! Yuk belajar perintah dalam Inggris! 🧍🇬🇧',
    tujuan: ['Understand classroom commands 🗣️', 'Say "Stand up" and "Sit down" 🧍', 'Say "Open" and "Close" 🚪'],
    badgeEmoji: '🧍',
    badgeNama: 'Command Master',
    bagian1: {
      judul: 'Commands (Perintah)',
      vocab: [
        {emoji: '🧍', word: 'Stand up', arti: 'Berdiri'},
        {emoji: '🪑', word: 'Sit down', arti: 'Duduk'},
        {emoji: '📖', word: 'Open your book', arti: 'Buka bukumu'},
        {emoji: '📖', word: 'Close your book', arti: 'Tutup bukumu'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Good morning, class! Stand up, please! 🧍', audio: true},
        {speaker: '👦 Made', text: 'Good morning, teacher! (Cici and Made stand up)', audio: true},
        {speaker: '👩 Cici', text: 'Sit down, please! Open your book! 📖', audio: true},
      ],
      quiz: {soal: '"Stand up" artinya... 🧍', pilihan: ['Duduk', 'Berdiri 🧍', 'Buka buku'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Commands (Lagi Perintah)',
      vocab: [
        {emoji: '🚪', word: 'Open the door', arti: 'Buka pintu'},
        {emoji: '🚪', word: 'Close the door', arti: 'Tutup pintu'},
        {emoji: '👀', word: 'Look at the board', arti: 'Lihat papan tulis'},
        {emoji: '🤫', word: 'Be quiet', arti: 'Diam'},
      ],
      song: {
        title: 'Action Song',
        lyrics: 'Stand up! Sit down! Open your book! Close your book! Clap your hands! Stomp your feet! Let\'s move! 🎵',
      },
      quiz: {soal: '"Please sit down." Artinya... 🪑', pilihan: ['Tolong berdiri', 'Tolong duduk 🪑', 'Tolong diam'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"Open the door" artinya... 🚪', pilihan: ['Tutup pintu', 'Buka pintu 🚪', 'Buka buku'], jawabanIdx: 1},
      {soal: '"Be quiet" artinya... 🤫', pilihan: ['Berdiri', 'Diam 🤫', 'Buka'], jawabanIdx: 1},
      {soal: 'The teacher says "___ your book." (Buka bukumu)', pilihan: ['Close', 'Open 📖', 'Sit'], jawabanIdx: 1},
    ],
  },

  // ===== k2-bing-06: Head, Shoulders, Knees =====
  {
    id: 'k2-bing-06',
    judul: 'Head, Shoulders, Knees',
    emoji: '🧠',
    deskripsi: 'Let\'s learn body parts in English! Yuk belajar anggota tubuh! 🧠🇬🇧',
    tujuan: ['Name body parts in English 🧠', 'Touch and say: head, shoulders, knees, toes', 'Sing "Head, Shoulders" song 🎵'],
    badgeEmoji: '🧠',
    badgeNama: 'Body Expert',
    bagian1: {
      judul: 'Body Parts (Anggota Tubuh)',
      vocab: [
        {emoji: '🧠', word: 'Head', arti: 'Kepala'},
        {emoji: '🤚', word: 'Hand', arti: 'Tangan'},
        {emoji: '👀', word: 'Eyes', arti: 'Mata'},
        {emoji: '👂', word: 'Ears', arti: 'Telinga'},
        {emoji: '👃', word: 'Nose', arti: 'Hidung'},
        {emoji: '👄', word: 'Mouth', arti: 'Mulut'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Touch your head! This is my head. 🧠', audio: true},
        {speaker: '👦 Made', text: 'These are my eyes! I can see! 👀', audio: true},
        {speaker: '👩 Cici', text: 'These are my ears! I can hear! 👂', audio: true},
      ],
      quiz: {soal: '"Eyes" in Indonesian is... 👀', pilihan: ['Telinga', 'Mata 👀', 'Hidung'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Body Parts',
      vocab: [
        {emoji: '🦶', word: 'Feet', arti: 'Kaki'},
        {emoji: '🦵', word: 'Knees', arti: 'Lutut'},
        {emoji: '🦷', word: 'Teeth', arti: 'Gigi'},
        {emoji: '👅', word: 'Tongue', arti: 'Lidah'},
      ],
      song: {
        title: 'Head, Shoulders',
        lyrics: 'Head, shoulders, knees and toes! Knees and toes! Head, shoulders, knees and toes! Eyes and ears and mouth and nose! 🎵',
      },
      quiz: {soal: '"Mouth" in Indonesian is... 👄', pilihan: ['Mulut 👄', 'Mata', 'Hidung'], jawabanIdx: 0},
    },
    latihan: [
      {soal: '"Nose" in Indonesian is... 👃', pilihan: ['Telinga', 'Hidung 👃', 'Mulut'], jawabanIdx: 1},
      {soal: 'I can see with my ___ 👀', pilihan: ['Ears', 'Eyes 👀', 'Mouth'], jawabanIdx: 1},
      {soal: 'I can hear with my ___ 👂', pilihan: ['Ears 👂', 'Eyes 👀', 'Nose 👃'], jawabanIdx: 0},
    ],
  },

  // ===== k2-bing-07: My Daily Activities =====
  {
    id: 'k2-bing-07',
    judul: 'My Daily Activities',
    emoji: '⏰',
    deskripsi: 'Let\'s talk about daily routines in English! Yuk cerita kegiatan sehari-hari! ⏰🇬🇧',
    tujuan: ['Say daily activities in English ⏰', 'Say "I wake up" and "I go to school"', 'Tell your daily routine 🗣️'],
    badgeEmoji: '⏰',
    badgeNama: 'Routine Master',
    bagian1: {
      judul: 'Morning Activities (Kegiatan Pagi)',
      vocab: [
        {emoji: '⏰', word: 'Wake up', arti: 'Bangun tidur'},
        {emoji: '🪥', word: 'Brush my teeth', arti: 'Gosok gigi'},
        {emoji: '🚿', word: 'Take a shower', arti: 'Mandi'},
        {emoji: '👕', word: 'Get dressed', arti: 'Pakai baju'},
      ],
      dialog: [
        {speaker: '👦 Made', text: 'I wake up at 5 o\'clock. I brush my teeth. 🪥', audio: true},
        {speaker: '👩 Cici', text: 'I take a shower. I get dressed. I eat breakfast! 🥣', audio: true},
        {speaker: '👦 Made', text: 'Then I go to school! I love school! 🏫', audio: true},
      ],
      quiz: {soal: '"Wake up" artinya... ⏰', pilihan: ['Tidur', 'Bangun tidur ⏰', 'Mandi'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Evening Activities (Kegiatan Malam)',
      vocab: [
        {emoji: '🏫', word: 'Go to school', arti: 'Pergi ke sekolah'},
        {emoji: '📖', word: 'Study', arti: 'Belajar'},
        {emoji: '🍚', word: 'Eat dinner', arti: 'Makan malam'},
        {emoji: '😴', word: 'Go to sleep', arti: 'Tidur'},
      ],
      song: {
        title: 'Daily Routine Song',
        lyrics: 'I wake up! Brush my teeth! Go to school! Study hard! Eat my dinner! Go to sleep! Every day! 🎵',
      },
      quiz: {soal: '"I go to sleep" artinya... 😴', pilihan: ['Aku bangun', 'Aku tidur 😴', 'Aku belajar'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"I brush my teeth" artinya... 🪥', pilihan: ['Aku gosok gigi 🪥', 'Aku mandi', 'Aku makan'], jawabanIdx: 0},
      {soal: '"I go to school" artinya... 🏫', pilihan: ['Aku pergi ke sekolah 🏫', 'Aku pulang', 'Aku tidur'], jawabanIdx: 0},
      {soal: 'I ___ up at 6 o\'clock.', pilihan: ['wake', 'get', 'go'], jawabanIdx: 0},
    ],
  },

  // ===== k2-bing-08: Do You Like Apples? =====
  {
    id: 'k2-bing-08',
    judul: 'Do You Like Apples?',
    emoji: '🍎',
    deskripsi: 'Let\'s talk about fruits and food in English! Yuk belajar buah dan makanan! 🍎🇬🇧',
    tujuan: ['Name fruits in English 🍎', 'Say "Do you like...?" and answer Yes/No 🙋', 'Say "I like" and "I don\'t like"'],
    badgeEmoji: '🍎',
    badgeNama: 'Foodie Explorer',
    bagian1: {
      judul: 'Fruits (Buah-buahan)',
      vocab: [
        {emoji: '🍎', word: 'Apple', arti: 'Apel'},
        {emoji: '🍌', word: 'Banana', arti: 'Pisang'},
        {emoji: '🍊', word: 'Orange', arti: 'Jeruk'},
        {emoji: '🍇', word: 'Grapes', arti: 'Anggur'},
        {emoji: '🍉', word: 'Watermelon', arti: 'Semangka'},
        {emoji: '🍓', word: 'Strawberry', arti: 'Stroberi'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Do you like apples? 🍎', audio: true},
        {speaker: '👦 Made', text: 'Yes, I do! I like apples! They are sweet! 😊', audio: true},
        {speaker: '👩 Cici', text: 'Do you like bananas? 🍌', audio: true},
        {speaker: '👦 Made', text: 'No, I don\'t. But I like oranges! 🍊', audio: true},
      ],
      quiz: {soal: '"Do you like apples?" — "Yes, ___"', pilihan: ['I like', 'I do', 'I am'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Food & Vegetables (Makanan & Sayur)',
      vocab: [
        {emoji: '🥦', word: 'Broccoli', arti: 'Brokoli'},
        {emoji: '🥕', word: 'Carrot', arti: 'Wortel'},
        {emoji: '🍚', word: 'Rice', arti: 'Nasi'},
        {emoji: '🥛', word: 'Milk', arti: 'Susu'},
      ],
      song: {
        title: 'Food Song',
        lyrics: 'I like apples! Yes I do! I like bananas! How about you? Fruits are yummy! Healthy too! Let\'s eat fruits! Yummy yum! 🎵',
      },
      quiz: {soal: '"I don\'t like carrots." Artinya... 🥕', pilihan: ['Aku suka wortel', 'Aku tidak suka wortel 🥕', 'Aku mau wortel'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '🍎 "Apple" in Indonesian is...', pilihan: ['Pisang', 'Apel 🍎', 'Jeruk'], jawabanIdx: 1},
      {soal: '"Do you like milk?" — "No, ___ don\'t." 🥛', pilihan: ['I', 'you', 'she'], jawabanIdx: 0},
      {soal: '🍉 Watermelon = ___', pilihan: ['Anggur', 'Semangka 🍉', 'Pisang'], jawabanIdx: 1},
    ],
  },

  // ===== k2-bing-09: Animals Around Me =====
  {
    id: 'k2-bing-09',
    judul: 'Animals Around Me',
    emoji: '🐾',
    deskripsi: 'Let\'s learn animal names in English! Yuk belajar nama hewan dalam Inggris! 🐾🇬🇧',
    tujuan: ['Name animals in English 🐱', 'Say "It is a..." in sentences 📝', 'Describe animals: big, small, cute'],
    badgeEmoji: '🐾',
    badgeNama: 'Animal Lover',
    bagian1: {
      judul: 'Pets and Farm Animals (Hewan Peliharaan & Ternak)',
      vocab: [
        {emoji: '🐱', word: 'Cat', arti: 'Kucing'},
        {emoji: '🐶', word: 'Dog', arti: 'Anjing'},
        {emoji: '🐟', word: 'Fish', arti: 'Ikan'},
        {emoji: '🐦', word: 'Bird', arti: 'Burung'},
        {emoji: '🐮', word: 'Cow', arti: 'Sapi'},
        {emoji: '🐔', word: 'Chicken', arti: 'Ayam'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'I have a cat. It is cute! 🐱', audio: true},
        {speaker: '👦 Made', text: 'I have a dog. It is big! 🐶 I love my dog!', audio: true},
        {speaker: '👩 Cici', text: 'Look! A bird! It can fly! 🐦', audio: true},
      ],
      quiz: {soal: '"Cat" in Indonesian is... 🐱', pilihan: ['Anjing', 'Kucing 🐱', 'Burung'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Wild Animals (Hewan Liar)',
      vocab: [
        {emoji: '🐘', word: 'Elephant', arti: 'Gajah'},
        {emoji: '🦁', word: 'Lion', arti: 'Singa'},
        {emoji: '🐅', word: 'Tiger', arti: 'Harimau'},
        {emoji: '🐒', word: 'Monkey', arti: 'Monyet'},
      ],
      song: {
        title: 'Animal Song',
        lyrics: 'I see a cat! Meow meow meow! I see a dog! Woof woof woof! I see a cow! Moo moo moo! Animals are fun! 🎵',
      },
      quiz: {soal: '"It is a tiger." Artinya... 🐅', pilihan: ['Ini gajah', 'Ini harimau 🐅', 'Ini monyet'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"Elephant" in Indonesian is... 🐘', pilihan: ['Singa', 'Gajah 🐘', 'Harimau'], jawabanIdx: 1},
      {soal: '🐮 "Cow" gives us ___', pilihan: ['Milk 🥛', 'Eggs 🥚', 'Honey 🍯'], jawabanIdx: 0},
      {soal: '🐱 "I see a ___"', pilihan: ['Dog', 'Cat 🐱', 'Bird'], jawabanIdx: 1},
    ],
  },

  // ===== k2-bing-10: My House =====
  {
    id: 'k2-bing-10',
    judul: 'My House',
    emoji: '🏠',
    deskripsi: 'Let\'s learn rooms in a house in English! Yuk belajar ruangan di rumah! 🏠🇬🇧',
    tujuan: ['Name rooms in a house in English 🏠', 'Say "This is the kitchen"', 'Describe where things are: in, on, under 📍'],
    badgeEmoji: '🏠',
    badgeNama: 'Home Navigator',
    bagian1: {
      judul: 'Rooms in a House (Ruangan di Rumah)',
      vocab: [
        {emoji: '🍳', word: 'Kitchen', arti: 'Dapur'},
        {emoji: '🛏️', word: 'Bedroom', arti: 'Kamar tidur'},
        {emoji: '🚿', word: 'Bathroom', arti: 'Kamar mandi'},
        {emoji: '🛋️', word: 'Living room', arti: 'Ruang tamu'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Welcome to my house! This is the living room! 🛋️', audio: true},
        {speaker: '👦 Made', text: 'Wow! This is the kitchen! Where is the food? 🍳😋', audio: true},
        {speaker: '👩 Cici', text: 'This is my bedroom. I sleep here! 🛏️😴', audio: true},
      ],
      quiz: {soal: '"Kitchen" in Indonesian is... 🍳', pilihan: ['Kamar tidur', 'Dapur 🍳', 'Kamar mandi'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Things in a House (Benda di Rumah)',
      vocab: [
        {emoji: '🪟', word: 'Window', arti: 'Jendela'},
        {emoji: '🚪', word: 'Door', arti: 'Pintu'},
        {emoji: '🪑', word: 'Table', arti: 'Meja'},
        {emoji: '🛋️', word: 'Sofa', arti: 'Sofa'},
      ],
      song: {
        title: 'My House Song',
        lyrics: 'This is my house! My lovely house! Kitchen for cooking! Bedroom for sleeping! Living room for playing! Bathroom for bathing! I love my house! 🎵🏠',
      },
      quiz: {soal: '"The cat is on the table." Artinya... 🐱', pilihan: ['Kucing di bawah meja', 'Kucing di atas meja 🐱', 'Kucing di dalam meja'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"Bedroom" in Indonesian is... 🛏️', pilihan: ['Kamar mandi', 'Kamar tidur 🛏️', 'Dapur'], jawabanIdx: 1},
      {soal: '"Bathroom" artinya... 🚿', pilihan: ['Kamar mandi 🚿', 'Kamar tidur', 'Ruang tamu'], jawabanIdx: 0},
      {soal: '"The book is on the desk." Buku ___ meja. 📖', pilihan: ['di bawah', 'di atas', 'di dalam'], jawabanIdx: 1},
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 10 K2 English books generated successfully!');
