import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Hitung pertemuan aktif (pertemuan berikutnya yang belum 'selesai')
 */
export async function getPertemuanAktif(templateId: string): Promise<number> {
  const { data, error } = await supabase
    .from('pertemuan_schedule')
    .select('pertemuan_ke')
    .eq('template_id', templateId)
    .eq('status', 'terjadwal')
    .order('pertemuan_ke', { ascending: true })
    .limit(1);

  if (error || !data?.[0]) return 1;
  return data[0].pertemuan_ke;
}

/**
 * Ambil materi hari ini (baru + review otomatis Make It Stick)
 */
export async function getMateriHariIni(templateId: string) {
  const pertemuanKe = await getPertemuanAktif(templateId);

  const { data: items, error } = await supabase
    .from('template_items')
    .select('*')
    .eq('template_id', templateId)
    .eq('pertemuan_ke', pertemuanKe)
    .order('urutan', { ascending: true });

  if (error || !items) return { baru: [], review: [], pertemuanKe };

  const baru = items.filter((item: any) => item.tipe === 'baru');
  const review = items.filter((item: any) => item.tipe === 'review');

  return { baru, review, pertemuanKe };
}

/**
 * Generator materi review otomatis (Spaced Repetition - Make It Stick)
 */
export function getMateriReviewOtomatis(pertemuanKe: number): number[] {
  const reviewMap: Record<number, number[]> = {
    2: [1],
    3: [2],
    4: [3],
    5: [1],      // Spaced: P1 di-review di P5
    6: [3, 4],
    7: [5],
    8: [6],
    9: [7],
    10: [1, 5],  // Big spaced review
    15: [1, 5, 10], // Major review
    20: [1, 5, 10, 15],
  };
  return reviewMap[pertemuanKe] || [];
}

/**
 * Tandai pertemuan sebagai selesai
 */
export async function tandaiPertemuanSelesai(templateId: string, pertemuanKe: number) {
  const { error } = await supabase
    .from('pertemuan_schedule')
    .upsert({
      template_id: templateId,
      pertemuan_ke: pertemuanKe,
      tanggal_aktual: new Date().toISOString().split('T')[0],
      status: 'selesai'
    }, {
      onConflict: 'template_id,pertemuan_ke'
    });

  return !error;
}
