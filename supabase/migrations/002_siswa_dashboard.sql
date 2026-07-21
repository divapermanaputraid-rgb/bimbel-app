-- 002_siswa_dashboard.sql

-- Add profile columns
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '🦁';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS xp_total INTEGER DEFAULT 0;

-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guru_id UUID REFERENCES public.users(id),
  student_id UUID NOT NULL REFERENCES public.users(id),
  material_id TEXT NOT NULL REFERENCES public.materials(id),
  question_ids INTEGER[] NOT NULL DEFAULT '{}',
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'overdue')),
  assigned_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create student_progress table
CREATE TABLE IF NOT EXISTS public.student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.users(id),
  material_id TEXT NOT NULL REFERENCES public.materials(id),
  assignment_id UUID REFERENCES public.assignments(id),
  halaman_terakhir INTEGER DEFAULT 1,
  skor INTEGER CHECK (skor >= 0 AND skor <= 100),
  waktu_menit INTEGER,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, material_id, assignment_id)
);

-- RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "assignments_select" ON public.assignments;
CREATE POLICY "assignments_select" ON public.assignments
  FOR SELECT USING (auth.uid() = student_id OR auth.uid() = guru_id);

DROP POLICY IF EXISTS "progress_select" ON public.student_progress;
CREATE POLICY "progress_select" ON public.student_progress
  FOR SELECT USING (
    auth.uid() = student_id
    OR public.is_guru()
  );
