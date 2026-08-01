import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Ambil roadmap + verifikasi guru
  const { data: roadmap, error: roadmapErr } = await supabase
    .from('roadmap_templates')
    .select('id, kelas, subject_id, semester, title, guru_id')
    .eq('id', params.id)
    .single();

  if (roadmapErr || !roadmap) {
    return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
  }

  if (roadmap.guru_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Cari active pertemuan (belum selesai, urutan terkecil)
  const { data: activeSchedule } = await supabase
    .from('pertemuan_schedule')
    .select('id, pertemuan_ke, status, tanggal_rencana')
    .eq('template_id', params.id)
    .eq('status', 'terjadwal')
    .order('pertemuan_ke', { ascending: true })
    .limit(1)
    .maybeSingle();

  const pertemuanKe = activeSchedule?.pertemuan_ke ?? 1;

  // Ambil template_items untuk pertemuan ini
  const { data: items } = await supabase
    .from('template_items')
    .select('id, pertemuan_ke, unit_id, unit_title, bab_id, urutan, tipe, review_from_pertemuan, catatan_guru')
    .eq('template_id', params.id)
    .eq('pertemuan_ke', pertemuanKe)
    .order('urutan', { ascending: true });

  if (!items || items.length === 0) {
    return NextResponse.json({
      roadmap,
      pertemuanKe,
      scheduleId: activeSchedule?.id ?? null,
      materi: []
    });
  }

  const unitIds = [...new Set(items.map(i => i.unit_id))];

  // Ambil data materials dari DB
  const { data: materials } = await supabase
    .from('materials')
    .select('id, judul, deskripsi, subject_id, kelas')
    .in('id', unitIds);

  const materialsMap = new Map(materials?.map(m => [m.id, m]) || []);

  // Ambil soal-soal per unit
  const { data: questions } = await supabase
    .from('questions')
    .select('id, material_id, pertanyaan, tipe, pilihan, jawaban_benar, xp')
    .in('material_id', unitIds)
    .order('id', { ascending: true });

  const questionsByUnit = new Map<string, any[]>();
  for (const q of questions || []) {
    if (!questionsByUnit.has(q.material_id)) questionsByUnit.set(q.material_id, []);
    questionsByUnit.get(q.material_id)!.push(q);
  }

  // Gabungkan template_items + materials + questions + path buku HTML
  const materi = items.map(item => {
    const material = materialsMap.get(item.unit_id);
    // Path buku HTML: /buku/kelas{kelas}/{subject}/{unit_id}.html
    const subjectFolder = roadmap.subject_id === 'bind' ? 'bahasa-indonesia'
      : roadmap.subject_id === 'bing' ? 'bahasa-inggris'
      : roadmap.subject_id === 'mtk' ? 'matematika'
      : roadmap.subject_id;

    const bukuPath = `/buku/kelas${roadmap.kelas}/${subjectFolder}/${item.unit_id}.html`;

    return {
      ...item,
      judul: material?.judul ?? item.unit_title,
      deskripsi: material?.deskripsi ?? '',
      buku_path: bukuPath,
      soal: questionsByUnit.get(item.unit_id) ?? [],
    };
  });

  return NextResponse.json({
    roadmap,
    pertemuanKe,
    scheduleId: activeSchedule?.id ?? null,
    materi,
  });
}
