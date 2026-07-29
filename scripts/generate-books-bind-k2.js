const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas2/bahasa-indonesia');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k2-bind-01': '#FFFDE7', 'k2-bind-02': '#FCE4EC', 'k2-bind-03': '#E3F2FD',
  'k2-bind-04': '#E8F5E9', 'k2-bind-05': '#F3E5F5', 'k2-bind-06': '#FFF3E0',
  'k2-bind-07': '#FFFDE7', 'k2-bind-08': '#FCE4EC',
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
  <title>${data.judul} — Kelas 2</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas2 { font-size:18px; line-height:1.8; }
    .kelas2 .section-header { font-size:20px; }
    .kelas2 .section-body { font-size:18px; }
    .kelas2 .quiz-box p { font-size:18px; }
    .kelas2 .feedback { font-size:18px; }
    .kelas2 h1 { font-size:26px; }
    .kelas2 table { font-size:16px; }
  </style>
</head>
<body class="kelas2" data-kelas="2" data-pelajaran="bind" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #1565c0; margin:0 0 8px 0; font-size: 26px;">${data.judul}</h1>
        <p style="color: #666; font-size: 18px;">Bahasa Indonesia — Kelas 2</p>
        <p style="margin-top: 16px; font-size: 18px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Yuk Mulai! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Bagian 1 -->
    <div class="section-card">
      <div class="section-header">📖 Bagian 1: ${data.bagian1.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        ${data.bagian1.konten}
        <div class="quiz-box" data-idx="0" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 18px;">🤔 Coba tebak:</p>
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
      <div class="section-header">📖 Bagian 2: ${data.bagian2.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        ${data.bagian2.konten}
        <div class="quiz-box" data-idx="1" data-answered="false" style="margin-top: 20px;">
          <p style="font-weight: bold; font-size: 18px;">🤔 Coba tebak:</p>
          <p style="font-size: 18px;">${data.bagian2.quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${data.bagian2.quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 18px;"></div>
        </div>
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 18px;">
        <p style="font-weight:bold; font-size: 20px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

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

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 18px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu mendapatkan badge istimewa:</p>
        <div style="font-size: 80px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #1565c0; font-size: 24px;">${data.badgeNama}</p>
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
      <div class="ai-header">Tutor AI (Kakak Kelas 6)</div>
      <div class="ai-msgs" style="font-size: 16px;">
        <div class="msg ai">Halo! Aku kakak kelas. Mau tanya soal ${data.judul}? Aku siap bantu! 📚</div>
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
  // ===== k2-bind-01: Mengenal Perasaan =====
  {
    id: 'k2-bind-01',
    judul: 'Mengenal Perasaan',
    emoji: '😊',
    deskripsi: 'Yuk belajar tentang perasaan yang ada di dalam hatimu! Senang, sedih, marah, takut, malu, dan bangga! 😊😢😡',
    tujuan: ['Mengenal 6 perasaan dasar: senang, sedih, marah, takut, malu, bangga', 'Menceritakan perasaan sendiri dengan kata-kata 🗣️', 'Menghargai perasaan orang lain 🤗'],
    badgeEmoji: '😊',
    badgeNama: 'Juru Perasaan',
    bagian1: {
      judul: 'Macam-Macam Perasaan!',
      konten: `<p>Halo teman-teman! Hari ini kita akan belajar tentang perasaan! 🎉</p>
<p>Anton sedang bermain di lapangan. Tiba-tiba ia menang lomba lari! 🏆</p>
<p>Anton merasa <strong>SENANG</strong>! 🥳 Dia lompat-lompat kegirangan! "Horee aku menang!"</p>
<p>Budi bermain sepeda. Aduh, Budi jatuh dari sepeda! 🚲💥 Lututnya sakit sekali.</p>
<p>Budi merasa <strong>SEDIH</strong> dan sedikit sakit. 😢 "Aaahhh, sakit sekali..."</p>
<p>Tika melihat ular di kebun! 🐍 Besar sekali!</p>
<p>Tika merasa <strong>TAKUT</strong>. 😱 "TOLONG! ADA ULAR!" Dia lari terbirit-birit.</p>
<p>Malosi sedang bermain. Tiba-tiba adiknya merusak mainan kesayangannya! 😤</p>
<p>Malosi merasa <strong>MARAH</strong>. "Hei! Itu mainanku!"</p>
<p>Nah, siapa yang pernah merasa senang? Sedih? Marah? Atau takut? Semua perasaan itu wajar kok! 😊</p>
<p>Yang penting kita tahu cara mengungkapkannya dengan baik ya! 👍</p>`,
      quiz: {
        soal: 'Anton menang lomba lari. Anton merasa... 🏆',
        pilihan: ['SEDIH 😢', 'SENANG 🥳', 'TAKUT 😱'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Malu, Bangga, dan Cara Mengelola Perasaan!',
      konten: `<p>Ada dua perasaan lagi yang perlu kamu kenali! 👀</p>
<p><strong>MALU 🫣</strong> — Anton lupa bawa buku PR. Dia merasa malu saat Bu Guru bertanya. Mukanya jadi merah! 🥵</p>
<p><strong>BANGGA 🦚</strong> — Budi berhasil menggambar pemandangan yang bagus! Bu Guru memuji. Budi merasa bangga! "Terima kasih, Bu!" 😊</p>
<p>💡 <strong>Tips mengelola perasaan:</strong></p>
<ul style="padding-left: 20px;">
  <li>Kalau <strong>sedih</strong> — cerita pada Ibu atau Ayah 🗣️</li>
  <li>Kalau <strong>marah</strong> — tarik napas panjang dulu 😤➡️😊</li>
  <li>Kalau <strong>takut</strong> — bilang "Aku berani!" 💪</li>
  <li>Kalau <strong>malu</strong> — ingat, semua orang pernah lho! 🤗</li>
</ul>
<p>Semua perasaan itu <strong>NORMAL</strong>! Yang penting kita tahu cara menghadapinya! 🌟</p>`,
      quiz: {
        soal: 'Kalau sedang marah, sebaiknya kita...',
        pilihan: ['Berteriak keras', 'Tarik napas panjang 😤➡️😊', 'Memukul bantal'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Budi jatuh dari sepeda. Budi merasa...', pilihan: ['SENANG 🥳', 'SEDIH 😢', 'MARAH 😤'], jawabanIdx: 1 },
      { soal: 'Tika melihat ular besar. Tika merasa...', pilihan: ['SENANG', 'TAKUT', 'MARAH'], jawabanIdx: 1 },
      { soal: '"Aku berhasil! Terima kasih, Bu!" Itu perasaan...', pilihan: ['MALU', 'BANGGA', 'TAKUT'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-02: Menjaga Kesehatan =====
  {
    id: 'k2-bind-02',
    judul: 'Menjaga Kesehatan',
    emoji: '💪',
    deskripsi: 'Belajar cara menjaga tubuh tetap sehat! Makan bergizi, tidur cukup, olahraga, dan cuci tangan! 💪🍎😴',
    tujuan: ['Memahami pentingnya makan makanan bergizi 🍎', 'Membiasakan tidur cukup dan olahraga 😴🏃', 'Mempraktikkan cuci tangan pakai sabun 🧼'],
    badgeEmoji: '💪',
    badgeNama: 'Juru Sehat',
    bagian1: {
      judul: 'Makan Sehat dan Tidur Cukup!',
      konten: `<p>Halo! Yuk kita belajar cara menjaga tubuh tetap sehat dan kuat! 💪</p>
<p>Anton setiap hari makan sayur dan buah. 🥦🍎</p>
<p>"Aku suka brokoli dan apel! Rasanya enak!" kata Anton. 😋</p>
<p>Ibu Anton selalu memasak makanan bergizi: nasi, sayur, lauk, dan buah. 🍚🥗🧆</p>
<p><strong>Makanan bergizi</strong> membuat tubuhku kuat dan tidak mudah sakit! 🛡️</p>
<p>Selain makan, Budi juga <strong>tidur cukup</strong> 10 jam setiap malam. 😴</p>
<p>"Kalau kurang tidur, aku ngantuk di sekolah!" kata Budi. 🥱</p>
<p>Tidur cukup membuat tubuh <strong>segar</strong> dan <strong>semangat</strong> belajar! ⭐</p>
<p>Yuk mulai sekarang, makan makanan bergizi dan tidur yang cukup ya! 😊</p>`,
      quiz: {
        soal: 'Makanan bergizi membuat tubuh kita...',
        pilihan: ['Lemah', 'Kuat dan tidak mudah sakit 🛡️', 'Ngantuk'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Olahraga dan Cuci Tangan!',
      konten: `<p>Setiap pagi, Budi dan Anton olahraga bersama! 🏃‍♂️🏃‍♂️</p>
<p>"Ayo lari keliling lapangan!" ajak Anton. "Pasti seru!" 🏃💨</p>
<p>Mereka juga senang bermain bola, lompat tali, dan berenang. ⚽🤸🏊</p>
<p>Olahraga membuat tubuh <strong>kuat</strong>, jantung <strong>sehat</strong>, dan kita <strong>gembira</strong>! ❤️😊</p>
<p>Yang tidak kalah penting: <strong>cuci tangan pakai sabun!</strong> 🧼👐</p>
<p>Sebelum makan, setelah main, dan setelah dari toilet — cuci tangan yuk! 🚻</p>
<p>Kuman-kuman nakal pergi! Kita pun tidak sakit perut! 🦠❌</p>
<p>Ingat 4 sehat: <strong>makan bergizi 🍎 + tidur cukup 😴 + olahraga 🏃 + cuci tangan 🧼</strong>!</p>
<p>Lakukan setiap hari, tubuhmu akan kuat! Kamu hebat! 🌟</p>`,
      quiz: {
        soal: 'Kapan kita harus cuci tangan pakai sabun?',
        pilihan: ['Sesudah makan saja', 'Sebelum makan, setelah main, setelah toilet 🧼', 'Seminggu sekali'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Tidur yang cukup untuk anak-anak adalah... jam', pilihan: ['5 jam', '8 jam', '10 jam'], jawabanIdx: 2 },
      { soal: 'Olahraga membuat tubuh kita...', pilihan: ['Lemah', 'Kuat dan gembira 💪😊', 'Ngantuk'], jawabanIdx: 1 },
      { soal: 'Yang BUKAN makanan bergizi adalah...', pilihan: ['🍎 Apel', '🥦 Brokoli', '🍟 Kentang goreng (terlalu banyak minyak)'], jawabanIdx: 2 },
    ],
  },

  // ===== k2-bind-03: Berhati-hati di Mana Saja =====
  {
    id: 'k2-bind-03',
    judul: 'Berhati-hati di Mana Saja',
    emoji: '🚦',
    deskripsi: 'Belajar aturan keselamatan di jalan, di rumah, dan di sekolah! Tetap aman ya! 🚦🚸',
    tujuan: ['Memahami aturan lalu lintas dasar 🚦', 'Tahu cara aman saat di rumah dan jalan 🏠', 'Berani berkata TIDAK pada orang asing 🗣️'],
    badgeEmoji: '🚦',
    badgeNama: 'Juru Hati-hati',
    bagian1: {
      judul: 'Aturan di Jalan Raya!',
      konten: `<p>Anton mau pergi ke sekolah. Jalanannya ramai! 🚗🚌🏍️</p>
<p>Bu Guru sudah mengajari aturan menyeberang jalan: 📚</p>
<p>🚦<strong> Lihat kiri... 👀 lihat kanan... 👀 lihat kiri lagi!</strong> Kalau aman, baru menyeberang! 🚶‍♂️</p>
<p>Gunakan <strong>zebra cross</strong> (tempat menyeberang bergaris putih). 🦓</p>
<p>Budi teringat pesan Ibu: "Jangan bermain di pinggir jalan!" 🚫</p>
<p>"Kalau ada lampu merah, kita berhenti. Lampu hijau, jalan!" 🚦</p>
<ul style="padding-left: 20px;">
  <li>🔴 <strong>Merah</strong> = Berhenti! ✋</li>
  <li>🟡 <strong>Kuning</strong> = Siap-siap! ⚠️</li>
  <li>🟢 <strong>Hijau</strong> = Jalan! 🚶</li>
</ul>
<p>Aturan ini penting. Keselamatan nomor satu! 🥇</p>`,
      quiz: {
        soal: 'Saat menyeberang jalan, kita harus...',
        pilihan: ['Lari cepat', 'Lihat kiri-kanan-kiri 👀', 'Tutup mata'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Aman di Rumah dan Waspada Orang Asing!',
      konten: `<p>Di rumah juga harus hati-hati lho! 🏠</p>
<ul style="padding-left: 20px;">
  <li>🔌 Jangan main colokan listrik — bahaya! ⚡❌</li>
  <li>🔪 Jangan pegang pisau tanpa orang tua 🚫</li>
  <li>💊 Jangan makan obat sembarangan 🚫</li>
  <li>🚪 Tutup pintu rumah selalu 🔒</li>
</ul>
<p>Budi sedang di rumah sendirian. Tiba-tiba ada orang asing mengetuk pintu. 🚪</p>
<p>"Nak, buka pintunya. Ibu titip titip permen nih!" kata orang asing. 🍬</p>
<p>Budi ingat pesan Ibu: <strong>"Jangan buka pintu untuk orang asing!"</strong> 🗣️</p>
<p>"Maaf, Ibu tidak ada. Saya tidak boleh buka pintu!" kata Budi tegas. 💪</p>
<p>Wah, Budi hebat! Berani berkata TIDAK pada orang asing! 🌟</p>
<p>Ingat: <strong>keselamatanmu yang paling penting!</strong> 🥇</p>`,
      quiz: {
        soal: 'Ada orang asing memberi permen. Yang benar adalah...',
        pilihan: ['Terima permennya 😋', 'Tolak dan jangan buka pintu 🚪❌', 'Ajak main'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Lampu lalu lintas warna MERAH artinya...', pilihan: ['Jalan terus 🚶', 'Berhenti ✋', 'Lari cepat 🏃'], jawabanIdx: 1 },
      { soal: 'Main colokan listrik itu...', pilihan: ['Aman saja', 'Bahaya ⚡❌', 'Seru banget'], jawabanIdx: 1 },
      { soal: 'Orang asing memberi permen. Sebaiknya kita...', pilihan: ['Terima dengan senang', 'Tolak dan pergi 🚶', 'Makan sekarang'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-04: Keluargaku Unik =====
  {
    id: 'k2-bind-04',
    judul: 'Keluargaku Unik',
    emoji: '👨‍👩‍👧‍👦',
    deskripsi: 'Yuk kenali anggota keluargamu dan pekerjaan mereka! Setiap keluarga itu unik dan istimewa! 👨‍👩‍👧‍👦🌟',
    tujuan: ['Menyebutkan anggota keluarga inti 👨‍👩‍👧‍👦', 'Menceritakan pekerjaan orang tua 💼', 'Saling membantu dalam keluarga 🤝'],
    badgeEmoji: '👨‍👩‍👧‍👦',
    badgeNama: 'Juru Keluarga',
    bagian1: {
      judul: 'Anggota Keluarga!',
      konten: `<p>Halo teman-teman! Setiap orang punya keluarga. Yuk kita cerita! 👨‍👩‍👧‍👦</p>
<p>Ini keluarga Anton: ada Ayah, Ibu, Anton, dan adiknya Siti. 🏠</p>
<ul style="padding-left: 20px;">
  <li>👨 <strong>Ayah</strong> — kepala keluarga, mencari nafkah</li>
  <li>👩 <strong>Ibu</strong> — merawat anak, memasak, bekerja juga</li>
  <li>🧑 <strong>Anak</strong> — Anton dan Siti, belajar dan bermain</li>
</ul>
<p>Keluarga Budi berbeda. Budi tinggal dengan <strong>Nenek</strong> dan <strong>Kakek</strong> karena orang tuanya di kota lain. 👴👵</p>
<p>"Meskipun beda, kami tetap bahagia!" kata Budi. 😊</p>
<p>Setiap keluarga itu <strong>UNIK</strong> dan <strong>ISTIMEWA</strong>! Tidak ada yang sama! 🌟</p>
<p>Yuk ceritakan keluargamu! Ada Ayah, Ibu, kakak, adik, atau kakek nenek? 🗣️</p>`,
      quiz: {
        soal: 'Anggota keluarga inti terdiri dari...',
        pilihan: ['Ayah, Ibu, Anak 👨‍👩‍👧‍👦', 'Teman dan guru', 'Tetangga'],
        jawabanIdx: 0,
      },
    },
    bagian2: {
      judul: 'Pekerjaan Orang Tua dan Saling Membantu!',
      konten: `<p>Setiap orang tua punya pekerjaan. Ayo lihat! 💼</p>
<ul style="padding-left: 20px;">
  <li>👨‍🌾 Ayah Anton seorang <strong>petani</strong> — menanam padi di sawah 🌾</li>
  <li>👩‍🏫 Ibu Anton seorang <strong>guru</strong> — mengajar di sekolah 🏫</li>
  <li>👩‍🍳 Ibu Budi seorang <strong>koki</strong> — memasak di restoran 🍳</li>
  <li>👨‍🔧 Ayah Tika seorang <strong>montir</strong> — memperbaiki mobil 🚗</li>
</ul>
<p>Hebat ya! Semua pekerjaan penting dan patut dihargai! 👍</p>
<p>Yang seru, keluarga Anton selalu <strong>saling membantu</strong> 🤝</p>
<p>Anton membantu Ibu menyapu halaman 🧹. Siti membantu Ayah memberi makan ayam 🐔.</p>
<p>"Dengan saling membantu, pekerjaan cepat selesai dan kita makin sayang!" kata Ibu. 😊</p>
<p>Yuk bantu orang tua di rumah! Walaupun kecil, bantuanmu berarti besar! 🌟</p>`,
      quiz: {
        soal: 'Ayah Anton bekerja di sawah. Ayah Anton seorang...',
        pilihan: ['Guru 👩‍🏫', 'Petani 👨‍🌾', 'Koki 👨‍🍳'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Kepala keluarga yang mencari nafkah adalah...', pilihan: ['Ibu 👩', 'Ayah 👨', 'Anak 🧑'], jawabanIdx: 1 },
      { soal: 'Kita harus... pekerjaan orang tua', pilihan: ['Mengejek', 'Menghargai 👍', 'Mengabaikan'], jawabanIdx: 1 },
      { soal: 'Dengan saling membantu, keluarga jadi...', pilihan: ['Bertengkar', 'Semakin sayang 🤗', 'Jauh'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-05: Berteman dalam Keragaman =====
  {
    id: 'k2-bind-05',
    judul: 'Berteman dalam Keragaman',
    emoji: '🤝',
    deskripsi: 'Indonesia kaya akan suku dan agama. Yuk berteman dengan siapa pun tanpa membeda-bedakan! 🌈🤝',
    tujuan: ['Memahami keberagaman suku dan agama di Indonesia 🌈', 'Bersikap toleran pada teman yang berbeda 🤝', 'Menjaga persatuan dalam perbedaan 🇮🇩'],
    badgeEmoji: '🤝',
    badgeNama: 'Juru Toleransi',
    bagian1: {
      judul: 'Indonesia Kaya Akan Keragaman!',
      konten: `<p>Tahukah kamu? Indonesia punya banyak suku, agama, dan budaya! 🇮🇩</p>
<p>Di kelas Anton, ada teman-teman dari berbagai daerah! 🏫</p>
<ul style="padding-left: 20px;">
  <li>🌺 Anton berasal dari <strong>Papua</strong> — pakaian adatnya dari kulit kayu!</li>
  <li>🏝️ Budi berasal dari <strong>Bali</strong> — ia suka menari tari Pendet! 💃</li>
  <li>🏔️ Tika berasal dari <strong>Sulawesi</strong> — rumah adatnya Tongkonan! 🏠</li>
  <li>🌋 Malosi berasal dari <strong>Jawa</strong> — ia suka wayang kulit! 🎭</li>
</ul>
<p>Mereka juga punya agama yang berbeda-beda. Tapi mereka tetap berteman baik! 😊</p>
<p>Perbedaan itu <strong>indah</strong>, seperti pelangi yang punya banyak warna! 🌈✨</p>`,
      quiz: {
        soal: 'Indonesia punya banyak...',
        pilihan: ['Suku dan agama 🌈', 'Satu suku saja', 'Tidak ada perbedaan'],
        jawabanIdx: 0,
      },
    },
    bagian2: {
      judul: 'Berteman Tanpa Membeda-bedakan!',
      konten: `<p>Anton dan teman-teman bermain bersama setiap hari. 🎉</p>
<p>Budi (Bali) mengajarkan Anton (Papua) menari Bali. 💃</p>
<p>Malosi (Jawa) mengajak semua main wayang kulit. 🎭</p>
<p>Tika (Sulawesi) membawakan kue khas daerahnya. 🍪</p>
<p>"Wah, seru banget! Kita belajar banyak hal baru!" kata mereka. 📚</p>
<p>💡 <strong>Sikap toleransi:</strong></p>
<ul style="padding-left: 20px;">
  <li>👉 Tidak mengejek teman yang berbeda 🚫</li>
  <li>👉 Mau berteman dengan siapa saja 🤝</li>
  <li>👉 Menghormati teman yang sedang beribadah 🕌⛪🛕</li>
  <li>👉 Saling membantu tanpa membedakan 🌟</li>
</ul>
<p><strong>Bhinneka Tunggal Ika</strong> — berbeda-beda tapi tetap satu! 🇮🇩</p>
<p>Mari kita jadi anak Indonesia yang saling menghargai! 🌟</p>`,
      quiz: {
        soal: 'Sikap yang benar pada teman berbeda suku adalah...',
        pilihan: ['Mengejek', 'Menghormati dan berteman 🤝', 'Menjauhi'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: '"Bhinneka Tunggal Ika" artinya...', pilihan: ['Satu untuk semua', 'Berbeda-beda tapi tetap satu 🇮🇩', 'Indonesia jaya'], jawabanIdx: 1 },
      { soal: 'Teman yang sedang beribadah harus kita...', pilihan: ['Ganggu', 'Hormati 🙏', 'Tertawakan'], jawabanIdx: 1 },
      { soal: 'Perbedaan budaya membuat kita...', pilihan: ['Bertengkar', 'Belajar banyak hal baru 📚', 'Pisah'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-06: Bijak Memakai Uang =====
  {
    id: 'k2-bind-06',
    judul: 'Bijak Memakai Uang',
    emoji: '🐷',
    deskripsi: 'Belajar tentang uang receh, menabung, dan membedakan kebutuhan vs keinginan! Ayo jadi anak yang bijak! 🐷💰',
    tujuan: ['Mengenal jenis uang receh dan kertas 💵', 'Membedakan kebutuhan dan keinginan 🧠', 'Membiasakan menabung sejak dini 🐷'],
    badgeEmoji: '🐷',
    badgeNama: 'Juru Nabung',
    bagian1: {
      judul: 'Mengenal Uang dan Nilainya!',
      konten: `<p>Anton punya uang saku 5.000 rupiah setiap hari! 💵</p>
<p>Apa saja jenis uang di Indonesia? Yuk lihat! 👀</p>
<ul style="padding-left: 20px;">
  <li>🪙 <strong>Uang logam (receh):</strong> 100, 200, 500, 1.000</li>
  <li>💵 <strong>Uang kertas:</strong> 1.000, 2.000, 5.000, 10.000, 20.000, 50.000, 100.000</li>
</ul>
<p>Budi menyimpan uang sakunya di celengan babi! 🐷</p>
<p>"Setiap hari aku masukkan 2.000 rupiah ke celengan," kata Budi. 🪙</p>
<p>Setelah sebulan, celengan Budi penuh! Ada 60.000 rupiah! 😲</p>
<p>"Wah, banyak sekali! Aku bisa beli sepatu baru!" seru Budi senang. 🥳</p>
<p>Menabung itu seru! Lihat uangmu bertambah setiap hari! 📈</p>`,
      quiz: {
        soal: 'Uang logam 1.000 disebut juga...',
        pilihan: ['Uang kertas 💵', 'Uang receh 🪙', 'Uang mainan'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Kebutuhan vs Keinginan!',
      konten: `<p>Anton dan Budi pergi ke toko. Mereka punya uang 10.000 rupiah! 🏪</p>
<p>💡 <strong>KEBUTUHAN</strong> = barang yang harus dibeli agar hidup sehat.</p>
<ul style="padding-left: 20px;">
  <li>🍚 Makanan dan minuman — kita butuh untuk energi</li>
  <li>👕 Pakaian — melindungi tubuh</li>
  <li>📖 Buku dan alat tulis — untuk belajar</li>
</ul>
<p>💡 <strong>KEINGINAN</strong> = barang yang kita mau, tapi tidak harus.</p>
<ul style="padding-left: 20px;">
  <li>🧸 Mainan baru</li>
  <li>🍦 Es krim mewah</li>
  <li>👟 Sepatu branded</li>
</ul>
<p>"Aku mau beli buku tulis dulu. Itu kebutuhan!" kata Anton bijak. 📓✅</p>
<p>"Kalau ada sisa uang, baru beli stiker!" 🎀</p>
<p>Wah, Anton hebat! Prioritaskan kebutuhan dulu! 🌟</p>
<p>Ingat: <strong>menabung itu kebaikan</strong>. Sisihkan sebagian uang sakumu! 🐷💰</p>`,
      quiz: {
        soal: 'Mana yang termasuk KEBUTUHAN?',
        pilihan: ['🧸 Mainan', '🍚 Makanan', '🍦 Es krim'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Menabung artinya...', pilihan: ['Menghabiskan uang', 'Menyisihkan uang untuk masa depan 🐷', 'Meminjam uang'], jawabanIdx: 1 },
      { soal: 'Yang DIDAHULUKAN adalah...', pilihan: ['Keinginan 🧸', 'Kebutuhan 🍚', 'Mainan'], jawabanIdx: 1 },
      { soal: 'Uang 5.000 adalah uang...', pilihan: ['Logam', 'Kertas 💵', 'Receh'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-07: Sayang Lingkungan =====
  {
    id: 'k2-bind-07',
    judul: 'Sayang Lingkungan',
    emoji: '🌿',
    deskripsi: 'Yuk kita jaga bumi kita! Buang sampah pada tempatnya, hemat air, dan tanam pohon! 🌿🌍',
    tujuan: ['Membuang sampah pada tempatnya 🗑️', 'Menghemat air dan listrik 💧', 'Menanam dan merawat tanaman 🌱'],
    badgeEmoji: '🌿',
    badgeNama: 'Juru Lingkungan',
    bagian1: {
      judul: 'Buang Sampah pada Tempatnya!',
      konten: `<p>Halo teman-teman! Bumi adalah rumah kita. Yuk kita jaga! 🌍</p>
<p>Anton dan Budi piknik di taman. Mereka membawa bekal makanan. 🧺</p>
<p>Setelah makan, mereka melihat sampah berserakan! 🗑️❌</p>
<p>"Ayo kita bersihkan!" ajak Anton. 💪</p>
<p>Mereka memunguti sampah dan membuangnya ke <strong>tempat sampah</strong>. ♻️</p>
<p>Budi bercerita, "Di sekolah, ada tiga tempat sampah: ♻️"</p>
<ul style="padding-left: 20px;">
  <li>🟢 <strong>Hijau</strong> = sampah organik (sisa makanan, daun)</li>
  <li>🟡 <strong>Kuning</strong> = sampah plastik (botol, bungkus)</li>
  <li>🔴 <strong>Merah</strong> = sampah berbahaya (baterai, kaca)</li>
</ul>
<p>Wah, keren! Dengan membuang sampah pada tempatnya, lingkungan jadi bersih dan sehat! 🌟</p>
<p>"Lihat! Tamannya jadi indah lagi!" kata Anton senang. 🌸😊</p>`,
      quiz: {
        soal: 'Sampah plastik dimasukkan ke tempat sampah warna...',
        pilihan: ['🟢 Hijau', '🟡 Kuning', '🔴 Merah'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Hemat Air dan Menanam Pohon!',
      konten: `<p>Air sangat penting bagi kehidupan! 💧</p>
<p>Anton belajar menghemat air di rumah: 🏠</p>
<ul style="padding-left: 20px;">
  <li>🚿 Mandi tidak terlalu lama — 10 menit cukup!</li>
  <li>🚰 Matikan keran kalau tidak dipakai</li>
  <li>💧 Air bekas cuci sayur bisa untuk menyiram tanaman</li>
</ul>
<p>Selain hemat air, Anton dan Budi juga <strong>menanam pohon</strong>! 🌱</p>
<p>Mereka menanam 5 pohon mangga di halaman belakang sekolah. 🌳</p>
<p>"Pohon membuat udara segar dan memberi buah manis!" 🥭</p>
<p>Bumi akan senang kalau kita menjaganya! 🌍💚</p>
<p>Yuk lakukan hal kecil mulai hari ini: <strong>hemat air, buang sampah, tanam pohon</strong>! 🌟</p>`,
      quiz: {
        soal: 'Air bekas cuci sayur sebaiknya...',
        pilihan: ['Dibuang saja', 'Untuk menyiram tanaman 🌱', 'Diminum'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Sampah organik adalah sampah yang...', pilihan: ['Dari plastik', 'Mudah membusuk (sisa makanan) 🍌', 'Berbahaya'], jawabanIdx: 1 },
      { soal: 'Pohon membuat udara menjadi...', pilihan: ['Panas', 'Segar dan sejuk 🌿', 'Berbau'], jawabanIdx: 1 },
      { soal: 'Yang BUKAN cara menghemat air adalah...', pilihan: ['Mandi 10 menit 🚿', 'Mandi 1 jam 🚿❌', 'Matikan keran saat gosok gigi'], jawabanIdx: 1 },
    ],
  },

  // ===== k2-bind-08: Hobi yang Jadi Prestasi =====
  {
    id: 'k2-bind-08',
    judul: 'Hobi yang Jadi Prestasi',
    emoji: '🎨',
    deskripsi: 'Ikuti cerita Budi yang hobi menggambar hingga jadi juara! Jangan pernah menyerah! 🎨🏆',
    tujuan: ['Mengenal berbagai hobi yang positif 🎯', 'Memahami pentingnya latihan rutin 💪', 'Tidak mudah menyerah dalam meraih mimpi 🌟'],
    badgeEmoji: '🎨',
    badgeNama: 'Juru Prestasi',
    bagian1: {
      judul: 'Hobi Budi yang Hebat!',
      konten: `<p>Budi suka menggambar sejak TK! 🎨</p>
<p>Setiap hari sepulang sekolah, Budi menggambar di buku sketsanya. ✏️</p>
<p>Dia menggambar pemandangan, hewan, dan keluarganya. 🏞️🐱👨‍👩‍👧‍👦</p>
<p>"Wah, gambarmu bagus sekali, Budi!" puji Ibu setiap hari. 😊</p>
<p>Anton bertanya, "Budi, kenapa kamu suka menggambar?" 🤔</p>
<p>"Karena menggambar itu <strong>menyenangkan</strong>! Aku bisa berimajinasi!" jawab Budi. 💭✨</p>
<p>Hobi adalah kegiatan yang kita sukai dan lakukan dengan <strong>senang hati</strong>! ❤️</p>
<p>Contoh hobi positif: membaca 📚, menggambar 🎨, bernyanyi 🎤, menari 💃, olahraga ⚽, berkebun 🌱.</p>
<p>Setiap orang punya hobi berbeda. Itu yang membuat kita <strong>UNIK</strong>! 🌟</p>`,
      quiz: {
        soal: 'Hobi adalah kegiatan yang kita lakukan dengan...',
        pilihan: ['Terpaksa', 'Senang hati ❤️', 'Marah'],
        jawabanIdx: 1,
      },
    },
    bagian2: {
      judul: 'Latihan Rutin dan Tidak Menyerah!',
      konten: `<p>Budi ingin mengikuti lomba menggambar! 🏆</p>
<p>Setiap hari dia berlatih. Pagi, siang, sore — terus belajar! 💪</p>
<p>"Latihan terus, jangan menyerah!" kata Ayah. 👨</p>
<p>Suatu hari, Budi hampir menyerah. Gambarnya tidak seperti yang diinginkan. 😞</p>
<p>Tapi Ibu berkata, "Kesalahan adalah guru terbaik. Coba lagi!" 🤗</p>
<p>Budi mencoba lagi... dan lagi... dan lagi! Akhirnya gambarnya membaik! 📈</p>
<p>Hari lomba tiba! Budi menggambar dengan percaya diri. 🎨✨</p>
<p><strong>Dia JUARA 1!</strong> 🥇🏆</p>
<p>Semua tepuk tangan. Budi tersenyum bahagia. 😊</p>
<p>"Terima kasih Ibu, Ayah, dan semua yang mendukungku!"</p>
<p>Pesan Budi: <strong>"Jangan pernah menyerah! Latihan terus, dan kamu pasti bisa!"</strong> 🌟💪</p>`,
      quiz: {
        soal: 'Budi juara lomba menggambar karena...',
        pilihan: ['Beruntung', 'Latihan terus dan tidak menyerah 💪', 'Pintar sejak lahir'],
        jawabanIdx: 1,
      },
    },
    latihan: [
      { soal: 'Saat gagal, yang benar adalah...', pilihan: ['Menangis terus', 'Mencoba lagi 💪', 'Berhenti'], jawabanIdx: 1 },
      { soal: 'Hobi yang POSITIF adalah...', pilihan: ['Membaca buku 📚', 'Tidur terus', 'Main game seharian'], jawabanIdx: 0 },
      { soal: 'Dengan latihan rutin, kemampuan kita akan...', pilihan: ['Berkurang', 'Meningkat 📈', 'Hilang'], jawabanIdx: 1 },
    ],
  },
];

materiList.forEach(materi => {
  const html = renderBook(materi);
  const filePath = path.join(outDir, `${materi.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Generated ${filePath}`);
});
console.log('Done! 8 K2 B.Indonesia books generated successfully!');
