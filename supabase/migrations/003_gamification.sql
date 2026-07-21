-- 003_gamification.sql

-- achievements (badge yang tersedia)
CREATE TABLE IF NOT EXISTS public.achievements (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  condition_type TEXT, -- 'complete_materials', 'streak', 'perfect_score', 'complete_subject'
  condition_value INTEGER,
  kelas INTEGER CHECK (kelas IN (2, 6))
);

-- student_achievements (badge yang sudah didapat siswa)
CREATE TABLE IF NOT EXISTS public.student_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, achievement_id)
);

-- daily_streaks
CREATE TABLE IF NOT EXISTS public.daily_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  streak_count INTEGER DEFAULT 0,
  last_study_date DATE,
  longest_streak INTEGER DEFAULT 0,
  UNIQUE(student_id)
);

-- xp_logs
CREATE TABLE IF NOT EXISTS public.xp_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT,
  material_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT, -- 'assignment', 'streak', 'achievement', 'reminder'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "achievements_select" ON public.achievements FOR SELECT TO authenticated USING (true);
CREATE POLICY "student_achievements_select" ON public.student_achievements FOR SELECT USING (auth.uid() = student_id OR public.is_guru());
CREATE POLICY "daily_streaks_select" ON public.daily_streaks FOR SELECT USING (auth.uid() = student_id OR public.is_guru());
CREATE POLICY "xp_logs_select" ON public.xp_logs FOR SELECT USING (auth.uid() = student_id OR public.is_guru());
CREATE POLICY "notifications_select" ON public.notifications FOR SELECT USING (auth.uid() = student_id);

-- Seed Achievements Kelas 2
INSERT INTO public.achievements (name, description, icon, condition_type, condition_value, kelas) VALUES
('Pemula Bilangan', 'Selesaikan materi bilangan pertama', '🌱', 'complete_materials', 1, 2),
('Master Penjumlahan', 'Selesaikan semua materi penjumlahan', '🥉', 'complete_materials', 3, 2),
('Ahli Pengurangan', 'Selesaikan semua materi pengurangan', '🥈', 'complete_materials', 2, 2),
('Perfect Score', 'Dapat skor 100 di salah satu kuis', '⭐', 'perfect_score', 1, 2),
('Streak 3 Hari', 'Belajar 3 hari berturut-turut', '🔥', 'streak', 3, 2),
('Streak 7 Hari', 'Belajar 7 hari berturut-turut', '🔥🔥', 'streak', 7, 2),
('Pecahan Pertama', 'Selesaikan materi pecahan', '🍕', 'complete_materials', 1, 2),
('Penjelajah Bangun', 'Selesaikan semua materi bangun datar', '📐', 'complete_materials', 2, 2),
('Master MTK Kelas 2', 'Selesaikan semua 20 materi MTK', '🥇', 'complete_subject', 20, 2);

-- Seed Achievements Kelas 6
INSERT INTO public.achievements (name, description, icon, condition_type, condition_value, kelas) VALUES
('Pemula Pecahan', 'Selesaikan materi pecahan pertama', '🌱', 'complete_materials', 1, 6),
('Master Pecahan', 'Selesaikan semua materi pecahan & desimal', '🥉', 'complete_materials', 6, 6),
('Ahli Rasio', 'Selesaikan semua materi rasio', '🥈', 'complete_materials', 6, 6),
('Perfect Score Kelas 6', 'Dapat skor 100 di kuis Kelas 6', '⭐', 'perfect_score', 1, 6),
('Ahli Kubus', 'Selesaikan materi kubus & balok', '📦', 'complete_materials', 3, 6),
('Master MTK Kelas 6', 'Selesaikan semua 18 materi MTK', '🥇', 'complete_subject', 18, 6);
