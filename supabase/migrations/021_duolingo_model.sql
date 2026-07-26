-- ==========================================
-- 021_duolingo_model.sql
-- Transition to self-directed Duolingo model
-- ==========================================

-- 1. DROP ASSIGNED TASKS & LEGACY ASSIGNMENTS
DROP TABLE IF EXISTS public.assigned_tasks CASCADE;
DROP TABLE IF EXISTS public.assignments CASCADE;

-- 2. CREATE UNIT_PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.unit_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  unit_id TEXT NOT NULL REFERENCES public.materials(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  kelas INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'locked' CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  stars INTEGER NOT NULL DEFAULT 0 CHECK (stars >= 0 AND stars <= 3),
  best_score INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_attempted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, unit_id)
);
CREATE INDEX IF NOT EXISTS idx_unit_progress_user ON public.unit_progress(user_id, subject_id);

ALTER TABLE public.unit_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "unit_progress_select_own_or_guru" ON public.unit_progress
  FOR SELECT USING (auth.uid() = user_id OR public.is_guru());

CREATE POLICY "unit_progress_modify_own" ON public.unit_progress
  FOR ALL USING (auth.uid() = user_id);

-- 3. UPDATE LATIHAN_RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.latihan_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  material_id TEXT REFERENCES public.materials(id) ON DELETE CASCADE,
  skor INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.latihan_results 
  ADD COLUMN IF NOT EXISTS stars_earned INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS subject_id TEXT;
CREATE INDEX IF NOT EXISTS idx_latihan_results_user ON public.latihan_results(student_id, subject_id);

-- 4. CREATE USER_STREAKS TABLE
CREATE TABLE IF NOT EXISTS public.user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  streak_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON public.user_streaks(user_id);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_streaks_select_own_or_guru" ON public.user_streaks
  FOR SELECT USING (auth.uid() = user_id OR public.is_guru());

CREATE POLICY "user_streaks_modify_own" ON public.user_streaks
  FOR ALL USING (auth.uid() = user_id);

-- 5. UPDATE QUESTIONS TABLE SCHEMA FOR CUSTOM IDS AND JSONB
DO $$ 
DECLARE
  constraint_name text;
BEGIN
  SELECT conname INTO constraint_name
  FROM pg_constraint
  WHERE conrelid = 'public.questions'::regclass 
    AND contype = 'c' 
    AND pg_get_constraintdef(oid) LIKE '%jawaban_benar%';
  
  IF constraint_name IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.questions DROP CONSTRAINT ' || constraint_name;
  END IF;
END $$;

ALTER TABLE public.questions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.questions ALTER COLUMN id TYPE TEXT USING id::text;

ALTER TABLE public.questions
  ALTER COLUMN jawaban_benar TYPE JSONB USING to_jsonb(jawaban_benar),
  ALTER COLUMN jawaban_benar DROP NOT NULL,
  ALTER COLUMN soal DROP NOT NULL,
  ALTER COLUMN pilihan DROP NOT NULL;

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS tipe TEXT DEFAULT 'pilihan_ganda',
  ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 10,
  ADD COLUMN IF NOT EXISTS soal_id TEXT,
  ADD COLUMN IF NOT EXISTS data JSONB,
  ADD COLUMN IF NOT EXISTS audio_text TEXT,
  ADD COLUMN IF NOT EXISTS kalimat TEXT,
  ADD COLUMN IF NOT EXISTS kata JSONB,
  ADD COLUMN IF NOT EXISTS penjelasan_id TEXT;
