const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas6/bahasa-inggris');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

function escapeHtml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJsString(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'");
}

function renderQuizBox(quiz, idx) {
  return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">🤔 ${escapeHtml(quiz.soal)}</p>
          <div class="quiz-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${escapeHtml(p)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:10px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
}

function renderVocabGrid(vocab) {
  return vocab.map(v => `
    <div class="vocab-card" style="border: 1px solid #ddd; border-radius: 8px; padding: 12px; text-align: center; background: #fff;">
      <div class="emoji" style="font-size: 32px; margin-bottom: 8px;">${v.emoji}</div>
      <div class="word" style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${escapeHtml(v.word)}</div>
      <div class="meaning" style="font-size: 14px; color: #666; margin-bottom: 8px;">(${escapeHtml(v.meaning)})</div>
      <button class="audio-btn" onclick="speakEnglish('${escapeJsString(v.word)}')" style="background: #e3f2fd; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer;">🔊</button>
    </div>
  `).join('');
}

function renderDialogue(dialogue) {
  return dialogue.map(l => `
    <div class="dialogue-line" style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
      <span class="speaker" style="font-weight: bold; color: #1565c0;">${l.speaker}:</span>
      <div style="margin-top: 4px;">
        <span>"${escapeHtml(l.text)}"</span>
        <button class="audio-btn" style="width: 30px; height: 30px; font-size: 14px; margin-left: 8px; background: #e3f2fd; border: none; border-radius: 4px; cursor: pointer;" onclick="speakEnglish('${escapeJsString(l.text)}')">🔊</button>
        <div style="font-size: 14px; color: #666; margin-top: 4px;">(${escapeHtml(l.meaning)})</div>
      </div>
    </div>
  `).join('');
}

function renderGrammarExamples(examples) {
  if (!examples || examples.length === 0) return '';
  return examples.map(ex => `
    <div style="margin-bottom: 12px; padding: 12px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
      <div style="font-weight: bold; font-size: 16px;">${escapeHtml(ex.en)}</div>
      <div style="font-size: 14px; color: #666; margin-top: 4px;">(${escapeHtml(ex.id)})</div>
      <button class="audio-btn" style="margin-top: 6px; background: #fff3e0; border: none; border-radius: 4px; padding: 4px 10px; cursor: pointer;" onclick="speakEnglish('${escapeJsString(ex.en)}')">🔊</button>
    </div>
  `).join('');
}

function renderBook(data) {
  // 2 CP1 + 2 CP2 + 5 exercises = 9 sections
  const jawaban = [
    data.bagian1.quiz[0].jawabanIdx,
    data.bagian1.quiz[1].jawabanIdx,
    data.bagian2.quiz[0].jawabanIdx,
    data.bagian2.quiz[1].jawabanIdx,
    ...data.latihan.map((s) => s.jawabanIdx),
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — English Grade 6</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas6-bing { font-size:16px; line-height:1.6; }
    .kelas6-bing .section-header { font-size:18px; }
    .kelas6-bing .section-body { font-size:16px; }
    .kelas6-bing .quiz-box p { font-size:16px; }
    .kelas6-bing .feedback { font-size:16px; }
    .kelas6-bing h1 { font-size:24px; }
    .vocab-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-top: 16px; }
    .vocab-card { transition: transform 0.2s; }
    .vocab-card:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .audio-btn:hover { background: #bbdefb !important; }
    .dialogue-line { animation: fadeIn 0.3s; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .song-box { background: #fff3e0; border-radius: 12px; padding: 20px; margin-top: 16px; }
  </style>
</head>
<body class="kelas6-bing" data-kelas="6" data-pelajaran="bing" data-materi="${data.id}" style="background-color: ${data.bgColor}; --bg: ${data.bgColor};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Main Page <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 24px;">${escapeHtml(data.judul)}</h1>
        <p style="color: #666; font-size: 16px;">Bahasa Inggris — Kelas 6 (Fase A)</p>
        <p style="margin-top: 16px; font-size: 16px;">${escapeHtml(data.deskripsi)}</p>
        <button class="btn" style="margin-top: 24px; background: #1565c0;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Let's Go! 🚀</button>
      </div>
    </div>

    <!-- Goals -->
    <div class="section-card">
      <div class="section-header">🎯 After this you can... <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <p>Setelah mempelajari unit ini, kamu akan bisa:</p>
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1: New Words + Let's Talk + Checkpoint 1 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 1: ${escapeHtml(data.bagian1.judul)} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <!-- New Words -->
        <h3 style="color: #1565c0; margin-bottom: 12px;">📚 New Words (Kosakata Baru)</h3>
        <p>Klik tombol suara 🔊 untuk mendengar pronunciation!</p>
        <div class="vocab-grid">
          ${renderVocabGrid(data.bagian1.vocab)}
        </div>

        <!-- Let's Talk -->
        <h3 style="color: #1565c0; margin: 24px 0 12px;">💬 Let's Talk! (Percakapan)</h3>
        <p>Ayo praktik berbicara seperti <strong>Cici & Made</strong>:</p>
        <div class="dialogue-box">
          ${renderDialogue(data.bagian1.dialogue)}
        </div>

        <!-- Checkpoint 1 -->
        <h3 style="color: #d32f2f; margin: 24px 0 12px;">🧪 Checkpoint 1</h3>
        ${renderQuizBox(data.bagian1.quiz[0], 0)}
        ${renderQuizBox(data.bagian1.quiz[1], 1)}
      </div>
    </div>

    <!-- Bagian 2: Grammar + Let's Read + Checkpoint 2 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 2: ${escapeHtml(data.bagian2.judul)} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <!-- Grammar Focus -->
        <h3 style="color: #ff9800; margin-bottom: 12px;">📝 Grammar Focus</h3>
        <p>${data.bagian2.grammarNote}</p>
        <div style="margin-top: 12px;">
          ${renderGrammarExamples(data.bagian2.examples)}
        </div>

        <!-- Let's Read -->
        <h3 style="color: #4caf50; margin: 24px 0 12px;">📖 Let's Read!</h3>
        <div style="background: #e8f5e9; border-radius: 8px; padding: 16px; margin-bottom: 16px; white-space: pre-line; font-size: 16px; line-height: 1.7;">
          ${escapeHtml(data.bagian2.reading)}
        </div>

        <!-- Checkpoint 2 -->
        <h3 style="color: #d32f2f; margin: 24px 0 12px;">🧪 Checkpoint 2</h3>
        ${renderQuizBox(data.bagian2.quiz[0], 2)}
        ${renderQuizBox(data.bagian2.quiz[1], 3)}
      </div>
    </div>

    <!-- Latihan Soal (5 soal) -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <p style="font-weight:bold; font-size: 18px;">💪 Kerjakan soal-soal berikut dengan saksama!</p>
        <p style="color: #666;">Pilih jawaban yang paling tepat. Kamu boleh mencoba lagi jika belum tepat.</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 4;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">${si + 1}. ${escapeHtml(soal.soal)}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${escapeHtml(p)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Summary & Badge <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 16px;">
        <p>Excellent! You completed <strong>${escapeHtml(data.judul)}</strong>!</p>
        <p style="margin-top: 16px;">Badge earned:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #1565c0; font-size: 22px;">${escapeHtml(data.badgeNama)}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐ · +XP</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Complete all quizzes above first)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">AI Tutor (English K6)</div>
      <div class="ai-msgs" style="font-size: 15px;">
        <div class="msg ai">Hello! I'm your English tutor. Ask me about ${escapeHtml(data.judul)} anytime! 📚</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Type your question...">
        <button onclick="sendToAI()">Send</button>
      </div>
    </div>
  </div>

  <script>
    window._QUIZ_ANSWERS = [${jawaban.join(', ')}];
    window._TOTAL_SECTIONS = 9;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// ============ 10 MATERI K6 B.INGGRIS ============
const materiList = [
  // ===== k6-bing-01 =====
  {
    id: 'k6-bing-01',
    judul: 'I Studied Last Night, But My Sister Didn\'t',
    emoji: '📚',
    deskripsi: 'Learn Past Simple: regular verbs (-ed), negative form, and daily activities.',
    bgColor: '#FFEBEE',
    tujuan: [
      'Use Past Simple for finished actions 📚',
      'Form regular verbs with -ed (study → studied) ✏️',
      'Make negative sentences with "didn\'t" 🚫',
    ],
    badgeEmoji: '📚',
    badgeNama: 'Past Tense Master',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'studied', meaning: 'belajar', emoji: '📚' },
        { word: 'watched', meaning: 'menonton', emoji: '📺' },
        { word: 'cooked', meaning: 'memasak', emoji: '🍳' },
        { word: 'played', meaning: 'bermain', emoji: '⚽' },
        { word: 'cleaned', meaning: 'membersihkan', emoji: '🧹' },
        { word: 'visited', meaning: 'mengunjungi', emoji: '🏛️' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'What did you do yesterday?', meaning: 'Kamu lakukan apa kemarin?' },
        { speaker: 'Made', text: 'I studied last night. But my sister didn\'t.', meaning: 'Aku belajar tadi malam. Tapi adikku tidak.' },
        { speaker: 'Cici', text: 'What did she do?', meaning: 'Dia lakukan apa?' },
        { speaker: 'Made', text: 'She watched TV.', meaning: 'Dia nonton TV.' },
      ],
      quiz: [
        { soal: "'Studied' is the past form of...", pilihan: ['study', 'studying', 'student'], jawabanIdx: 0 },
        { soal: 'I ___ TV last night. (watch)', pilihan: ['watch', 'watched', 'watching'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Past Simple = kegiatan yang SUDAH TERJADI (finished). Regular verbs: tambahkan -ed → study → studied, watch → watched, cook → cooked. Negative: didn\'t + base verb (I didn\'t study).',
      examples: [
        { en: 'I studied English yesterday.', id: 'Aku belajar Bahasa Inggris kemarin.' },
        { en: 'She didn\'t play games.', id: 'Dia tidak main game.' },
        { en: 'We cooked dinner together.', id: 'Kita masak malam bareng.' },
      ],
      reading: 'Last night, Cici studied for her test. She reviewed vocabulary and grammar. Her brother Made didn\'t study — he played video games instead. Their mother cooked fried rice for dinner. Everyone had a normal evening at home.',
      quiz: [
        { soal: 'Negative form of "I watched TV" is...', pilihan: ['I didn\'t watch TV', 'I don\'t watch TV', 'I not watch TV'], jawabanIdx: 0 },
        { soal: 'Past form of "clean" is...', pilihan: ['cleaned', 'clean', 'cleaning'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Choose the correct past form: "visit" → ___', pilihan: ['visited', 'visiting', 'visit'], jawabanIdx: 0 },
      { soal: 'Fill the blank: She ___ the house yesterday. (clean)', pilihan: ['clean', 'cleaned', 'cleans'], jawabanIdx: 1 },
      { soal: 'Negative: "He played football." → He ___ football.', pilihan: ['didn\'t play', 'doesn\'t play', 'don\'t play'], jawabanIdx: 0 },
      { soal: 'True/False: "Didn\'t" is used with base verb.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
      { soal: 'Arrange: "did / you / what / do / yesterday"', pilihan: ['What did you do yesterday?', 'What do you did yesterday?', 'Did what you do yesterday?'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-02 =====
  {
    id: 'k6-bing-02',
    judul: 'What an Experience!',
    emoji: '✨',
    deskripsi: 'Learn Recount text: past events, time connectives (first, then, finally), and holiday stories.',
    bgColor: '#E3F2FD',
    tujuan: [
      'Identify Recount text structure 📖',
      'Use time connectives: first, then, finally ⏰',
      'Retell a holiday experience in English ✈️',
    ],
    badgeEmoji: '✈️',
    badgeNama: 'Storyteller',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'holiday', meaning: 'liburan', emoji: '🏖️' },
        { word: 'visited', meaning: 'mengunjungi', emoji: '🏛️' },
        { word: 'ate', meaning: 'makan', emoji: '🍚' },
        { word: 'bought', meaning: 'membeli', emoji: '🛍️' },
        { word: 'amazing', meaning: 'luar biasa', emoji: '✨' },
        { word: 'experience', meaning: 'pengalaman', emoji: '📸' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'How was your holiday?', meaning: 'Liburannya gimana?' },
        { speaker: 'Made', text: 'Amazing! I went to Yogyakarta.', meaning: 'Luar biasa! Aku ke Yogya.' },
        { speaker: 'Cici', text: 'What did you do there?', meaning: 'Lakukan apa di sana?' },
        { speaker: 'Made', text: 'First, I visited Borobudur. Then, I ate gudeg.', meaning: 'Pertama, kunjungi Borobudur. Terus, makan gudeg.' },
      ],
      quiz: [
        { soal: '"First, then, finally" are...', pilihan: ['Time connectives', 'Adjectives', 'Prepositions'], jawabanIdx: 0 },
        { soal: 'Past form of "buy" is...', pilihan: ['buyed', 'bought', 'buying'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Recount text = cerita pengalaman masa lalu. Struktur: Orientation (siapa, kapan, di mana) → Events (urut waktu) → Re-orientation (kesan). Gunakan time connectives: First, Then, After that, Finally.',
      examples: [
        { en: 'First, we visited the museum.', id: 'Pertama, kita kunjungi museum.' },
        { en: 'Then, we ate traditional food.', id: 'Kemudian, kita makan makanan tradisional.' },
        { en: 'Finally, we went home happily.', id: 'Akhirnya, kita pulang dengan senang.' },
      ],
      reading: 'Last holiday, Cici went to Yogyakarta with her family. First, they visited Borobudur Temple early in the morning. The sunrise was beautiful! Then, they walked around Malioboro Street and ate gudeg for lunch. After that, they bought batik shirts as souvenirs. Finally, they took a train back home. It was an amazing experience!',
      quiz: [
        { soal: 'The structure of Recount text is...', pilihan: ['Orientation → Events → Re-orientation', 'Introduction → Body → Conclusion', 'Problem → Solution → Result'], jawabanIdx: 0 },
        { soal: '"Finally" in Indonesian is...', pilihan: ['Pertama', 'Kemudian', 'Akhirnya'], jawabanIdx: 2 },
      ],
    },
    latihan: [
      { soal: 'Match: "First" → Indonesian', pilihan: ['Akhirnya', 'Pertama', 'Kemudian'], jawabanIdx: 1 },
      { soal: 'Past of "go" is...', pilihan: ['goed', 'went', 'gone'], jawabanIdx: 1 },
      { soal: 'Fill: They ___ gudeg for lunch. (eat)', pilihan: ['eat', 'ate', 'eaten'], jawabanIdx: 1 },
      { soal: 'Choose: "First, ___ visited the temple."', pilihan: ['they', 'them', 'their'], jawabanIdx: 0 },
      { soal: 'True/False: Recount text tells past experience.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-03 =====
  {
    id: 'k6-bing-03',
    judul: 'I Was In Bali Last Week',
    emoji: '🏝️',
    deskripsi: 'Learn Past Simple "was/were": travel, places, and describing past locations.',
    bgColor: '#FFFDE7',
    tujuan: [
      'Use "was/were" for past locations 🏝️',
      'Distinguish: was (I/he/she/it) vs were (you/we/they) 👥',
      'Describe a past trip in English 🗺️',
    ],
    badgeEmoji: '🏝️',
    badgeNama: 'Traveler',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'Bali', meaning: 'Bali', emoji: '🏝️' },
        { word: 'beach', meaning: 'pantai', emoji: '🏖️' },
        { word: 'beautiful', meaning: 'indah', emoji: '🌸' },
        { word: 'hotel', meaning: 'hotel', emoji: '🏨' },
        { word: 'swam', meaning: 'berenang', emoji: '🏊' },
        { word: 'sunset', meaning: 'matahari terbenam', emoji: '🌅' },
      ],
      dialogue: [
        { speaker: 'Made', text: 'Where did you go last week?', meaning: 'Kemana kamu minggu lalu?' },
        { speaker: 'Cici', text: 'I was in Bali! The beach was beautiful.', meaning: 'Aku di Bali! Pantainya indah.' },
        { speaker: 'Made', text: 'Were you there alone?', meaning: 'Kamu sendirian di sana?' },
        { speaker: 'Cici', text: 'No, I was with my family.', meaning: 'Tidak, aku dengan keluarga.' },
      ],
      quiz: [
        { soal: '"Was" is used with...', pilihan: ['I / he / she / it', 'you / we / they', 'all subjects'], jawabanIdx: 0 },
        { soal: 'Past of "is/am" is...', pilihan: ['were', 'was', 'be'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Past Simple "be": was (I/he/she/it) — were (you/we/they). Contoh: I was in Bali. They were happy. Negative: was not (wasn\'t) / were not (weren\'t). Question: Was she...? / Were they...?',
      examples: [
        { en: 'I was at the beach yesterday.', id: 'Aku di pantai kemarin.' },
        { en: 'They were not at home.', id: 'Mereka tidak di rumah.' },
        { en: 'Was the water cold?', id: 'Apakah airnya dingin?' },
      ],
      reading: 'Made asked Cici about her trip. "Where did you go last week?" Cici answered, "I was in Bali! The beach was beautiful and the water was warm." She swam every morning. Her parents were happy too. They stayed in a nice hotel near the sunset point. Every evening, they watched the sunset together.',
      quiz: [
        { soal: 'Cici ___ in Bali last week.', pilihan: ['was', 'were', 'is'], jawabanIdx: 0 },
        { soal: 'Negative: "The beach was beautiful." → The beach ___ beautiful.', pilihan: ['wasn\'t', 'weren\'t', 'isn\'t'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Choose: "She ___ happy yesterday."', pilihan: ['was', 'were', 'is'], jawabanIdx: 0 },
      { soal: 'Fill: They ___ at the hotel. (be)', pilihan: ['was', 'were', 'are'], jawabanIdx: 1 },
      { soal: 'Match: "weren\'t" =', pilihan: ['were not', 'was not', 'are not'], jawabanIdx: 0 },
      { soal: 'Question form: "___ you in Bandung?"', pilihan: ['Was', 'Were', 'Did'], jawabanIdx: 1 },
      { soal: 'True/False: "Were" is used with "I".', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 1 },
    ],
  },

  // ===== k6-bing-04 =====
  {
    id: 'k6-bing-04',
    judul: 'How did Cici feel yesterday?',
    emoji: '😊',
    deskripsi: 'Learn feelings & emotions vocabulary + past simple "felt" for describing emotions.',
    bgColor: '#E8F5E9',
    tujuan: [
      'Name emotions in English: happy, sad, angry, excited 😊',
      'Use "felt" (past of feel) for past emotions 💭',
      'Ask and answer "How did you feel?" 🗣️',
    ],
    badgeEmoji: '😊',
    badgeNama: 'Emotion Expert',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'happy', meaning: 'senang', emoji: '😊' },
        { word: 'sad', meaning: 'sedih', emoji: '😢' },
        { word: 'angry', meaning: 'marah', emoji: '😠' },
        { word: 'excited', meaning: 'bersemangat', emoji: '🤩' },
        { word: 'nervous', meaning: 'gugup', emoji: '😰' },
        { word: 'proud', meaning: 'bangga', emoji: '🏆' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'I won the competition!', meaning: 'Aku menang lomba!' },
        { speaker: 'Made', text: 'Wow! How did you feel?', meaning: 'Wow! Perasaanmu gimana?' },
        { speaker: 'Cici', text: 'I felt so happy and proud!', meaning: 'Aku merasa sangat senang dan bangga!' },
        { speaker: 'Made', text: 'I lost my game. I felt sad.', meaning: 'Aku kalah game. Aku sedih.' },
      ],
      quiz: [
        { soal: 'Past form of "feel" is...', pilihan: ['feeled', 'felt', 'feeling'], jawabanIdx: 1 },
        { soal: '"Proud" in Indonesian is...', pilihan: ['malu', 'bangga', 'marah'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Feelings = perasaan. Past: feel → felt. How did you feel? = Bagaimana perasaanmu? Jawab dengan "I felt [adjective]." Contoh: I felt happy. She felt nervous. They felt excited.',
      examples: [
        { en: 'I felt happy when I won.', id: 'Aku senang waktu menang.' },
        { en: 'She felt nervous before the test.', id: 'Dia gugup sebelum ujian.' },
        { en: 'They felt excited about the trip.', id: 'Mereka bersemangat soal trip.' },
      ],
      reading: 'Yesterday was an emotional day. Cici won the spelling competition. She felt happy and proud. Her friend Made lost the football match. He felt sad and a little angry. But then Cici cheered him up. "Don\'t worry! You\'ll do better next time." Made felt better and thanked her. In the end, both felt grateful for their friendship.',
      quiz: [
        { soal: 'Cici won. She felt ___', pilihan: ['happy', 'sad', 'angry'], jawabanIdx: 0 },
        { soal: 'Question: "How ___ you feel?"', pilihan: ['do', 'did', 'are'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Match: "angry" → emoji', pilihan: ['😊', '😢', '😠'], jawabanIdx: 2 },
      { soal: 'Fill: I ___ nervous before the exam. (feel)', pilihan: ['feel', 'felt', 'feels'], jawabanIdx: 1 },
      { soal: 'Choose: "She ___ proud of her score."', pilihan: ['felt', 'feel', 'feels'], jawabanIdx: 0 },
      { soal: 'Listen & Choose: 🔊 "excited" →', pilihan: ['😊', '🤩', '😢'], jawabanIdx: 1 },
      { soal: 'True/False: "Felt" is past of "feel".', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-05 =====
  {
    id: 'k6-bing-05',
    judul: 'What did you do yesterday?',
    emoji: '⏰',
    deskripsi: 'Practice daily activities in Past Simple: regular & irregular verbs (wake/woke, eat/ate, go/went).',
    bgColor: '#F3E5F5',
    tujuan: [
      'Use Past Simple for daily routines ⏰',
      'Master common irregular verbs (wake→woke, eat→ate, go→went) 🔄',
      'Ask and answer "What did you do...?" 🗣️',
    ],
    badgeEmoji: '⏰',
    badgeNama: 'Daily Logger',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'woke up', meaning: 'bangun tidur', emoji: '⏰' },
        { word: 'had breakfast', meaning: 'sarapan', emoji: '🍞' },
        { word: 'went to school', meaning: 'pergi sekolah', emoji: '🏫' },
        { word: 'did homework', meaning: 'kerjakan PR', emoji: '📝' },
        { word: 'ate lunch', meaning: 'makan siang', emoji: '🍚' },
        { word: 'went home', meaning: 'pulang', emoji: '🏠' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'What did you do yesterday morning?', meaning: 'Kamu lakukan apa kemarin pagi?' },
        { speaker: 'Made', text: 'I woke up at 6. Then I had breakfast.', meaning: 'Aku bangun jam 6. Lalu sarapan.' },
        { speaker: 'Cici', text: 'Did you go to school?', meaning: 'Kamu ke sekolah?' },
        { speaker: 'Made', text: 'Yes, I went to school by bike.', meaning: 'Ya, aku ke sekolah naik sepeda.' },
      ],
      quiz: [
        { soal: 'Past of "wake up" is...', pilihan: ['woked up', 'woke up', 'waking up'], jawabanIdx: 1 },
        { soal: 'Past of "have" (eat) is...', pilihan: ['haved', 'had', 'having'], jawabanIdx: 1 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Irregular verbs = tak beraturan. Hafal pasangan: wake → woke, have → had, go → went, do → did, eat → ate, get → got. Question: What did you do? Answer: I [past verb]... Negative: I didn\'t [base verb].',
      examples: [
        { en: 'I woke up early.', id: 'Aku bangun pagi.' },
        { en: 'She didn\'t do her homework.', id: 'Dia tidak kerjakan PR.' },
        { en: 'We went to the park.', id: 'Kita ke taman.' },
      ],
      reading: 'Cici asked Made about his day. "What did you do yesterday?" Made said, "I woke up at 6 AM. I had bread and milk for breakfast. I went to school by bike. At school, I did my homework in the library. I ate fried rice for lunch. After school, I went home and played with my cat." Cici smiled. "Sounds like a busy but fun day!"',
      quiz: [
        { soal: 'Past of "go" is...', pilihan: ['goed', 'went', 'gone'], jawabanIdx: 1 },
        { soal: 'Negative: "I did my homework." → I ___ my homework.', pilihan: ['didn\'t do', 'don\'t do', 'not do'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Match: "ate" → base form', pilihan: ['eat', 'ate', 'eaten'], jawabanIdx: 0 },
      { soal: 'Fill: She ___ up at 7. (wake)', pilihan: ['woke', 'waked', 'wakes'], jawabanIdx: 0 },
      { soal: 'Choose: "They ___ to school by bus."', pilihan: ['went', 'go', 'goed'], jawabanIdx: 0 },
      { soal: 'Arrange: "did / homework / you / your / do"', pilihan: ['Did you do your homework?', 'Did your homework you do?', 'Do did you your homework?'], jawabanIdx: 0 },
      { soal: 'True/False: "Had" is past of "have".', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-06 =====
  {
    id: 'k6-bing-06',
    judul: 'My Friend\'s Experience',
    emoji: '👥',
    deskripsi: 'Learn Recount text about a friend: third person past, pronouns, and retelling stories.',
    bgColor: '#FFF3E0',
    tujuan: [
      'Write Recount text about someone else 👥',
      'Use third person pronouns (he/she/they) correctly 👤',
      'Retell a friend\'s past experience 📖',
    ],
    badgeEmoji: '👥',
    badgeNama: 'Biographer',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'friend', meaning: 'teman', emoji: '👫' },
        { word: 'experience', meaning: 'pengalaman', emoji: '📸' },
        { word: 'climbed', meaning: 'memanjat', emoji: '🧗' },
        { word: 'reached', meaning: 'mencapai', emoji: '🏔️' },
        { word: 'tired', meaning: 'lelah', emoji: '😴' },
        { word: 'proud', meaning: 'bangga', emoji: '🏆' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'Tell me about your friend\'s trip.', meaning: 'Cerita trip temanmu dong.' },
        { speaker: 'Made', text: 'My friend Andi climbed a mountain.', meaning: 'Temanku Andi naik gunung.' },
        { speaker: 'Cici', text: 'Was it hard?', meaning: 'Sulit nggak?' },
        { speaker: 'Made', text: 'Yes, he was tired but proud.', meaning: 'Ya, dia lelah tapi bangga.' },
      ],
      quiz: [
        { soal: 'Third person singular pronoun is...', pilihan: ['I', 'he/she', 'we'], jawabanIdx: 1 },
        { soal: 'Past of "climb" is...', pilihan: ['climbed', 'climb', 'climbing'], jawabanIdx: 0 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Recount orang lain = pakai dia (he/she). Contoh: He climbed the mountain. She reached the top. They were happy. Gunakan time connectives: First, Then, Finally. Past simple tetap sama: V2 atau was/were.',
      examples: [
        { en: 'He climbed Mount Merapi.', id: 'Dia naik Gunung Merapi.' },
        { en: 'She reached the summit at noon.', id: 'Dia puncak siang hari.' },
        { en: 'They were tired but proud.', id: 'Mereka lelah tapi bangga.' },
      ],
      reading: 'Made told Cici about his friend Andi. Last weekend, Andi climbed Mount Merapi. First, he prepared his gear. Then, he started hiking at 5 AM. The path was steep. After 4 hours, he reached the summit. He was very tired but proud. He took many photos. Finally, he went down safely. What an adventure!',
      quiz: [
        { soal: 'Andi climbed the mountain. Pronoun for Andi is...', pilihan: ['he', 'she', 'it'], jawabanIdx: 0 },
        { soal: 'Past of "reach" is...', pilihan: ['reached', 'reach', 'reaching'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Fill: He ___ the mountain last week. (climb)', pilihan: ['climbed', 'climb', 'climbing'], jawabanIdx: 0 },
      { soal: 'Choose: "___ was tired but happy."', pilihan: ['He', 'Him', 'His'], jawabanIdx: 0 },
      { soal: 'Match: "reached" → base form', pilihan: ['reach', 'reaching', 'reached'], jawabanIdx: 0 },
      { soal: 'Arrange: "was / he / tired / but / proud"', pilihan: ['He was tired but proud.', 'Tired but proud he was.', 'Was he tired but proud?'], jawabanIdx: 0 },
      { soal: 'True/False: Third person uses "he/she".', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-07 =====
  {
    id: 'k6-bing-07',
    judul: 'I will go to Bromo',
    emoji: '🌋',
    deskripsi: 'Learn Future Tense "will": vacation plans, predictions, and spontaneous decisions.',
    bgColor: '#E0F7FA',
    tujuan: [
      'Use "will" for future plans 🌋',
      'Form: will + base verb (I will go, She will visit) ✏️',
      'Ask and answer about future plans 🗓️',
    ],
    badgeEmoji: '🌋',
    badgeNama: 'Future Planner',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'Bromo', meaning: 'Gunung Bromo', emoji: '🌋' },
        { word: 'will go', meaning: 'akan pergi', emoji: '🚗' },
        { word: 'next month', meaning: 'bulan depan', emoji: '📅' },
        { word: 'grandma', meaning: 'nenek', emoji: '👵' },
        { word: 'visit', meaning: 'mengunjungi', emoji: '🏠' },
        { word: 'next week', meaning: 'minggu depan', emoji: '📆' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'What are your plans for next month?', meaning: 'Rencana bulan depan apa?' },
        { speaker: 'Made', text: 'I will go to Bromo with my dad.', meaning: 'Aku akan ke Bromo sama ayah.' },
        { speaker: 'Cici', text: 'Nice! I will visit my grandma next week.', meaning: 'Keren! Aku bakal ke nenek minggu depan.' },
        { speaker: 'Made', text: 'We will have fun!', meaning: 'Kita bakal seru!' },
      ],
      quiz: [
        { soal: '"Will" is used for...', pilihan: ['Past', 'Present', 'Future'], jawabanIdx: 2 },
        { soal: 'Form: I ___ go to Bromo.', pilihan: ['will', 'am', 'was'], jawabanIdx: 0 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Future Simple "will": rencana masa depan, prediksi, keputusan spontan. Rumus: Subject + will + base verb. Negative: will not (won\'t). Question: Will you...? Contoh: I will go. She will visit. They won\'t come. Will we meet?',
      examples: [
        { en: 'I will go to Bromo next month.', id: 'Aku akan ke Bromo bulan depan.' },
        { en: 'She won\'t forget her homework.', id: 'Dia tidak lupa PR.' },
        { en: 'Will they visit us tomorrow?', id: 'Mereka akan ke sini besok?' },
      ],
      reading: 'Cici and Made talked about holiday plans. "I will go to Bromo next month with my dad," said Made. "We will watch the sunrise from Penanjakan." Cici replied, "I will visit my grandma in Solo next week. She will cook my favorite food!" Both are excited. "We will have fun!" they said together.',
      quiz: [
        { soal: 'Negative of "I will go" is...', pilihan: ['I won\'t go', 'I don\'t go', 'I not go'], jawabanIdx: 0 },
        { soal: 'Question: "___ you visit grandma?"', pilihan: ['Will', 'Do', 'Did'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Fill: She ___ visit her friend tomorrow. (will)', pilihan: ['will', 'will not', 'wills'], jawabanIdx: 0 },
      { soal: 'Choose: "We ___ have a party next week."', pilihan: ['will', 'are', 'were'], jawabanIdx: 0 },
      { soal: 'Match: "won\'t" =', pilihan: ['will not', 'would not', 'want not'], jawabanIdx: 0 },
      { soal: 'Arrange: "will / I / Bromo / go / to"', pilihan: ['I will go to Bromo.', 'Will I go to Bromo?', 'To Bromo I will go.'], jawabanIdx: 0 },
      { soal: 'True/False: "Will" is followed by base verb.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-08 =====
  {
    id: 'k6-bing-08',
    judul: 'We Will Have Fun!',
    emoji: '🎉',
    deskripsi: 'Learn Future "going to" vs "will": planned future, preparations, and holiday activities.',
    bgColor: '#FCE4EC',
    tujuan: [
      'Distinguish "will" (spontaneous) vs "going to" (planned) 📋',
      'Use "going to" for prepared future plans 🎒',
      'Talk about holiday preparations 🎉',
    ],
    badgeEmoji: '🎉',
    badgeNama: 'Fun Maker',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'prepare', meaning: 'menyiapkan', emoji: '🎒' },
        { word: 'pack', meaning: 'membungkus/packing', emoji: '🧳' },
        { word: 'ticket', meaning: 'tiket', emoji: '🎫' },
        { word: 'going to', meaning: 'akan (rencana)', emoji: '📋' },
        { word: 'holiday', meaning: 'liburan', emoji: '🏖️' },
        { word: 'excited', meaning: 'bersemangat', emoji: '🤩' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'Are you ready for the holiday?', meaning: 'Kamu siap liburan?' },
        { speaker: 'Made', text: 'Yes! I am going to pack my bag tonight.', meaning: 'Siap! Akan packing tas malam ini.' },
        { speaker: 'Cici', text: 'I bought the tickets yesterday.', meaning: 'Aku beli tiket kemarin.' },
        { speaker: 'Made', text: 'Great! We are going to have fun!', meaning: 'Mantap! Kita akan seru!' },
      ],
      quiz: [
        { soal: '"Going to" is used for...', pilihan: ['Planned future', 'Past habit', 'Present fact'], jawabanIdx: 0 },
        { soal: 'Form: I am ___ to pack.', pilihan: ['going', 'go', 'went'], jawabanIdx: 0 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Going to = rencana sudah disiapkan. Rumus: am/is/are + going to + base verb. Contoh: I am going to pack. She is going to buy tickets. Will = keputusan spontan / prediksi. Contoh: "It will rain" (prediksi). "I\'ll help you" (spontan).',
      examples: [
        { en: 'I am going to pack my clothes.', id: 'Aku akan packing baju.' },
        { en: 'She is going to buy tickets.', id: 'Dia akan beli tiket.' },
        { en: 'We are going to have fun!', id: 'Kita akan seru!' },
      ],
      reading: 'The holiday is coming! Made is going to pack his backpack tonight. He is going to bring a jacket, snacks, and a camera. Cici already bought the train tickets last week. She is going to meet Made at the station at 7 AM. Their teacher said, "You will learn many things on this trip." Everyone is excited!',
      quiz: [
        { soal: 'Cici bought tickets. This is...', pilihan: ['Planned (going to)', 'Spontaneous (will)'], jawabanIdx: 0 },
        { soal: 'Form: She ___ going to buy tickets.', pilihan: ['is', 'am', 'are'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Fill: I ___ going to prepare my bag. (am/is/are)', pilihan: ['am', 'is', 'are'], jawabanIdx: 0 },
      { soal: 'Choose: "They ___ going to the beach."', pilihan: ['are', 'is', 'am'], jawabanIdx: 0 },
      { soal: 'Match: "will" → spontaneous decision', pilihan: ['📋 planned', '⚡ spontaneous', '📜 past'], jawabanIdx: 1 },
      { soal: 'Arrange: "going / to / am / I / pack"', pilihan: ['I am going to pack.', 'Am I going to pack?', 'Pack I am going to.'], jawabanIdx: 0 },
      { soal: 'True/False: "Going to" = already planned.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-09 =====
  {
    id: 'k6-bing-09',
    judul: 'Tomorrow, Next Year',
    emoji: '📅',
    deskripsi: 'Learn time adverbials for future: tomorrow, next week/month/year, in 2 days, soon.',
    bgColor: '#E3F2FD',
    tujuan: [
      'Use future time signals: tomorrow, next week, in 3 days 📅',
      'Place time adverbials correctly in sentences ⏰',
      'Make a future schedule in English 🗓️',
    ],
    badgeEmoji: '📅',
    badgeNama: 'Time Keeper',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'tomorrow', meaning: 'besok', emoji: '🌅' },
        { word: 'next week', meaning: 'minggu depan', emoji: '📆' },
        { word: 'next month', meaning: 'bulan depan', emoji: '🗓️' },
        { word: 'next year', meaning: 'tahun depan', emoji: '🎊' },
        { word: 'in two days', meaning: 'dalam 2 hari', emoji: '⏳' },
        { word: 'soon', meaning: 'segera', emoji: '🚀' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'When will you go to Bromo?', meaning: 'Kapan kamu ke Bromo?' },
        { speaker: 'Made', text: 'I will go next month.', meaning: 'Aku akan ke bulan depan.' },
        { speaker: 'Cici', text: 'I will visit grandma in two days.', meaning: 'Aku ke nenek dalam 2 hari.' },
        { speaker: 'Made', text: 'See you soon!', meaning: 'Sampai jumpa segera!' },
      ],
      quiz: [
        { soal: '"Tomorrow" means...', pilihan: ['besok', 'kemarin', 'lusa'], jawabanIdx: 0 },
        { soal: '"Next year" in Indonesian is...', pilihan: ['tahun lalu', 'tahun ini', 'tahun depan'], jawabanIdx: 2 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Future time adverbials = penanda waktu masa depan. Posisi: akhir kalimat atau awal. Contoh: I will go tomorrow. Next week, she will visit. In 3 days, we will leave. Soon = segera (tidak spesifik).',
      examples: [
        { en: 'I will go tomorrow.', id: 'Aku akan pergi besok.' },
        { en: 'Next week, she will start school.', id: 'Minggu depan, dia mulai sekolah.' },
        { en: 'We will meet in two days.', id: 'Kita akan ketemu dalam 2 hari.' },
      ],
      reading: 'Cici made a future schedule. Tomorrow, she will help her mom cook. In two days, she will go to the library. Next week, she will visit her grandma in Solo. Next month, her family will go to the beach. Next year, she hopes to go to high school! She wrote everything in her planner. "Planning makes me feel ready!" she said.',
      quiz: [
        { soal: 'Time adverbial usually goes at...', pilihan: ['End or beginning of sentence', 'Middle only', 'Before subject only'], jawabanIdx: 0 },
        { soal: '"In three days" =', pilihan: ['3 hari lalu', 'dalam 3 hari', '3 minggu depan'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Match: "soon" → Indonesian', pilihan: ['nanti', 'segera', 'kemarin'], jawabanIdx: 1 },
      { soal: 'Fill: I will call you ___. (besok)', pilihan: ['tomorrow', 'yesterday', 'now'], jawabanIdx: 0 },
      { soal: 'Choose: "___ week, we have a test."', pilihan: ['Next', 'Last', 'This'], jawabanIdx: 0 },
      { soal: 'Arrange: "days / in / two / will / I / go"', pilihan: ['In two days I will go.', 'I will go in two days.', 'Will I go in two days?'], jawabanIdx: 0 },
      { soal: 'True/False: "Next month" = bulan depan.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },

  // ===== k6-bing-10 =====
  {
    id: 'k6-bing-10',
    judul: 'I want to be a pilot',
    emoji: '✈️',
    deskripsi: 'Learn jobs vocabulary, "want to be" for dreams, and future aspirations.',
    bgColor: '#FFFDE7',
    tujuan: [
      'Name jobs in English: pilot, doctor, teacher, astronaut 👨‍✈️',
      'Use "want to be" for future dreams ✨',
      'Describe why you choose a job 💭',
    ],
    badgeEmoji: '🚀',
    badgeNama: 'Dream Chaser',
    bagian1: {
      judul: 'New Words & Let\'s Talk',
      vocab: [
        { word: 'pilot', meaning: 'pilot', emoji: '✈️' },
        { word: 'doctor', meaning: 'dokter', emoji: '🩺' },
        { word: 'teacher', meaning: 'guru', emoji: '👩‍🏫' },
        { word: 'astronaut', meaning: 'astronot', emoji: '👨‍🚀' },
        { word: 'engineer', meaning: 'insinyur', emoji: '👷' },
        { word: 'dream', meaning: 'mimpi/cita-cita', emoji: '💭' },
      ],
      dialogue: [
        { speaker: 'Cici', text: 'What do you want to be?', meaning: 'Cita-citamu apa?' },
        { speaker: 'Made', text: 'I want to be a pilot. I will fly around the world!', meaning: 'Aku mau jadi pilot. Aku akan terbang keliling dunia!' },
        { speaker: 'Cici', text: 'I want to be a doctor. I will help sick people.', meaning: 'Aku mau jadi dokter. Aku akan bantu orang sakit.' },
        { speaker: 'Made', text: 'Dream big! We can do it!', meaning: 'Mimpi besar! Kita bisa!' },
      ],
      quiz: [
        { soal: '"Pilot" in Indonesian is...', pilihan: ['pemandu', 'pilot', 'penumpang'], jawabanIdx: 1 },
        { soal: '"I want to be a ___" = "Aku mau jadi ___"', pilihan: ['doctor', 'docter', 'dokter'], jawabanIdx: 0 },
      ],
    },
    bagian2: {
      judul: 'Grammar & Reading',
      grammarNote: 'Jobs = pekerjaan. Want to be = ingin menjadi. Contoh: I want to be a pilot. She wants to be a doctor (dia mau jadi dokter — tambah s untuk he/she). Why? Because... = Karena... Reason: I like flying. / I want to help people.',
      examples: [
        { en: 'I want to be a teacher.', id: 'Aku mau jadi guru.' },
        { en: 'She wants to be an astronaut.', id: 'Dia mau jadi astronot.' },
        { en: 'Why? Because I like helping people.', id: 'Karena aku suka bantu orang.' },
      ],
      reading: 'The teacher asked, "What do you want to be?" Cici said, "I want to be a pilot! I will fly around the world and see beautiful clouds." Made said, "I want to be a doctor. I will help sick people get better." Their friend Rina said, "I want to be a teacher. I will teach children to read." Everyone shared big dreams. The teacher smiled. "Dream big, work hard, and you will reach your goals!"',
      quiz: [
        { soal: 'He wants to be a pilot. "Wants" (with s) because...', pilihan: ['he = third person singular', 'pilot = singular', 'want = verb'], jawabanIdx: 0 },
        { soal: '"Why do you want to be a doctor?" Answer: "Because I want to ___ people."', pilihan: ['help', 'helps', 'helping'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Match: "astronaut" → emoji', pilihan: ['✈️', '🩺', '👨‍🚀'], jawabanIdx: 2 },
      { soal: 'Fill: She ___ to be a teacher. (want)', pilihan: ['want', 'wants', 'wanted'], jawabanIdx: 1 },
      { soal: 'Choose: "I want to be an ___."', pilihan: ['engineer', 'engineers', 'engineering'], jawabanIdx: 0 },
      { soal: 'Arrange: "be / want / to / I / pilot / a"', pilihan: ['I want to be a pilot.', 'Want I to be a pilot?', 'A pilot I want to be.'], jawabanIdx: 0 },
      { soal: 'True/False: "Want to be" expresses future dreams.', pilihan: ['TRUE', 'FALSE'], jawabanIdx: 0 },
    ],
  },
];

// ============ GENERATE FILES ============
const bankSoal = [];

materiList.forEach((data) => {
  // Generate HTML
  const html = renderBook(data);
  const filePath = path.join(outDir, `${data.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Wrote', filePath);

  // Build bank soal JSON (8 soal per unit: 2 CP1 + 2 CP2 + 4 from latihan sample)
  const unitSoal = [];

  // CP1 questions
  data.bagian1.quiz.forEach((q, i) => {
    unitSoal.push({
      id: `${data.id}-cp1-${i+1}`,
      tipe: 'choose',
      pertanyaan: q.soal,
      pilihan: q.pilihan,
      jawaban: q.pilihan[q.jawabanIdx],
    });
  });

  // CP2 questions
  data.bagian2.quiz.forEach((q, i) => {
    unitSoal.push({
      id: `${data.id}-cp2-${i+1}`,
      tipe: 'choose',
      pertanyaan: q.soal,
      pilihan: q.pilihan,
      jawaban: q.pilihan[q.jawabanIdx],
    });
  });

  // Latihan (5 soal) -> pick 4 for bank (total 8)
  data.latihan.slice(0, 4).forEach((q, i) => {
    unitSoal.push({
      id: `${data.id}-ex-${i+1}`,
      tipe: q.pilihan.includes('TRUE') || q.pilihan.includes('FALSE') ? 'truefalse' : 'choose',
      pertanyaan: q.soal,
      pilihan: q.pilihan,
      jawaban: q.pilihan[q.jawabanIdx],
    });
  });

  bankSoal.push({
    unit_id: data.id,
    soal: unitSoal,
  });
});

// Write bank soal JSON
const bankPath = path.join(dataDir, 'bank-soal-bing-k6.json');
fs.writeFileSync(bankPath, JSON.stringify(bankSoal, null, 2), 'utf8');
console.log('Wrote', bankPath);

console.log(`Done: ${materiList.length} books → ${outDir}`);
console.log(`Bank soal: ${bankSoal.reduce((sum, u) => sum + u.soal.length, 0)} questions → ${bankPath}`);