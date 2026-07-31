const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../public/buku');
const files = [];

function getHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getHtmlFiles(fullPath);
    } else if (fullPath.endsWith('.html')) {
      files.push(fullPath);
    }
  }
}

getHtmlFiles(basePath);
console.log(`Found ${files.length} HTML files`);

const materials = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract data from HTML
  const mPelajaran = content.match(/data-pelajaran="([^"]+)"/);
  const mKelas = content.match(/data-kelas="([^"]+)"/);
  const mMateri = content.match(/data-materi="([^"]+)"/);
  
  // Try to find the title. Usually in <title> or <h1 ...>
  let title = '';
  const mTitleH1 = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (mTitleH1) title = mTitleH1[1];
  else {
    const mTitleTag = content.match(/<title>([^<]+)<\/title>/);
    if (mTitleTag) title = mTitleTag[1].split('—')[0].split('-')[0].trim();
  }

  // Find emoji
  let emoji = '';
  const mEmoji = content.match(/<div style="font-size: [0-9]+px;[^>]*>([^<]+)<\/div>/);
  if (mEmoji) emoji = mEmoji[1];

  if (mPelajaran && mKelas && mMateri) {
    const id = mMateri[1];
    const kelas = parseInt(mKelas[1]);
    const subject_id = mPelajaran[1];
    const subjectCode = `k${kelas}-${subject_id}`; // e.g. k1-mtk
    
    // Extract unit number from ID (e.g., k1-mtk-01 -> 1)
    const parts = id.split('-');
    const urutanStr = parts[parts.length - 1];
    const urutan = parseInt(urutanStr);
    
    const filePath = file.replace(path.join(__dirname, '../public'), '');
    
    materials.push({
      id,
      kelas,
      subject_id: subjectCode,
      judul: title,
      deskripsi: `Materi ${subject_id.toUpperCase()} Kelas ${kelas}`,
      file_path: filePath,
      jumlah_halaman: 8,
      urutan: urutan,
      bab: Math.ceil(urutan / 3), // Estimate chapter
      badge_name: 'Bintang Pelajar', // Fallback
      badge_emoji: emoji || '🌟',
    });
  }
}

materials.sort((a, b) => {
  if (a.kelas !== b.kelas) return a.kelas - b.kelas;
  if (a.subject_id !== b.subject_id) return a.subject_id.localeCompare(b.subject_id);
  return a.urutan - b.urutan;
});

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const rows = materials.map(m => `(
  ${escapeSql(m.id)},
  ${m.kelas},
  ${escapeSql(m.subject_id)},
  ${escapeSql(m.judul)},
  ${escapeSql(m.deskripsi)},
  ${escapeSql(m.file_path)},
  ${m.jumlah_halaman},
  ${m.urutan},
  ${m.bab},
  ${escapeSql(m.badge_name)},
  ${escapeSql(m.badge_emoji)},
  true
)`);

let sql = `-- 039_seed_all_materials.sql
-- Seed ${materials.length} materials from HTML files

INSERT INTO public.materials (
  id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan, bab, badge_name, badge_emoji, is_active
) VALUES
${rows.join(',\n')}
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  file_path = EXCLUDED.file_path,
  urutan = EXCLUDED.urutan,
  bab = EXCLUDED.bab,
  badge_name = EXCLUDED.badge_name,
  badge_emoji = EXCLUDED.badge_emoji,
  is_active = EXCLUDED.is_active;
`;

fs.writeFileSync(path.join(__dirname, '../supabase/migrations/039_seed_all_materials.sql'), sql);
console.log(`Generated SQL for ${materials.length} materials in 039_seed_all_materials.sql`);
