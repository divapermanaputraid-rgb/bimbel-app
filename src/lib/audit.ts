// src/lib/audit.ts
// Logic analisis audit mingguan guru — identifikasi siswa stuck, materi sulit, statistik

import { createClient } from '@/lib/supabase/server';

export interface SiswaStuck {
  id: string;
  nama: string;
  kelas: number;
  alasan: string[];
  skor_terakhir: number;
}

export interface MateriSulit {
  unit_id: string;
  rata_skor: number;
  jumlah_percobaan: number;
}

export interface StatistikMingguan {
  total_siswa_aktif: number;
  rata_rata_skor: number;
  siswa_stuck: SiswaStuck[];
  materi_sulit: MateriSulit[];
  total_latihan: number;
}

/**
 * Identifikasi siswa yang stuck:
 * - Skor < 60 pada 3 latihan terakhir (berturut-turut), atau
 * - Tidak aktif (tidak ada latihan) dalam 7 hari terakhir
 */
export async function identifikasiSiswaStuck(
  kelas: number,
  periodeStart: string,
  periodeEnd: string
): Promise<SiswaStuck[]> {
  const supabase = await createClient();

  // Ambil semua siswa di kelas ini
  const { data: siswa } = await supabase
    .from('users')
    .select('id, nama, kelas')
    .eq('role', 'siswa')
    .eq('kelas', kelas);

  if (!siswa || siswa.length === 0) return [];

  const siswaIds = siswa.map((s) => s.id);

  // Ambil latihan_results dalam periode
  const { data: results } = await supabase
    .from('latihan_results')
    .select('student_id, skor, created_at, material_id')
    .in('student_id', siswaIds)
    .gte('created_at', periodeStart)
    .lte('created_at', periodeEnd)
    .order('created_at', { ascending: false });

  const stuckList: SiswaStuck[] = [];

  for (const s of siswa) {
    const hasilSiswa = (results || []).filter((r) => r.student_id === s.id);
    const alasan: string[] = [];

    // Tidak aktif sama sekali dalam periode
    if (hasilSiswa.length === 0) {
      alasan.push('Tidak ada aktivitas dalam 7 hari terakhir');
    } else {
      // Cek 3 latihan terakhir: skor < 60 berturut-turut
      const tiga = hasilSiswa.slice(0, 3);
      if (tiga.length >= 3 && tiga.every((r) => r.skor < 60)) {
        alasan.push('Skor di bawah 60% pada 3 latihan terakhir');
      }

      // Tidak aktif 3 hari terakhir (dari periodeEnd)
      const endDate = new Date(periodeEnd);
      const tigaHariLalu = new Date(endDate);
      tigaHariLalu.setDate(tigaHariLalu.getDate() - 3);
      const aktifBaru = hasilSiswa.some(
        (r) => new Date(r.created_at) >= tigaHariLalu
      );
      if (!aktifBaru) {
        alasan.push('Tidak aktif dalam 3 hari terakhir');
      }
    }

    if (alasan.length > 0) {
      stuckList.push({
        id: s.id,
        nama: s.nama,
        kelas: s.kelas,
        alasan,
        skor_terakhir: hasilSiswa[0]?.skor ?? 0,
      });
    }
  }

  return stuckList;
}

/**
 * Identifikasi materi sulit: rata-rata skor rendah per unit dalam periode
 * Return top 3 terburuk
 */
export async function identifikasiMateriSulit(
  kelas: number,
  periodeStart: string,
  periodeEnd: string
): Promise<MateriSulit[]> {
  const supabase = await createClient();

  const { data: siswa } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'siswa')
    .eq('kelas', kelas);

  if (!siswa || siswa.length === 0) return [];

  const siswaIds = siswa.map((s) => s.id);

  const { data: results } = await supabase
    .from('latihan_results')
    .select('material_id, skor')
    .in('student_id', siswaIds)
    .gte('created_at', periodeStart)
    .lte('created_at', periodeEnd);

  if (!results || results.length === 0) return [];

  // Group by material_id
  const byUnit: Record<string, number[]> = {};
  for (const r of results) {
    if (!r.material_id) continue;
    if (!byUnit[r.material_id]) byUnit[r.material_id] = [];
    byUnit[r.material_id].push(r.skor);
  }

  const unitStats: MateriSulit[] = Object.entries(byUnit)
    .map(([unit_id, scores]) => ({
      unit_id,
      rata_skor: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      jumlah_percobaan: scores.length,
    }))
    .sort((a, b) => a.rata_skor - b.rata_skor)
    .slice(0, 3);

  return unitStats;
}

/**
 * Hitung statistik mingguan lengkap
 */
export async function hitungStatistikMingguan(
  kelas: number,
  subjectId: string,
  periodeStart: string,
  periodeEnd: string
): Promise<StatistikMingguan> {
  const supabase = await createClient();

  const { data: siswa } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'siswa')
    .eq('kelas', kelas);

  const siswaIds = (siswa || []).map((s) => s.id);

  const { data: results } = await supabase
    .from('latihan_results')
    .select('student_id, skor, material_id, created_at')
    .in('student_id', siswaIds.length > 0 ? siswaIds : ['none'])
    .gte('created_at', periodeStart)
    .lte('created_at', periodeEnd);

  const allResults = results || [];
  const totalLatihan = allResults.length;
  const siswaAktifIds = [...new Set(allResults.map((r) => r.student_id))];
  const totalSiswaAktif = siswaAktifIds.length;
  const rataSkor =
    totalLatihan > 0
      ? Math.round(allResults.reduce((a, b) => a + b.skor, 0) / totalLatihan)
      : 0;

  const [siswaStuck, materiSulit] = await Promise.all([
    identifikasiSiswaStuck(kelas, periodeStart, periodeEnd),
    identifikasiMateriSulit(kelas, periodeStart, periodeEnd),
  ]);

  return {
    total_siswa_aktif: totalSiswaAktif,
    rata_rata_skor: rataSkor,
    total_latihan: totalLatihan,
    siswa_stuck: siswaStuck,
    materi_sulit: materiSulit,
  };
}
