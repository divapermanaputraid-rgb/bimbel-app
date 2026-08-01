-- Tabel untuk menyimpan hasil audit mingguan guru
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  kelas INTEGER NOT NULL,
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  periode_start DATE NOT NULL,
  periode_end DATE NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  rekomendasi_ai TEXT,
  diterapkan BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_guru ON public.audit_logs(guru_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_periode ON public.audit_logs(guru_id, periode_start, periode_end);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "guru_manage_own_audits" ON public.audit_logs
  FOR ALL USING (guru_id = auth.uid()) WITH CHECK (guru_id = auth.uid());
