import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(_request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await _request.json();
  const { kelas, subject_id, semester, title } = body;

  // Ambil semua materi untuk kelas dan subject_id ini
  const { data: materials, error: matErr } = await supabase
    .from('materials')
    .select('id, judul')
    .eq('kelas', kelas)
    .eq('subject_id', subject_id)
    .order('urutan', { ascending: true }); // Urut berdasarkan urutan materi

  if (matErr || !materials) {
    return NextResponse.json({ error: 'Gagal mengambil data materi' }, { status: 500 });
  }

  const totalMateri = materials.length;

  // 1. Buat template roadmap
  const { data: template, error: templateError } = await supabase
    .from('roadmap_templates')
    .insert({
      guru_id: user.id,
      kelas,
      subject_id,
      semester,
      title: title || `${subject_id.toUpperCase()} Kelas ${kelas} - ${semester}`,
      total_pertemuan: totalMateri,
      status: 'active'
    })
    .select()
    .single();

  if (templateError) {
    return NextResponse.json({ error: templateError.message }, { status: 500 });
  }

  // 2. Auto-assign template_items (1 materi = 1 pertemuan)
  const templateItems = materials.map((m, idx) => ({
    template_id: template.id,
    pertemuan_ke: idx + 1,
    unit_id: m.id,
    unit_title: m.judul,
    bab_id: 1, // default
    urutan: 1,
    tipe: 'baru',
    review_from_pertemuan: null,
    catatan_guru: ''
  }));

  if (templateItems.length > 0) {
    const { error: itemsError } = await supabase
      .from('template_items')
      .insert(templateItems);

    if (itemsError) {
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true, template_id: template.id });
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('roadmap_templates')
    .select('*, template_items(*)')
    .eq('guru_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}