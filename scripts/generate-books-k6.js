const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas6/matematika');
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
  const answers = data.sections.map(sec => 
    sec.quiz.pilihan.findIndex(p => p.benar)
  );
  
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.judul} — Kelas 6</title>
  <link rel="stylesheet" href="/assets/book-theme.css">
</head>
<body class="kelas6" data-kelas="6" data-pelajaran="mtk" data-materi="${data.id}">
  <div class="progress-container"><div class="progress-fill"></div></div>
  
  <div class="book-container">
    <!-- Cover -->
    <div class="section-card expanded">
      <div class="section-header">🏠 Halaman Utama <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 80px; margin-bottom: 16px;">${data.emoji}</div>
        <h1 style="color: #4f46e5; margin:0 0 8px 0; font-size: 26px;">${escapeHtml(data.judul)}</h1>
        <p style="color: #666;">Matematika — Kelas 6</p>
        <p style="margin-top: 16px;">${escapeHtml(data.deskripsi)}</p>
        <button class="btn" style="margin-top: 24px; background-color: #4f46e5;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy(0,300)">Mulai Belajar! 🚀</button>
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
        <div class="quiz-box" data-idx="${i}" data-answered="false">
          <p style="font-weight: bold;">🤔 Cek Pemahaman:</p>
          <p>${escapeHtml(sec.quiz.soal)}</p>
          <div class="quiz-options">
            ${sec.quiz.pilihan.map((p, optIdx) => `<button class="quiz-opt" data-opt="${optIdx}">${escapeHtml(p.teks)}</button>`).join('')}
          </div>
          <div class="feedback" style="margin-top:8px; font-weight:bold;"></div>
        </div>
      </div>
    </div>
    `).join('')}

    <!-- Ringkasan -->
    <div class="section-card">
      <div class="section-header">🏆 Ringkasan & Selesai! <span>▼</span></div>
      <div class="section-body text-center" style="text-align: center;">
        <p>Kamu mendapatkan badge:</p>
        <div style="font-size: 64px; margin: 16px 0;">${data.badgeEmoji}</div>
        <p style="font-weight:bold; color: #4f46e5; font-size: 20px;">${escapeHtml(data.badgeNama)}</p>
        <button id="btn-selesai" class="btn disabled" style="margin-top:24px; opacity:0.5; cursor:not-allowed; background-color: #4f46e5;" disabled onclick="finishBook()">Selesai & Kumpulkan Tugas! ✅</button>
        <p id="msg-belum-selesai" style="font-size:12px; color:#888; margin-top:8px;">(Selesaikan semua quiz dulu ya)</p>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Groq)</div>
      <div class="ai-msgs">
        <div class="msg ai">Halo! Aku Tutor AI Kelas 6. Mau bahas materi ${escapeHtml(data.judul)} lebih dalam? Mari kita diskusikan. 💡</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik pertanyaanmu di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
  <script>
    window._QUIZ_ANSWERS = ${JSON.stringify(answers)};
    window._TOTAL_SECTIONS = ${data.sections.length};
  </script>
  <script src="/assets/book-engine.js"></script>
</body>
</html>`;
}

const materiList = [
  {
    id: "k6-mtk-01", emoji: "✖️",
    judul: "Perkalian Bilangan Asli × Pecahan",
    deskripsi: "Mengalikan bilangan bulat dengan pecahan. Mari kita pelajari konsep dasarnya! 💡",
    tujuan: ["Memahami konsep perkalian bilangan asli dengan pecahan", "Menerapkan strategi perkalian pembilang dan penyebut", "Menyederhanakan hasil pecahan"],
    badgeEmoji: "🔢", badgeNama: "Juru Kali Pecahan",
    sections: [
      {
        judul: "Konsep Perkalian",
        konten: "<p>Perkalian bilangan asli dengan pecahan bisa dibayangkan sebagai pengulangan. Contoh: <code>3 × ½</code> sama dengan memiliki 3 bagian, di mana tiap bagian bernilai ½. Hasilnya adalah <code>1½</code> atau <code>3/2</code>.</p>",
        quiz: {
          soal: "Berapa hasil dari 4 × ¼ ?",
          pilihan: [{teks:"1", benar:true}, {teks:"4", benar:false}]
        }
      },
      {
        judul: "Strategi Menghitung",
        konten: "<p>Cara paling mudah adalah mengubah bilangan asli menjadi pecahan biasa dengan menyebutnya per-satu. Misalnya, 3 menjadi <code>3/1</code>. Lalu kalikan <code>(3/1) × (1/2) = 3/2</code>.</p>",
        quiz: {
          soal: "Dalam pecahan biasa, angka 5 ditulis sebagai...",
          pilihan: [{teks:"5/5", benar:false}, {teks:"5/1", benar:true}]
        }
      },
      {
        judul: "Menyederhanakan Hasil",
        konten: "<p>Terkadang hasilnya besar, contohnya <code>4 × 2/6 = 8/6</code>. Jangan lupa disederhanakan dengan membagi atas dan bawah dengan angka yang sama (dibagi 2), menjadi <code>4/3</code> atau <code>1⅓</code>.</p>",
        quiz: {
          soal: "Pecahan 6/4 jika disederhanakan menjadi?",
          pilihan: [{teks:"3/2", benar:true}, {teks:"1/4", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-02", emoji: "🔄",
    judul: "Perkalian Pecahan × Bilangan Asli",
    deskripsi: "Sifat komutatif pada perkalian pecahan! Mari kita perhatikan contoh berikut. 📦",
    tujuan: ["Memahami sifat komutatif perkalian pecahan", "Menyelesaikan soal cerita"],
    badgeEmoji: "🔄", badgeNama: "Master Komutatif",
    sections: [
      {
        judul: "Sifat Komutatif Perkalian",
        konten: "<p>Dalam matematika, urutan perkalian tidak memengaruhi hasil. Jadi, <code>½ × 3</code> sama persis nilainya dengan <code>3 × ½</code>. Hasilnya tetap <code>3/2</code>.</p>",
        quiz: {
          soal: "Berapa nilai dari ¼ × 5?",
          pilihan: [{teks:"5/4", benar:true}, {teks:"4/5", benar:false}]
        }
      },
      {
        judul: "Penerapan Soal Cerita",
        konten: "<p>Rina butuh <code>¼ kg</code> tepung untuk 1 loyang kue. Jika ia mau buat 5 loyang, maka totalnya <code>5 × ¼ = 5/4 kg</code> atau <code>1¼ kg</code>.</p>",
        quiz: {
          soal: "Budi berjalan ½ km tiap hari. Dalam 4 hari, jarak yang ditempuh adalah?",
          pilihan: [{teks:"2 km", benar:true}, {teks:"4 km", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-03", emoji: "➗",
    judul: "Pembagian Pecahan ÷ Bilangan Asli",
    deskripsi: "Membagi pecahan jadi bagian yang lebih kecil lagi! 🔪",
    tujuan: ["Memahami konsep pembagian pecahan dengan bilangan asli", "Menggunakan invers perkalian"],
    badgeEmoji: "➗", badgeNama: "Juru Bagi Pecahan",
    sections: [
      {
        judul: "Konsep Pembagian Pecahan",
        konten: "<p>Bayangkan kamu punya <code>½ loyang pizza</code>. Jika pizza itu dibagi rata untuk 2 orang, maka tiap orang mendapat <code>¼ loyang</code>. Secara matematis: <code>½ ÷ 2 = ¼</code>.</p>",
        quiz: {
          soal: "Jika ⅓ kue dibagi 2, tiap orang mendapat?",
          pilihan: [{teks:"1/6", benar:true}, {teks:"1/5", benar:false}]
        }
      },
      {
        judul: "Trik Cepat Menghitung",
        konten: "<p>Trik paling mudah: ubah tanda pembagian <code>÷</code> menjadi perkalian <code>×</code>, lalu balik angka aslinya. <code>½ ÷ 2</code> menjadi <code>½ × ½ = ¼</code>.</p>",
        quiz: {
          soal: "Bentuk perkalian dari ¼ ÷ 3 adalah?",
          pilihan: [{teks:"¼ × 3/1", benar:false}, {teks:"¼ × ⅓", benar:true}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-04", emoji: "🎯",
    judul: "Pembagian Bilangan Asli ÷ Pecahan",
    deskripsi: "Berapa banyak bagian kecil di dalam sebuah benda utuh? 📏",
    tujuan: ["Memahami seberapa banyak pecahan di dalam bilangan bulat", "Menyelesaikan soal cerita dengan tepat"],
    badgeEmoji: "🎯", badgeNama: "Master Pembagian",
    sections: [
      {
        judul: "Konsep Kelompok Pecahan",
        konten: "<p>Berapa banyak potongan <code>½</code> di dalam <code>3</code> kue utuh? Jawabannya ada 6 bagian! Jadi <code>3 ÷ ½ = 6</code>.</p>",
        quiz: {
          soal: "Ada berapa banyak bagian ¼ di dalam 2 roti?",
          pilihan: [{teks:"8", benar:true}, {teks:"6", benar:false}]
        }
      },
      {
        judul: "Trik Perhitungan",
        konten: "<p>Mirip trik sebelumnya: <code>3 ÷ ½</code> diubah menjadi <code>3 × 2/1</code>. Hasilnya 6!</p>",
        quiz: {
          soal: "Hasil dari 5 ÷ ⅓ adalah?",
          pilihan: [{teks:"15", benar:true}, {teks:"8", benar:false}]
        }
      },
      {
        judul: "Penerapan Soal Cerita",
        konten: "<p>Dewi memiliki 4 meter pita. Tiap hadiah butuh pita <code>⅔ meter</code>. Berapa hadiah yang bisa dihias? Hitungannya: <code>4 ÷ ⅔ = 4 × 3/2 = 12/2 = 6</code> kado!</p>",
        quiz: {
          soal: "Pipa 6 meter dipotong jadi ukuran ¾ meter. Ada berapa potongan?",
          pilihan: [{teks:"8 potongan", benar:true}, {teks:"6 potongan", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-05", emoji: "🔄",
    judul: "Mengubah Pecahan ke Desimal",
    deskripsi: "Mari belajar mengubah pecahan ke bilangan berkoma! 🧮",
    tujuan: ["Ubah pecahan per 10 atau 100", "Mengubah pecahan biasa dengan pembagian bersusun"],
    badgeEmoji: "🔄", badgeNama: "Konverter Pecahan",
    sections: [
      {
        judul: "Pecahan Penyebut 10 dan 100",
        konten: "<p>Ini yang paling gampang! <code>3/10</code> ditulis <code>0.3</code>. Lalu <code>25/100</code> ditulis <code>0.25</code>.</p>",
        quiz: {
          soal: "Bentuk desimal dari 7/10 adalah?",
          pilihan: [{teks:"0.07", benar:false}, {teks:"0.7", benar:true}]
        }
      },
      {
        judul: "Mengubah Pecahan Lain",
        konten: "<p>Kalau penyebutnya bukan 10? Tinggal bagi pembilang dengan penyebut. <code>½ = 1 ÷ 2 = 0.5</code>. Kalau <code>¾ = 3 ÷ 4 = 0.75</code>.</p>",
        quiz: {
          soal: "Bentuk desimal dari ¼ adalah?",
          pilihan: [{teks:"0.25", benar:true}, {teks:"0.4", benar:false}]
        }
      },
      {
        judul: "Pecahan Campuran",
        konten: "<p>Angka utuh di depan tetap utuh. <code>2½</code> menjadi <code>2.5</code>. Gampang kan?</p>",
        quiz: {
          soal: "Bentuk desimal dari 3¾ adalah?",
          pilihan: [{teks:"3.75", benar:true}, {teks:"3.25", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-06", emoji: "⚖️",
    judul: "Membandingkan & Mengurutkan Desimal",
    deskripsi: "Menentukan mana nilai desimal yang lebih berat, tinggi, atau berharga. 💸",
    tujuan: ["Membandingkan dua desimal", "Mengurutkan urutan desimal"],
    badgeEmoji: "⚖️", badgeNama: "Juru Banding Desimal",
    sections: [
      {
        judul: "Membandingkan Angka di Belakang Koma",
        konten: "<p>Perhatikan baik-baik: <code>0.3</code> itu SAMA dengan <code>0.30</code>. Jadi <code>0.3</code> lebih besar daripada <code>0.25</code>!</p>",
        quiz: {
          soal: "Manakah yang lebih besar: 0.5 atau 0.45?",
          pilihan: [{teks:"0.45", benar:false}, {teks:"0.5", benar:true}]
        }
      },
      {
        judul: "Mengurutkan Data",
        konten: "<p>Urutan dari terkecil: <code>0.05</code>, lalu <code>0.5</code>, <code>0.55</code>, hingga <code>5.0</code>.</p>",
        quiz: {
          soal: "Siapa yang paling berat? Budi 45.2 kg atau Andi 45.15 kg?",
          pilihan: [{teks:"Budi", benar:true}, {teks:"Andi", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-07", emoji: "📊",
    judul: "Membandingkan Benda (Konsep Rasio)",
    deskripsi: "Berapa banyak banding berapa banyak? Itulah rasio! 🏀⚽",
    tujuan: ["Melihat perbandingan konkret dua kumpulan benda", "Menyederhanakan perbandingan"],
    badgeEmoji: "⚖️", badgeNama: "Juru Banding Rasio",
    sections: [
      {
        judul: "Melihat Perbandingan Benda",
        konten: "<p>Andi punya 6 kelereng, Budi punya 4. Perbandingannya adalah 6 berbanding 4 (atau <code>6:4</code>).</p>",
        quiz: {
          soal: "Ada 3 apel dan 5 jeruk. Rasio apel terhadap jeruk adalah?",
          pilihan: [{teks:"3:5", benar:true}, {teks:"5:3", benar:false}]
        }
      },
      {
        judul: "Menyederhanakan Rasio",
        konten: "<p>Rasio itu mirip pecahan. <code>6:4</code> bisa dibagi 2 atas dan bawah, menjadi rasio <code>3:2</code>.</p>",
        quiz: {
          soal: "Sederhanakan rasio 10:5!",
          pilihan: [{teks:"2:1", benar:true}, {teks:"1:2", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-08", emoji: "📝",
    judul: "Pengertian Rasio",
    deskripsi: "Belajar menuliskan notasi perbandingan secara matematis. 📏",
    tujuan: ["Membaca notasi rasio a:b", "Menulis rasio dalam bentuk pecahan"],
    badgeEmoji: "📝", badgeNama: "Master Notasi",
    sections: [
      {
        judul: "Notasi Rasio",
        konten: "<p>Tinggi pintu 200 cm, lebar 100 cm. Rasio panjang terhadap lebar adalah <code>200 : 100</code>, atau <code>2:1</code>.</p>",
        quiz: {
          soal: "Rasio laki-laki 15 orang dan perempuan 20 orang adalah?",
          pilihan: [{teks:"15:20", benar:true}, {teks:"20:15", benar:false}]
        }
      },
      {
        judul: "Rasio sebagai Pecahan",
        konten: "<p>Rasio <code>3:2</code> bisa ditulis sebagai pecahan <code>3/2</code>. Artinya bagian pertama 3 porsi, bagian kedua 2 porsi.</p>",
        quiz: {
          soal: "Rasio 4:5 dalam bentuk pecahan adalah?",
          pilihan: [{teks:"5/4", benar:false}, {teks:"4/5", benar:true}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-09", emoji: "⚖️",
    judul: "Kesamaan Rasio (Rasio Senilai)",
    deskripsi: "Kalau skalanya dibesarkan, apakah rasionya tetap sama? 🗺️",
    tujuan: ["Mencari rasio senilai", "Perkalian silang untuk membuktikan", "Aplikasi resep/campuran"],
    badgeEmoji: "⚖️", badgeNama: "Master Rasio Senilai",
    sections: [
      {
        judul: "Rasio yang Nilainya Sama",
        konten: "<p>Rasio <code>2:3</code> itu sama nilainya dengan <code>4:6</code> (karena sama-sama dikali 2). Ini disebut rasio senilai.</p>",
        quiz: {
          soal: "Rasio 1:4 senilai dengan...",
          pilihan: [{teks:"2:8", benar:true}, {teks:"4:1", benar:false}]
        }
      },
      {
        judul: "Cek Perkalian Silang",
        konten: "<p>Apakah 2:3 dan 4:6 senilai? Pakai kali silang: <code>2 × 6 = 12</code> dan <code>3 × 4 = 12</code>. Hasilnya sama, berarti senilai!</p>",
        quiz: {
          soal: "Apakah 3:5 dan 6:10 senilai?",
          pilihan: [{teks:"Tidak", benar:false}, {teks:"Ya", benar:true}]
        }
      },
      {
        judul: "Resep & Campuran",
        konten: "<p>Resep cat: 2 liter hijau + 3 liter putih. Kalau butuh 6 liter hijau, putihnya butuh berapa? <code>2:3 = 6:?</code> → 2 dikali 3 jadi 6, maka 3 dikali 3 jadi 9 liter putih!</p>",
        quiz: {
          soal: "Jika resep butuh 1 sendok gula untuk 2 gelas air (1:2). Untuk 4 gelas air butuh gula berapa?",
          pilihan: [{teks:"2 sendok", benar:true}, {teks:"3 sendok", benar:false}]
        }
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
