const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas3/bahasa-inggris');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function escapeHtml(unsafe) {
    if(!unsafe) return "";
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function escapeJsString(str) {
    if(!str) return "";
    return str.replace(/'/g, "\\'");
}

function template(data) {
  const answers = data.exercises.map(ex => ex.jawabanIdx);
  let bgTheme = '#FFEBEE'; // merah
  if (data.id.endsWith('02') || data.id.endsWith('06') || data.id.endsWith('10')) bgTheme = '#E3F2FD'; // biru
  else if (data.id.endsWith('03') || data.id.endsWith('07')) bgTheme = '#FFFDE7'; // kuning
  else if (data.id.endsWith('04') || data.id.endsWith('08')) bgTheme = '#E8F5E9'; // hijau

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — English Grade 3</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas3-bing" data-kelas="3" data-pelajaran="bing" data-materi="${data.id}" style="background-color: ${bgTheme}; --bg: ${bgTheme};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Main Page <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 26px;">${data.judul}</h1>
        <p style="color: #666; font-size: 18px;">Bahasa Inggris — Kelas 3 (Fase B)</p>
        <p style="margin-top: 16px; font-size: 18px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Start Learning! 🚀</button>
      </div>
    </div>

    <!-- Goals -->
    <div class="section-card">
      <div class="section-header">🎯 Learning Goals <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p>Setelah mempelajari unit ini, kamu akan bisa:</p>
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- New Words -->
    <div class="section-card">
      <div class="section-header">📖 New Words (Kosakata Baru) <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p>Klik tombol suara 🔊 untuk mendengarkan cara membacanya!</p>
        <div class="vocab-grid">
          ${data.vocab.map(v => `
          <div class="vocab-card">
            <div class="emoji">${v.emoji}</div>
            <div class="word">${v.word}</div>
            <div class="meaning">(${v.meaning})</div>
            <button class="audio-btn" onclick="speakEnglish('${escapeJsString(v.word)}')">🔊</button>
          </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Pronunciation -->
    <div class="section-card">
      <div class="section-header">🔊 Pronunciation Practice <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p>Ayo latihan mengeja kata (phonics)! Tirukan suara yang kamu dengar:</p>
        <ul style="padding-left: 20px; line-height: 2.2;">
          ${data.phonics.map(p => `
          <li><strong>${p.word}</strong> dieja: <code>${p.spell}</code> <button class="audio-btn" onclick="speakEnglish('${escapeJsString(p.word)}')">🔊</button></li>
          `).join('')}
        </ul>
      </div>
    </div>

    <!-- Dialogue -->
    <div class="section-card">
      <div class="section-header">💬 Let's Talk! (Percakapan) <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p>Ajak temanmu praktik berbicara seperti ${data.dialogue.characters.join(' & ')}:</p>
        <div class="dialogue-box">
          ${data.dialogue.lines.map(l => `
          <div class="dialogue-line">
            <span class="speaker">${l.speaker}:</span>
            <div>
              <span>"${l.text}"</span>
              <button class="audio-btn" style="width:30px;height:30px;font-size:14px;" onclick="speakEnglish('${escapeJsString(l.text)}')">🔊</button>
              <div style="font-size:14px;color:#666;">(${l.meaning})</div>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Exercises -->
    ${data.exercises.map((ex, i) => `
    <div class="section-card">
      <div class="section-header">✏️ Exercise ${i+1}: ${ex.title} <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        ${ex.hint ? `<p>${ex.hint}</p>` : ''}
        <div class="quiz-box" data-idx="${i}" data-answered="false">
          <p style="font-weight: bold; font-size: 18px;">🤔 ${escapeHtml(ex.soal)}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${ex.pilihan.map((p, pIdx) => `<button class="quiz-opt" data-opt="${pIdx}">${escapeHtml(p)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 18px;"></div>
        </div>
      </div>
    </div>
    `).join('')}

    <!-- Song -->
    <div class="section-card">
      <div class="section-header">🎵 Let's Sing / Chant! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 18px;">
        <p>Ayo nyanyikan lirik ini bersama-sama agar cepat hafal!</p>
        <div class="song-box">
          <p style="white-space: pre-line; font-weight: bold; color: #d32f2f;">${data.song.lyrics}</p>
          <button class="btn" style="margin-top: 12px; background: #ffeb3b; color: #333;" onclick="speakEnglish('${escapeJsString(data.song.lyrics.replace(/\n/g, ' '))}')">🔊 Play Song / Chant</button>
        </div>
      </div>
    </div>

    <!-- Summary & Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Summary & Badge <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 18px;">
        <p>Hebat! Kamu mendapatkan badge:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #1565c0; font-size: 22px;">${data.badgeNama}</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Complete Unit! ✅</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua 4 Exercise dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (English Teacher)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Hello! Aku guru Bahasa Inggrismu. Mau tanya arti kata atau latihan dialog soal ${data.judul}? Let's practice! 🌟</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Type here / Ketik di sini...">
        <button onclick="sendToAI()">Send</button>
      </div>
    </div>
  </div>
  <script>
    window._QUIZ_ANSWERS = ${JSON.stringify(answers)};
    window._TOTAL_SECTIONS = ${data.exercises.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// Data Array 10 Unit
const materiListBing = [
  {
    id: "k3-bing-01", emoji: "🍜",
    judul: "I Like Mi Aceh",
    deskripsi: "Belajar menyebutkan makanan dan minuman kesukaan bersama Cici dan Made!",
    tujuan: ["Menyebutkan nama-nama makanan dan minuman dalam Bahasa Inggris", "Mengucapkan kalimat I like... dan You like..."],
    badgeEmoji: "🍔", badgeNama: "Foodie Explorer",
    vocab: [
      {emoji: "🍗", word: "fried chicken", meaning: "ayam goreng"},
      {emoji: "🍜", word: "noodle", meaning: "mi"},
      {emoji: "🍚", word: "rice", meaning: "nasi"},
      {emoji: "🍡", word: "meatball", meaning: "bakso"},
      {emoji: "🍞", word: "bread", meaning: "roti"},
      {emoji: "🍛", word: "fried rice", meaning: "nasi goreng"},
      {emoji: "🍵", word: "tea", meaning: "teh"},
      {emoji: "☕", word: "coffee", meaning: "kopi"},
      {emoji: "🥛", word: "milk", meaning: "susu"},
      {emoji: "🍦", word: "ice cream", meaning: "es krim"}
    ],
    phonics: [
      {word: "chicken", spell: "CH - I - CK - EN"},
      {word: "noodle", spell: "N - OO - D - L"},
      {word: "rice", spell: "R - I - CE"},
      {word: "meatball", spell: "M - EA - T - BALL"}
    ],
    dialogue: {
      characters: ["Cici", "Made"],
      lines: [
        {speaker: "Cici", text: "I like fried chicken.", meaning: "Aku suka ayam goreng."},
        {speaker: "Made", text: "I like Mi Aceh.", meaning: "Aku suka Mi Aceh."},
        {speaker: "Cici", text: "Yummy! I like noodles too.", meaning: "Lezat! Aku suka mi juga."}
      ]
    },
    exercises: [
      {title: "Match the Emoji", soal: "Apa bahasa Inggris dari gambar ayam goreng 🍗?", pilihan: ["fried chicken", "noodle", "bread"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Klik tombol suara <button class='audio-btn' onclick=\"speakEnglish('meatball')\">🔊</button> lalu pilih kata yang kamu dengar!", soal: "Suara apakah itu?", pilihan: ["rice", "meatball", "coffee"], jawabanIdx: 1},
      {title: "Arrange Words", soal: "Susun kata ini menjadi kalimat benar: like / I / rice", pilihan: ["rice I like", "I like rice", "like I rice"], jawabanIdx: 1},
      {title: "Fill in the Blank", soal: "Cici: 'I ___ ice cream.'", pilihan: ["like", "likes", "noodle"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 I like chicken, I like rice,\nyummy yummy in my tummy!\nI like tea, I like milk,\nslurp slurp so tasty! 🎵"}
  },
  {
    id: "k3-bing-02", emoji: "🍚",
    judul: "I Don't Like Rice",
    deskripsi: "Bagaimana cara mengatakan kita tidak suka atau bertanya kepada teman? Yuk cari tahu!",
    tujuan: ["Mengucapkan kalimat I don't like...", "Bertanya dengan kalimat Do you like...?"],
    badgeEmoji: "👍", badgeNama: "Like Master",
    vocab: [
      {emoji: "👍", word: "like", meaning: "suka"},
      {emoji: "👎", word: "don't like", meaning: "tidak suka"},
      {emoji: "❓", word: "do you like?", meaning: "apakah kamu suka?"},
      {emoji: "⭕", word: "yes, I do", meaning: "ya, aku suka"},
      {emoji: "❌", word: "no, I don't", meaning: "tidak, aku tidak suka"},
      {emoji: "😋", word: "delicious", meaning: "lezat"},
      {emoji: "😖", word: "yucky", meaning: "tidak enak / tidak suka"}
    ],
    phonics: [
      {word: "like", spell: "L - I - K - E"},
      {word: "don't", spell: "D - O - N - T"},
      {word: "delicious", spell: "DE - LI - CI - OUS"}
    ],
    dialogue: {
      characters: ["Aisyah", "Joshua"],
      lines: [
        {speaker: "Aisyah", text: "Do you like rice?", meaning: "Apakah kamu suka nasi?"},
        {speaker: "Joshua", text: "No, I don't like rice.", meaning: "Tidak, aku tidak suka nasi."},
        {speaker: "Aisyah", text: "Do you like fried chicken?", meaning: "Apakah kamu suka ayam goreng?"},
        {speaker: "Joshua", text: "Yes, I do! It is delicious.", meaning: "Ya, aku suka! Itu lezat."}
      ]
    },
    exercises: [
      {title: "Expression Match", soal: "Kalimat yang artinya 'Aku tidak suka teh' adalah...", pilihan: ["I like tea", "I don't like tea", "Do you like tea?"], jawabanIdx: 1},
      {title: "Listen & Choose", hint: "Klik suara <button class='audio-btn' onclick=\"speakEnglish('Do you like noodles?')\">🔊</button> dan pilih artinya:", soal: "Apa arti pertanyaan dari suara tersebut?", pilihan: ["Apakah kamu suka mi?", "Aku suka mi.", "Apakah kamu suka bakso?"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun kata: you / Do / like / bread?", pilihan: ["Do you like bread?", "you Do like bread?", "bread like you Do?"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "Aisyah: 'Do you like milk?' Joshua: 'Yes, I ___.'", pilihan: ["do", "don't", "like"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Do you like chicken? Yes, I do!\nDo you like fish? No, I don't!\nYucky yucky, no I don't! 🎵"}
  },
  {
    id: "k3-bing-03", emoji: "🌅",
    judul: "I Have Fried Chicken for Breakfast",
    deskripsi: "Belajar nama waktu makan (sarapan, makan siang, makan malam) dalam Bahasa Inggris!",
    tujuan: ["Menyebutkan breakfast, lunch, dan dinner", "Mengatakan apa yang kita makan setiap waktu"],
    badgeEmoji: "🍽️", badgeNama: "Meal Expert",
    vocab: [
      {emoji: "🌅", word: "breakfast", meaning: "sarapan (pagi)"},
      {emoji: "☀️", word: "lunch", meaning: "makan siang"},
      {emoji: "🌙", word: "dinner", meaning: "makan malam"},
      {emoji: "🍽️", word: "have", meaning: "makan / menyantap"},
      {emoji: "☀️", word: "morning", meaning: "pagi hari"},
      {emoji: "🌤️", word: "afternoon", meaning: "siang hari"},
      {emoji: "🌃", word: "evening", meaning: "malam hari"}
    ],
    phonics: [
      {word: "breakfast", spell: "BREAK - FAST"},
      {word: "lunch", spell: "L - U - N - CH"},
      {word: "dinner", spell: "DIN - NER"}
    ],
    dialogue: {
      characters: ["Cici", "Made"],
      lines: [
        {speaker: "Cici", text: "What do you have for breakfast?", meaning: "Kamu sarapan pakai apa?"},
        {speaker: "Made", text: "I have bread and milk for breakfast.", meaning: "Aku sarapan roti dan susu."},
        {speaker: "Cici", text: "I have fried rice for lunch.", meaning: "Aku makan siang pakai nasi goreng."}
      ]
    },
    exercises: [
      {title: "Time Match", soal: "Makan di pagi hari (sarapan) dalam Bahasa Inggris disebut...", pilihan: ["Lunch", "Dinner", "Breakfast"], jawabanIdx: 2},
      {title: "Listen & Choose", hint: "Dengarkan kata ini: <button class='audio-btn' onclick=\"speakEnglish('dinner')\">🔊</button>", soal: "Kapan kita melakukan kegiatan makan tersebut?", pilihan: ["Malam hari", "Siang hari", "Pagi hari"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: have / I / noodles / for / lunch", pilihan: ["I have noodles for lunch", "for lunch I noodles have", "have I noodles lunch"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "I have bread for ___. (makan pagi)", pilihan: ["breakfast", "lunch", "dinner"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Breakfast in the morning,\nlunch at noon,\ndinner in the evening,\nyum yum soon! 🎵"}
  },
  {
    id: "k3-bing-04", emoji: "🏊",
    judul: "Do You Like Swimming?",
    deskripsi: "Ayo sebutkan hobi olahraga dan kegiatan seru bersama Joshua dan Aisyah!",
    tujuan: ["Menyebutkan berbagai hobi (swimming, reading, singing, dll)", "Bertanya hobi kepada teman"],
    badgeEmoji: "⚽", badgeNama: "Hobby Hunter",
    vocab: [
      {emoji: "🏊", word: "swimming", meaning: "berenang"},
      {emoji: "📖", word: "reading", meaning: "membaca"},
      {emoji: "🎤", word: "singing", meaning: "menyanyi"},
      {emoji: "🚲", word: "riding a bike", meaning: "bersepeda"},
      {emoji: "⚽", word: "playing football", meaning: "bermain bola"},
      {emoji: "💃", word: "dancing", meaning: "menari"},
      {emoji: "🎨", word: "drawing", meaning: "menggambar"},
      {emoji: "🏃", word: "running", meaning: "berlari"}
    ],
    phonics: [
      {word: "swimming", spell: "SWI - MMING"},
      {word: "reading", spell: "REA - DING"},
      {word: "singing", spell: "SI - NG - ING"}
    ],
    dialogue: {
      characters: ["Joshua", "Aisyah"],
      lines: [
        {speaker: "Joshua", text: "Do you like swimming?", meaning: "Apakah kamu suka berenang?"},
        {speaker: "Aisyah", text: "Yes, I like swimming.", meaning: "Ya, aku suka berenang."},
        {speaker: "Joshua", text: "Does Made like football?", meaning: "Apakah Made suka main bola?"},
        {speaker: "Aisyah", text: "No, he likes riding a bike.", meaning: "Tidak, dia suka bersepeda."}
      ]
    },
    exercises: [
      {title: "Hobby Match", soal: "Apa bahasa Inggris dari kegiatan bersepeda 🚲?", pilihan: ["riding a bike", "playing football", "swimming"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan: <button class='audio-btn' onclick=\"speakEnglish('playing football')\">🔊</button>", soal: "Kegiatan apakah yang disebutkan audio?", pilihan: ["Bermain bola", "Menyanyi", "Membaca"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: like / you / Do / swimming?", pilihan: ["Do you like swimming?", "you Do like swimming?", "swimming Do you like?"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "Made likes ___ (membaca buku).", pilihan: ["reading", "running", "singing"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Swimming, swimming in the pool!\nReading, reading very cool!\nRiding a bike, beep beep beep! 🎵"}
  },
  {
    id: "k3-bing-05", emoji: "📅",
    judul: "I Like Riding a Bike on Sunday",
    deskripsi: "Menghafalkan nama-nama hari dari Senin sampai Minggu dengan ceria!",
    tujuan: ["Menyebutkan nama hari (Monday sampai Sunday)", "Menggabungkan nama hari dengan hobi"],
    badgeEmoji: "📅", badgeNama: "Day Keeper",
    vocab: [
      {emoji: "1️⃣", word: "Monday", meaning: "Senin"},
      {emoji: "2️⃣", word: "Tuesday", meaning: "Selasa"},
      {emoji: "3️⃣", word: "Wednesday", meaning: "Rabu"},
      {emoji: "4️⃣", word: "Thursday", meaning: "Kamis"},
      {emoji: "5️⃣", word: "Friday", meaning: "Jumat"},
      {emoji: "6️⃣", word: "Saturday", meaning: "Sabtu"},
      {emoji: "7️⃣", word: "Sunday", meaning: "Minggu"},
      {emoji: "📌", word: "today", meaning: "hari ini"},
      {emoji: "➡️", word: "tomorrow", meaning: "besok"}
    ],
    phonics: [
      {word: "Monday", spell: "MON - DAY"},
      {word: "Wednesday", spell: "WED - NES - DAY"},
      {word: "Sunday", spell: "SUN - DAY"}
    ],
    dialogue: {
      characters: ["Cici", "Made"],
      lines: [
        {speaker: "Cici", text: "What do you like doing on Sunday?", meaning: "Apa yang kamu suka lakukan hari Minggu?"},
        {speaker: "Made", text: "I like riding a bike on Sunday.", meaning: "Aku suka bersepeda di hari Minggu."},
        {speaker: "Cici", text: "I like singing on Monday.", meaning: "Aku suka menyanyi di hari Senin."}
      ]
    },
    exercises: [
      {title: "Day Match", soal: "Hari Rabu dalam Bahasa Inggris adalah...", pilihan: ["Wednesday", "Monday", "Friday"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan: <button class='audio-btn' onclick=\"speakEnglish('Sunday')\">🔊</button>", soal: "Hari apakah itu?", pilihan: ["Minggu", "Selasa", "Kamis"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: Sunday / on / like / I / swimming", pilihan: ["I like swimming on Sunday", "Sunday on I like swimming", "like I Sunday swimming"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "After Monday is ___ (setelah Senin adalah hari Selasa).", pilihan: ["Tuesday", "Saturday", "Thursday"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Monday, Tuesday, Wednesday too,\nThursday, Friday, Saturday,\nSunday, yahoo! 🎵"}
  },
  {
    id: "k3-bing-06", emoji: "🏫",
    judul: "Is It the Canteen?",
    deskripsi: "Mengenal ruangan dan tempat-tempat di sekolah kita!",
    tujuan: ["Menyebutkan tempat di sekolah (canteen, classroom, library, dll)", "Bertanya dengan Is it...?"],
    badgeEmoji: "🏫", badgeNama: "School Navigator",
    vocab: [
      {emoji: "🍱", word: "canteen", meaning: "kantin"},
      {emoji: "🪑", word: "classroom", meaning: "ruang kelas"},
      {emoji: "📚", word: "library", meaning: "perpustakaan"},
      {emoji: "🕌", word: "prayer room", meaning: "mushola / ruang ibadah"},
      {emoji: "🚻", word: "restroom", meaning: "toilet / kamar kecil"},
      {emoji: "🌳", word: "schoolyard", meaning: "halaman sekolah"},
      {emoji: "💻", word: "computer lab", meaning: "laboratorium komputer"},
      {emoji: "🏢", word: "office", meaning: "kantor guru"}
    ],
    phonics: [
      {word: "canteen", spell: "CAN - TEEN"},
      {word: "classroom", spell: "CLASS - ROOM"},
      {word: "library", spell: "LI - BRA - RY"}
    ],
    dialogue: {
      characters: ["Aisyah", "Joshua"],
      lines: [
        {speaker: "Aisyah", text: "Is it the canteen?", meaning: "Apakah ini kantin?"},
        {speaker: "Joshua", text: "Yes, it is.", meaning: "Ya, betul."},
        {speaker: "Aisyah", text: "Is it the library?", meaning: "Apakah ini perpustakaan?"},
        {speaker: "Joshua", text: "No, it isn't. It is the classroom.", meaning: "Bukan. Ini adalah ruang kelas."}
      ]
    },
    exercises: [
      {title: "Place Match", soal: "Tempat membaca dan meminjam banyak buku 📚 adalah...", pilihan: ["library", "canteen", "restroom"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan suara ruangan: <button class='audio-btn' onclick=\"speakEnglish('classroom')\">🔊</button>", soal: "Ruangan apakah yang disebutkan?", pilihan: ["Ruang kelas", "Kantin", "Halaman sekolah"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: it / Is / canteen / the?", pilihan: ["Is it the canteen?", "canteen Is it the?", "it Is the canteen?"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "Is it the office? Yes, it ___.", pilihan: ["is", "isn't", "are"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Canteen, canteen, eat and drink!\nLibrary, library, read and think!\nSchool is fun, yes indeed! 🎵"}
  },
  {
    id: "k3-bing-07", emoji: "🧭",
    judul: "My Class Is Behind the Office",
    deskripsi: "Belajar kata depan (in, on, under, beside, behind) untuk menunjukkan letak benda dan ruangan!",
    tujuan: ["Menggunakan preposisi: in, on, under, beside, between, behind, in front of", "Menjelaskan posisi tempat"],
    badgeEmoji: "🧭", badgeNama: "Preposition Pro",
    vocab: [
      {emoji: "📦", word: "in", meaning: "di dalam"},
      {emoji: "👆", word: "on", meaning: "di atas (menempel)"},
      {emoji: "👇", word: "under", meaning: "di bawah"},
      {emoji: "👉", word: "beside", meaning: "di samping"},
      {emoji: "↔️", word: "between", meaning: "di antara (tengah)"},
      {emoji: "🔙", word: "behind", meaning: "di belakang"},
      {emoji: "🔝", word: "in front of", meaning: "di depan"}
    ],
    phonics: [
      {word: "under", spell: "UN - DER"},
      {word: "beside", spell: "BE - SIDE"},
      {word: "behind", spell: "BE - HIND"}
    ],
    dialogue: {
      characters: ["Cici", "Made"],
      lines: [
        {speaker: "Cici", text: "Where is the classroom?", meaning: "Di mana ruang kelasnya?"},
        {speaker: "Made", text: "It's behind the office.", meaning: "Di belakang kantor."},
        {speaker: "Cici", text: "Where is the library?", meaning: "Di mana perpustakaannya?"},
        {speaker: "Made", text: "It's beside the canteen.", meaning: "Di samping kantin."}
      ]
    },
    exercises: [
      {title: "Preposition Match", soal: "Kata dalam Bahasa Inggris untuk 'di samping' adalah...", pilihan: ["beside", "under", "in"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan: <button class='audio-btn' onclick=\"speakEnglish('behind')\">🔊</button>", soal: "Di manakah letak posisi tersebut?", pilihan: ["Di belakang", "Di atas", "Di dalam"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: is / class / The / behind / office / the", pilihan: ["The class is behind the office", "behind the office The class is", "is The class behind office"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "The pencil is ___ the table. (di atas meja)", pilihan: ["on", "under", "between"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 In, on, under, beside,\nbetween, behind, in front of!\nWhere is the cat? On the mat! 🎵"}
  },
  {
    id: "k3-bing-08", emoji: "📚",
    judul: "I Drink Orange Juice in the Canteen",
    deskripsi: "Menghubungkan kegiatan sehari-hari dengan tempat kita melakukanya di sekolah!",
    tujuan: ["Menyebutkan kata kerja: study, teach, drink, eat, pray, play, read", "Membuat kalimat kegiatan di sekolah"],
    badgeEmoji: "📚", badgeNama: "Activity Ace",
    vocab: [
      {emoji: "✏️", word: "study", meaning: "belajar"},
      {emoji: "👩‍🏫", word: "teach", meaning: "mengajar"},
      {emoji: "🧃", word: "drink", meaning: "minum"},
      {emoji: "🍔", word: "eat", meaning: "makan"},
      {emoji: "🤲", word: "pray", meaning: "berdoa / ibadah"},
      {emoji: "⚽", word: "play", meaning: "bermain"},
      {emoji: "📖", word: "read", meaning: "membaca"},
      {emoji: "✍️", word: "write", meaning: "menulis"}
    ],
    phonics: [
      {word: "study", spell: "STU - DY"},
      {word: "teach", spell: "T - EA - CH"},
      {word: "drink", spell: "DR - I - NK"}
    ],
    dialogue: {
      characters: ["Joshua", "Aisyah"],
      lines: [
        {speaker: "Joshua", text: "What do you do in the classroom?", meaning: "Apa yang kamu lakukan di kelas?"},
        {speaker: "Aisyah", text: "I study and read in the classroom.", meaning: "Aku belajar dan membaca di kelas."},
        {speaker: "Joshua", text: "What does the teacher do?", meaning: "Apa yang dilakukan guru?"},
        {speaker: "Aisyah", text: "She teaches in the classroom.", meaning: "Beliau mengajar di kelas."}
      ]
    },
    exercises: [
      {title: "Verb Match", soal: "Kegiatan 'membaca buku' dalam Bahasa Inggris adalah...", pilihan: ["read", "play", "drink"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan: <button class='audio-btn' onclick=\"speakEnglish('play in the schoolyard')\">🔊</button>", soal: "Apa arti kegiatan dari audio itu?", pilihan: ["Bermain di halaman sekolah", "Belajar di perpustakaan", "Makan di kantin"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: juice / drink / I / in / canteen / the", pilihan: ["I drink juice in the canteen", "drink I juice in the canteen", "in the canteen juice I drink"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "We ___ (belajar) math in the classroom.", pilihan: ["study", "play", "eat"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Study, study in the class,\neat and drink in the canteen,\nplay, play in the yard! 🎵"}
  },
  {
    id: "k3-bing-09", emoji: "✨",
    judul: "My Classroom Is Clean",
    deskripsi: "Mengenal kata sifat (clean, dirty, big, small) untuk menggambarkan keadaan sekolah kita!",
    tujuan: ["Menyebutkan kata sifat keadaan sekolah", "Menggunakan pola kalimat: My [place] is [adjective]"],
    badgeEmoji: "✨", badgeNama: "Adjective Artist",
    vocab: [
      {emoji: "✨", word: "clean", meaning: "bersih"},
      {emoji: "🗑️", word: "dirty", meaning: "kotor"},
      {emoji: "🏰", word: "big / large", meaning: "besar / luas"},
      {emoji: "⛺", word: "small", meaning: "kecil"},
      {emoji: "🛣️", word: "wide", meaning: "lebar"},
      {emoji: "🚶", word: "narrow", meaning: "sempit"},
      {emoji: "🌸", word: "beautiful", meaning: "indah / cantik"}
    ],
    phonics: [
      {word: "clean", spell: "CL - EA - N"},
      {word: "large", spell: "L - AR - GE"},
      {word: "dirty", spell: "DIR - TY"}
    ],
    dialogue: {
      characters: ["Cici", "Made"],
      lines: [
        {speaker: "Cici", text: "Look! My classroom is clean.", meaning: "Lihat! Kelas saya bersih."},
        {speaker: "Made", text: "Yes, and the schoolyard is wide.", meaning: "Ya, dan halaman sekolahnya lebar."},
        {speaker: "Cici", text: "Our school is beautiful!", meaning: "Sekolah kita indah!"}
      ]
    },
    exercises: [
      {title: "Adjective Match", soal: "Lawan kata dari 'dirty' (kotor) adalah...", pilihan: ["clean (bersih)", "small (kecil)", "narrow (sempit)"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan kata sifat ini: <button class='audio-btn' onclick=\"speakEnglish('beautiful')\">🔊</button>", soal: "Apa arti kata sifat tersebut?", pilihan: ["Indah / cantik", "Kotor", "Sempit"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: is / classroom / My / clean", pilihan: ["My classroom is clean", "clean My classroom is", "classroom My clean is"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "The schoolyard is very ___ (luas/besar).", pilihan: ["large / big", "dirty", "narrow"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Clean and big, wide and bright,\nmy school is beautiful, what a sight!\nKeep it clean every day! 🎵"}
  },
  {
    id: "k3-bing-10", emoji: "🔢",
    judul: "There Are Twenty Books on the Shelf",
    deskripsi: "Berhitung angka 21 sampai 50 dalam Bahasa Inggris dan menghitung benda di kelas!",
    tujuan: ["Menghitung dari twenty-one (21) sampai fifty (50)", "Menggunakan kata There is (untuk 1) dan There are (untuk banyak)"],
    badgeEmoji: "🔢", badgeNama: "Number Ninja",
    vocab: [
      {emoji: "2️⃣1️⃣", word: "twenty-one", meaning: "dua puluh satu (21)"},
      {emoji: "3️⃣0️⃣", word: "thirty", meaning: "tiga puluh (30)"},
      {emoji: "3️⃣5️⃣", word: "thirty-five", meaning: "tiga puluh lima (35)"},
      {emoji: "4️⃣0️⃣", word: "forty", meaning: "empat puluh (40)"},
      {emoji: "5️⃣0️⃣", word: "fifty", meaning: "lima puluh (50)"},
      {emoji: "☝️", word: "there is", meaning: "ada (untuk 1 benda)"},
      {emoji: "👐", word: "there are", meaning: "ada (untuk banyak benda > 1)"}
    ],
    phonics: [
      {word: "twenty", spell: "TWEN - TY"},
      {word: "thirty", spell: "THIR - TY"},
      {word: "forty", spell: "FOR - TY"},
      {word: "fifty", spell: "FIF - TY"}
    ],
    dialogue: {
      characters: ["Joshua", "Aisyah"],
      lines: [
        {speaker: "Joshua", text: "How many books are there on the shelf?", meaning: "Ada berapa buku di rak?"},
        {speaker: "Aisyah", text: "There are twenty-five books on the shelf.", meaning: "Ada dua puluh lima buku di rak."},
        {speaker: "Joshua", text: "Is there a ruler on the table?", meaning: "Apakah ada sebuah penggaris di meja?"},
        {speaker: "Aisyah", text: "Yes, there is.", meaning: "Ya, ada."}
      ]
    },
    exercises: [
      {title: "Number Match", soal: "Angka 45 dalam Bahasa Inggris adalah...", pilihan: ["forty-five", "thirty-five", "fifty-four"], jawabanIdx: 0},
      {title: "Listen & Choose", hint: "Dengarkan angka ini: <button class='audio-btn' onclick=\"speakEnglish('fifty')\">🔊</button>", soal: "Angka berapakah yang disebutkan audio?", pilihan: ["50", "15", "5"], jawabanIdx: 0},
      {title: "Arrange Words", soal: "Susun: are / There / books / thirty", pilihan: ["There are thirty books", "books There are thirty", "thirty books There are"], jawabanIdx: 0},
      {title: "Fill in the Blank", soal: "___ is one pen on the table. (Karena cuma 1 pena)", pilihan: ["There is", "There are", "They"], jawabanIdx: 0}
    ],
    song: {lyrics: "🎵 Twenty, thirty, forty, fifty,\ncount with me, it's so nifty!\nThere are books, there are pens, let's learn! 🎵"}
  }
];

materiListBing.forEach(materi => {
  const html = template(materi);
  fs.writeFileSync(path.join(outDir, `${materi.id}.html`), html);
});
console.log('✅ Generated 10 Kelas 3 English books');
