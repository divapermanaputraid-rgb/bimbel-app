-- 006_users_gamification.sql
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '🦁';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS xp_total INTEGER DEFAULT 0;
