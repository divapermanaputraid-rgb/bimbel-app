-- Fix RLS vulnerabilities found in security review

-- 1. Enable RLS on latihan_results
ALTER TABLE public.latihan_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "latihan_results_select" ON public.latihan_results
  FOR SELECT USING (auth.uid() = student_id OR public.is_guru());

-- 2. Restrict unit_progress updates to strictly owned
DROP POLICY IF EXISTS "unit_progress_modify_own" ON public.unit_progress;
CREATE POLICY "unit_progress_modify_own" ON public.unit_progress
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Restrict user_streaks updates
DROP POLICY IF EXISTS "user_streaks_modify_own" ON public.user_streaks;
CREATE POLICY "user_streaks_modify_own" ON public.user_streaks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
