ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_kelas_check;
ALTER TABLE public.users ADD CONSTRAINT users_kelas_check CHECK (kelas IS NULL OR kelas IN (1, 2, 3, 6));

ALTER TABLE public.subjects DROP CONSTRAINT IF EXISTS subjects_kelas_check;
ALTER TABLE public.subjects ADD CONSTRAINT subjects_kelas_check CHECK (kelas IN (1, 2, 3, 6));

ALTER TABLE public.materials DROP CONSTRAINT IF EXISTS materials_kelas_check;
ALTER TABLE public.materials ADD CONSTRAINT materials_kelas_check CHECK (kelas IN (1, 2, 3, 6));

ALTER TABLE public.achievements DROP CONSTRAINT IF EXISTS achievements_kelas_check;
ALTER TABLE public.achievements ADD CONSTRAINT achievements_kelas_check CHECK (kelas IN (1, 2, 3, 6));

ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS questions_jawaban_benar_check;
-- Since jawaban_benar can be text now
