const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas3/ipas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k3-ipas-01': '#E8F5E9',
  'k3-ipas-02': '#E0F7FA',
  'k3-ipas-03': '#FFF3E0',
  'k3-ipas-04': '#FFFDE7',
  'k3-ipas-05': '#E3F2FD',
  'k3-ipas-06': '#FCE4EC',
  'k3-ipas-07': '#F3E5F5',
  'k3-ipas-08': '#E8F5E9',
};

function renderQuizBox(quiz, idx) {
  return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #ddd;">
          <p style="font-weight: bold; font-size: 17px;">🤔 ${quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:10px; font-weight:bold; font-size: 17px;"></div>
        </div>`;
}

function renderBook(data) {
  const bg = bgColors[data.id];
  const jawaban = [
    data.observasi.quiz[0].jawabanIdx,
    data.observasi.quiz[1].jawabanIdx,
    data.eksperimen.quiz[0].jawabanIdx,
    data.eksperimen.quiz[1].jawabanIdx,
    data.latihan[0].jawabanIdx,
    data.latihan[1].jawabanIdx,
    data.latihan[2].jawabanIdx,
    data.latihan[3].jawabanIdx,
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — IPAS Kelas 3</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas3-ipas { font-size:17px; line-height:1.8; }
    .kelas3-ipas .section-header { font-size:19px; }
    .kelas3-ipas .section-body { font-size:17px; }
    .kelas3-ipas .quiz-box p { font-size:17px; }
    .kelas3-ipas .feedback { font-size:17px; }
    .kelas3-ipas h1 { font-size:24px; }
    .eksperimen-box { background: #fff8e1; border-radius: 12px; padding: 20px; border-left: 4px solid #ff9800; margin: 16px 0; }
    .eksperimen-box h4 { color: #e65100; margin-top: 0; }
    .observasi-box { background: #e8f5e9; border-radius: 12px; padding: 20px; border-left: 4px solid #4caf50; margin: 16px 0; }
  </style>
</head>
<body class="kelas3-ipas" data-kelas="3" data-pelajaran="ipas" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 24px;">${data.judul}</h1>
        <p style="color: #666; font-size: 17px;">IPAS — Kelas 3</p>
        <p style="margin-top: 16px; font-size: 17px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Ayo Eksplorasi! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Observasi 1 -->
    <div class="section-card">
      <div class="section-header">🔍 Observasi 1: ${data.observasi.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <div class="observasi-box">
          ${data.observasi.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 1</p>
        ${renderQuizBox(data.observasi.quiz[0], 0)}
        ${renderQuizBox(data.observasi.quiz[1], 1)}
      </div>
    </div>

    <!-- Eksperimen / Coba di Rumah -->
    <div class="section-card">
      <div class="section-header">🔬 Coba di Rumah: ${data.eksperimen.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <div class="eksperimen-box">
          <h4>🧪 Eksperimen Sederhana</h4>
          ${data.eksperimen.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 2</p>
        ${renderQuizBox(data.eksperimen.quiz[0], 2)}
        ${renderQuizBox(data.eksperimen.quiz[1], 3)}
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 17px;">
        <p style="font-weight:bold; font-size: 19px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

        ${data.latihan.map((soal, si) => {
          const idx = si + 4;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 17px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 17px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 17px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu jadi ilmuwan sejati! Dapat badge istimewa:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 22px;">${data.badgeNama}</p>
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
    window._TOTAL_SECTIONS = 8;
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// ============ 8 MATERI IPAS KELAS 3 ============
const materiList = [
  // ===== k3-ipas-01 =====
  {
    id: 'k3-ipas-01',
    judul: 'Mari Kenali Hewan di Sekitar Kita',
    emoji: '🐾',
    deskripsi: 'Ayo kenali hewan peliharaan dan liar! Ciri-ciri, makanan, dan habitat mereka.',
    tujuan: ['Membedakan hewan peliharaan dan liar 🐱', 'Mengidentifikasi ciri-ciri hewan berdasarkan makanannya 🍗🌿', 'Mengelompokkan hewan berdasarkan cara berkembang biak 🐣'],
    badgeEmoji: '🐾',
    badgeNama: 'Penjelajah Hewan',
    observasi: {
      judul: 'Hewan di Sekitar Kita',
      konten: `<p>Alfa punya kucing 🐱. Kucing adalah hewan KARNIVORA, artinya pemakan daging 🍗.</p>
<p>Ciri-ciri kucing: berkaki empat 🐾, berbulu, melahirkan anak 🍼, punya kumis.</p>
<p>Hewan HERBIVORA makan tumbuhan 🌿. Contoh: sapi 🐄, kambing 🐐, kelinci 🐇.</p>
<p>Hewan OMNIVORA makan daging dan tumbuhan. Contoh: ayam 🐔, bebek 🦆, beruang 🐻.</p>
<p>Hewan bertelur 🥚: ayam, burung 🐦, ikan 🐟, katak 🐸. Hewan melahirkan: kucing, anjing 🐕, kambing.</p>
<p>Habitat = tempat tinggal alami. Di darat: kucing, sapi. Di air: ikan, katak. Di udara: burung 🕊️.</p>
<p>Ayo amati hewan di sekitarmu! 🌍</p>`,
      quiz: [
        { soal: 'Kucing termasuk hewan...', pilihan: ['Karnivora 🍗', 'Herbivora 🌿', 'Omnivora'], jawabanIdx: 0 },
        { soal: 'Hewan yang bertelur adalah...', pilihan: ['Kucing 🐱', 'Ayam 🐔', 'Sapi 🐄'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Amati Hewan Peliharaan',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Amati hewan peliharaanmu selama 1 hari (atau amati hewan di lingkunganmu). Catat:</p>
<ul style="padding-left: 20px;">
  <li>🐾 Apa yang dimakan?</li>
  <li>🏠 Di mana tidurnya?</li>
  <li>🚶 Berapa kali bergerak/berjalan?</li>
  <li>📝 Gambarkan hewan itu!</li>
</ul>
<p>Tulis hasil pengamatan di buku catatanmu ya! 🔬</p>`,
      quiz: [
        { soal: 'Hewan karnivora memakan...', pilihan: ['Daging 🍗', 'Rumput 🌿', 'Buah 🍎'], jawabanIdx: 0 },
        { soal: 'Tempat tinggal alami hewan disebut...', pilihan: ['Kandang', 'Habitat 🏠', 'Sekolah'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Sapi termasuk hewan...', pilihan: ['Herbivora 🌿', 'Karnivora 🍗', 'Omnivora'], jawabanIdx: 0 },
      { soal: 'Habitat = tempat...', pilihan: ['Tinggal alami 🏠', 'Makan 🍽️', 'Tidur 😴'], jawabanIdx: 0 },
      { soal: 'Hewan yang bisa hidup di air dan darat:...', pilihan: ['Kucing 🐱', 'Katak 🐸', 'Burung 🐦'], jawabanIdx: 1 },
      { soal: 'Ayam berkembang biak dengan cara...', pilihan: ['Melahirkan', 'Bertelur 🥚', 'Tunas'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-02 =====
  {
    id: 'k3-ipas-02',
    judul: 'Ayo, Mengenal Siklus pada Makhluk Hidup',
    emoji: '🦋',
    deskripsi: 'Belajar metamorfosis kupu-kupu, katak, ayam, dan daur hidup tumbuhan.',
    tujuan: ['Menjelaskan metamorfosis kupu-kupu 🦋', 'Mengidentifikasi tahap daur hidup katak 🐸', 'Mengamati pertumbuhan tanaman dari biji 🌱'],
    badgeEmoji: '🦋',
    badgeNama: 'Ahli Metamorfosis',
    observasi: {
      judul: 'Metamorfosis Sempurna',
      konten: `<p>Kupu-kupu mengalami METAMORFOSIS SEMPURNA 🦋. Artinya bentuk tubuh berubah total!</p>
<p>Tahap 1: Telur 🥚 — diletakkan di daun</p>
<p>Tahap 2: Ulat (larva) 🐛 — makan daun terus-terusan</p>
<p>Tahap 3: Kepompong (pupa) 🧅 — diam, berubah di dalam</p>
<p>Tahap 4: Kupu-kupu dewasa 🦋 — keluar, terbang!</p>
<p>Katak juga metamorfosis 🐸: telur → berudu (kecebong) → katak berkaki → katak dewasa.</p>
<p>Ayam 🐔: telur → anak ayam → ayam dewasa (metamorfosis TIDAK SEMPURNA — bentuk mirip).</p>
<p>Tanaman juga punya daur hidup: biji 🌱 → tunas → tanaman dewasa → bunga → buah → biji lagi! 🌻</p>`,
      quiz: [
        { soal: 'Tahap metamorfosis kupu-kupu setelah telur adalah...', pilihan: ['Kepompong 🧅', 'Ulat 🐛', 'Kupu-kupu 🦋'], jawabanIdx: 1 },
        { soal: 'Metamorfosis katak dimulai dari...', pilihan: ['Telur 🥚', 'Berudu', 'Katak kecil'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Tanam Kacang Hijau',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Kamu perlu: kapas, biji kacang hijau, wadah kecil, air.</p>
<ol style="padding-left: 20px;">
  <li>Basahi kapas dengan air. Letakkan di wadah. 💧</li>
  <li>Taruh biji kacang hijau di atas kapas. 🌱</li>
  <li>Letakkan di dekat jendela (kena cahaya). ☀️</li>
  <li>Amati hari ke-1, 3, 5, 7. Catat perubahannya! 📝</li>
</ol>
<p>Gambarkan perubahannya di buku catatan! 🔬</p>`,
      quiz: [
        { soal: 'Kepompong adalah tempat...', pilihan: ['Makan', 'Berubah bentuk 🧅', 'Terbang'], jawabanIdx: 1 },
        { soal: 'Ayam termasuk metamorfosis...', pilihan: ['Sempurna', 'Tidak sempurna 🐔', 'Lengkap'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Hewan yang metamorfosis sempurna:...', pilihan: ['Ayam', 'Kupu-kupu 🦋', 'Kucing'], jawabanIdx: 1 },
      { soal: 'Tumbuhan tumbuh dari...', pilihan: ['Batu 🪨', 'Biji 🌱', 'Pasir'], jawabanIdx: 1 },
      { soal: 'Tahap 1 metamorfosis kupu-kupu adalah...', pilihan: ['Telur 🥚', 'Ulat 🐛', 'Kupu-kupu 🦋'], jawabanIdx: 0 },
      { soal: 'Berudu adalah bentuk muda dari...', pilihan: ['Ayam 🐔', 'Katak 🐸', 'Kupu-kupu 🦋'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-03 =====
  {
    id: 'k3-ipas-03',
    judul: 'Hidup Bersama Alam',
    emoji: '🌿',
    deskripsi: 'Belajar rantai makanan, ekosistem, dan peran tumbuhan & hewan.',
    tujuan: ['Menjelaskan rantai makanan sederhana 🌿', 'Mengidentifikasi produsen dan konsumen 🐛🐦', 'Memahami pentingnya menjaga keseimbangan ekosistem ⚖️'],
    badgeEmoji: '🌿',
    badgeNama: 'Juru Ekosistem',
    observasi: {
      judul: 'Rantai Makanan',
      konten: `<p>Di padang rumput 🌿, ada RANTAI MAKANAN. Ini alur makan-dimakan!</p>
<p>🌿 Rumput (PRODUSEN) — membuat makanan sendiri dari sinar matahari ☀️</p>
<p>🐛 Belalang (KONSUMEN 1) — makan rumput</p>
<p>🐦 Burung (KONSUMEN 2) — makan belalang</p>
<p>🦅 Elang (KONSUMEN 3) — makan burung</p>
<p>Jika rumput habis 🔥 → belalang mati → burung kelaparan → elang ikut kelaparan 😱</p>
<p>Tumbuhan adalah PRODUSEN: mereka bisa membuat makanan. Hewan adalah KONSUMEN: mereka makan tumbuhan atau hewan lain.</p>
<p>Pengurai (bakteri, jamur 🍄) menguraikan bangkai jadi nutrisi untuk tanaman lagi!</p>
<p>Ekosistem = satu kesatuan makhluk hidup + lingkungannya. Ayo jaga keseimbangan! 🌍</p>`,
      quiz: [
        { soal: 'Produsen dalam rantai makanan adalah...', pilihan: ['Rumput 🌿', 'Belalang 🐛', 'Burung 🐦'], jawabanIdx: 0 },
        { soal: 'Jika rumput habis, maka...', pilihan: ['Belalang kenyang', 'Semua ikut kelaparan 😱', 'Burung senang'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Buat Diagram Rantai Makanan',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Buatlah rantai makanan sederhana dengan menggambar:</p>
<p>🌱 Rumput → 🐛 Belalang → 🐦 Burung</p>
<p>Atau coba ekosistem laut: 🌿 Ganggang → 🐟 Ikan kecil → 🦈 Ikan besar</p>
<p>Gunakan kertas gambar dan krayon/pensil warna! Setelah selesai, tempel di dinding kamarmu 🖼️</p>
<p>Tulis di samping gambar: siapa PRODUSEN, siapa KONSUMEN 1, KONSUMEN 2! ✏️</p>`,
      quiz: [
        { soal: 'Hewan pemakan tumbuhan disebut...', pilihan: ['Produsen', 'Konsumen 1 🐛', 'Pengurai'], jawabanIdx: 1 },
        { soal: 'Pengurai penting untuk...', pilihan: ['Memakan hewan hidup', 'Menguraikan bangkai jadi nutrisi 🍄', 'Membuat makanan'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Contoh ekosistem alami adalah...', pilihan: ['Kotak pensil', 'Sawah 🌾', 'Sepeda'], jawabanIdx: 1 },
      { soal: 'Tumbuhan mendapat energi dari...', pilihan: ['Makan serangga', 'Sinar matahari ☀️', 'Minum air'], jawabanIdx: 1 },
      { soal: 'Rantai makanan dimulai dari...', pilihan: ['Konsumen', 'Produsen 🌿', 'Pengurai'], jawabanIdx: 1 },
      { soal: 'Bila belalang habis, burung akan...', pilihan: ['Senang', 'Kelaparan 🐦', 'Terbang tinggi'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-04 =====
  {
    id: 'k3-ipas-04',
    judul: 'Berkenalan dengan Energi',
    emoji: '⚡',
    deskripsi: 'Belajar sumber energi: matahari, api, listrik, baterai, dan perubahan energi.',
    tujuan: ['Menyebutkan sumber energi dalam kehidupan ☀️🔋', 'Menjelaskan perubahan energi ⚡', 'Mengidentifikasi energi di sekitar kita 💡'],
    badgeEmoji: '⚡',
    badgeNama: 'Master Energi',
    observasi: {
      judul: 'Sumber Energi',
      konten: `<p>Matahari ☀️ adalah sumber energi TERBESAR di Bumi. Tanaman memakainya untuk FOTOSINTESIS 🌿.</p>
<p>Energi panas: api 🔥 — untuk memasak, menghangatkan.</p>
<p>Energi listrik ⚡: dari PLTU (batu bara → panas → listrik), PLTA (air → listrik), PLTS (matahari → listrik).</p>
<p>Baterai 🔋: energi kimia diubah jadi energi listrik.</p>
<p>Energi bunyi: dari speaker, alat musik 🎵</p>
<p>Energi gerak: angin 💨 memutar kincir, air menggerakkan turbin.</p>
<p>Perubahan energi: baterai (kimia) → listrik → lampu menyala (cahaya).</p>
<p>Hemat energi = hemat biaya. Matikan lampu jika tidak dipakai! 💡🚫</p>`,
      quiz: [
        { soal: 'Sumber energi terbesar di Bumi adalah...', pilihan: ['Matahari ☀️', 'Baterai 🔋', 'Api 🔥'], jawabanIdx: 0 },
        { soal: 'Baterai mengubah energi kimia menjadi energi...', pilihan: ['Panas', 'Listrik ⚡', 'Bunyi'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Listrik Statis dari Penggaris',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Kamu perlu: penggaris plastik, rambut kering, potongan kertas kecil.</p>
<ol style="padding-left: 20px;">
  <li>Gosokkan penggaris plastik ke rambutmu beberapa kali. 💇</li>
  <li>Dekatkan penggaris ke potongan kertas. 📄</li>
  <li>Apa yang terjadi? Kertas akan menempel! 🪄</li>
</ol>
<p>Ini namanya <strong>listrik statis</strong>! Gesekan menghasilkan energi listrik yang menarik kertas. 🔬</p>
<p>Coba juga: gosok balon ke rambut, dekatkan ke dinding! 🎈</p>`,
      quiz: [
        { soal: 'PLTA menghasilkan listrik dari...', pilihan: ['Batu bara', 'Air 💧', 'Angin'], jawabanIdx: 1 },
        { soal: 'Contoh perubahan energi listrik jadi cahaya:...', pilihan: ['Radio 📻', 'Lampu 💡', 'Kipas angin'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Energi yang dihasilkan alat musik adalah...', pilihan: ['Listrik', 'Bunyi 🎵', 'Panas'], jawabanIdx: 1 },
      { soal: 'Cara menghemat energi adalah...', pilihan: ['Nyalakan TV terus', 'Matikan lampu siang hari 💡🚫', 'Hidupkan AC sepanjang hari'], jawabanIdx: 1 },
      { soal: 'Matahari membantu tanaman untuk...', pilihan: ['Bernafas', 'Fotosintesis 🌿', 'Tidur'], jawabanIdx: 1 },
      { soal: 'Api menghasilkan energi...', pilihan: ['Listrik ⚡', 'Panas 🔥', 'Bunyi'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-05 =====
  {
    id: 'k3-ipas-05',
    judul: 'Aku dan Lingkungan Sekitarku',
    emoji: '🏠',
    deskripsi: 'Belajar lingkungan rumah, sekolah, perubahan cuaca, dan musim.',
    tujuan: ['Menjaga kebersihan lingkungan rumah dan sekolah 🏡', 'Membedakan cuaca dan musim ☀️🌧️', 'Memahami dampak lingkungan bersih vs kotor 💚'],
    badgeEmoji: '🏠',
    badgeNama: 'Juru Lingkungan',
    observasi: {
      judul: 'Lingkungan Rumah dan Sekolah',
      konten: `<p>Di rumah Alfa ada taman 🌳, jalan setapak 🛤️, dan tempat sampah 🗑️.</p>
<p>Lingkungan BERSIH = sehat 💪. Udara segar, tidak ada penyakit.</p>
<p>Lingkungan KOTOR = sakit 🤒. Sampah berserakan, bau, banyak lalat 🪰.</p>
<p>Ayo biasakan: buang sampah pada tempatnya, menyapu, dan mencuci tangan 🧼.</p>
<p>Cuaca: cerah ☀️, berawan ⛅, hujan 🌧️, mendung ☁️, panas terik 🔥.</p>
<p>Musim di Indonesia: kemarau ☀️ (April-Oktober) dan hujan 🌧️ (November-Maret).</p>
<p>Perubahan cuaca memengaruhi aktivitas kita: hujan → pakai payung, tidak bisa main di luar. Cerah → main sepak bola! ⚽</p>
<p>Kita bisa meramalkan cuaca dari bentuk awan. Awan putih tipis = cerah. Awan gelap = hujan.</p>`,
      quiz: [
        { soal: 'Lingkungan bersih membuat kita...', pilihan: ['Sehat 💪', 'Sakit 🤒', 'Mengantuk'], jawabanIdx: 0 },
        { soal: 'Musim di Indonesia ada...', pilihan: ['4 musim', '2 musim ☀️🌧️', '3 musim'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Amati Langit Sehari',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Amati langit tiga kali: pagi (06.00), siang (12.00), sore (17.00). Catat:</p>
<ul style="padding-left: 20px;">
  <li>☀️ Warna langit</li>
  <li>☁️ Bentuk awan</li>
  <li>🌡️ Apakah terasa panas/dingin? Berapa perkiraan suhu?</li>
  <li>💨 Apakah ada angin?</li>
</ul>
<p>Gambarkan langit setiap waktu di buku catatan! 🎨</p>
<p>Tanya orang tuamu: di Indonesia ada berapa musim? 🌏</p>`,
      quiz: [
        { soal: 'Cuaca cerah — kita bisa...', pilihan: ['Bermain di luar ⚽', 'Pakai payung', 'Memanaskan tubuh'], jawabanIdx: 0 },
        { soal: 'Awan gelap tanda akan...', pilihan: ['Cerah', 'Hujan 🌧️', 'Salju'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Tempat sampah digunakan untuk...', pilihan: ['Duduk', 'Membuang sampah 🗑️', 'Menyimpan mainan'], jawabanIdx: 1 },
      { soal: 'Saat musim hujan sebaiknya bawa...', pilihan: ['Topi', 'Payung ☂️', 'Kipas'], jawabanIdx: 1 },
      { soal: 'Lingkungan sehat cirinya...', pilihan: ['Bau tidak sedap', 'Udara segar 💨', 'Banyak sampah'], jawabanIdx: 1 },
      { soal: 'Musim kemarau di Indonesia sekitar bulan...', pilihan: ['Januari-Maret', 'April-Oktober ☀️', 'November-Desember'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-06 =====
  {
    id: 'k3-ipas-06',
    judul: 'Aku Bagian dari Masyarakat',
    emoji: '🤝',
    deskripsi: 'Belajar peran dalam keluarga, sekolah, gotong royong, dan norma.',
    tujuan: ['Menyebutkan peran di keluarga dan sekolah 👨‍👩‍👧', 'Menjelaskan gotong royong 🤝', 'Memahami norma dan aturan di masyarakat 📋'],
    badgeEmoji: '🤝',
    badgeNama: 'Juru Masyarakat',
    observasi: {
      judul: 'Peranku di Keluarga dan Sekolah',
      konten: `<p>Alfa punya peran di mana-mana! Yuk lihat! 👀</p>
<p>Di rumah 🏠: membantu ibu memasak 🍳, menyapu lantai 🧹, merapikan tempat tidur 🛏️.</p>
<p>Di sekolah 🏫: mengerjakan PR 📝, menyapu kelas 🧹, menjaga kebersihan, membantu teman 🤝.</p>
<p>Di masyarakat 🏘️: ikut gotong royong, ronda malam, kerja bakti membersihkan selokan.</p>
<p>Gotong royong = bekerja bersama-sama tanpa pamrih. Contoh: bersih desa, bangun jembatan, panen raya.</p>
<p>Norma = aturan tidak tertulis. Contoh: bicara sopan pada orang tua 🗣️, antre di kasir 🚶, tidak berteriak di masjid 🕌.</p>
<p>Aturan tertulis: rambu lalu lintas 🚦, tata tertib sekolah 📜.</p>
<p>Jika semua menjalankan peran, hidup jadi harmonis! 🌈</p>`,
      quiz: [
        { soal: 'Membantu ibu memasak adalah peran di...', pilihan: ['Sekolah 🏫', 'Rumah 🏠', 'Masyarakat 🏘️'], jawabanIdx: 1 },
        { soal: 'Gotong royong artinya...', pilihan: ['Bekerja sendiri', 'Bekerja bersama-sama 🤝', 'Bermalas-malasan'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Bantu Orang Tua Sehari',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Hari ini, bantu orang tuamu selama 1 hari penuh! Catat:</p>
<ul style="padding-left: 20px;">
  <li>🍳 Tugas apa yang kamu lakukan?</li>
  <li>😊 Bagaimana perasaanmu setelah membantu?</li>
  <li>🙏 Apa kata orang tuamu?</li>
</ul>
<p>Tulis di buku catatan ya! 📝</p>
<p>Ingat: membantu adalah bentuk kasih sayang! 💕</p>`,
      quiz: [
        { soal: 'Contoh norma di sekolah:...', pilihan: ['Berteriak di kelas', 'Menyapa guru 🙋‍♂️', 'Makan sambil jalan'], jawabanIdx: 1 },
        { soal: 'Rambu lalu lintas termasuk...', pilihan: ['Norma', 'Aturan tertulis 🚦', 'Kebiasaan'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Ronda malam adalah contoh...', pilihan: ['Peran di sekolah', 'Gotong royong 🌙', 'Aturan tertulis'], jawabanIdx: 1 },
      { soal: 'Jika semua jalankan peran, masyarakat jadi...', pilihan: ['Kacau', 'Harmonis 🌈', 'Ramai'], jawabanIdx: 1 },
      { soal: 'Membersihkan selokan bersama = contoh...', pilihan: ['Norma', 'Gotong royong 🤝', 'Aturan'], jawabanIdx: 1 },
      { soal: 'Antre di kasir termasuk...', pilihan: ['Hukuman', 'Norma 🚶', 'Lomba'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-07 =====
  {
    id: 'k3-ipas-07',
    judul: 'Cerita dari Kampung Halaman',
    emoji: '🎲',
    deskripsi: 'Belajar kearifan lokal, tradisi, peta sederhana, dan arah mata angin.',
    tujuan: ['Menyebutkan tradisi dan kearifan lokal 🏛️', 'Membaca arah mata angin 🧭', 'Menggambar peta sederhana 🗺️'],
    badgeEmoji: '🎲',
    badgeNama: 'Pelestari Tradisi',
    observasi: {
      judul: 'Tradisi dan Arah Mata Angin',
      konten: `<p>Nenek Galih bercerita tentang masa kecil 🧑‍🦳. "Dulu main congklak 🎲 dan egrang 🦶!"</p>
<p>Permainan tradisional pakai bahan sederhana: kayu, biji-bijian, bambu. Tapi SERU! 😄</p>
<p>Kearifan lokal = kebijakan dari nenek moyang. Contoh: tidak menebang pohon sembarangan 🌳, menjaga mata air 💧.</p>
<p>Ayo LESTARIKAN tradisi! Jangan sampai punah! 🏛️</p>
<p>Sekarang belajar ARAH MATA ANGIN 🧭:</p>
<p>Utara ⬆️ — Selatan ⬇️ — Barat ⬅️ — Timur ➡️</p>
<p>Matahari terbit di TIMUR 🌅. Terbenam di BARAT 🌇.</p>
<p>Peta sederhana: gambar jalan, rumah, sungai, posisi utara. Gunakan kompas untuk menentukan arah! 🧭🗺️</p>`,
      quiz: [
        { soal: 'Congklak adalah...', pilihan: ['Alat tulis', 'Permainan tradisional 🎲', 'Makanan'], jawabanIdx: 1 },
        { soal: 'Matahari terbit di sebelah...', pilihan: ['Barat 🌇', 'Timur 🌅', 'Utara ⬆️'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Wawancara Nenek/Kakek',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Tanya nenek/kakek atau orang tua di rumah:</p>
<ul style="padding-left: 20px;">
  <li>🎲 Permainan tradisional apa yang dulu populer?</li>
  <li>🏛️ Bagaimana cara memainkannya?</li>
  <li>😊 Apa kenangan paling seru waktu kecil?</li>
</ul>
<p>Catat semua cerita di buku! 📝</p>
<p>Gambarkan permainan tradisional itu! 🎨</p>
<p>Besok ceritakan ke teman-teman di kelas! 👨‍🏫</p>`,
      quiz: [
        { soal: 'Kearifan lokal adalah warisan...', pilihan: ['Modern', 'Nenek moyang 🏛️', 'Asing'], jawabanIdx: 1 },
        { soal: 'Arah antara barat dan utara disebut...', pilihan: ['Tenggara', 'Barat Laut 🧭', 'Timur Laut'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Peta sederhana harus punya petunjuk...', pilihan: ['Warna', 'Arah mata angin 🧭', 'Harga'], jawabanIdx: 1 },
      { soal: 'Egrang dimainkan dengan...', pilihan: ['Bola ⚽', 'Bambu panjang 🦶', 'Biji-bijian'], jawabanIdx: 1 },
      { soal: 'Permainan congklak menggunakan...', pilihan: ['Batu', 'Biji-bijian 🎲', 'Kayu'], jawabanIdx: 1 },
      { soal: 'Kompas digunakan untuk menentukan...', pilihan: ['Waktu', 'Arah 🧭', 'Cuaca'], jawabanIdx: 1 },
    ],
  },

  // ===== k3-ipas-08 =====
  {
    id: 'k3-ipas-08',
    judul: 'Bentang Alam Indonesia',
    emoji: '🗺️',
    deskripsi: 'Belajar pegunungan, dataran rendah, laut, sungai, dan peta Indonesia.',
    tujuan: ['Mengidentifikasi bentang alam Indonesia 🏔️🌊', 'Membaca dan menggambar peta sederhana 🗺️', 'Menjelaskan letak geografis Indonesia 🌏'],
    badgeEmoji: '🗺️',
    badgeNama: 'Penjelajah Nusantara',
    observasi: {
      judul: 'Bentang Alam Nusantara',
      konten: `<p>Indonesia 🇮🇩 punya bentang alam yang sangat beragam! Wow! 😮</p>
<p>Pegunungan 🏔️: Gunung Merapi 🌋 (Yogyakarta), Gunung Rinjani, Pegunungan Jayawijaya (Papua).</p>
<p>Dataran rendah 🏙️: Jakarta, Surabaya, Medan. Tempat banyak orang tinggal.</p>
<p>Laut 🌊: Laut Jawa, Laut Banda, Laut Arafura. Luasnya 3/4 Indonesia!</p>
<p>Sungai 🏞️: Sungai Kapuas (Kalbar — terpanjang), Bengawan Solo, Sungai Musi.</p>
<p>Danau 🏞️: Danau Toba (Sumbar), Danau Poso (Sulsel).</p>
<p>Pulau besar: Jawa 🏝️, Sumatra, Kalimantan, Sulawesi, Papua, Bali.</p>
<p>Peta Indonesia menunjukkan SEMUANYA dengan warna berbeda (hijau = dataran rendah, coklat = gunung, biru = laut). 🗺️</p>`,
      quiz: [
        { soal: 'Gunung Merapi terletak di...', pilihan: ['Papua', 'Yogyakarta 🌋', 'Sulawesi'], jawabanIdx: 1 },
        { soal: 'Luas laut Indonesia sekitar...', pilihan: ['Setengah wilayah', '3/4 wilayah 🌊', 'Semua wilayah'], jawabanIdx: 1 },
      ],
    },
    eksperimen: {
      judul: 'Baca Peta Indonesia',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Cari peta Indonesia (bisa dari atlas, buku, atau internet bersama orang tua). 📖</p>
<ol style="padding-left: 20px;">
  <li>🔍 Cari provinsi tempat tinggalmu!</li>
  <li>🧭 Jakarta di sebelah mana? Barat, timur, utara, selatan Pulau Jawa?</li>
  <li>🏝️ Bali ada di sebelah timur atau barat Jakarta?</li>
  <li>🦅 Papua di ujung timur atau barat Indonesia?</li>
</ol>
<p>Gambarkan peta sederhana Indonesia di buku dan beri warna! 🎨</p>`,
      quiz: [
        { soal: 'Sungai terpanjang di Indonesia adalah...', pilihan: ['Bengawan Solo', 'Kapuas 🏞️', 'Musi'], jawabanIdx: 1 },
        { soal: 'Pulau terbesar di Indonesia adalah...', pilihan: ['Jawa', 'Kalimantan 🏝️', 'Bali'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Warna hijau di peta menunjukkan...', pilihan: ['Laut', 'Dataran rendah 🌿', 'Gunung'], jawabanIdx: 1 },
      { soal: 'Indonesia berada di antara dua benua:...', pilihan: ['Asia-Eropa', 'Asia-Australia 🌏', 'Afrika-Amerika'], jawabanIdx: 1 },
      { soal: 'Contoh bentang alam pegunungan:...', pilihan: ['Jakarta', 'Gunung Merapi 🌋', 'Pantai Ancol'], jawabanIdx: 1 },
      { soal: 'Warna biru di peta menunjukkan...', pilihan: ['Gunung', 'Laut 🌊', 'Kota'], jawabanIdx: 1 },
    ],
  },
];

// Shuffle answered indices
function shuffleQuizAnswers(data) {
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }
  function reorder(quiz, salt) {
    const correct = quiz.pilihan[quiz.jawabanIdx];
    const others = quiz.pilihan.filter((_, i) => i !== quiz.jawabanIdx);
    const n = (hash(salt) % others.length);
    const newPilihan = [...others];
    newPilihan.splice(n, 0, correct);
    quiz.pilihan = newPilihan.slice(0, 3);
    quiz.jawabanIdx = quiz.pilihan.indexOf(correct);
  }
  data.observasi.quiz.forEach((q, i) => reorder(q, data.id + '-o-' + i));
  data.eksperimen.quiz.forEach((q, i) => reorder(q, data.id + '-e-' + i));
  data.latihan.forEach((q, i) => reorder(q, data.id + '-l-' + i));
  return data;
}

materiList.forEach((data) => {
  shuffleQuizAnswers(data);
  const html = renderBook(data);
  const filePath = path.join(outDir, `${data.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Wrote', filePath);
});

console.log(`Done: ${materiList.length} books → ${outDir}`);
