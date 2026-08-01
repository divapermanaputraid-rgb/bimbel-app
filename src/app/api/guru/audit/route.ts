import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { groqChat, ChatMessage } from '@/lib/groq-client';
import { hitungStatistikMingguan } from '@/lib/audit';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'guru') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('guru_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'guru') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { kelas, subject_id } = await req.json();

    if (!kelas || !subject_id) {
      return NextResponse.json({ error: 'kelas dan subject_id wajib diisi' }, { status: 400 });
    }

    // Periode: 7 hari terakhir
    const periodeEnd = new Date().toISOString().split('T')[0];
    const periodeStartDate = new Date();
    periodeStartDate.setDate(periodeStartDate.getDate() - 7);
    const periodeStart = periodeStartDate.toISOString().split('T')[0];

    // Hitung statistik
    const statistik = await hitungStatistikMingguan(kelas, subject_id, periodeStart, periodeEnd);

    // Build prompt ke Groq
    const materiSulitTeks = statistik.materi_sulit
      .map((m, i) => `${i + 1}. Unit ${m.unit_id} — rata-rata skor: ${m.rata_skor}% (${m.jumlah_percobaan} percobaan)`)
      .join('\n') || 'Tidak ada data';

    const siswaStuckTeks = statistik.siswa_stuck
      .map((s) => `- ${s.nama}: ${s.alasan.join(', ')} (skor terakhir: ${s.skor_terakhir}%)`)
      .join('\n') || 'Tidak ada siswa yang stuck';

    const prompt: ChatMessage[] = [
      {
        role: 'system',
        content: `Kamu adalah asisten AI untuk guru SD di Indonesia. Tugasmu menganalisis data belajar siswa dan memberikan rekomendasi konkret yang actionable. Gunakan bahasa Indonesia formal tapi mudah dipahami. Maksimal 400 kata.`,
      },
      {
        role: 'user',
        content: `Berikut data belajar kelas ${kelas} mata pelajaran ${subject_id.toUpperCase()} minggu ini (${periodeStart} s/d ${periodeEnd}):

STATISTIK UMUM:
- Siswa aktif: ${statistik.total_siswa_aktif} siswa
- Total latihan dikerjakan: ${statistik.total_latihan}
- Rata-rata skor kelas: ${statistik.rata_rata_skor}%

SISWA YANG BUTUH PERHATIAN:
${siswaStuckTeks}

MATERI PALING SULIT (skor terendah):
${materiSulitTeks}

Tolong berikan:
1. Ringkasan kondisi kelas minggu ini (2-3 kalimat)
2. Saran konkret untuk pertemuan berikutnya (2-3 poin)
3. Saran khusus per siswa yang stuck (jika ada)`,
      },
    ];

    let rekomendasiAi: string | null = null;
    try {
      const result = await groqChat(prompt);
      rekomendasiAi = result.reply;
    } catch (groqErr) {
      console.error('[Audit] Groq error:', groqErr);
      rekomendasiAi = null; // Tetap simpan audit walau Groq gagal
    }

    // Simpan ke audit_logs
    const { data: auditLog, error: insertError } = await supabase
      .from('audit_logs')
      .insert({
        guru_id: user.id,
        kelas,
        subject_id,
        periode_start: periodeStart,
        periode_end: periodeEnd,
        data: statistik,
        rekomendasi_ai: rekomendasiAi,
        diterapkan: false,
      })
      .select()
      .single();

    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

    return NextResponse.json({
      success: true,
      audit: auditLog,
      statistik,
      rekomendasi_ai: rekomendasiAi,
    });

  } catch (err) {
    console.error('[Audit] Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { audit_id } = await req.json();

  const { error } = await supabase
    .from('audit_logs')
    .update({ diterapkan: true })
    .eq('id', audit_id)
    .eq('guru_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
