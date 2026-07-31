-- Roadmap Templates (Guru buat 1x per semester)
CREATE TABLE IF NOT EXISTS roadmap_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guru_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    kelas INT NOT NULL,
    subject_id TEXT NOT NULL,
    semester TEXT NOT NULL,
    title TEXT,
    total_pertemuan INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_templates_guru ON roadmap_templates(guru_id);
CREATE INDEX IF NOT EXISTS idx_templates_kelas_subject ON roadmap_templates(kelas, subject_id, semester);

-- Template Items (Materi per pertemuan)
CREATE TABLE IF NOT EXISTS template_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES roadmap_templates(id) ON DELETE CASCADE,
    pertemuan_ke INT NOT NULL,
    unit_id TEXT NOT NULL,
    unit_title TEXT NOT NULL,
    bab_id INT NOT NULL,
    urutan INT NOT NULL,
    tipe TEXT DEFAULT 'baru',
    review_from_pertemuan INT,
    catatan_guru TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_template_items_template ON template_items(template_id);
CREATE INDEX IF NOT EXISTS idx_template_items_pertemuan ON template_items(template_id, pertemuan_ke);

-- Pertemuan Schedule (Jadwal aktual)
CREATE TABLE IF NOT EXISTS pertemuan_schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID NOT NULL REFERENCES roadmap_templates(id) ON DELETE CASCADE,
    pertemuan_ke INT NOT NULL,
    tanggal_rencana DATE,
    tanggal_aktual DATE,
    status TEXT DEFAULT 'terjadwal',
    catatan TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schedule_template ON pertemuan_schedule(template_id);
CREATE INDEX IF NOT EXISTS idx_schedule_pertemuan ON pertemuan_schedule(template_id, pertemuan_ke);

-- RLS Policies
ALTER TABLE roadmap_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pertemuan_schedule ENABLE ROW LEVEL SECURITY;

-- Guru can manage own roadmaps
CREATE POLICY "guru_manage_own_roadmaps" ON roadmap_templates
    FOR ALL USING (guru_id = auth.uid()) WITH CHECK (guru_id = auth.uid());

CREATE POLICY "guru_manage_own_template_items" ON template_items
    FOR ALL USING (
        EXISTS (SELECT 1 FROM roadmap_templates WHERE id = template_id AND guru_id = auth.uid())
    ) WITH CHECK (
        EXISTS (SELECT 1 FROM roadmap_templates WHERE id = template_id AND guru_id = auth.uid())
    );

CREATE POLICY "guru_manage_own_pertemuan" ON pertemuan_schedule
    FOR ALL USING (
        EXISTS (SELECT 1 FROM roadmap_templates WHERE id = template_id AND guru_id = auth.uid())
    ) WITH CHECK (
        EXISTS (SELECT 1 FROM roadmap_templates WHERE id = template_id AND guru_id = auth.uid())
    );

-- Students can read active roadmaps for their class
CREATE POLICY "students_read_class_roadmaps" ON roadmap_templates
    FOR SELECT USING (
        status = 'active' AND
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid()
            AND role = 'siswa'
            AND kelas = roadmap_templates.kelas
        )
    );

CREATE POLICY "students_read_template_items" ON template_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM roadmap_templates rt
            JOIN public.users p ON p.kelas = rt.kelas
            WHERE rt.id = template_items.template_id
            AND rt.status = 'active'
            AND p.id = auth.uid()
            AND p.role = 'siswa'
        )
    );