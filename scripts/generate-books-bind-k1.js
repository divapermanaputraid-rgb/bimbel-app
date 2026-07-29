const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas1/bahasa-indonesia');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k1-bind-01': '#FFFDE7', 'k1-bind-02': '#FCE4EC', 'k1-bind-03': '#E3F2FD',
  'k1-bind-04': '#E8F5E9', 'k1-bind-05': '#F3E5F5', 'k1-bind-06': '#FFF3E0',
  'k1-bind-07': '#FFFDE7', 'k1-bind-08': '#FCE4EC',
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
  <title>${data.judul} — Kelas 1</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas1" data-kelas="1" data-pelajaran="bind" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #c2185b; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666; font-size: 20px;">Bahasa Indonesia — Kelas 1</p>
        <p style="margin-top: 16px; font-size: 20px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Yuk Mulai! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        ${data.bagian1.konten}
        <div class="quiz-box" data-idx="0" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Coba tebak:</p>
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
      <div class="section-header">📖 Bagian 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        ${data.bagian2.konten}
        <div class="quiz-box" data-idx="1" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 20px;">🤔 Coba tebak:</p>
          <p style="font-size: 20px;">${data.bagian2.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian2.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 20px;">
        <p style="font-weight:bold; font-size: 22px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

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

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 20px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu mendapatkan badge istimewa:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #c2185b; font-size: 24px;">${data.badgeNama}</p>
        <p style="color: #666; margin-top: 8px;">⭐⭐⭐⭐⭐</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai! 🎉</button>
        <p id="msg-belum-selesai" style="font-size:14px; color:#888; margin-top:8px;">(Selesaikan semua kuis di atas dulu ya 🧐)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Kelas 2)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku kakak kelasmu. Mau tanya soal ${data.judul}? Aku siap bantu! 📚</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
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
  // ===== k1-bind-01: Bunyi Apa? =====
  {
    id: 'k1-bind-01',
    judul: 'Bunyi Apa?',
    emoji: '👂',
    deskripsi: 'Yuk kenali suara-suara di sekitar kita dan huruf B! 👂🔤',
    tujuan: ['Mengenal suara-suara di sekitar 🐦', 'Mengenal huruf B/b 🔤', 'Menulis nama sendiri ✏️'],
    badgeEmoji: '👂',
    badgeNama: 'Pendengar Cilik',
    bagian1: {
      judul: 'Coba Dengar!',
      konten: `<p>Pagi hari, Upe bangun tidur. 🌅</p>
<p>"Cuit... cuit... cuit!" 🐦</p>
<p>Upe bertanya, "Bunyi apa itu, Bu?" 🤔</p>
<p>Ibu menjawab, "Itu suara burung, Upe! 🐦"</p>
<p>"Cuit cuit! Burung sedang bernyanyi pagi!" 🎵</p>
<p>Di sekitar kita banyak suara. Ayo dengarkan!</p>
<ul style="padding-left: 20px;">
  <li>⏰ <em>kring kring kring</em> — suara jam alarm</li>
  <li>💧 <em>tik tik tik</em> — suara air hujan</li>
  <li>🚗 <em>brum brum</em> — suara mobil</li>
  <li>🐱 <em>meong meong</em> — suara kucing</li>
</ul>
<p>Wah, seru sekali ya bunyi-bunyi di sekitar! 👂✨</p>`,
      quiz: {
        soal: '"Cuit cuit!" adalah suara hewan apa? 🤔',
        pilihan: ['Kucing 🐱', 'Burung 🐦', 'Anjing 🐶'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Mengenal Huruf B!',
      konten: `<p>Upe senang bermain dengan balon! 🎈</p>
<p>"Balon... balon..." ucap Upe. 🗣️</p>
<p>Huruf pertama dari kata BALON adalah <strong>B</strong>! 🔤</p>
<p>Ayo sebutkan bersama: <strong>B... b... b... BALON!</strong> 🎈</p>
<p>Benda lain yang huruf awalnya B:</p>
<ul style="padding-left: 20px;">
  <li>🍌 <strong>P</strong>isang — eh, tapi huruf awalnya B? Ayo cek! ... Pisang huruf awalnya P, bukan B! 😄</li>
  <li>📖 <strong>B</strong>uku — iya! huruf awalnya B ✅</li>
  <li>⚽ <strong>B</strong>ola — iya! huruf awalnya B ✅</li>
  <li>🧸 <strong>B</strong>oneka — iya! ✅</li>
</ul>
<p>Sekarang coba tulis namamu sendiri pakai pensil! ✏️ Tulis huruf pertama namamu! Hebat! ⭐</p>`,
      quiz: {
        soal: 'Huruf awal dari kata "Buku" 📖 adalah...',
        pilihan: ['B', 'P', 'K'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: '"Meong meong" adalah suara hewan...', pilihan: ['🐱 Kucing', '🐦 Burung', '🐶 Anjing'], jawabanIdx: 0 },
      { soal: 'Huruf awal kata "🍌" adalah...', pilihan: ['B', 'P', 'M'], jawabanIdx: 1 },
      { soal: 'Benda yang huruf awalnya B adalah...', pilihan: ['🍎 Apel', '⚽ Bola', '🐱 Kucing'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-02: Ayo Bermain! =====
  {
    id: 'k1-bind-02',
    judul: 'Ayo Bermain!',
    emoji: '🎮',
    deskripsi: 'Yuk kenali permainan seru dan huruf H & C! 🎮🧒',
    tujuan: ['Mengenal permainan tradisional dan modern 🎯', 'Mengenal huruf H/h dan C/c 🔤', 'Bercerita tentang permainan kesukaan 🗣️'],
    badgeEmoji: '🎮',
    badgeNama: 'Pemain Hebat',
    bagian1: {
      judul: 'Permainan Seru!',
      konten: `<p>Hari ini Upe dan Kira bermain bersama! 🎉</p>
<p>"Ayo main petak umpet!" ajak Kira. 🙋‍♀️</p>
<p>"Aku hitung sampai 10 ya! 1... 2... 3...!" 🗣️</p>
<p>Upe bersembunyi di belakang pohon. 🌳</p>
<p>"Ditemukan!" teriak Kira. 😆</p>
<p>Permainan tradisional seru banget:</p>
<ul style="padding-left: 20px;">
  <li>🙈 Petak umpet — sembunyi dan cari</li>
  <li>🤸 Lompat tali — lompat lompat seru</li>
  <li>🪁 Layang-layang — terbang di angin</li>
  <li>🏃 Benteng-bentengan — lari dan jaga benteng</li>
</ul>
<p>Ada juga permainan modern seperti video game 🎮. Tapi main di luar lebih sehat! 🌞</p>`,
      quiz: {
        soal: 'Permainan sembunyi dan cari disebut...',
        pilihan: ['Lompat tali 🤸', 'Petak umpet 🙈', 'Layang-layang 🪁'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Huruf H dan C!',
      konten: `<p>Upe senang bermain <strong>H</strong>ulahoop! 🔵</p>
<p>Huruf <strong>H/h</strong> — seperti orang berdiri dengan tangan ke samping! 🧍</p>
<p>Kata dengan huruf H: <strong>H</strong>ulahoop, <strong>H</strong>ujan, <strong>H</strong>ijau, <strong>H</strong>ati</p>
<p>Sekarang huruf <strong>C/c</strong> — seperti bulan sabit 🌙</p>
<p>Kira suka bermain <strong>C</strong>atur! ♟️</p>
<p>Kata dengan huruf C: <strong>C</strong>atur, <strong>C</strong>ita-cita, <strong>C</strong>epat, <strong>C</strong>erita</p>
<p>Ayo sebutkan: <strong>C... c... c... Catur!</strong> 🔤✨</p>`,
      quiz: {
        soal: 'Huruf awal kata "🏃" (H...?) adalah...',
        pilihan: ['C', 'H', 'L'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Permainan yang pakai tali dan dilompati disebut...', pilihan: ['Petak umpet', 'Lompat tali', 'Layang-layang'], jawabanIdx: 1 },
      { soal: 'Huruf awal kata "Catur" ♟️ adalah...', pilihan: ['C', 'H', 'K'], jawabanIdx: 0 },
      { soal: '"Ayo bermain!" Kata bermain artinya...', pilihan: ['Bekerja', 'Belajar', 'Melakukan permainan'], jawabanIdx: 2 },
    ],
  },

  // ===== k1-bind-03: Awas Kuman! =====
  {
    id: 'k1-bind-03',
    judul: 'Awas Kuman!',
    emoji: '🧼',
    deskripsi: 'Belajar cuci tangan dan kebersihan diri, plus huruf K! 🧼🖐️',
    tujuan: ['Memahami pentingnya cuci tangan 🧼', 'Mengenal huruf K/k 🔤', 'Praktik kebersihan diri sehari-hari 🪥'],
    badgeEmoji: '🧼',
    badgeNama: 'Juru Bersih',
    bagian1: {
      judul: 'Cuci Tangan Yuk!',
      konten: `<p>Kira mau makan siang. 🍚</p>
<p>Ibu berkata, "Kira, cuci tangan dulu!" 🧼</p>
<p>"Kuman-kuman nakal menempel di tangan kita!" 🦠</p>
<p>Kira pergi ke wastafel. Nyalakan air. 💧</p>
<p>Ambil sabun. Gosok gosok gosok! 🧼🖐️</p>
<p>Lalu bilas dengan air bersih. Keringkan dengan handuk. 🧴</p>
<p>"Selesai! Tangan bersih wangi!" 🎉</p>
<p>Kuman pergi! Tidak akan bikin sakit perut! ✅</p>
<p>Ingat: cuci tangan sebelum makan, setelah main, setelah ke toilet! 🚽</p>`,
      quiz: {
        soal: 'Kita cuci tangan pakai sabun supaya...',
        pilihan: ['Tangan wangi', 'Kuman pergi 🦠❌', 'Tangan basah 💧'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Huruf K dan Kebersihan!',
      konten: `<p>Kata <strong>K</strong>uman huruf awalnya <strong>K</strong>! 🦠</p>
<p>Huruf <strong>K/k</strong> — seperti orang berdiri dengan tangan di pinggang! 🧍‍♀️</p>
<p>Ayo sebut: <strong>K... k... k... KUMAN!</strong> 🔤</p>
<p>Kata lain dengan huruf K:</p>
<ul style="padding-left: 20px;">
  <li><strong>K</strong>ucing 🐱</li>
  <li><strong>K</strong>ursi 🪑</li>
  <li><strong>K</strong>acamata 👓</li>
  <li><strong>K</strong>ue 🧁</li>
</ul>
<p>Kebersihan diri itu penting! Yang harus dilakukan:</p>
<ul style="padding-left: 20px;">
  <li>🪥 Gosok gigi 2x sehari</li>
  <li>🧼 Cuci tangan pakai sabun</li>
  <li>🚿 Mandi 2x sehari</li>
  <li>✂️ Potong kuku jika panjang</li>
</ul>
<p>Ayo jaga kebersihan! Tubuh sehat, hati senang! ⭐</p>`,
      quiz: {
        soal: 'Huruf awal kata "Kursi" 🪑 adalah...',
        pilihan: ['K', 'C', 'S'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Kita harus cuci tangan sebelum...', pilihan: ['Tidur', 'Makan 🍚', 'Menulis ✏️'], jawabanIdx: 1 },
      { soal: 'Huruf awal kata "🦠" (Kuman) adalah...', pilihan: ['B', 'K', 'M'], jawabanIdx: 1 },
      { soal: '"Mandi" dilakukan sehari...', pilihan: ['1 kali', '2 kali', '3 kali'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-04: Aku Bisa! =====
  {
    id: 'k1-bind-04',
    judul: 'Aku Bisa!',
    emoji: '💪',
    deskripsi: 'Belajar gerak tubuh dan aktivitas sehari-hari, plus huruf L! 💪🏃',
    tujuan: ['Mengenal gerak tubuh dan aktivitas 💪', 'Mengenal huruf L/l 🔤', 'Bercerita tentang apa yang bisa dilakukan 🗣️'],
    badgeEmoji: '💪',
    badgeNama: 'Juru Bisa',
    bagian1: {
      judul: 'Aku Bisa Banyak Hal!',
      konten: `<p>Upe bangun pagi dengan semangat! ☀️</p>
<p>"Aku bisa banyak hal!" seru Upe. 💪</p>
<p>Ayo lihat apa saja yang bisa Upe lakukan:</p>
<ul style="padding-left: 20px;">
  <li>🏃‍♂️ Upe bisa <strong>berlari</strong> kencang!</li>
  <li>🚶‍♂️ Upe bisa <strong>berjalan</strong> dengan tegak!</li>
  <li>🙆‍♂️ Upe bisa <strong>melompat</strong> tinggi!</li>
  <li>💃 Upe bisa <strong>menari</strong> dengan gembira!</li>
</ul>
<p>"Kamu hebat, Upe!" puji Ibu. 😊</p>
<p>Sekarang giliran kamu! Coba berdiri dan lakukan gerakan-gerakan ini! 🏃‍♂️💃</p>
<p>Gerak badan itu sehat dan menyenangkan! 🌟</p>`,
      quiz: {
        soal: 'Upe bisa berlari. Berlari artinya...',
        pilihan: ['Jalan pelan 🚶', 'Gerak cepat pakai kaki 🏃', 'Diam saja 🪑'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Huruf L!',
      konten: `<p>Upe suka <strong>L</strong>ari! 🏃‍♂️</p>
<p>Huruf <strong>L/l</strong> — seperti tongkat yang berdiri dengan alas! 🗼</p>
<p>Ayo sebut: <strong>L... l... l... LARI!</strong> 🔤</p>
<p>Kata lain dengan huruf L:</p>
<ul style="padding-left: 20px;">
  <li><strong>L</strong>ompat 🤸</li>
  <li><strong>L</strong>ilin 🕯️</li>
  <li><strong>L</strong>angit ☁️</li>
  <li><strong>L</strong>umba-lumba 🐬</li>
</ul>
<p>Aktivitas sehari-hari yang bisa kamu lakukan sendiri:</p>
<ul style="padding-left: 20px;">
  <li>👕 Memakai baju sendiri</li>
  <li>👟 Memakai sepatu sendiri</li>
  <li>🍚 Makan sendiri</li>
  <li>✏️ Menulis namamu sendiri</li>
</ul>
<p>"Aku Bisa!" Itulah kata ajaib! ✨💪</p>`,
      quiz: {
        soal: 'Huruf awal kata "🏃" adalah...',
        pilihan: ['L', 'R', 'M'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Melompat artinya...', pilihan: ['Diam saja', 'Angkat kaki dan loncat 🙆', 'Duduk 🪑'], jawabanIdx: 1 },
      { soal: 'Huruf awal "🕯️" (Lilin) adalah...', pilihan: ['L', 'I', 'N'], jawabanIdx: 0 },
      { soal: 'Kegiatan yang bisa dilakukan setelah mandi adalah...', pilihan: ['Main kotor-kotoran', 'Pakai baju bersih 👕', 'Langsung tidur'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-05: Teman Baru =====
  {
    id: 'k1-bind-05',
    judul: 'Teman Baru',
    emoji: '🤝',
    deskripsi: 'Belajar berkenalan dan berteman dengan orang baru! 🤝😊',
    tujuan: ['Berkenalan dengan teman baru 🙋', 'Mengenal huruf baru dalam perkenalan 🔤', 'Bersikap ramah pada teman baru 😊'],
    badgeEmoji: '🤝',
    badgeNama: 'Juru Berteman',
    bagian1: {
      judul: 'Halo, Teman Baru!',
      konten: `<p>Hari ini ada anak baru di sekolah! 🏫</p>
<p>Namanya Malosi. Dia pindahan dari kota lain. 🚶</p>
<p>Upe menyapa, "Halo! Namaku Upe. Siapa namamu?" 🙋‍♂️</p>
<p>"Namaku Malosi. Senang bertemu denganmu!" jawab Malosi. 😊</p>
<p>"Mau main bareng?" ajak Upe. 🎮</p>
<p>"Mau dong!" jawab Malosi senang. 🎉</p>
<p>Wah, Upe dapat teman baru! Berteman itu mudah!</p>
<p>Cara berkenalan yang baik:</p>
<ol style="padding-left: 20px;">
  <li>📏 Senyum dulu 😄</li>
  <li>🙋 Sebutkan namamu</li>
  <li>🤝 Tanya nama teman</li>
  <li>🎉 Ajak bermain bersama</li>
</ol>
<p>Gampang kan! Yuk coba! ✨</p>`,
      quiz: {
        soal: 'Saat berkenalan, pertama kita harus...',
        pilihan: ['Diam saja', 'Senyum dan menyapa 😄', 'Pergi menjauh'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Ajak Teman Bermain!',
      konten: `<p>Upe, Kira, dan Malosi bermain bersama. 🎉</p>
<p>Mereka bermain bola di lapangan. ⚽</p>
<p>"Malosi, kamu jago bermain bola!" puji Upe. 👍</p>
<p>"Terima kasih! Di kota lamaku aku sering main bola," cerita Malosi. ⚽</p>
<p>Kira bergabung. "Aku juga mau main!" 🏃‍♀️</p>
<p>Mereka bertiga bermain dengan gembira. 😆</p>
<p>Berteman itu menyenangkan! Kita bisa bermain, berbagi, dan tertawa bersama! 🤗</p>
<p>Huruf baru yang dipelajari: <strong>T</strong>eman, <strong>S</strong>enyum, <strong>B</strong>ermain!</p>`,
      quiz: {
        soal: 'Kalau temanmu jago bermain bola, kamu harus...',
        pilihan: ['Cemburu', 'Memuji 👍', 'Pergi'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: '"Halo, namaku Upe." Itu adalah contoh...', pilihan: ['Perkenalan 🙋', 'Makan siang', 'Belajar'], jawabanIdx: 0 },
      { soal: 'Berteman itu membuat kita...', pilihan: ['Sedih', 'Senang 😊', 'Marah'], jawabanIdx: 1 },
      { soal: 'Huruf awal kata "🤝" (Teman) adalah...', pilihan: ['B', 'T', 'S'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-06: Temanku Berbeda =====
  {
    id: 'k1-bind-06',
    judul: 'Temanku Berbeda',
    emoji: '🌈',
    deskripsi: 'Belajar tentang perbedaan dan saling menghormati! 🌈🤝',
    tujuan: ['Memahami bahwa setiap orang berbeda 🌈', 'Menghormati perbedaan teman 🤝', 'Bersikap toleran dalam berteman 😊'],
    badgeEmoji: '🌈',
    badgeNama: 'Juru Toleransi',
    bagian1: {
      judul: 'Kita Berbeda, Tapi Berteman!',
      konten: `<p>Di kelas Upe, semua anak berbeda-beda. 🏫</p>
<p>Kira memakai kacamata. 👓</p>
<p>"Kamu rajin pakai kacamata, Kira!" kata Upe. 😊</p>
<p>Malosi suka pakai peci ke sekolah. 🧢</p>
<p>"Peci Malosi bagus!" puji Tika. 👍</p>
<p>Tika suka pakai jilbab warna pink. 👩</p>
<p>Ada juga teman yang rambutnya keriting, ada yang lurus. 💇</p>
<p>Ada yang suka menggambar 🎨, ada yang suka bernyanyi 🎵.</p>
<p>Walaupun berbeda, mereka semua berteman baik! 🤗</p>
<p>Perbedaan membuat dunia indah seperti pelangi! 🌈✨</p>`,
      quiz: {
        soal: 'Kira memakai kacamata 👓. Upe tidak. Mereka...',
        pilihan: ['Bertengkar', 'Tetap berteman 🤝', 'Tidak mau main'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Saling Menghormati!',
      konten: `<p>Upe dan teman-teman belajar tentang toleransi. 📚</p>
<p>Bu Guru berkata, "Kita harus saling menghormati!" 👩‍🏫</p>
<p>"Meskipun berbeda, kita tetap saudara!" 🤗</p>
<p>Aturan berteman yang baik:</p>
<ul style="padding-left: 20px;">
  <li>🚫 Jangan mengejek teman</li>
  <li>👂 Dengarkan saat teman bicara</li>
  <li>🤝 Bantu teman yang kesulitan</li>
  <li>😄 Senyum dan sapa semua orang</li>
</ul>
<p>"Aku bangga punya teman yang berbeda-beda!" seru Upe. 🌟</p>
<p>Ingat: <strong>Toleransi</strong> artinya menghargai perbedaan! 💪</p>`,
      quiz: {
        soal: 'Kalau ada teman yang berbeda dari kita, sikap kita...',
        pilihan: ['Mengejek', 'Menghormati 🤝', 'Mengabaikan'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Perbedaan membuat dunia seperti...', pilihan: ['Hitam putih', 'Pelangi 🌈', 'Air'], jawabanIdx: 1 },
      { soal: 'Teman yang pakai jilbab harus kita...', pilihan: ['Ejek', 'Hormati 🤝', 'Tertawakan'], jawabanIdx: 1 },
      { soal: '"Toleransi" artinya...', pilihan: ['Bertengkar', 'Menghargai perbedaan 🌈', 'Pergi'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-07: Aku Ingin =====
  {
    id: 'k1-bind-07',
    judul: 'Aku Ingin',
    emoji: '🧠',
    deskripsi: 'Belajar membedakan kebutuhan dan keinginan! 🧠🍚',
    tujuan: ['Memahami arti kebutuhan 🍚', 'Memahami arti keinginan 🍦', 'Membedakan kebutuhan dan keinginan 🧠'],
    badgeEmoji: '🧠',
    badgeNama: 'Juru Pintar',
    bagian1: {
      judul: 'Kebutuhan vs Keinginan!',
      konten: `<p>Upe sedang jalan-jalan ke pasar bersama Ibu. 🏪</p>
<p>"Bu, aku lapar!" kata Upe. 🤤</p>
<p>Ibu membelikan Upe nasi dan sayur. 🍚🥦</p>
<p>"Ini kebutuhanmu, Upe. Kamu lapar, kamu harus makan." ✅</p>
<p>Lalu Upe melihat es krim. 🍦</p>
<p>"Bu, aku mau es krim!" pinta Upe. 🥺</p>
<p>"Itu keinginan, bukan kebutuhan. Nanti ya!" kata Ibu. 😊</p>
<p><strong>Kebutuhan</strong> = barang yang harus dipenuhi agar hidup sehat.</p>
<p><strong>Keinginan</strong> = barang yang kita mau, tapi tidak harus.</p>
<p>Contoh kebutuhan: 🍚 Makanan, 👕 Pakaian, 🏠 Rumah</p>
<p>Contoh keinginan: 🍦 Es krim, 🧸 Mainan baru, 👗 Baju baru</p>
<p>Kebutuhan didahulukan! 🧠✨</p>`,
      quiz: {
        soal: 'Mana yang termasuk KEBUTUHAN?',
        pilihan: ['Es krim 🍦', 'Nasi 🍚', 'Boneka 🧸'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Apa yang Kamu Inginkan?',
      konten: `<p>Bu Guru bertanya di kelas. 👩‍🏫</p>
<p>"Anak-anak, coba sebutkan KEINGINAN kalian!" 🗣️</p>
<p>Kira menjawab, "Aku ingin sepeda baru!" 🚲</p>
<p>Malosi menjawab, "Aku ingin buku cerita!" 📖</p>
<p>Tika menjawab, "Aku ingin boneka beruang!" 🧸</p>
<p>Bu Guru tersenyum. "Keinginan itu sah-sah saja. Tapi ingat ya, kebutuhan lebih penting!" 😊</p>
<p>"Kita bisa mengumpulkan uang saku untuk membeli keinginan!" 💰</p>
<p>"Yang penting, jangan lupa bersyukur atas apa yang sudah kita punya!" 🙏</p>
<p>Bersyukur itu kunci hati yang bahagia! ⭐</p>`,
      quiz: {
        soal: 'Kalau ingin sesuatu, yang benar adalah...',
        pilihan: ['Menangis', 'Menabung dulu 💰', 'Memaksa orang tua'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Mana yang termasuk KEINGINAN?', pilihan: ['🍚 Nasi', '👕 Baju', '🧸 Mainan baru'], jawabanIdx: 2 },
      { soal: 'Kita harus... atas apa yang sudah kita punya', pilihan: ['Bersyukur 🙏', 'Mengeluh', 'Membuang'], jawabanIdx: 0 },
      { soal: 'Yang harus DIDAHULUKAN adalah...', pilihan: ['Keinginan', 'Kebutuhan 🍚', 'Mainan'], jawabanIdx: 1 },
    ],
  },

  // ===== k1-bind-08: Di Sekitar Rumah =====
  {
    id: 'k1-bind-08',
    judul: 'Di Sekitar Rumah',
    emoji: '🏠',
    deskripsi: 'Belajar tentang lingkungan rumah dan arah mata angin! 🏠🧭',
    tujuan: ['Mengenal benda-benda di sekitar rumah 🏠', 'Memahami arah: depan, belakang, samping 🧭', 'Membaca peta sederhana 🗺️'],
    badgeEmoji: '🏠',
    badgeNama: 'Juru Rumah',
    bagian1: {
      judul: 'Rumah Upe!',
      konten: `<p>Ini rumah Upe. Letaknya di desa yang asri. 🏡🌿</p>
<p>Di <strong>depan</strong> rumah Upe ada pohon mangga besar. 🌳</p>
<p>Di <strong>belakang</strong> rumah ada kebun bunga. 🌻</p>
<p>Di <strong>samping</strong> kanan ada rumah Tika. 🏠</p>
<p>Di <strong>samping</strong> kiri ada masjid. 🕌</p>
<p>Upe senang tinggal di sini! 😊</p>
<p>Ayo kenali bagian-bagian rumah:</p>
<ul style="padding-left: 20px;">
  <li>🚪 Pintu — tempat masuk dan keluar</li>
  <li>🪟 Jendela — tempat melihat ke luar</li>
  <li>🏠 Atap — pelindung dari hujan dan panas</li>
  <li>🌳 Halaman — tempat bermain</li>
</ul>
<p>Coba lihat sekeliling rumahmu! Ada apa saja? 👀</p>`,
      quiz: {
        soal: 'Di depan rumah Upe ada...',
        pilihan: ['Kebun bunga 🌻', 'Pohon mangga 🌳', 'Masjid 🕌'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Peta Sederhana!',
      konten: `<p>Upe membuat peta sederhana rumahnya. 🗺️</p>
<p style="background:#fff8e1; padding:16px; border-radius:8px; margin:12px 0; border-left:4px solid #fbc02d; font-size:18px;">
🌳 Pohon<br>
⬆️<br>
🏠 RUMAH UPE → 🌻 Kebun (samping kanan)<br>
⬇️<br>
🕌 Masjid (samping kiri)
</p>
<p>Belakang rumah Upe ada kebun bunga. 🌻</p>
<p>Dengan peta, kita tahu letak benda-benda! 🧭</p>
<p>Kata arah yang penting:</p>
<ul style="padding-left: 20px;">
  <li>⬆️ <strong>Depan</strong> — arah yang kita hadap</li>
  <li>⬇️ <strong>Belakang</strong> — lawan dari depan</li>
  <li>➡️ <strong>Kanan</strong> — arah tangan yang biasa dipakai menulis</li>
  <li>⬅️ <strong>Kiri</strong> — arah tangan satunya</li>
</ul>
<p>Sekarang coba tunjuk: mana depan rumahmu? Hebat! ⭐</p>`,
      quiz: {
        soal: 'Rumah Upe ada di sebelah... pohon mangga',
        pilihan: ['Depan', 'Belakang', 'Samping'],
        jawabanIdx: 0,
      },
    },
    latihan: [
      { soal: 'Bagian rumah untuk masuk dan keluar adalah...', pilihan: ['🚪 Pintu', '🪟 Jendela', '🏠 Atap'], jawabanIdx: 0 },
      { soal: 'Arah lawan dari DEPAN adalah...', pilihan: ['Kanan', 'Belakang ⬇️', 'Kiri'], jawabanIdx: 1 },
      { soal: 'Peta digunakan untuk...', pilihan: ['Menulis', 'Menunjukkan letak 🗺️', 'Mewarnai'], jawabanIdx: 1 },
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 8 K1 B.Indonesia books generated successfully!');
