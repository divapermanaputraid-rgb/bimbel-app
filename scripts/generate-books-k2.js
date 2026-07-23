const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/buku/kelas2/matematika');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function template(data) {
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
        <h1 style="color: #667eea; margin:0 0 8px 0; font-size: 28px;">${data.judul}</h1>
        <p style="color: #666;">Matematika — Kelas 2</p>
        <p style="margin-top: 16px;">${data.deskripsi}</p>
      </div>
    </div>

    <!-- Tujuan -->
    <div class="section-card">
      <div class="section-header">🎯 Setelah ini kamu bisa... <span>▼</span></div>
      <div class="section-body">
        <ul style="padding-left: 20px;">
          ${data.tujuan.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- Penjelasan & Quiz -->
    ${data.sections.map((sec, i) => `
    <div class="section-card">
      <div class="section-header">📚 Bagian ${i+1}: ${sec.judul} <span>▼</span></div>
      <div class="section-body">
        ${sec.konten}
        <div class="quiz-box" data-answered="false">
          <p style="font-weight: bold;">🤔 Cek Pemahaman:</p>
          <p>${sec.quiz.soal}</p>
          <div class="quiz-options">
            ${sec.quiz.pilihan.map(p => `<button class="quiz-opt" data-correct="${p.benar}">${p.teks}</button>`).join('')}
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
        <p style="font-weight:bold; color: #667eea; font-size: 20px;">${data.badgeNama}</p>
        <button class="btn" style="margin-top:24px;" onclick="finishBook()">Selesai & Kumpulkan Tugas! ✅</button>
      </div>
    </div>
  </div>

  <!-- AI Tutor -->
  <div class="ai-chat">
    <div class="ai-toggle" onclick="toggleChat()">🤖</div>
    <div class="ai-panel">
      <div class="ai-header">Tutor AI (Kakak Groq)</div>
      <div class="ai-msgs">
        <div class="msg ai">Halo! Aku Tutor AI. Mau tanya soal materi ${data.judul}? 😊</div>
      </div>
      <div class="ai-input-area">
        <input type="text" id="ai-input" placeholder="Ketik di sini...">
        <button onclick="sendToAI()">Kirim</button>
      </div>
    </div>
  </div>
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
        konten: "<p>Anton punya 23 kelereng. Coba sebutkan: <strong>Dua puluh tiga</strong>. Wah, banyak ya! 😱</p>",
        quiz: {
          soal: "Bagaimana cara membaca angka 35?",
          pilihan: [{teks:"Tiga lima", benar:false}, {teks:"Tiga puluh lima", benar:true}]
        }
      },
      {
        judul: "Mengurutkan Angka",
        konten: "<p>Kalau berhitung naik: 10, 11, 12... Kalau turun: 15, 14, 13... Mudah kan? 🧗‍♂️</p>",
        quiz: {
          soal: "Setelah angka 29 adalah...",
          pilihan: [{teks:"30", benar:true}, {teks:"28", benar:false}]
        }
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
        konten: "<p>Angka 35 itu sama dengan 3 kotak puluhan dan 5 kotak satuan. 📦📦📦 + 🧊🧊🧊🧊🧊</p>",
        quiz: {
          soal: "Angka 42 terdiri dari...",
          pilihan: [{teks:"4 puluhan dan 2 satuan", benar:true}, {teks:"2 puluhan dan 4 satuan", benar:false}]
        }
      },
      {
        judul: "Menyusun Angka Baru",
        konten: "<p>Bagaimana kalau 5 puluhan digabung 1 satuan? Jadinya 51! 🚀</p>",
        quiz: {
          soal: "6 puluhan dan 0 satuan jadinya?",
          pilihan: [{teks:"60", benar:true}, {teks:"6", benar:false}]
        }
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
        konten: "<p>Mulut buaya selalu menghadap ke angka yang lebih besar! 🐊 27 > 15.</p>",
        quiz: {
          soal: "Tanda yang tepat untuk 30 ... 45 adalah?",
          pilihan: [{teks:"<", benar:true}, {teks:">", benar:false}]
        }
      },
      {
        judul: "Garis Bilangan",
        konten: "<p>Semakin ke kanan di garis bilangan, angkanya semakin besar lho! 📏</p>",
        quiz: {
          soal: "Manakah yang paling besar: 15, 25, 20?",
          pilihan: [{teks:"20", benar:false}, {teks:"25", benar:true}]
        }
      }
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
        konten: "<p>12 apel ditambah 5 apel jadi 17 apel! 🍎🍏</p>",
        quiz: {
          soal: "Berapa 10 + 6?",
          pilihan: [{teks:"16", benar:true}, {teks:"15", benar:false}]
        }
      },
      {
        judul: "Menjumlah Dengan Simpan",
        konten: "<p>Kalau 18 + 7, kita butuh simpan puluhan baru, totalnya jadi 25! 💡</p>",
        quiz: {
          soal: "Berapa 15 + 6?",
          pilihan: [{teks:"21", benar:true}, {teks:"20", benar:false}]
        }
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
        konten: "<p>Punya 20 donat, dimakan 8. Sisa 12! 🍩</p>",
        quiz: {
          soal: "Berapa 15 - 5?",
          pilihan: [{teks:"10", benar:true}, {teks:"20", benar:false}]
        }
      },
      {
        judul: "Mengurang Dengan Pinjam",
        konten: "<p>Kalau 32 - 15, pinjam 1 puluhan dari 3, jadi sisanya 17. 🛡️</p>",
        quiz: {
          soal: "Berapa 24 - 8?",
          pilihan: [{teks:"16", benar:true}, {teks:"14", benar:false}]
        }
      }
    ]
  },
  {
    id: "k2-mtk-06", emoji: "📖",
    judul: "Petualangan Anton dan Kelereng",
    deskripsi: "Membaca cerita dan berhitung! 🕵️‍♂️",
    tujuan: ["Mengerjakan soal cerita tambah", "Mengerjakan soal cerita kurang"],
    badgeEmoji: "📖", badgeNama: "Detektif Cerita",
    sections: [
      {
        judul: "Kelereng Anton",
        konten: "<p>Anton menang 8 kelereng. Awalnya dia punya 15. Jadi: 15 + 8 = 23 kelereng! 🔴</p>",
        quiz: {
          soal: "Siti punya 10 buku, lalu dibeli lagi 2 buku. Total buku Siti?",
          pilihan: [{teks:"12 buku", benar:true}, {teks:"8 buku", benar:false}]
        }
      },
      {
        judul: "Permen Budi Berkurang",
        konten: "<p>Budi punya 30 permen, dibagikan 12 ke temannya. Sisa permen Budi adalah 18! 🍬</p>",
        quiz: {
          soal: "Ibu bawa 20 telur, pecah 4 di jalan. Sisa telur Ibu?",
          pilihan: [{teks:"16 telur", benar:true}, {teks:"24 telur", benar:false}]
        }
      }
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
        konten: "<p>Roda sepeda itu lingkaran ⭕, buku tulis itu persegi panjang ⬜.</p>",
        quiz: {
          soal: "Papan tulis di kelas biasanya berbentuk apa?",
          pilihan: [{teks:"Persegi panjang", benar:true}, {teks:"Lingkaran", benar:false}]
        }
      },
      {
        judul: "Sisi dan Sudut",
        konten: "<p>Segitiga punya 3 sisi dan 3 sudut. Persegi punya 4 lho! 🔺</p>",
        quiz: {
          soal: "Lingkaran punya berapa sudut?",
          pilihan: [{teks:"Tidak ada", benar:true}, {teks:"1 sudut", benar:false}]
        }
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
        konten: "<p>Persegi kalau dipotong dua miring, bisa jadi 2 segitiga! ✂️</p>",
        quiz: {
          soal: "Kalau kertas persegi digunting diagonal (miring), jadi bentuk apa?",
          pilihan: [{teks:"Dua segitiga", benar:true}, {teks:"Dua lingkaran", benar:false}]
        }
      },
      {
        judul: "Menyusun Segitiga",
        konten: "<p>Dua segitiga disatukan juga bisa dikembalikan jadi satu persegi lagi. Ajaib kan? ✨</p>",
        quiz: {
          soal: "Apakah 4 kotak kecil bisa disusun jadi kotak (persegi) besar?",
          pilihan: [{teks:"Bisa", benar:true}, {teks:"Tidak bisa", benar:false}]
        }
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
        konten: "<p>Bola basket itu bulat bisa digelindingkan 🏀. Kotak sepatu itu balok 🧃.</p>",
        quiz: {
          soal: "Celengan kaleng susu berbentuk apa?",
          pilihan: [{teks:"Tabung", benar:true}, {teks:"Kubus", benar:false}]
        }
      },
      {
        judul: "Datar vs Lengkung",
        konten: "<p>Permukaan bola melengkung semuanya, tapi kubus permukaannya datar seperti lantai. 🧊</p>",
        quiz: {
          soal: "Bangun mana yang gampang menggelinding?",
          pilihan: [{teks:"Bola", benar:true}, {teks:"Balok", benar:false}]
        }
      }
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
        konten: "<p>Burung terbang di ATAS pohon. Kucing tidur di BAWAH meja. 🐈</p>",
        quiz: {
          soal: "Kalau tangan untuk salaman biasanya tangan sebelah...",
          pilihan: [{teks:"Kanan", benar:true}, {teks:"Kiri", benar:false}]
        }
      },
      {
        judul: "Membaca Peta Arah",
        konten: "<p>Di peta, rumah Ani ada di kiri jalan, taman ada di kanannya. 🛣️</p>",
        quiz: {
          soal: "Kalau kamu menghadap ke Barat, belakangmu adalah...",
          pilihan: [{teks:"Timur", benar:true}, {teks:"Utara", benar:false}]
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
