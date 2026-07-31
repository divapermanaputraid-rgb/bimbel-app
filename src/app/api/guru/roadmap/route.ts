import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { kelas, subject_id, semester, title, items } = body;

  // 1. Buat template roadmap
  const { data: template, error: templateError } = await supabase
    .from('roadmap_templates')
    .insert({
      guru_id: user.id,
      kelas,
      subject_id,
      semester,
      title: title || `${subject_id.toUpperCase()} Kelas ${kelas} - ${semester}`,
      total_pertemuan: items.length,
      status: 'active'
    })
    .select()
    .single();

  if (templateError) {
    return NextResponse.json({ error: templateError.message }, { status: 500 });
  }

  // 2. Buat item-item pertemuan
  const templateItems = items.flatMap((pertemuan: any) =>
    pertemuan.materi.map((m: any, idx: number) => ({
      template_id: template.id,
      pertemuan_ke: pertemuan.pertemuan_ke,
      unit_id: m.unit_id,
      unit_title: m.unit_title,
      bab_id: m.bab_id || 1,
      urutan: idx + 1,
      tipe: m.tipe || 'baru',
      review_from_pertemuan: m.review_from_pertemuan || null,
      catatan_guru: m.catatan_guru || ''
    }))
  );

  const { error: itemsError } = await supabase
    .from('template_items')
    .insert(templateItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, template_id: template.id });
}

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
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