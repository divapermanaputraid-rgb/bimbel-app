const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas5/ipas');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const bgColors = {
  'k5-ipas-01': '#FFF3E0',  // oranye muda - cahaya/bunyi
  'k5-ipas-02': '#E8F5E9',  // hijau muda - ekosistem
  'k5-ipas-03': '#E0F7FA',  // biru muda - magnet/listrik
  'k5-ipas-04': '#FFFDE7',  // kuning muda - bumi
  'k5-ipas-05': '#FCE4EC',  // pink muda - tubuh/kesehatan
};

function renderQuizBox(quiz, idx) {
  return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 16px; padding-top: 12px; border-top: 1px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">🤔 ${quiz.soal}</p>
          <div class="quiz-options" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            ${quiz.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:10px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
}

function renderBook(data) {
  const bg = bgColors[data.id];
  const jawaban = [
    data.observasi.quiz[0].jawabanIdx,
    data.observasi.quiz[1].jawabanIdx,
    data.observasi.quiz[2] ? data.observasi.quiz[2].jawabanIdx : data.eksperimen.quiz[0].jawabanIdx,
    data.eksperimen.quiz[0].jawabanIdx,
    data.eksperimen.quiz[1].jawabanIdx,
    data.eksperimen.quiz[2] ? data.eksperimen.quiz[2].jawabanIdx : data.latihan[0].jawabanIdx,
    data.latihan[0].jawabanIdx,
    data.latihan[1].jawabanIdx,
    data.latihan[2].jawabanIdx,
    data.latihan[3].jawabanIdx,
    data.latihan[4].jawabanIdx,
  ];

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${data.judul} — IPAS Kelas 5</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
  <style>
    .kelas5-ipas { font-size:16px; line-height:1.7; }
    .kelas5-ipas .section-header { font-size:18px; }
    .kelas5-ipas .section-body { font-size:16px; }
    .kelas5-ipas .quiz-box p { font-size:16px; }
    .kelas5-ipas .feedback { font-size:16px; }
    .kelas5-ipas h1 { font-size:22px; }
    .eksperimen-box { background: #fff8e1; border-radius: 12px; padding: 20px; border-left: 4px solid #ff9800; margin: 16px 0; }
    .eksperimen-box h4 { color: #e65100; margin-top: 0; }
    .observasi-box { background: #e8f5e9; border-radius: 12px; padding: 20px; border-left: 4px solid #4caf50; margin: 16px 0; }
  </style>
</head>
<body class="kelas5-ipas" data-kelas="5" data-pelajaran="ipas" data-materi="${data.id}" style="background-color: ${bg}; --bg: ${bg};">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 72px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #2e7d32; margin:0 0 8px 0; font-size: 22px;">${data.judul}</h1>
        <p style="color: #666; font-size: 16px;">IPAS — Kelas 5</p>
        <p style="margin-top: 16px; font-size: 16px;">${data.deskripsi}</p>
        <button class="btn" style="margin-top: 24px;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,350)">Ayo Eksplorasi! 🚀</button>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Observasi 1 -->
    <div class="section-card">
      <div class="section-header">🔍 Observasi 1: ${data.observasi.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <div class="observasi-box">
          ${data.observasi.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 1</p>
        ${renderQuizBox(data.observasi.quiz[0], 0)}
        ${renderQuizBox(data.observasi.quiz[1], 1)}
        ${data.observasi.quiz[2] ? renderQuizBox(data.observasi.quiz[2], 2) : ''}
      </div>
    </div>

    <!-- Eksperimen / Coba di Rumah -->
    <div class="section-card">
      <div class="section-header">🔬 Coba di Rumah: ${data.eksperimen.judul} <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <div class="eksperimen-box">
          <h4>🧪 Eksperimen Sederhana</h4>
          ${data.eksperimen.konten}
        </div>
        <p style="font-weight:bold; margin-top:20px; font-size:18px;">🧪 Checkpoint 2</p>
        ${renderQuizBox(data.eksperimen.quiz[0], data.observasi.quiz.length === 3 ? 3 : 2)}
        ${renderQuizBox(data.eksperimen.quiz[1], data.observasi.quiz.length === 3 ? 4 : 3)}
        ${data.eksperimen.quiz[2] ? renderQuizBox(data.eksperimen.quiz[2], data.observasi.quiz.length === 3 ? 5 : 4) : ''}
      </div>
    </div>

    <!-- Latihan Soal -->
    <div class="section-card">
      <div class="section-header">✏️ Latihan Soal <span>▼</span></div>
      <div class="section-body" style="font-size: 16px;">
        <p style="font-weight:bold; font-size: 18px;">💪 Ayo kerjakan soal-soal di bawah ini!</p>
        <p style="color: #666;">Klik jawaban yang menurutmu benar ya 😊</p>

        ${data.latihan.map((soal, si) => {
          const quizCount = data.observasi.quiz.length + data.eksperimen.quiz.length;
          const idx = si + quizCount;
          return `<div class="quiz-box" data-idx="${idx}" data-answered="false" style="margin-top: 20px; padding-top: 16px; border-top: 2px dashed #ddd;">
          <p style="font-weight: bold; font-size: 16px;">${si + 1}. ${soal.soal}</p>
          <div class="quiz-options" style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
            ${soal.pilihan.map((p, pi) => `<button class="quiz-opt" data-opt="${pi}">${p}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:12px; font-weight:bold; font-size: 16px;"></div>
        </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Ringkasan + Badge -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; font-size: 16px;">
        <p>Kamu sudah belajar tentang <strong>${data.judul}</strong>! 🌟</p>
        <p style="margin-top: 16px;">Kamu jadi ilmuwan sejati! Dapat badge istimewa:</p>
        <div style="font-size: 72px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #2e7d32; font-size: 20px;">${data.badgeNama}</p>
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
    window._TOTAL_SECTIONS = ${data.observasi.quiz.length + data.eksperimen.quiz.length + data.latihan.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

// ============ 5 MATERI IPAS KELAS 5 ============
const materiList = [
  // ===== k5-ipas-01 =====
  {
    id: 'k5-ipas-01',
    judul: 'Melihat karena Cahaya, Mendengar karena Bunyi',
    emoji: '👁️',
    deskripsi: 'Belajar sifat cahaya (lurus, pantul, bias) dan bunyi (merambat, pantul) serta cara mata & telinga bekerja!',
    tujuan: [
      'Menjelaskan sifat cahaya: merambat lurus, pantulan, pembiasan 🔦',
      'Menjelaskan sifat bunyi: merambat, pantulan (gaung) 🔊',
      'Memahami cara kerja mata & telinga 👁️👂',
    ],
    badgeEmoji: '👁️',
    badgeNama: 'Ahli Cahaya & Bunyi',
    observasi: {
      judul: 'Sifat Cahaya dan Bunyi',
      konten: `<p>Cahaya ☀️ merambat LURUS. Kalau ketemu cermin, dia PANTUL. Itu kenapa kita bisa lihat wajah di cermin 🪞. Cahaya masuk ke mata 👁️ → saraf → otak 🧠 = kita LIHAT!</p>
<p>Cahaya juga bisa BIAS (belok) saat lewat air/kaca. Masukkan pensil ke gelas air 🥛 — pensil terlihat patah! Itu pembiasan.</p>
<p>Bunyi 🔊 butuh medium (udara, air, benda padat) untuk merambat. Di ruang hampa, bunyi TIDAK bisa lewat!</p>
<p>Bunyi bisa PANTUL → gaung 🗣️➡️🏔️➡️🗣️. Contoh: berteriak di gua/gedung besar.</p>
<p>Telinga 👂 menangkap getaran bunyi → saraf → otak = kita DENGAR!</p>`,
      quiz: [
        { soal: 'Cahaya merambat...', pilihan: ['Lurus 🔦', 'Melengkung', 'Zig-zag'], jawabanIdx: 0 },
        { soal: 'Bunyi TIDAK bisa merambat di...', pilihan: ['Udara', 'Air', 'Ruang hampa 🚫'], jawabanIdx: 2 },
        { soal: 'Pantulan bunyi disebut...', pilihan: ['Gaung 🗣️', 'Bias', 'Redaman'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Cermin & Pensil di Air',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p><strong>Eksperimen 1 (Pantulan):</strong> Pegang cermin 🪞 di depan wajah. Apa yang kamu lihat? Bayanganmu! Cahaya pantul dari cermin ke matamu.</p>
<p><strong>Eksperimen 2 (Pembiasan):</strong> Masukkan pensil ✏️ ke dalam gelas berisi air 🥛. Lihat dari samping — pensil terlihat PATAH/BELOK di permukaan air! Cahaya bias lewat air.</p>
<p><strong>Eksperimen 3 (Gaung):</strong> Coba berteriak di kamar mandi/kamar besar. Dengar gaungnya! 🗣️🏠</p>
<p>Catat pengamatanmu: Cahaya pantul/bias, bunyi gaung. Buktikan sendiri! 🔬</p>`,
      quiz: [
        { soal: 'Pensil di gelas air terlihat patah karena...', pilihan: ['Cahaya pantul', 'Cahaya bias 🥛', 'Cahaya henti'], jawabanIdx: 1 },
        { soal: 'Gaung terjadi karena bunyi...', pilihan: ['Pantul 🗣️', 'Bias', 'Disimpan'], jawabanIdx: 0 },
        { soal: 'Mata menangkap cahaya lalu kirim ke...', pilihan: ['Jantung', 'Otak 🧠', 'Perut'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Sifat cahaya yang membuat bayangan di cermin adalah...', pilihan: ['Merambat lurus', 'Pantulan 🪞', 'Pembiasan'], jawabanIdx: 1 },
      { soal: 'Bunyi merambat paling cepat di...', pilihan: ['Udara', 'Air', 'Benda padat 🪨'], jawabanIdx: 2 },
      { soal: 'Alat indra pendengaran adalah...', pilihan: ['Mata', 'Telinga 👂', 'Hidung'], jawabanIdx: 1 },
      { soal: 'Cahaya bias saat lewat...', pilihan: ['Cermin', 'Air 💧', 'Kain'], jawabanIdx: 1 },
      { soal: 'Kita bisa lihat karena cahaya masuk ke mata lalu ke...', pilihan: ['Otak 🧠', 'Jantung', 'Paru-paru'], jawabanIdx: 0 },
    ],
  },

  // ===== k5-ipas-02 =====
  {
    id: 'k5-ipas-02',
    judul: 'Harmoni dalam Ekosistem',
    emoji: '🌳',
    deskripsi: 'Belajar rantai makanan kompleks, piramida makanan, simbiosis, dan keseimbangan alam!',
    tujuan: [
      'Menyusun rantai makanan & piramida makanan 🌿🐛🐦',
      'Mengidentifikasi simbiosis: mutualisme, komensalisme, parasitisme 🤝',
      'Menjelaskan pentingnya keseimbangan alam ⚖️',
    ],
    badgeEmoji: '🌳',
    badgeNama: 'Juru Ekosistem',
    observasi: {
      judul: 'Rantai Makanan & Simbiosis',
      konten: `<p>Di hutan 🌳: daun (produsen) 🌿 → kupu-kupu (konsumen 1) 🦋 → burung (konsumen 2) 🐦 → ular (konsumen 3) 🐍. Ini PIRAMIDA MAKANAN — produsen paling banyak, konsumen puncak paling sedikit!</p>
<p>Rantai makanan bisa BERCABANG: kupu-kupu juga dimakan katak 🐸, burung juga makan cacing 🪱. Jadi JARING-JARING MAKANAN!</p>
<p><strong>SIMBIOSIS</strong> = hubungan 2 makhluk berbeda:</p>
<p>🤝 <strong>Mutualisme</strong> = untung-untungan. Contoh: lebah & bunga 🐝🌸 (lebah dapat madu, bunga diserbuk).</p>
<p>😐 <strong>Komensalisme</strong> = satu untung, satu netral. Contoh: remora menempel hiu 🐟🦈 (remora makan sisa, hiu tidak rugi-untung).</p>
<p>😈 <strong>Parasitisme</strong> = satu untung, satu rugi. Contoh: kutu di rambut 🦠👤, cacingan di usus.</p>
<p>Keseimbangan alam = rantai makanan utuh, tidak ada yang punah! 🌿⚖️</p>`,
      quiz: [
        { soal: 'Produsen di rantai makanan adalah...', pilihan: ['Kupu-kupu', 'Daun/Tumbuhan 🌿', 'Burung'], jawabanIdx: 1 },
        { soal: 'Lebah & bunga saling menguntungkan. Simbiosis ini...', pilihan: ['Mutualisme 🤝', 'Komensalisme', 'Parasitisme'], jawabanIdx: 0 },
        { soal: 'Kutu di rambut termasuk simbiosis...', pilihan: ['Mutualisme', 'Komensalisme', 'Parasitisme 😈'], jawabanIdx: 2 },
      ],
    },
    eksperimen: {
      judul: 'Buat Piramida Makanan Kertas',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Buat piramida makanan dari kertas 📄: gambar & potong hewan-tumbuhan.</p>
<p><strong>Lapis dasar (banyak):</strong> Rumput 🌿, daun, ganggang (produsen)</p>
<p><strong>Lapis 2:</strong> Belalang 🐛, kupu-kupu 🦋, ikan kecil 🐟 (konsumen 1)</p>
<p><strong>Lapis 3:</strong> Burung 🐦, katak 🐸, ikan sedang (konsumen 2)</p>
<p><strong>Puncak (sedikit):</strong> Ular 🐍, elang 🦅, harimau 🐅 (konsumen 3/puncak)</p>
<p>Susun bertingkat! Tempel di dinding. Amati: kalau kelinci (konsumen 1) punah → ular (konsumen 3) KEKURANGAN MAKANAN! ⚖️</p>`,
      quiz: [
        { soal: 'Piramida makanan: lapisan paling banyak adalah...', pilihan: ['Konsumen puncak', 'Produsen 🌿', 'Konsumen 2'], jawabanIdx: 1 },
        { soal: 'Remora menempel hiu, makan sisa makanan hiu. Hiu tidak rugi/untung. Ini...', pilihan: ['Mutualisme', 'Komensalisme 😐', 'Parasitisme'], jawabanIdx: 1 },
        { soal: 'Jika konsumen 1 (belalang) punah, maka...', pilihan: ['Konsumen 2 & 3 kelaparan ⚖️', 'Produsen habis', 'Tidak ada pengaruh'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Ular makan tikus, tikus makan padi. Produsen dalam rantai ini...', pilihan: ['Ular', 'Tikus', 'Padi 🌾'], jawabanIdx: 2 },
      { soal: 'Simbiosis yang merugikan satu pihak disebut...', pilihan: ['Parasitisme 😈', 'Mutualisme', 'Komensalisme'], jawabanIdx: 0 },
      { soal: 'Contoh mutualisme:...', pilihan: ['Kutu & manusia', 'Lebah & bunga 🐝🌸', 'Remora & hiu'], jawabanIdx: 1 },
      { soal: 'Jaring-jaring makanan = rantai makanan yang...', pilihan: ['Lurus', 'Bercabang & saling terhubung 🌐', 'Pendek'], jawabanIdx: 1 },
      { soal: 'Keseimbangan alam terganggu jika...', pilihan: ['Semua makhluk hidup', 'Satu spesies punah ⚖️', 'Cuaca cerah'], jawabanIdx: 1 },
    ],
  },

  // ===== k5-ipas-03 =====
  {
    id: 'k5-ipas-03',
    judul: 'Magnet, Listrik, dan Teknologi untuk Kehidupan',
    emoji: '⚡',
    deskripsi: 'Belajar sifat magnet, arus listrik, rangkaian sederhana, dan teknologi sehari-hari!',
    tujuan: [
      'Mengidentifikasi sifat magnet: kutub, tarik-tolak 🧲',
      'Memahami rangkaian listrik tertutup: baterai, kabel, lampu 🔋',
      'Menyebutkan teknologi sehari-hari berbasis magnet/listrik 🏠',
    ],
    badgeEmoji: '⚡',
    badgeNama: 'Master Magnet & Listrik',
    observasi: {
      judul: 'Magnet & Listrik',
      konten: `<p>MAGNET 🧲 punya kutub utara (U) & selatan (S). Sejenis TOLAK (U-U, S-S), Berbeda TARIK (U-S). Magnet hanya menarik besi, nikel, kobalt.</p>
<p>Bumi juga magnet raksasa! 🌍 Kutub utara magnetik dekat kutub selatan geografis. Kompas 🧭 menunjuk utara karena ditarik kutub magnetik bumi.</p>
<p>LISTRIK ⚡ butuh RANGKAIAN TERTUTUP: Baterai 🔋 → Kabel → Lampu 💡 → Kembali ke baterai. Kalau putus (saklar OFF), lampu padam!</p>
<p>Arus listrik = aliran elektron. Baterai = sumber energi kimia → listrik. Generator = energi gerak → listrik (PLTA, PLTU).</p>
<p>Teknologi sehari-hari: Kulkas (motor listrik + magnet), TV (listrik → cahaya+bunyi), HP (baterai + gelombang radio), Laptop, Lampu LED!</p>`,
      quiz: [
        { soal: 'Dua kutub magnet utara (U-U) akan...', pilihan: ['Tarik', 'Tolak 🧲', 'Diam'], jawabanIdx: 1 },
        { soal: 'Lampu menyala butuh rangkaian...', pilihan: ['Terbuka', 'Tertutup 🔋', 'Acak'], jawabanIdx: 1 },
        { soal: 'Kompas menunjuk utara karena...', pilihan: ['Magnet bumi 🌍', 'Gravitasi', 'Angin'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Rangkaian Listrik & Uji Magnet',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p><strong>Eksperimen 1 (Listrik):</strong> Buat rangkaian sederhana: Baterai 🔋 (AA) + Kabel tembaga 🔌 + Lampu LED kecil 💡. Sambung: + baterai → kabel → lampu → kabel → - baterai. LAMPU NYALA! ⚡ Itu arus listrik!</p>
<p><strong>Eksperimen 2 (Magnet):</strong> Ambil magnet 🧲 (bisa dari kulkas/stiker magnet). Dekatkan ke: paku 🔩, kertas 📄, koin 🪙, sendok 🥄, plastik 🥤, kaleng 🥫. Catat yang MENAPEL vs TIDAK!</p>
<p><strong>Hasil:</strong> Paku, koin, sendok, kaleng (besi/nikel) = MENAPEL. Kertas, plastik = TIDAK.</p>
<p>Coba juga: 2 magnet. Dekatkan U-S = tarik. U-U = tolak! 🧲↔️🧲</p>`,
      quiz: [
        { soal: 'Benda yang TIDAK ditarik magnet:...', pilihan: ['Paku 🔩', 'Koin 🪙', 'Kertas 📄'], jawabanIdx: 2 },
        { soal: 'Saklar OFF = rangkaian...', pilihan: ['Terbuka 🔌', 'Tertutup', 'Pendek'], jawabanIdx: 0 },
        { soal: 'Generator mengubah energi...', pilihan: ['Gerak → Listrik ⚡', 'Kimia → Listrik', 'Panas → Listrik'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Sumber energi listrik di rumah dari PLN berasal dari...', pilihan: ['Generator (gerak→listrik) ⚡', 'Baterai', 'Matahari langsung'], jawabanIdx: 0 },
      { soal: 'Kutub magnet yang BERLAINAN (U-S) akan...', pilihan: ['Salinan tarik 🧲', 'Salinan tolak', 'Tidak bereaksi'], jawabanIdx: 0 },
      { soal: 'Contoh teknologi pakai magnet + listrik:...', pilihan: ['Kulkas 🧊', 'Sendok', 'Gelas'], jawabanIdx: 0 },
      { soal: 'Baterai mengubah energi...', pilihan: ['Kimia → Listrik 🔋', 'Gerak → Listrik', 'Panas → Listrik'], jawabanIdx: 0 },
      { soal: 'PLTA (Pembangkit Listrik Tenaga Air) pakai energi...', pilihan: ['Angin', 'Air 💧', 'Batu bara'], jawabanIdx: 1 },
    ],
  },

  // ===== k5-ipas-04 =====
  {
    id: 'k5-ipas-04',
    judul: 'Ayo Berkenalan dengan Bumi Kita',
    emoji: '🌍',
    deskripsi: 'Belajar lapisan bumi, lempeng tektonik, gunung berapi, gempa bumi, dan Ring of Fire!',
    tujuan: [
      'Menyebutkan 3 lapisan bumi: kerak, mantel, inti 🌍',
      'Menjelaskan lempeng tektonik & penyebab gempa/gunung berapi 🫨🌋',
      'Memahami mengapa Indonesia rawan gempa & gunung berapi (Ring of Fire) 🇮🇩',
    ],
    badgeEmoji: '🌍',
    badgeNama: 'Penjelajah Bumi',
    observasi: {
      judul: 'Lapisan Bumi & Lempeng Tektonik',
      konten: `<p>Bumi 🌍 punya 3 lapisan: 1) <strong>KERAK</strong> (lapisan paling luar, tipis, tempat kita tinggal), 2) <strong>MANTEL</strong> (tebal, panas, magma 🌋), 3) <strong>INTI</strong> (paling dalam, besi & nikel, sangat panas 🔥).</p>
<p>Kerak bumi TIDAK UTUH! Terpecah jadi LEMPENG TEKTONIK 🧩 yang BERGERAK pelan (cm/tahun) di atas mantel.</p>
<p>Lempeng BERTABRAKAN → tekanan → <strong>GUNUNG BERAPI</strong> 🌋 (magma keluar, jadi lava). Contoh: Merapi, Rinjani, Semeru.</p>
<p>Lempeng GOSER/MELEPAS → <strong>GEMPA BUMI</strong> 🫨. Gempa di darat = retakan tanah. Gempa di laut = TSUNAMI 🌊.</p>
<p>Indonesia di <strong>RING OF FIRE</strong> 🔥 (cincin api Pasifik) — pertemuan 3 lempeng besar: Eurasia, Indo-Australia, Pasifik. Itu kenapa Indonesia BANYAK gunung berapi (127 aktif!) & gempa!</p>`,
      quiz: [
        { soal: 'Lapisan bumi tempat kita tinggal adalah...', pilihan: ['Mantel', 'Kerak 🌍', 'Inti'], jawabanIdx: 1 },
        { soal: 'Gunung berapi terbentuk karena lempeng tektonik...', pilihan: ['Bertabrakan 🌋', 'Berjauhan', 'Diam'], jawabanIdx: 0 },
        { soal: 'Indonesia banyak gunung berapi karena berada di...', pilihan: ['Ring of Fire 🔥', 'Kutub Utara', 'Khatulistiwa'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Amati Peta Gempa & Gunung Berapi',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p>Buka peta Indonesia (atlas/buku/internet bersama orang tua 👨‍👩‍👧). Cari:</p>
<ul style="padding-left: 20px;">
  <li>🌋 Gunung berapi aktif: Merapi (Jogja), Semeru (Jatim), Rinjani (NTB), Kerinci (Jambi)</li>
  <li>🫨 Daerah rawan gempa: Sumatera, Jawa, Sulawesi, Maluku, Papua (pinggir lempeng)</li>
  <li>🌊 Sunda Strait, Laut Banda, Laut Flores — pertemuan lempeng</li>
</ul>
<p>Gambar peta sederhana: tandai gunung berapi 🌋 & garis lempeng tektonik 🧩. Kenapa Bali & Lombok dekat tapi beda risiko? (Lempeng beda!)</p>
<p>Tanya orang tua: "Pernah merasakan gempa? Gimana rasanya?" 🏠</p>`,
      quiz: [
        { soal: 'Lempeng tektonik bergerak di atas...', pilihan: ['Kerak', 'Mantel 🌋', 'Inti'], jawabanIdx: 1 },
        { soal: 'Gempa bumi di laut bisa menyebabkan...', pilihan: ['Banjir', 'Tsunami 🌊', 'Hujan'], jawabanIdx: 1 },
        { soal: 'Jumlah gunung berapi AKTIF di Indonesia sekitar...', pilihan: ['50', '127 🌋', '200'], jawabanIdx: 1 },
      ],
    },
    latihan: [
      { soal: 'Lapisan paling dalam bumi adalah...', pilihan: ['Kerak', 'Mantel', 'Inti 🔥'], jawabanIdx: 2 },
      { soal: 'Tsunami terjadi jika gempa berpusat di...', pilihan: ['Gunung', 'Laut 🌊', 'Kota'], jawabanIdx: 1 },
      { soal: 'Merapi, Semeru, Rinjani adalah contoh...', pilihan: ['Gunung berapi aktif 🌋', 'Pegunungan biasa', 'Laut'], jawabanIdx: 0 },
      { soal: 'Lempeng Indo-Australia bertemu lempeng Eurasia di...', pilihan: ['Sumatera & Jawa 🫨', 'Kalimantan', 'Papua'], jawabanIdx: 0 },
      { soal: 'Mengapa Indonesia rawan gempa?', pilihan: ['Cuaca panas', 'Di Ring of Fire (pertemuan lempeng) 🔥', 'Banyak gunung'], jawabanIdx: 1 },
    ],
  },

  // ===== k5-ipas-05 =====
  {
    id: 'k5-ipas-05',
    judul: 'Bagaimana Kita Hidup dan Bertumbuh',
    emoji: '💪',
    deskripsi: 'Belajar sistem organ tubuh, pertumbuhan manusia, gizi seimbang, dan kesehatan reproduksi sederhana!',
    tujuan: [
      'Menyebutkan sistem organ: pencernaan, pernapasan, peredaran darah, saraf 🫀🧠',
      'Memahami pertumbuhan & gizi seimbang (4 sehat 5 sempurna) 🍚🥩🥦🍎',
      'Mengenal kesehatan reproduksi sederhana & kebersihan pribadi 🚿',
    ],
    badgeEmoji: '💪',
    badgeNama: 'Juru Sehat',
    observasi: {
      judul: 'Sistem Tubuh & Gizi Seimbang',
      konten: `<p>Tubuh kita punya sistem yang BEKERJA BERSAMA 🤝:</p>
<p>🍽️ <strong>Pencernaan</strong>: mulut → kerongkongan → lambung → usus halus (serap nutrisi) → usus besar → anus. Makanan jadi ENERGI!</p>
<p>🫁 <strong>Pernapasan</strong>: hidung → tenggorokan → bronkus → paru-paru (O₂ masuk darah, CO₂ keluar). Napas = HIDUP!</p>
<p>❤️ <strong>Peredaran Darah</strong>: jantung pompa darah ke seluruh tubuh. O₂ + nutrisi dikirim ke sel. CO₂ diangkut ke paru.</p>
<p>🧠 <strong>Saraf</strong>: otak (pusat kendali) + saraf → gerak, pikir, perasaan. Refleks = otak tidak perlu ikut campur (tarik tangan dari panas 🔥).</p>
<p><strong>GIZI SEIMBANG</strong> = 4 sehat 5 sempurna: Karbo (nasi 🍚), Protein (telur 🥩), Sayur 🥦, Buah 🍎 + Susu 🥛. Makan BERWARNA = nutrisi lengkap!</p>
<p>Olahraga 🏃 + Tidur cukup 😴 + Cuci tangan 🚿 = TUBUH SEHAT!</p>`,
      quiz: [
        { soal: 'Usus halus fungsinya...', pilihan: ['Menghancurkan makanan', 'Menyimpan feses', 'MENYERAP nutrisi 🍽️'], jawabanIdx: 2 },
        { soal: 'Jantung memompa...', pilihan: ['Udara', 'Darah ❤️', 'Makanan'], jawabanIdx: 1 },
        { soal: '4 sehat 5 sempurna: Karbo, Protein, Sayur, Buah + ...', pilihan: ['Susu 🥛', 'Gula', 'Garam'], jawabanIdx: 0 },
      ],
    },
    eksperimen: {
      judul: 'Cek Makanan & Pertumbuhanku',
      konten: `<p><strong>Ayo coba di rumah!</strong></p>
<p><strong>Eksperimen 1 (Catatan Makan):</strong> Catat makananmu 1 hari penuh! Kelompokkan:</p>
<ul style="padding-left: 20px;">
  <li>🍚 Karbo: nasi, roti, kentang, jagung</li>
  <li>🥩 Protein: telur, ayam, ikan, tempe, tahu, daging</li>
  <li>🥦 Sayur: bayam, wortel, brokoli, kangkung</li>
  <li>🍎 Buah: apel, pisang, jeruk, mangga</li>
  <li>🥛 Susu: susu sapi, keju, yogurt</li>
</ul>
<p>SEIMBANG? Jika warna-warni di piring = YA! 🌈</p>
<p><strong>Eksperimen 2 (Ukur Tubuh):</strong> Cek tinggi & berat badanmu. Bandingkan teman/sekolah. Semua BERBEDA — itu NORMAL! Pertumbuhan tiap orang beda (genetik, nutrisi, olahraga).</p>
<p><strong>Eksperimen 3 (Kebersihan):</strong> Cuci tangan pakai sabun 20 detik sebelum makan & setelah toilet 🚿. Cegah kuman masuk tubuh!</p>`,
      quiz: [
        { soal: 'Sistem yang mengontrol gerak & pikiran adalah...', pilihan: ['Pencernaan', 'Saraf 🧠', 'Pernapasan'], jawabanIdx: 1 },
        { soal: 'Cuci tangan pakai sabun butuh...', pilihan: ['5 detik', '20 detik 🚿', '1 menit'], jawabanIdx: 1 },
        { soal: 'Pertumbuhan tiap orang BERBEDA karena...', pilihan: ['Genetik, nutrisi, olahraga 💪', 'Hanya genetik', 'Hanya makanan'], jawabanIdx: 0 },
      ],
    },
    latihan: [
      { soal: 'Paru-paru berfungsi...', pilihan: ['Mencerna makanan', 'Bertukar gas O₂ & CO₂ 🫁', 'Memompa darah'], jawabanIdx: 1 },
      { soal: 'Makanan "4 sehat 5 sempurna" kurang 1: Karbo, Protein, Sayur, Buah. Yang kurang...', pilihan: ['Susu 🥛', 'Gula', 'Minyak'], jawabanIdx: 0 },
      { soal: 'Refleks (tarik tangan dari panas) diatur oleh...', pilihan: ['Otak 🧠', 'Jantung', 'Lambung'], jawabanIdx: 0 },
      { soal: 'Cara menjaga kesehatan reproduksi sederhana:...', pilihan: ['Cuci tangan saja', 'Cuci area intim & pakai celana dalam bersih 🚿', 'Makan banyak'], jawabanIdx: 1 },
      { soal: 'Olahraga rutin membuat...', pilihan: ['Jantung & otot KUAT 💪', 'Cepat capek', 'Tidak perlu tidur'], jawabanIdx: 0 },
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