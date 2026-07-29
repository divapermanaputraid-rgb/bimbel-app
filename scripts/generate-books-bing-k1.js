const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas1/bahasa-inggris');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k1-bing-01': '#FFEBEE', 'k1-bing-02': '#E8EAF6', 'k1-bing-03': '#FFF8E1',
  'k1-bing-04': '#E0F7FA', 'k1-bing-05': '#F1F8E9', 'k1-bing-06': '#FFF3E0',
  'k1-bing-07': '#F3E5F5',
};

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
  <title>${data.judul} — Grade 1 English</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .vocab-card .audio-btn { background: #4CAF50; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; margin-top: 4px; }
    .vocab-card .audio-btn:hover { background: #388E3C; }
    .dialogue-box { background: #fff8e1; padding: 16px; border-radius: 12px; margin: 12px 0; border-left: 4px solid #fbc02d; font-size: 20px; }
    .dialogue-box p { margin: 8px 0; }
    .dialogue-box .speaker { display: inline-block; margin-right: 8px; font-weight: bold; }
    .song-box { background: #e0f7fa; padding: 16px; border-radius: 12px; margin: 12px 0; text-align: center; font-size: 22px; }
    .song-box .audio-btn { background: #00BCD4; color: white; border: none; border-radius: 50%; width: 44px; height: 44px; font-size: 22px; cursor: pointer; margin-top: 8px; }
  </style>
</head>
<body class="kelas1" data-kelas="1" data-pelajaran="bing" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Main Page <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666; font-size: 20px;">Bahasa Inggris — Kelas 1</p>
        <p style="margin-top: 16px; font-size: 20px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Let's Go! 🚀</button>
      </div>
    </div>

    <!-- Goals -->
    <div class="section-card">
      <div class="section-header">🎯 Learning Goals <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <p>After this you can: (Setelah ini kamu bisa:)</p>
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Part 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <div class="vocab-grid">
          ${data.bagian1.vocab.map(v => `
          <div class="vocab-card">
            <div class="emoji">${v.emoji}</div>
            <div class="word" style="font-size: 18px;">${v.word}</div>
            <div class="meaning" style="font-size: 16px; color: #666;">(${v.arti})</div>
            <button class="audio-btn" onclick="speakEnglish('${v.word.replace(/'/g, "\\'")}')">🔊</button>
          </div>
          `).join('')}
        </div>

        ${data.bagian1.dialog ? `<div class="dialogue-box">${data.bagian1.dialog.map(d => `<p><span class="speaker">${d.speaker}:</span> ${d.text} ${d.audio ? `<button class="audio-btn" onclick="speakEnglish('${d.text.replace(/'/g, "\\'")}')" style="width:28px;height:28px;font-size:14px;vertical-align:middle;">🔊</button>` : ''}</p>`).join('')}</div>` : ''}

        <div class="quiz-box" data-idx="0" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Checkpoint 1:</p>
          <p style="font-size: 20px;">${data.bagian1.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian1.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- Bagian 2 -->
    <div class="section-card">
      <div class="section-header">📖 Part 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <div class="vocab-grid">
          ${data.bagian2.vocab.map(v => `
          <div class="vocab-card">
            <div class="emoji">${v.emoji}</div>
            <div class="word" style="font-size: 18px;">${v.word}</div>
            <div class="meaning" style="font-size: 16px; color: #666;">(${v.arti})</div>
            <button class="audio-btn" onclick="speakEnglish('${v.word.replace(/'/g, "\\'")}')">🔊</button>
          </div>
          `).join('')}
        </div>

        ${data.bagian2.song ? `<div class="song-box">
          <p>🎵 ${data.bagian2.song.title} 🎵</p>
          <p>${data.bagian2.song.lyrics}</p>
          <button class="audio-btn" onclick="speakEnglish('${data.bagian2.song.lyrics.replace(/'/g, "\\'")}')">🔊 Sing Along!</button>
        </div>` : ''}

        <div class="quiz-box" data-idx="1" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Checkpoint 2:</p>
          <p style="font-size: 20px;">${data.bagian2.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian2.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- Latihan -->
    <div class="section-card">
      <div class="section-header">✏️ Practice <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <p style="font-weight:bold; font-size: 22px;">💪 Let's practice! (Ayo berlatih!)</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 2;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 20px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Summary & Done! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 20px;">
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
  // ===== k1-bing-01: How Are You? =====
  {
    id: 'k1-bing-01',
    judul: 'How Are You?',
    emoji: '👋',
    deskripsi: 'Let\'s learn greetings in English! Yuk belajar salam dalam Inggris! 👋🇬🇧',
    tujuan: ['Say Hello and Hi in English 👋', 'Say Good morning and Good night 🌅', 'Ask "How are you?" and answer 😊'],
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
        {speaker: '👩 Cici', text: 'I am fine too!', audio: true},
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

  // ===== k1-bing-02: I am Kimi =====
  {
    id: 'k1-bing-02',
    judul: 'I am Kimi',
    emoji: '🙋',
    deskripsi: 'Let\'s introduce ourselves! Yuk perkenalkan diri! 🙋🇬🇧',
    tujuan: ['Say "I am..." in English 🙋', 'Say "My name is..." 📝', 'Introduce yourself to friends 😊'],
    badgeEmoji: '🙋',
    badgeNama: 'Self Intro Master',
    bagian1: {
      judul: 'Introducing Myself (Perkenalan Diri)',
      vocab: [
        {emoji: '🙋', word: 'I am', arti: 'Saya adalah'},
        {emoji: '📝', word: 'My name is', arti: 'Nama saya adalah'},
        {emoji: '👧', word: 'Girl', arti: 'Perempuan'},
        {emoji: '👦', word: 'Boy', arti: 'Laki-laki'},
      ],
      dialog: [
        {speaker: '👦 Made', text: 'Hi! I am Made. What is your name?', audio: true},
        {speaker: '👩 Cici', text: 'Hi Made! My name is Cici.', audio: true},
        {speaker: '👦 Made', text: 'Nice to meet you, Cici!', audio: true},
        {speaker: '👩 Cici', text: 'Nice to meet you too, Made!', audio: true},
      ],
      quiz: {soal: 'How do you say "Saya adalah Kimi"? 👧', pilihan: ['You are Kimi', 'I am Kimi 🙋', 'My name Kimi'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Let\'s Practice! (Ayo Latihan!)',
      vocab: [
        {emoji: '👶', word: 'Friend', arti: 'Teman'},
        {emoji: '🏫', word: 'Teacher', arti: 'Guru'},
        {emoji: '🎒', word: 'Student', arti: 'Murid'},
        {emoji: '😊', word: 'Nice to meet you', arti: 'Senang bertemu kamu'},
      ],
      song: {
        title: 'Hello Song',
        lyrics: 'Hello, hello! I am Made! Hello, hello! My name is Made! Nice to meet you! 🎵',
      },
      quiz: {soal: '"My name is Cici." → Artinya... 👩', pilihan: ['Namaku Cici 📝', 'Aku suka Cici', 'Kamu Cici'], jawabanIdx: 0},
    },
    latihan: [
      {soal: '"I am a student." Artinya... 🎒', pilihan: ['Aku seorang guru', 'Aku seorang murid 🎒', 'Aku seorang teman'], jawabanIdx: 1},
      {soal: 'Complete: "___ name is Made."', pilihan: ['I', 'My 📝', 'You'], jawabanIdx: 1},
      {soal: '"Nice to meet you" artinya... 😊', pilihan: ['Selamat tinggal', 'Senang bertemu kamu 😊', 'Aku baik-baik saja'], jawabanIdx: 1},
    ],
  },

  // ===== k1-bing-03: My Name is Joshua =====
  {
    id: 'k1-bing-03',
    judul: 'My Name Is Joshua',
    emoji: '📝',
    deskripsi: 'Let\'s ask and say names! Yuk tanya dan sebut nama! 📝🇬🇧',
    tujuan: ['Ask "What is your name?" ❓', 'Say "My name is..." 📝', 'Say "Your name is..." for others 👥'],
    badgeEmoji: '📝',
    badgeNama: 'Name Expert',
    bagian1: {
      judul: 'My Name and Your Name',
      vocab: [
        {emoji: '❓', word: 'What', arti: 'Apa'},
        {emoji: '📝', word: 'Name', arti: 'Nama'},
        {emoji: '👤', word: 'My', arti: 'Milikku'},
        {emoji: '👥', word: 'Your', arti: 'Milikmu'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Hello! What is your name?', audio: true},
        {speaker: '👦 Joshua', text: 'My name is Joshua.', audio: true},
        {speaker: '👩 Cici', text: 'Your name is Joshua? That is a nice name!', audio: true},
        {speaker: '👦 Joshua', text: 'Thank you! What is your name?', audio: true},
        {speaker: '👩 Cici', text: 'My name is Cici.', audio: true},
      ],
      quiz: {soal: 'How to ask someone\'s name? 🤔', pilihan: ['What is your name? ❓', 'I am fine', 'Goodbye 👋'], jawabanIdx: 0},
    },
    bagian2: {
      judul: 'Let\'s Sing!',
      vocab: [
        {emoji: '👦', word: 'Boy', arti: 'Laki-laki'},
        {emoji: '👧', word: 'Girl', arti: 'Perempuan'},
        {emoji: '👪', word: 'Friend', arti: 'Teman'},
        {emoji: '😊', word: 'Happy', arti: 'Senang'},
      ],
      song: {
        title: 'What Is Your Name?',
        lyrics: 'What is your name? What is your name? My name is Joshua! Nice to meet you! 🎵',
      },
      quiz: {soal: '"Your name is Joshua." → "Your" artinya... 👥', pilihan: ['Milikku', 'Milikmu 👥', 'Nama'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '"What is your name?" Jawabannya... 🙋', pilihan: ['I am five', 'My name is Joshua 📝', 'I am fine'], jawabanIdx: 1},
      {soal: '"Your book" artinya... 📖', pilihan: ['Bukuku', 'Bukumu 👥', 'Buku'], jawabanIdx: 1},
      {soal: '"My" digunakan untuk milik... 👤', pilihan: ['Saya 👤', 'Kamu', 'Dia'], jawabanIdx: 0},
    ],
  },

  // ===== k1-bing-04: My Number is Ten =====
  {
    id: 'k1-bing-04',
    judul: 'My Number Is Ten',
    emoji: '🔢',
    deskripsi: 'Let\'s count 1 to 10 in English! Yuk hitung 1-10 dalam Inggris! 🔢🇬🇧',
    tujuan: ['Count 1 to 10 in English 🔢', 'Say "My number is..." 🎯', 'Use numbers in sentences 📝'],
    badgeEmoji: '🔢',
    badgeNama: 'Number Wizard',
    bagian1: {
      judul: 'Numbers 1-5 (Angka 1-5)',
      vocab: [
        {emoji: '1️⃣', word: 'One', arti: 'Satu'},
        {emoji: '2️⃣', word: 'Two', arti: 'Dua'},
        {emoji: '3️⃣', word: 'Three', arti: 'Tiga'},
        {emoji: '4️⃣', word: 'Four', arti: 'Empat'},
        {emoji: '5️⃣', word: 'Five', arti: 'Lima'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'How many apples? One, two, three! Three apples! 🍎', audio: true},
        {speaker: '👦 Made', text: 'My number is five! 1, 2, 3, 4, 5!', audio: true},
      ],
      quiz: {soal: '🍎🍎🍎🍎 = ? How many apples?', pilihan: ['Three 🍎', 'Four 🍎🍎', 'Five'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Numbers 6-10 (Angka 6-10)',
      vocab: [
        {emoji: '6️⃣', word: 'Six', arti: 'Enam'},
        {emoji: '7️⃣', word: 'Seven', arti: 'Tujuh'},
        {emoji: '8️⃣', word: 'Eight', arti: 'Delapan'},
        {emoji: '9️⃣', word: 'Nine', arti: 'Sembilan'},
        {emoji: '🔟', word: 'Ten', arti: 'Sepuluh'},
      ],
      song: {
        title: 'Let\'s Count!',
        lyrics: 'One, two, three, four, five! Six, seven, eight, nine, ten! Let\'s count again! One to ten! 🎵',
      },
      quiz: {soal: '🔟 = ? How do you say it?', pilihan: ['Six', 'Ten 🔟', 'Two'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '🍎🍎 = Two. 🍎🍎🍎🍎🍎🍎🍎 = ___', pilihan: ['Five', 'Seven 7️⃣', 'Eight'], jawabanIdx: 1},
      {soal: '"My number is ten!" Artinya... 🔟', pilihan: ['Nomorku sepuluh 🔟', 'Nomormu sepuluh', 'Aku suka sepuluh'], jawabanIdx: 0},
      {soal: 'After 7 comes... (setelah 7)...', pilihan: ['Six', 'Eight 8️⃣', 'Nine'], jawabanIdx: 1},
    ],
  },

  // ===== k1-bing-05: I Have Four Books =====
  {
    id: 'k1-bing-05',
    judul: 'I Have Four Books',
    emoji: '🎒',
    deskripsi: 'Let\'s learn classroom objects! Yuk belajar benda di kelas! 🎒🇬🇧',
    tujuan: ['Name classroom objects in English 🎒', 'Say "I have..." 📝', 'Count classroom objects 🔢'],
    badgeEmoji: '🎒',
    badgeNama: 'Classroom Hero',
    bagian1: {
      judul: 'Classroom Objects (Benda di Kelas)',
      vocab: [
        {emoji: '📖', word: 'Book', arti: 'Buku'},
        {emoji: '✏️', word: 'Pencil', arti: 'Pensil'},
        {emoji: '🎒', word: 'Bag', arti: 'Tas'},
        {emoji: '🪑', word: 'Chair', arti: 'Kursi'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'I have a book. I have a pencil.', audio: true},
        {speaker: '👦 Made', text: 'I have a bag. I have a chair.', audio: true},
        {speaker: '👩 Cici', text: 'How many books do you have?', audio: true},
        {speaker: '👦 Made', text: 'I have four books! 📖📖📖📖', audio: true},
      ],
      quiz: {soal: '"Book" in Indonesian is... 📖', pilihan: ['Pensil', 'Buku 📖', 'Tas'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Objects (Lagi Benda)',
      vocab: [
        {emoji: '🖊️', word: 'Pen', arti: 'Pulpen'},
        {emoji: '📏', word: 'Ruler', arti: 'Penggaris'},
        {emoji: '🖍️', word: 'Crayon', arti: 'Krayon'},
        {emoji: '🧮', word: 'Calculator', arti: 'Kalkulator'},
      ],
      song: {
        title: 'I Have A Book',
        lyrics: 'I have a book, I have a pen! I have a bag, I have a pen! School is fun! Hooray! 🎵',
      },
      quiz: {soal: '"I have a pencil." Artinya... ✏️', pilihan: ['Aku punya pensil ✏️', 'Aku punya buku', 'Kamu punya pensil'], jawabanIdx: 0},
    },
    latihan: [
      {soal: '"Ruler" in Indonesian is... 📏', pilihan: ['Pulpen', 'Penggaris 📏', 'Krayon'], jawabanIdx: 1},
      {soal: 'I have ___ chairs. 🪑🪑🪑', pilihan: ['Two', 'Three', 'Four'], jawabanIdx: 1},
      {soal: '"Pen" artinya... 🖊️', pilihan: ['Pensil', 'Pulpen 🖊️', 'Buku'], jawabanIdx: 1},
    ],
  },

  // ===== k1-bing-06: My Garden is Colorful =====
  {
    id: 'k1-bing-06',
    judul: 'My Garden Is Colorful',
    emoji: '🎨',
    deskripsi: 'Let\'s learn colors in English! Yuk belajar warna dalam Inggris! 🎨🌈',
    tujuan: ['Name colors in English 🎨', 'Describe things with colors 🌈', 'Say "My garden is colorful" 🌻'],
    badgeEmoji: '🎨',
    badgeNama: 'Color Artist',
    bagian1: {
      judul: 'Colors (Warna)',
      vocab: [
        {emoji: '❤️', word: 'Red', arti: 'Merah'},
        {emoji: '💙', word: 'Blue', arti: 'Biru'},
        {emoji: '💚', word: 'Green', arti: 'Hijau'},
        {emoji: '💛', word: 'Yellow', arti: 'Kuning'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'My garden is colorful! Look! Red flower! 🌹', audio: true},
        {speaker: '👦 Made', text: 'Wow! Blue flower! 💙 And green leaves! 🌿', audio: true},
        {speaker: '👩 Cici', text: 'Yellow sunflowers too! 🌻 So beautiful!', audio: true},
      ],
      quiz: {soal: '"Red" in Indonesian is... ❤️', pilihan: ['Biru', 'Merah ❤️', 'Hijau'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'More Colors & Describing',
      vocab: [
        {emoji: '🧡', word: 'Orange', arti: 'Oranye'},
        {emoji: '💜', word: 'Purple', arti: 'Ungu'},
        {emoji: '🤎', word: 'Brown', arti: 'Coklat'},
        {emoji: '🖤', word: 'Black', arti: 'Hitam'},
      ],
      song: {
        title: 'Rainbow Song',
        lyrics: 'Red and yellow and pink and green! Purple and orange and blue! I can sing a rainbow! Sing a rainbow too! 🎵🌈',
      },
      quiz: {soal: '"Blue" = biru. "Green" = ___ 💚', pilihan: ['Merah', 'Biru', 'Hijau 💚'], jawabanIdx: 2},
    },
    latihan: [
      {soal: '🍋 Lemon is ___ in color.', pilihan: ['Red', 'Yellow 💛', 'Blue'], jawabanIdx: 1},
      {soal: '"Purple" in Indonesian is... 💜', pilihan: ['Oranye', 'Ungu 💜', 'Coklat'], jawabanIdx: 1},
      {soal: '🌿 Grass is ___ in color.', pilihan: ['Green 💚', 'Blue', 'Red'], jawabanIdx: 0},
    ],
  },

  // ===== k1-bing-07: It is a Big Circle =====
  {
    id: 'k1-bing-07',
    judul: 'It Is a Big Circle',
    emoji: '⬭',
    deskripsi: 'Let\'s learn shapes and sizes! Yuk belajar bentuk dan ukuran! ⬭🔺🇬🇧',
    tujuan: ['Name shapes in English ⬭', 'Say big and small 🔵', 'Describe shapes and sizes 📝'],
    badgeEmoji: '⬭',
    badgeNama: 'Shape Detective',
    bagian1: {
      judul: 'Shapes (Bentuk)',
      vocab: [
        {emoji: '⬭', word: 'Circle', arti: 'Lingkaran'},
        {emoji: '⬛', word: 'Square', arti: 'Persegi'},
        {emoji: '🔺', word: 'Triangle', arti: 'Segitiga'},
        {emoji: '▬', word: 'Rectangle', arti: 'Persegi panjang'},
      ],
      dialog: [
        {speaker: '👩 Cici', text: 'Look! A circle! The clock is a circle! ⏰', audio: true},
        {speaker: '👦 Made', text: 'The window is a rectangle! 🪟', audio: true},
        {speaker: '👩 Cici', text: 'The cheese is a triangle! 🧀 So yummy!', audio: true},
      ],
      quiz: {soal: '⚽ A ball is a ___ shape.', pilihan: ['Square ⬛', 'Circle ⬭', 'Triangle 🔺'], jawabanIdx: 1},
    },
    bagian2: {
      judul: 'Big and Small (Besar dan Kecil)',
      vocab: [
        {emoji: '🐘', word: 'Big', arti: 'Besar'},
        {emoji: '🐭', word: 'Small', arti: 'Kecil'},
        {emoji: '⬭', word: 'Big circle', arti: 'Lingkaran besar'},
        {emoji: '⬭', word: 'Small square', arti: 'Persegi kecil'},
      ],
      song: {
        title: 'Shape Song',
        lyrics: 'Circle, square, triangle! Big and small! Circle, square, triangle! I see them all! 🎵',
      },
      quiz: {soal: '"Big" in Indonesian is... 🐘', pilihan: ['Kecil 🐭', 'Besar 🐘', 'Tinggi'], jawabanIdx: 1},
    },
    latihan: [
      {soal: '🔺 A triangle has ___ sides.', pilihan: ['3 🔺', '4', '0'], jawabanIdx: 0},
      {soal: '"Small square" artinya... ⬛', pilihan: ['Lingkaran besar', 'Persegi kecil ⬛', 'Segitiga kecil'], jawabanIdx: 1},
      {soal: '🐘 Elephant is ___ . 🐭 Mouse is small.', pilihan: ['Small', 'Big 🐘', 'Long'], jawabanIdx: 1},
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 7 K1 English books generated successfully!');
