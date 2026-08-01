import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'guru') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = new URL(request.url);
  const kelas = url.searchParams.get('kelas');
  const bulan = url.searchParams.get('bulan') || new Date().toISOString().slice(0, 7); // YYYY-MM
  const view = url.searchParams.get('view') || 'bulanan';

  if (!kelas) {
    return NextResponse.json({ error: 'kelas is required' }, { status: 400 });
  }

  // 1. Ambil data siswa di kelas tersebut
  const { data: siswaList } = await supabase
    .from('users')
    .select('id, nama')
    .eq('role', 'siswa')
    .eq('kelas', parseInt(kelas))
    .order('nama', { ascending: true });

  if (!siswaList) return NextResponse.json({ data: [] });

  // 2. Ambil roadmap milik guru untuk kelas tersebut (untuk memfilter pertemuan)
  const { data: roadmaps } = await supabase
    .from('roadmap_templates')
    .select('id')
    .eq('guru_id', user.id)
    .eq('kelas', parseInt(kelas));

  const roadmapIds = roadmaps?.map(r => r.id) || [];

  if (roadmapIds.length === 0) {
     return NextResponse.json({ data: [] });
  }

  // 3. Ambil jadwal pertemuan di bulan tersebut
  // YYYY-MM-01 sampai akhir bulan
  const startDate = `${bulan}-01`;
  const nextMonthDate = new Date(startDate);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  const endDate = nextMonthDate.toISOString().slice(0, 10);

  const { data: schedules } = await supabase
    .from('pertemuan_schedule')
    .select('id, pertemuan_ke, tanggal_aktual')
    .in('template_id', roadmapIds)
    .gte('tanggal_aktual', startDate)
    .lt('tanggal_aktual', endDate)
    .order('tanggal_aktual', { ascending: true });

  const scheduleIds = schedules?.map(s => s.id) || [];

  // 4. Ambil absensi
  let absensi: any[] = [];
  if (scheduleIds.length > 0) {
      const { data: abs } = await supabase
        .from('siswa_pertemuan')
        .select('siswa_id, pertemuan_schedule_id, hadir')
        .in('pertemuan_schedule_id', scheduleIds);
      absensi = abs || [];
  }

  // Format response berdasarkan view
  if (view === 'bulanan') {
    const totalPertemuan = schedules?.length || 0;

    const result = siswaList.map(siswa => {
      const siswaAbsensi = absensi.filter(a => a.siswa_id === siswa.id);
      const hadir = siswaAbsensi.filter(a => a.hadir).length;
      // Asumsi jika tidak ada record di siswa_pertemuan berarti tidak diabsen / dianggap alpa/tidak hadir
      const tidakHadir = totalPertemuan - hadir;
      const persentase = totalPertemuan === 0 ? 100 : Math.round((hadir / totalPertemuan) * 100);

      return {
        id: siswa.id,
        nama: siswa.nama,
        hadir,
        tidakHadir,
        persentase
      };
    }).sort((a, b) => a.persentase - b.persentase); // Sort terendah ke tertinggi

    return NextResponse.json({ data: result, totalPertemuan });

  } else if (view === 'pertemuan') {
    // Format: list pertemuan & matrix kehadiran
    return NextResponse.json({
      pertemuan: schedules || [],
      siswa: siswaList.map(siswa => {
        const kehadiran: Record<string, boolean> = {};
        schedules?.forEach(s => {
          const abs = absensi.find(a => a.siswa_id === siswa.id && a.pertemuan_schedule_id === s.id);
          kehadiran[s.id] = abs ? abs.hadir : false;
        });
        return {
          id: siswa.id,
          nama: siswa.nama,
          kehadiran
        };
      })
    });

  } else if (view === 'trend') {
    // Membagi bulan ke 4 minggu (simple grouping berdasarkan urutan schedule)
    const result = siswaList.map(siswa => {
        const trendMinggu = [0, 0, 0, 0];
        const countMinggu = [0, 0, 0, 0];

        schedules?.forEach((s, idx) => {
            const weekIndex = Math.min(Math.floor(idx / Math.ceil(schedules.length / 4)), 3) || 0;
            const abs = absensi.find(a => a.siswa_id === siswa.id && a.pertemuan_schedule_id === s.id);

            countMinggu[weekIndex]++;
            if (abs?.hadir) trendMinggu[weekIndex]++;
        });

        const persentaseMinggu = trendMinggu.map((h, i) =>
            countMinggu[i] === 0 ? null : Math.round((h / countMinggu[i]) * 100)
        );

        let status = "Stabil";
        const avgBulan = persentaseMinggu.filter(p => p !== null).reduce((a, b) => (a||0) + (b||0), 0) / (persentaseMinggu.filter(p=>p!==null).length || 1);

        if (avgBulan === 100) status = "🔥 Rajin";
        else if (avgBulan < 50) status = "🚨 Sering Tidak Hadir";
        else {
            const firstHalf = persentaseMinggu[0] ?? 100;
            const secondHalf = persentaseMinggu[3] ?? (persentaseMinggu[2] ?? 100);
            if (secondHalf < firstHalf) status = "⚠️ Turun";
        }

        return {
            id: siswa.id,
            nama: siswa.nama,
            minggu: persentaseMinggu,
            status
        };
    });

    return NextResponse.json({ data: result });
  }

  return NextResponse.json({ error: 'Invalid view' }, { status: 400 });
}
