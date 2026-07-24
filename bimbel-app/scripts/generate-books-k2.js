const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas2/matematika');
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

function template(data) {
  const answers = [];
  data.sections.forEach(sec => {
    (sec.quizzes || []).forEach(q => answers.push(q.pilihan.findIndex(p => p.benar)));
  });
  if (data.evaluasi) {
    data.evaluasi.forEach(q => answers.push(q.pilihan.findIndex(p => p.benar)));
  }

  let globalQuizIdx = 0;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.judul} — Kelas 2</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body data-kelas="2" data-pelajaran="mtk" data-materi="${data.id}">
  <div class="progress-container"><div class="progress-fill"></div></div>

  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #667eea; margin:0 0 8px 0; font-size: 28px;">${escapeHtml(data.judul)}</h1>
        <p style="color: #666;">Matematika — Kelas 2</p>
        <p style="margin-top: 16px;">${escapeHtml(data.deskripsi)}</p>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Penjelasan & Quiz -->
    ${data.sections.map((sec, i) => `
    <div class="section-card">
      <div class="section-header">📚 Bagian ${i+1}: ${escapeHtml(sec.judul)} <span>▼</span></div>
      <div class="section-body">
        ${sec.konten}

        ${(sec.quizzes || []).map((q, qIndex) => `
        <div class="quiz-box" data-idx="${globalQuizIdx++}" data-answered="false">
          <p style="font-weight: bold;">🤔 Kuis ${qIndex + 1}:</p>
          <p>${escapeHtml(q.soal)}</p>
          <div class="quiz-options">
            ${q.pilihan.map((p, optIdx) => `<button class="quiz-opt" data-opt="${optIdx}">${escapeHtml(p.teks)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:8px; font-weight:bold;"></div>
        </div>
        `).join('')}
      </div>
    </div>
    `).join('')}

    <!-- Evaluasi Akhir Bab (Optional) -->
    ${data.evaluasi ? `
    <div class="section-card">
      <div class="section-header" style="background:#FFF3E0; color:#E65100;">📝 Evaluasi Akhir Bab <span>▼</span></div>
      <div class="section-body">
        <p>Mari uji seberapa jauh pemahamanmu di bab ini! Jawab semua pertanyaan di bawah ini.</p>
        ${data.evaluasi.map((q, qIndex) => `
        <div class="quiz-box" data-idx="${globalQuizIdx++}" data-answered="false" style="border-color:#E65100; background:#FFF8E1;">
          <p style="font-weight: bold;">Soal ${qIndex + 1}:</p>
          <p>${escapeHtml(q.soal)}</p>
          <div class="quiz-options">
            ${q.pilihan.map((p, optIdx) => `<button class="quiz-opt" data-opt="${optIdx}">${escapeHtml(p.teks)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:8px; font-weight:bold;"></div>
        </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center;">
        <p>Kamu mendapatkan badge:</p>
        <div style="font-size: 64px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #667eea; font-size: 20px;">${escapeHtml(data.badgeNama)}</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed;" disabled onclick="finishBook()">Selesai & Kumpulkan Tugas! ✅</button>
        <p id="msg-belum-selesai" style="font-size:12px; color:#888; margin-top:8px;">(Selesaikan semua kuis dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Groq)</div>
      <div class="ai-msgs">
        <div class="msg ai">Halo! Aku Tutor AI. Mau tanya soal materi ${escapeHtml(data.judul)}? 😊</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
  <script>
    // [FIX: Hide answers from DOM]
    window._QUIZ_ANSWERS = ${JSON.stringify(answers)};
    window._TOTAL_QUIZZES = ${answers.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

module.exports = { template, outDir };

const materiList = [
  {
    id: "k2-mtk-01", emoji: "🔢",
    judul: "Bermain dengan Bilangan 1–50",
    deskripsi: "Yuk, kita berhitung bersama Anton! 🎈",
    tujuan: ["Membaca bilangan 1 sampai 50", "Menulis bilangan 1 sampai 50", "Mengurutkan bilangan"],
    badgeEmoji: "🎯", badgeNama: "Penjelajah Angka",
    sections: [
      {
        judul: "Menghitung Bersama Anton",
        konten: `
          <p>Halo teman-teman! Anton punya kelereng banyak sekali lho. Ada yang merah, kuning, dan hijau! 🔴🟡🟢</p>
          <p>Coba hitung kelereng Anton: "Satu, dua, tiga..." sampai ke "Dua puluh tiga". Wah, itu sama dengan <strong>23</strong> kelereng! 😱</p>
          <div style="background:#E3F2FD; padding:12px; border-radius:8px; margin:12px 0;">
            <strong>Tips Menghitung:</strong> Kalau jumlahnya lebih dari 10, bayangkan kotak isi 10. Dua kotak isi 10 artinya 20, ditambah 3 lagi jadi 23!
          </div>
        `,
        quizzes: [
          {
            soal: "Bagaimana cara membaca angka 35?",
            pilihan: [{teks:"Tiga lima", benar:false}, {teks:"Tiga puluh lima", benar:true}]
          },
          {
            soal: "Angka berapakah yang dibaca 'Empat puluh satu'?",
            pilihan: [{teks:"41", benar:true}, {teks:"14", benar:false}]
          },
          {
            soal: "Kalau Anton punya 2 kotak (isi 10) dan 5 kelereng, berapa jumlahnya?",
            pilihan: [{teks:"25", benar:true}, {teks:"20", benar:false}]
          }
        ]
      },
      {
        judul: "Mengurutkan Angka",
        konten: `
          <p>Setelah bisa membaca angkanya, yuk kita urutkan! Seperti menaiki tangga. 🧗‍♂️</p>
          <p>Berhitung NAIK: 10, 11, 12, 13, 14, 15... Angkanya makin lama makin besar!</p>
          <p>Berhitung TURUN: 15, 14, 13, 12... Angkanya makin mengecil seperti turun lift! ⬇️</p>
        `,
        quizzes: [
          {
            soal: "Setelah angka 29 adalah...",
            pilihan: [{teks:"30", benar:true}, {teks:"28", benar:false}]
          },
          {
            soal: "Sebelum angka 45 adalah...",
            pilihan: [{teks:"44", benar:true}, {teks:"46", benar:false}]
          },
          {
            soal: "Manakah yang benar jika kita berhitung NAIK?",
            pilihan: [{teks:"21, 22, 23", benar:true}, {teks:"23, 22, 21", benar:false}]
          }
        ]
      }
    ]
  },
  {
    id: "k2-mtk-02", emoji: "🏠",
    judul: "Rumah Angka: Puluhan dan Satuan",
    deskripsi: "Mengenal tempat puluhan dan satuan yuk! 🧱",
    tujuan: ["Paham nilai tempat", "Bisa memecah bilangan"],
    badgeEmoji: "🏠", badgeNama: "Arsitek Angka",
    sections: [
      {
        judul: "Puluhan dan Satuan",
        konten: `
          <p>Pernahkah kamu main bongkar pasang blok Lego? 🧱 Angka juga bisa dipisah-pisah lho!</p>
          <p>Angka <strong>35</strong> itu sama dengan 3 kotak "Puluhan" dan 5 blok "Satuan". 📦📦📦 + 🧊🧊🧊🧊🧊</p>
          <p>Jadi, angka yang ada di sebelah KIRI itu si Puluhan, dan yang di KANAN itu si Satuan!</p>
        `,
        quizzes: [
          {
            soal: "Angka 42 terdiri dari...",
            pilihan: [{teks:"4 puluhan dan 2 satuan", benar:true}, {teks:"2 puluhan dan 4 satuan", benar:false}]
          },
          {
            soal: "Di angka 27, yang manakah puluhannya?",
            pilihan: [{teks:"2", benar:true}, {teks:"7", benar:false}]
          },
          {
            soal: "Di angka 38, yang manakah satuannya?",
            pilihan: [{teks:"3", benar:false}, {teks:"8", benar:true}]
          }
        ]
      },
      {
        judul: "Menyusun Angka Baru",
        konten: `
          <p>Sekarang mari kita gabungkan lagi! 🚀</p>
          <p>Bagaimana kalau Budi punya 5 tumpukan puluhan dan 1 balok satuan? Ya benar, jadinya <strong>51</strong>!</p>
        `,
        quizzes: [
          {
            soal: "6 puluhan dan 0 satuan jadinya?",
            pilihan: [{teks:"60", benar:true}, {teks:"6", benar:false}]
          },
          {
            soal: "3 puluhan dan 9 satuan jadinya?",
            pilihan: [{teks:"39", benar:true}, {teks:"93", benar:false}]
          },
          {
            soal: "Berapa banyak puluhan di angka 10?",
            pilihan: [{teks:"0", benar:false}, {teks:"1", benar:true}]
          }
        ]
      }
    ]
  },
  {
    id: "k2-mtk-03", emoji: "⚖️",
    judul: "Siapa yang Lebih Besar?",
    deskripsi: "Mari bandingkan angka-angka! 🐘 vs 🐭",
    tujuan: ["Menggunakan tanda >, <, dan =", "Membandingkan 2 bilangan"],
    badgeEmoji: "⚖️", badgeNama: "Juru Banding",
    sections: [
      {
        judul: "Lebih Besar atau Lebih Kecil?",
        konten: `
          <p>Tanda <code>&gt;</code> artinya <strong>Lebih Besar Dari</strong>. Tanda <code>&lt;</code> artinya <strong>Lebih Kecil Dari</strong>.</p>
          <p>Biar gampang, ingat ini: <em>Mulut buaya 🐊 selalu menghadap dan memakan angka yang lebih besar!</em></p>
          <p>Karena 27 lebih besar dari 15, buaya akan makan 27! Jadinya <code>27 &gt; 15</code>.</p>
        `,
        quizzes: [
          {
            soal: "Tanda yang tepat untuk 30 ... 45 adalah?",
            pilihan: [{teks:"<", benar:true}, {teks:">", benar:false}]
          },
          {
            soal: "Tanda yang tepat untuk 50 ... 49 adalah?",
            pilihan: [{teks:">", benar:true}, {teks:"<", benar:false}]
          },
          {
            soal: "Tanda yang tepat untuk 20 ... 20 adalah?",
            pilihan: [{teks:"=", benar:true}, {teks:">", benar:false}]
          }
        ]
      },
      {
        judul: "Garis Bilangan",
        konten: `
          <p>Kalau kamu bingung mana yang besar, coba bayangkan penggaris atau garis bilangan! 📏</p>
          <p>Angka yang letaknya makin ke KANAN, nilainya makin BESAR. Angka yang di KIRI lebih kecil.</p>
        `,
        quizzes: [
          {
            soal: "Manakah yang letaknya paling kanan di garis bilangan?",
            pilihan: [{teks:"15", benar:false}, {teks:"25", benar:true}]
          },
          {
            soal: "Manakah yang lebih kecil antara 38 dan 42?",
            pilihan: [{teks:"38", benar:true}, {teks:"42", benar:false}]
          },
          {
            soal: "Urutan dari TERKECIL ke TERBESAR yang benar adalah?",
            pilihan: [{teks:"12, 18, 25", benar:true}, {teks:"25, 18, 12", benar:false}]
          }
        ]
      }
    ],
    evaluasi: [
      { soal: "Bagaimana menulis 'Dua puluh sembilan'?", pilihan: [{teks:"29", benar:true}, {teks:"92", benar:false}] },
      { soal: "Setelah 34 adalah...", pilihan: [{teks:"35", benar:true}, {teks:"33", benar:false}] },
      { soal: "Sebelum 40 adalah...", pilihan: [{teks:"39", benar:true}, {teks:"41", benar:false}] },
      { soal: "Angka 47 terdiri dari...", pilihan: [{teks:"4 puluhan 7 satuan", benar:true}, {teks:"7 puluhan 4 satuan", benar:false}] },
      { soal: "3 puluhan dan 0 satuan = ...", pilihan: [{teks:"30", benar:true}, {teks:"3", benar:false}] },
      { soal: "Nilai tempat 5 pada angka 52 adalah...", pilihan: [{teks:"Puluhan", benar:true}, {teks:"Satuan", benar:false}] },
      { soal: "Tanda untuk 35 ... 41 adalah?", pilihan: [{teks:"<", benar:true}, {teks:">", benar:false}] },
      { soal: "Tanda untuk 50 ... 48 adalah?", pilihan: [{teks:">", benar:true}, {teks:"<", benar:false}] },
      { soal: "Siapa yang paling besar: 22, 28, 25?", pilihan: [{teks:"28", benar:true}, {teks:"25", benar:false}] },
      { soal: "Urutan dari terbesar: 19, 30, 24", pilihan: [{teks:"30, 24, 19", benar:true}, {teks:"19, 24, 30", benar:false}] }
    ]
  },
  {
    id: "k2-mtk-04", emoji: "➕",
    judul: "Menambah dengan Senang Hati",
    deskripsi: "Budi punya permen, lalu dikasih Anton. Berapa totalnya? 🍬",
    tujuan: ["Menjumlah tanpa simpan", "Menjumlah dengan simpan"],
    badgeEmoji: "➕", badgeNama: "Juru Tambah",
    sections: [
      {
        judul: "Menjumlah Tanpa Simpan",
        konten: `
          <p>Menjumlahkan itu artinya menggabungkan dua benda! Budi punya 12 apel merah, Anton memberinya 5 apel hijau. 🍎🍏</p>
          <p>Kalau kita gabung: <code>12 + 5 = 17</code> apel! Mudah, kan?</p>
          <div style="background:#E3F2FD; padding:12px; border-radius:8px;">
            Cara mudah: hitung dari angka terbesar, lalu lanjutkan dengan jari. 12 di kepala... lalu 13, 14, 15, 16, 17 di jari! 🖐️
          </div>
        `,
        quizzes: [
          {
            soal: "Berapa 10 + 6?",
            pilihan: [{teks:"16", benar:true}, {teks:"15", benar:false}]
          },
          {
            soal: "Berapa 21 + 4?",
            pilihan: [{teks:"25", benar:true}, {teks:"24", benar:false}]
          },
          {
            soal: "13 ditambah 3 sama dengan?",
            pilihan: [{teks:"16", benar:true}, {teks:"15", benar:false}]
          }
        ]
      },
      {
        judul: "Menjumlah Dengan Simpan",
        konten: `
          <p>Kadang kalau kita gabung satuannya, jumlahnya jadi lebih dari 10! Misalnya <code>18 + 7</code>.</p>
          <p>Pindahkan 2 dari 7 ke 18 biar 18 jadi 20 yang bulat! Lalu sisa 5-nya ditambah ke 20. Totalnya jadi <strong>25</strong>! 💡</p>
        `,
        quizzes: [
          {
            soal: "Berapa 15 + 6?",
            pilihan: [{teks:"21", benar:true}, {teks:"20", benar:false}]
          },
          {
            soal: "Berapa 28 + 4?",
            pilihan: [{teks:"32", benar:true}, {teks:"31", benar:false}]
          },
          {
            soal: "Berapa 39 + 2?",
            pilihan: [{teks:"41", benar:true}, {teks:"40", benar:false}]
          }
        ]
      }
    ]
  },
  {
    id: "k2-mtk-05", emoji: "➖",
    judul: "Mengurangi dengan Mudah",
    deskripsi: "Kalau permennya dimakan, sisanya berapa ya? 😋",
    tujuan: ["Mengurang tanpa pinjam", "Mengurang dengan pinjam"],
    badgeEmoji: "➖", badgeNama: "Juru Kurang",
    sections: [
      {
        judul: "Mengurang Tanpa Pinjam",
        konten: `
          <p>Mengurangi artinya benda itu diambil atau dimakan! 🍩</p>
          <p>Coba bayangkan kamu punya 20 donat manis. Tiba-tiba temanmu memakan 8 donat. Sisa berapa ya? Kita hitung mundur: 19, 18... sampai turun 8 jari. Sisa <strong>12 donat</strong>!</p>
        `,
        quizzes: [
          {
            soal: "Berapa 15 - 5?",
            pilihan: [{teks:"10", benar:true}, {teks:"20", benar:false}]
          },
          {
            soal: "Berapa 28 - 4?",
            pilihan: [{teks:"24", benar:true}, {teks:"32", benar:false}]
          },
          {
            soal: "30 dikurangi 10 jadi...",
            pilihan: [{teks:"20", benar:true}, {teks:"40", benar:false}]
          }
        ]
      },
      {
        judul: "Mengurang Dengan Pinjam",
        konten: `
          <p>Kadang, jumlah satuannya nggak cukup buat dikurangi! Misalnya <code>32 - 15</code>. 2 tidak bisa dikurangi 5. 🛡️</p>
          <p>Jadi, angka 2 harus <em>meminjam</em> 1 puluhan dari tetangganya (si 3), sehingga menjadi 12! Lalu <code>12 - 5 = 7</code>. Dan si 3 puluhan tinggal 2, dikurang 1 jadi 1. Total: <strong>17</strong>.</p>
        `,
        quizzes: [
          {
            soal: "Berapa 24 - 8?",
            pilihan: [{teks:"16", benar:true}, {teks:"14", benar:false}]
          },
          {
            soal: "Berapa 41 - 3?",
            pilihan: [{teks:"38", benar:true}, {teks:"39", benar:false}]
          },
          {
            soal: "Berapa 50 - 15?",
            pilihan: [{teks:"35", benar:true}, {teks:"45", benar:false}]
          }
        ]
      }
    ]
  }
];

if (require.main === module) {
  materiList.forEach(m => {
    const html = template(m);
    fs.writeFileSync(path.join(outDir, `${m.id}.html`), html);
    console.log(`Generated: ${m.id}.html`);
  });
}

const materiList0610 = [
  {
    id: "k2-mtk-06", emoji: "📖",
    judul: "Petualangan Anton dan Kelereng",
    deskripsi: "Membaca cerita dan berhitung! 🕵️‍♂️",
    tujuan: ["Mengerjakan soal cerita tambah", "Mengerjakan soal cerita kurang"],
    badgeEmoji: "📖", badgeNama: "Detektif Cerita",
    sections: [
      {
        judul: "Kelereng Anton Bertambah",
        konten: `
          <p>Halo detektif cilik! Mari pecahkan kasus cerita ini. 🕵️‍♂️</p>
          <p>Anton awalnya punya 15 kelereng 🔴. Hari ini, dia menang main bersama teman-temannya dan dapat hadiah 8 kelereng baru. Coba tebak, "mendapat" itu artinya ditambah atau dikurang?</p>
          <p>Ya, ditambah! Jadinya: <code>15 + 8 = 23</code> kelereng!</p>
        `,
        quizzes: [
          {
            soal: "Siti punya 10 buku, lalu dibeli lagi 2 buku. Operasi apakah ini?",
            pilihan: [{teks:"Ditambah (+)", benar:true}, {teks:"Dikurang (-)", benar:false}]
          },
          {
            soal: "Berapa total buku Siti sekarang?",
            pilihan: [{teks:"12 buku", benar:true}, {teks:"8 buku", benar:false}]
          },
          {
            soal: "Rina mendapat 5 pensil baru padahal dia sudah punya 12. Totalnya?",
            pilihan: [{teks:"17", benar:true}, {teks:"15", benar:false}]
          }
        ]
      },
      {
        judul: "Permen Budi Berkurang",
        konten: `
          <p>Sekarang giliran Budi. Dia baru saja beli 30 permen manis. 🍬 Wah, baiknya Budi membagikan 12 permen ke temannya.</p>
          <p>Kata "membagikan" atau "hilang" atau "dimakan" itu ciri-ciri dikurangi! Jadi sisa permen Budi adalah <code>30 - 12 = 18</code>!</p>
        `,
        quizzes: [
          {
            soal: "Ibu bawa 20 telur, pecah 4 di jalan. Sisa telur Ibu?",
            pilihan: [{teks:"16 telur", benar:true}, {teks:"24 telur", benar:false}]
          },
          {
            soal: "Andi punya 25 balon, terbang 5 balon ke langit. Sisa berapa?",
            pilihan: [{teks:"20 balon", benar:true}, {teks:"30 balon", benar:false}]
          },
          {
            soal: "Budi menjual 8 dari 30 layang-layang miliknya. Layang-layang Budi...",
            pilihan: [{teks:"Berkurang", benar:true}, {teks:"Bertambah", benar:false}]
          }
        ]
      }
    ],
    evaluasi: [
      { soal: "13 + 5 = ...", pilihan: [{teks:"18", benar:true}, {teks:"17", benar:false}] },
      { soal: "20 + 10 = ...", pilihan: [{teks:"30", benar:true}, {teks:"20", benar:false}] },
      { soal: "15 + 8 = ...", pilihan: [{teks:"23", benar:true}, {teks:"22", benar:false}] },
      { soal: "25 - 5 = ...", pilihan: [{teks:"20", benar:true}, {teks:"15", benar:false}] },
      { soal: "30 - 12 = ...", pilihan: [{teks:"18", benar:true}, {teks:"19", benar:false}] },
      { soal: "42 - 5 = ...", pilihan: [{teks:"37", benar:true}, {teks:"38", benar:false}] },
      { soal: "Toni beli 10 kue, makan 2. Sisa berapa?", pilihan: [{teks:"8", benar:true}, {teks:"12", benar:false}] },
      { soal: "Rina dikasih 5 permen, lalu dikasih lagi 5. Totalnya?", pilihan: [{teks:"10", benar:true}, {teks:"0", benar:false}] },
      { soal: "20 + 20 - 5 = ...", pilihan: [{teks:"35", benar:true}, {teks:"40", benar:false}] },
      { soal: "Kata 'hilang' biasanya memakai tanda...", pilihan: [{teks:"Minus (-)", benar:true}, {teks:"Plus (+)", benar:false}] }
    ]
  },
  {
    id: "k2-mtk-07", emoji: "📐",
    judul: "Petualangan di Dunia Bentuk",
    deskripsi: "Mengenal bentuk di sekitarmu! 🖼️",
    tujuan: ["Kenal persegi, segitiga, lingkaran", "Menghitung sisi"],
    badgeEmoji: "📐", badgeNama: "Penjelajah Bentuk",
    sections: [
      {
        judul: "Bentuk Datar",
        konten: `
          <p>Pernahkah kamu memperhatikan benda-benda di sekelilingmu? Roda sepeda ayah berbentuk Lingkaran ⭕ yang mulus tanpa sudut!</p>
          <p>Sedangkan buku tulismu berbentuk Persegi Panjang ⬜, yang panjang di dua sisinya tapi lebih pendek di dua sisi lainnya.</p>
        `,
        quizzes: [
          {
            soal: "Papan tulis di kelas biasanya berbentuk apa?",
            pilihan: [{teks:"Persegi panjang", benar:true}, {teks:"Lingkaran", benar:false}]
          },
          {
            soal: "Bentuk koin Rp 500 adalah?",
            pilihan: [{teks:"Lingkaran", benar:true}, {teks:"Segitiga", benar:false}]
          },
          {
            soal: "Potongan piza bentuknya mirip apa?",
            pilihan: [{teks:"Segitiga", benar:true}, {teks:"Persegi", benar:false}]
          }
        ]
      },
      {
        judul: "Sisi dan Sudut",
        konten: `
          <p>Sisi adalah garis lurus yang membatasi bentuk. Sudut adalah pojokannya yang tajam! 🔺</p>
          <p>Sesuai namanya, Segi Tiga punya 3 sisi dan 3 sudut. Kalau Persegi punya 4 sisi yang SAMA panjang.</p>
        `,
        quizzes: [
          {
            soal: "Berapa banyak sudut yang ada pada lingkaran?",
            pilihan: [{teks:"0 (Tidak ada)", benar:true}, {teks:"1", benar:false}]
          },
          {
            soal: "Persegi mempunyai berapa sisi?",
            pilihan: [{teks:"4", benar:true}, {teks:"3", benar:false}]
          },
          {
            soal: "Bangun datar 4 sisi yang panjang dan lebarnya beda disebut?",
            pilihan: [{teks:"Persegi panjang", benar:true}, {teks:"Persegi", benar:false}]
          }
        ]
      }
    ]
  },
  {
    id: "k2-mtk-08", emoji: "🧩",
    judul: "Merakit Bentuk",
    deskripsi: "Menyusun bentuk-bentuk kecil jadi bentuk besar! 🛠️",
    tujuan: ["Menguraikan bentuk", "Menyusun bentuk"],
    badgeEmoji: "🧩", badgeNama: "Master Puzzle",
    sections: [
      {
        judul: "Menguraikan Bentuk",
        konten: `
          <p>Mari bermain sulap kertas! ✂️ Siapkan kertas berbentuk Persegi. Coba lipat dari ujung ke ujung miring (diagonal) lalu gunting.</p>
          <p>Wah! Persegi yang tadi sekarang berubah jadi 2 buah Segitiga. Ajaib, kan?</p>
        `,
        quizzes: [
          {
            soal: "Kalau kertas persegi digunting miring (diagonal), jadi bentuk apa?",
            pilihan: [{teks:"Dua segitiga", benar:true}, {teks:"Dua lingkaran", benar:false}]
          },
          {
            soal: "Kalau kertas persegi panjang dilipat tepat di tengah, jadi apa?",
            pilihan: [{teks:"Dua persegi/persegi panjang kecil", benar:true}, {teks:"Satu lingkaran", benar:false}]
          },
          {
            soal: "Bisa nggak gunting lingkaran jadi persegi dengan satu potongan?",
            pilihan: [{teks:"Tidak bisa", benar:true}, {teks:"Bisa", benar:false}]
          }
        ]
      },
      {
        judul: "Menyusun Segitiga",
        konten: `
          <p>Sekarang ambil 2 segitiga hasil guntinganmu tadi. Kalau sisi panjangnya disatukan kembali, taraaa... jadi Persegi lagi! ✨</p>
          <p>Ini seperti menyusun puzzle. Beberapa bentuk kecil bisa merakit bentuk yang besar.</p>
        `,
        quizzes: [
          {
            soal: "Apakah 4 kotak (persegi) kecil bisa disusun jadi 1 kotak (persegi) besar?",
            pilihan: [{teks:"Bisa", benar:true}, {teks:"Tidak bisa", benar:false}]
          },
          {
            soal: "2 buah segitiga bisa dirakit menjadi...",
            pilihan: [{teks:"Segiempat (Persegi / Persegi panjang)", benar:true}, {teks:"Lingkaran", benar:false}]
          },
          {
            soal: "Mainan balok-balok susun memanfaatkan bentuk...",
            pilihan: [{teks:"Bangun ruang / datar", benar:true}, {teks:"Air", benar:false}]
          }
        ]
      }
    ]
  },
  {
    id: "k2-mtk-09", emoji: "🎲",
    judul: "Bentuk yang Berisi",
    deskripsi: "Bangun yang ada isinya! 📦",
    tujuan: ["Kenal kubus, balok, bola", "Bedakan sisi datar & lengkung"],
    badgeEmoji: "🎲", badgeNama: "Penjelajah Ruang",
    sections: [
      {
        judul: "Mengenal Bangun Ruang",
        konten: `
          <p>Beda dengan bangun datar yang tipis kayak kertas, Bangun Ruang itu gendut dan ada isinya (ruang)! 📦</p>
          <p>Contohnya bola basket 🏀 bentuknya Bola. Kotak sepatu bentuknya Balok. Kalau rubik warna-warni bentuknya Kubus karena semua sisinya kotak yang sama!</p>
        `,
        quizzes: [
          {
            soal: "Celengan kaleng susu kental manis berbentuk apa?",
            pilihan: [{teks:"Tabung", benar:true}, {teks:"Kubus", benar:false}]
          },
          {
            soal: "Es krim cone terbalik mirip bangun apa?",
            pilihan: [{teks:"Kerucut", benar:true}, {teks:"Bola", benar:false}]
          },
          {
            soal: "Bentuk dadu ular tangga adalah?",
            pilihan: [{teks:"Kubus", benar:true}, {teks:"Balok", benar:false}]
          }
        ]
      },
      {
        judul: "Datar vs Lengkung",
        konten: `
          <p>Coba kamu gelindingkan kotak sepatu di lantai. Susah, kan? Itu karena sisinya DATAR. 🧊</p>
          <p>Tapi kalau bola kasti, wussss... langsung menggelinding lari! Itu karena permukaannya LENGKUNG dan tidak ada sudut penahan.</p>
        `,
        quizzes: [
          {
            soal: "Bangun mana yang gampang menggelinding ke semua arah?",
            pilihan: [{teks:"Bola", benar:true}, {teks:"Kubus", benar:false}]
          },
          {
            soal: "Tabung (kaleng susu) bisa menggelinding jika...",
            pilihan: [{teks:"Ditaruh direbahkan / miring", benar:true}, {teks:"Ditaruh berdiri tegak", benar:false}]
          },
          {
            soal: "Kubus punya permukaan yang...",
            pilihan: [{teks:"Semuanya datar", benar:true}, {teks:"Semuanya lengkung", benar:false}]
          }
        ]
      }
    ],
    evaluasi: [
      { soal: "Buku gambar berbentuk...", pilihan: [{teks:"Persegi panjang", benar:true}, {teks:"Lingkaran", benar:false}] },
      { soal: "Segitiga memiliki berapa titik sudut?", pilihan: [{teks:"3", benar:true}, {teks:"4", benar:false}] },
      { soal: "Bentuk yang sisinya hanya 1 garis melengkung penuh adalah...", pilihan: [{teks:"Lingkaran", benar:true}, {teks:"Persegi", benar:false}] },
      { soal: "Dua segitiga kecil bisa disusun menjadi bentuk...", pilihan: [{teks:"Segiempat / Persegi", benar:true}, {teks:"Segilima", benar:false}] },
      { soal: "Balok punya ciri...", pilihan: [{teks:"Memanjang / Kotak", benar:true}, {teks:"Melengkung", benar:false}] },
      { soal: "Bangun ruang bulat seperti bumi disebut...", pilihan: [{teks:"Bola", benar:true}, {teks:"Kubus", benar:false}] },
      { soal: "Gelas minuman berbentuk seperti bangun...", pilihan: [{teks:"Tabung", benar:true}, {teks:"Kerucut", benar:false}] },
      { soal: "Bangun yang sulit digelindingkan...", pilihan: [{teks:"Balok", benar:true}, {teks:"Bola", benar:false}] },
      { soal: "Rubik adalah contoh dari...", pilihan: [{teks:"Kubus", benar:true}, {teks:"Lingkaran", benar:false}] },
      { soal: "Bangun yang permukaannya lengkung di seluruh arah...", pilihan: [{teks:"Bola", benar:true}, {teks:"Tabung", benar:false}] }
    ]
  },
  {
    id: "k2-mtk-10", emoji: "🧭",
    judul: "Di Mana Letaknya?",
    deskripsi: "Atas, bawah, kanan, kiri! 🗺️",
    tujuan: ["Kenal posisi benda", "Bisa baca peta sederhana"],
    badgeEmoji: "🧭", badgeNama: "Navigator Cilik",
    sections: [
      {
        judul: "Posisi Dasar",
        konten: `
          <p>Lihat ke langit! Burung terbang tinggi di ATAS pohon. 🐦</p>
          <p>Sekarang lihat ke lantai! Kucing sedang tidur pulas di BAWAH meja. 🐈</p>
          <p>Belajar posisi itu gampang. Ingat saja: Atas ⬆️, Bawah ⬇️, Kanan ➡️, dan Kiri ⬅️.</p>
        `,
        quizzes: [
          {
            soal: "Saat kamu pakai topi, topi diletakkan di...",
            pilihan: [{teks:"ATAS kepala", benar:true}, {teks:"BAWAH kepala", benar:false}]
          },
          {
            soal: "Saat kamu nulis dengan tangan kanan, sendok ada di tangan...",
            pilihan: [{teks:"Biasanya juga Kanan (kalau tidak sedang menulis)", benar:true}, {teks:"Mungkin Kiri", benar:false}] // simplified below
          }
        ]
      } // Will properly expand later
    ]
  }
];

if (require.main === module) {
  materiList0610.forEach(m => {
    const html = template(m);
    fs.writeFileSync(path.join(outDir, `${m.id}.html`), html);
    console.log(`Generated: ${m.id}.html`);
  });
}
