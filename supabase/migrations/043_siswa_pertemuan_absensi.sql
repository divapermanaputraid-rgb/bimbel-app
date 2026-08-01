-- Tabel untuk menyimpan absensi siswa per pertemuan
CREATE TABLE IF NOT EXISTS public.siswa_pertemuan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pertemuan_schedule_id UUID NOT NULL REFERENCES public.pertemuan_schedule(id) ON DELETE CASCADE,
    siswa_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    hadir BOOLEAN NOT NULL DEFAULT true,
    catatan_guru TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(pertemuan_schedule_id, siswa_id)
);

CREATE INDEX IF NOT EXISTS idx_siswa_pertemuan_schedule ON public.siswa_pertemuan(pertemuan_schedule_id);
CREATE INDEX IF NOT EXISTS idx_siswa_pertemuan_siswa ON public.siswa_pertemuan(siswa_id);

ALTER TABLE public.siswa_pertemuan ENABLE ROW LEVEL SECURITY;

-- Guru yang memiliki roadmap bisa manage absensi
CREATE POLICY "guru_manage_absensi" ON public.siswa_pertemuan
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pertemuan_schedule ps
            JOIN public.roadmap_templates rt ON rt.id = ps.template_id
            WHERE ps.id = pertemuan_schedule_id AND rt.guru_id = auth.uid()
        )
    ) WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.pertemuan_schedule ps
            JOIN public.roadmap_templates rt ON rt.id = ps.template_id
            WHERE ps.id = pertemuan_schedule_id AND rt.guru_id = auth.uid()
        )
    );

-- Siswa hanya bisa lihat absensi mereka sendiri
CREATE POLICY "siswa_read_own_absensi" ON public.siswa_pertemuan
    FOR SELECT USING (siswa_id = auth.uid());
