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
  <title>${escapeHtml(data.judul)} — Kelas 6</title>
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
        <button class="btn" style="margin-top: 24px; background-color: #4f46e5;" onclick="document.querySelectorAll('.section-card')[1].classList.add('expanded'); window.scrollBy({ top: 300, behavior: 'smooth' });">Mulai Belajar! 🚀</button>
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

const materiListK6Part2 = [
  {
    id: "k6-mtk-10", emoji: "📏",
    judul: "Rasio Satuan",
    deskripsi: "Menyederhanakan perbandingan hingga paling kecil! 🏃‍♂️",
    tujuan: ["Menyederhanakan rasio ke bentuk 1:n atau n:1", "Menyelesaikan soal cerita harga dan kecepatan"],
    badgeEmoji: "📏", badgeNama: "Master Satuan",
    sections: [
      {
        judul: "Rasio ke Bentuk Satuan",
        konten: "<p>Bentuk satuan artinya salah satu angkanya adalah 1. Contoh: <code>4:12</code> disederhanakan (dibagi 4) menjadi <code>1:3</code>.</p>",
        quiz: {
          soal: "Rasio satuan dari 15:5 adalah?",
          pilihan: [{teks:"3:1", benar:true}, {teks:"1:3", benar:false}]
        }
      },
      {
        judul: "Kapan Pakai 1:n vs n:1?",
        konten: "<p>Tergantung pertanyaan! Kalau mencari harga 1 buku dari 5 buku (Rp 25.000), kita cari rasionya <code>1 : 5.000</code>. Satuan buku (1) diletakkan di depan.</p>",
        quiz: {
          soal: "2 kg apel harganya Rp 40.000. Rasio kg : rupiah adalah?",
          pilihan: [{teks:"1 : 20.000", benar:true}, {teks:"20.000 : 1", benar:false}]
        }
      },
      {
        judul: "Kecepatan sebagai Rasio",
        konten: "<p>Dalam 3 jam, Andi bersepeda sejauh 45 km. Rasio jarak:waktu adalah <code>45 : 3</code>, yang disederhanakan jadi <code>15 : 1</code>. Artinya 15 km per jam!</p>",
        quiz: {
          soal: "Mobil menempuh 100 km dalam 2 jam. Kecepatannya?",
          pilihan: [{teks:"200 km/jam", benar:false}, {teks:"50 km/jam", benar:true}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-11", emoji: "🧮",
    judul: "Penerapan Rasio: Bagian vs Keseluruhan",
    deskripsi: "Menghitung bagian dari total menggunakan rasio. ⚖️",
    tujuan: ["Menghitung satu kelompok dari total rasio", "Menyelesaikan rasio tiga bagian"],
    badgeEmoji: "🧮", badgeNama: "Juru Perhitungan",
    sections: [
      {
        judul: "Bagian dari Keseluruhan",
        konten: "<p>Perbandingan laki-laki : perempuan = <code>2:3</code>. Berarti total bagian = <code>2 + 3 = 5</code>. Jika total siswa 25, laki-laki ada <code>2/5 × 25 = 10</code> siswa.</p>",
        quiz: {
          soal: "Merah:Biru = 1:4. Total bola 20. Berapa bola merah?",
          pilihan: [{teks:"4 bola", benar:true}, {teks:"5 bola", benar:false}]
        }
      },
      {
        judul: "Masalah Tiga Bagian",
        konten: "<p>Bagaimana jika 3 bagian? Merah:Biru:Kuning = <code>2:3:5</code>. Total bagian = 10. Jika ada 20 liter, warna biru = <code>3/10 × 20 = 6</code> liter.</p>",
        quiz: {
          soal: "A:B:C = 1:2:3. Total 30 buah. Berapa banyak B?",
          pilihan: [{teks:"15 buah", benar:false}, {teks:"10 buah", benar:true}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-12", emoji: "⏱️",
    judul: "Rasio pada Durasi Waktu",
    deskripsi: "Menyamakan satuan waktu sebelum membandingkannya! 🕰️",
    tujuan: ["Menerapkan rasio pada waktu", "Membandingkan kecepatan dua objek"],
    badgeEmoji: "⏱️", badgeNama: "Master Waktu",
    sections: [
      {
        judul: "Menyamakan Satuan Waktu",
        konten: "<p>Jangan bandingkan jam dengan menit langsung! Ubah dulu. <code>2 jam : 30 menit</code> = <code>120 menit : 30 menit</code> = <code>4:1</code>.</p>",
        quiz: {
          soal: "Rasio 1 menit : 15 detik adalah?",
          pilihan: [{teks:"4:1", benar:true}, {teks:"1:15", benar:false}]
        }
      },
      {
        judul: "Membandingkan Kecepatan",
        konten: "<p>Rina lari 400 meter dalam 2 menit (<code>200 m/menit</code>). Dewi lari 600 meter dalam 3 menit (<code>200 m/menit</code>). Kecepatan mereka sama!</p>",
        quiz: {
          soal: "Budi jalan 100m dalam 5 menit. Andi 200m dalam 5 menit. Siapa yang lebih cepat?",
          pilihan: [{teks:"Andi", benar:true}, {teks:"Budi", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-13", emoji: "📦",
    judul: "Mengonstruksi & Mengurai Kubus/Balok",
    deskripsi: "Mari membongkar dan memasang kotak kardus! 📐",
    tujuan: ["Mengenal sifat kubus & balok", "Memahami jaring-jaring"],
    badgeEmoji: "📦", badgeNama: "Arsitek Ruang",
    sections: [
      {
        judul: "Sifat Kubus dan Balok",
        konten: "<p>Kubus memiliki 6 sisi (berbentuk persegi), 12 rusuk, dan 8 titik sudut. Begitu pula balok, hanya saja sisinya persegi panjang.</p>",
        quiz: {
          soal: "Berapa banyak rusuk yang dimiliki balok?",
          pilihan: [{teks:"8", benar:false}, {teks:"12", benar:true}]
        }
      },
      {
        judul: "Jaring-jaring Bangun Ruang",
        konten: "<p>Jika kubus digunting pada rusuknya dan dilebarkan, akan terbentuk jaring-jaring. Ada 11 pola berbeda lho!</p>",
        quiz: {
          soal: "Berapa jumlah persegi pada jaring-jaring kubus?",
          pilihan: [{teks:"6", benar:true}, {teks:"8", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-14", emoji: "👁️",
    judul: "Visualisasi Spasial",
    deskripsi: "Melihat benda dari berbagai arah. 📸",
    tujuan: ["Melihat tampak atas, depan, dan samping", "Menentukan ukuran dari tampak perspektif"],
    badgeEmoji: "👁️", badgeNama: "Visioner Spasial",
    sections: [
      {
        judul: "Tampak Depan, Samping, Atas",
        konten: "<p>Kalau kamu melihat kubus dari atas, ia terlihat seperti sebuah persegi datar. Dari depan juga persegi!</p>",
        quiz: {
          soal: "Tampak depan dari kotak sepatu (balok) biasanya berbentuk?",
          pilihan: [{teks:"Persegi panjang", benar:true}, {teks:"Lingkaran", benar:false}]
        }
      },
      {
        judul: "Menentukan Ukuran Tampak",
        konten: "<p>Balok punya panjang 5, lebar 3, tinggi 2. Tampak depannya adalah <code>panjang × tinggi</code> = <code>5 × 2</code>.</p>",
        quiz: {
          soal: "Ukuran tampak atas dari balok di atas adalah?",
          pilihan: [{teks:"5 × 3", benar:true}, {teks:"3 × 2", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-15", emoji: "🗺️",
    judul: "Lokasi pada Sistem Berpetak",
    deskripsi: "Belajar membaca koordinat di atas kertas berpetak. 📍",
    tujuan: ["Membaca koordinat (baris, kolom)", "Menghitung jarak dalam grid"],
    badgeEmoji: "🗺️", badgeNama: "Navigator Grid",
    sections: [
      {
        judul: "Sistem Koordinat Sederhana",
        konten: "<p>Posisi ditandai dengan (kolom, baris). Titik A di <code>(3, 2)</code> artinya geser ke kanan 3 langkah, naik 2 langkah.</p>",
        quiz: {
          soal: "Titik (0, 0) letaknya ada di mana?",
          pilihan: [{teks:"Tengah atas", benar:false}, {teks:"Pojok kiri bawah", benar:true}]
        }
      },
      {
        judul: "Jarak dan Arah",
        konten: "<p>Dari (2,3) berjalan ke (5,3). Ini artinya berjalan sejauh 3 langkah ke kanan secara horizontal.</p>",
        quiz: {
          soal: "Andi di (1,1). Jalan 2 langkah ke atas. Posisi akhirnya?",
          pilihan: [{teks:"(1, 3)", benar:true}, {teks:"(3, 1)", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-16", emoji: "🎲",
    judul: "Skala Peluang (0 sampai 1)",
    deskripsi: "Seberapa besar kemungkinan sesuatu terjadi? 🌧️",
    tujuan: ["Memahami skala 0 sampai 1", "Menghitung peluang sederhana pecahan"],
    badgeEmoji: "🎲", badgeNama: "Master Peluang",
    sections: [
      {
        judul: "Skala Peluang",
        konten: "<p>Kejadian yang mustahil peluangnya = <code>0</code>. Kejadian yang pasti terjadi peluangnya = <code>1</code>.</p>",
        quiz: {
          soal: "Peluang matahari terbit di barat adalah?",
          pilihan: [{teks:"0", benar:true}, {teks:"1", benar:false}]
        }
      },
      {
        judul: "Menghitung Peluang Sederhana",
        konten: "<p>Dalam kantong ada 3 bola merah, 2 bola biru (Total 5). Peluang mengambil bola merah secara acak adalah <code>3/5</code>.</p>",
        quiz: {
          soal: "Peluang terambilnya bola biru pada contoh di atas?",
          pilihan: [{teks:"2/5", benar:true}, {teks:"1/5", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-17", emoji: "🎰",
    judul: "Membandingkan Peluang dalam Permainan",
    deskripsi: "Dadu vs Koin: siapa yang lebih gampang ditebak? 🪙",
    tujuan: ["Menghitung peluang permainan", "Membandingkan besaran dua peluang"],
    badgeEmoji: "🎰", badgeNama: "Juru Permainan",
    sections: [
      {
        judul: "Dadu dan Koin",
        konten: "<p>Peluang muncul angka genap di dadu (2,4,6) adalah <code>3/6</code> atau <code>½</code>. Peluang muncul Gambar di koin adalah <code>½</code>.</p>",
        quiz: {
          soal: "Peluang muncul angka 6 saat lempar satu dadu adalah?",
          pilihan: [{teks:"1/6", benar:true}, {teks:"6/6", benar:false}]
        }
      },
      {
        judul: "Mana yang Lebih Mungkin?",
        konten: "<p>Peluang muncul angka 1 di dadu (<code>1/6</code>). Peluang muncul Angka di koin (<code>½</code>). Jadi, koin lebih mungkin terjadi!</p>",
        quiz: {
          soal: "Manakah yang peluangnya 1/2?",
          pilihan: [{teks:"Dapat dadu ganjil", benar:true}, {teks:"Dapat dadu 5", benar:false}]
        }
      }
    ]
  },
  {
    id: "k6-mtk-18", emoji: "🌍",
    judul: "Membandingkan Peluang dalam Kehidupan",
    deskripsi: "Bawa payung atau tidak? Mari hitung risikonya! 🌂",
    tujuan: ["Melihat peluang sehari-hari", "Membuat keputusan dari data"],
    badgeEmoji: "🌍", badgeNama: "Analis Kehidupan",
    sections: [
      {
        judul: "Peluang Sehari-hari",
        konten: "<p>Jika BMKG bilang peluang hujan <code>80%</code>, itu artinya kemungkinan hujan sangat tinggi (hampir pasti), sebaiknya bawa payung!</p>",
        quiz: {
          soal: "Kalau peluang macet 10%, artinya jalanan akan?",
          pilihan: [{teks:"Lancar (kemungkinan macet kecil)", benar:true}, {teks:"Sangat macet", benar:false}]
        }
      },
      {
        judul: "Peluang dari Data Kelompok",
        konten: "<p>Ada 20 siswa: 12 suka matematika, 8 suka IPA. Peluang memilih anak yang suka matematika secara acak adalah <code>12/20</code> atau <code>3/5</code>.</p>",
        quiz: {
          soal: "Peluang terpilihnya anak yang suka IPA?",
          pilihan: [{teks:"8/20", benar:true}, {teks:"20/8", benar:false}]
        }
      }
    ]
  }
];

if (require.main === module) {
  materiListK6Part2.forEach(m => {
    const html = template(m);
    fs.writeFileSync(path.join(outDir, `${m.id}.html`), html);
    console.log(`Generated: ${m.id}.html`);
  });
}
