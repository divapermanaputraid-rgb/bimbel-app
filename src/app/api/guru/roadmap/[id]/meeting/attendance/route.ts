import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const pertemuanScheduleId = url.searchParams.get('pertemuan_schedule_id');

  if (!pertemuanScheduleId) {
    return NextResponse.json({ error: 'pertemuan_schedule_id is required' }, { status: 400 });
  }

  // 1. Ambil data roadmap dan cek akses guru
  const { data: roadmap, error: roadmapErr } = await supabase
    .from('roadmap_templates')
    .select('kelas, guru_id')
    .eq('id', params.id)
    .single();

  if (roadmapErr || !roadmap) {
    return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 });
  }

  if (roadmap.guru_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2. Ambil semua siswa di kelas ini
  const { data: siswaList, error: siswaErr } = await supabase
    .from('users')
    .select('id, nama')
    .eq('role', 'siswa')
    .eq('kelas', roadmap.kelas)
    .order('nama', { ascending: true });

  if (siswaErr || !siswaList) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }

  // 3. Ambil absensi yang sudah ada untuk pertemuan ini
  const { data: absensi, error: absensiErr } = await supabase
    .from('siswa_pertemuan')
    .select('siswa_id, hadir, catatan_guru')
    .eq('pertemuan_schedule_id', pertemuanScheduleId);

  if (absensiErr) {
    return NextResponse.json({ error: absensiErr.message }, { status: 500 });
  }

  const absensiMap = new Map(absensi?.map(a => [a.siswa_id, a]) || []);

  // 4. Gabungkan (Left join manual)
  const result = siswaList.map(siswa => {
    const existing = absensiMap.get(siswa.id);
    return {
      siswa_id: siswa.id,
      nama: siswa.nama,
      hadir: existing ? existing.hadir : true, // default true jika belum diabsen
      catatan_guru: existing?.catatan_guru || null
    };
  });

  return NextResponse.json({ data: result });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { pertemuan_schedule_id, attendance } = body;

    if (!pertemuan_schedule_id || !Array.isArray(attendance)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Pastikan guru ini berhak absen (punya roadmap)
    const { data: roadmap } = await supabase
      .from('roadmap_templates')
      .select('guru_id')
      .eq('id', params.id)
      .single();

    if (roadmap?.guru_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const payloadToInsert = attendance.map((a: any) => ({
      pertemuan_schedule_id,
      siswa_id: a.siswa_id,
      hadir: a.hadir,
      catatan_guru: a.catatan_guru,
      updated_at: new Date().toISOString()
    }));

    const { error, count } = await supabase
      .from('siswa_pertemuan')
      .upsert(payloadToInsert, {
        onConflict: 'pertemuan_schedule_id,siswa_id'
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: payloadToInsert.length });
  } catch (err) {
    console.error('[Attendance POST] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
