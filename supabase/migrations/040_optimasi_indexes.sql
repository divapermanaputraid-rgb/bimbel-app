-- 040_optimasi_indexes.sql
-- Indexes, RLS hardening, and get_dashboard_data RPC
-- Nama kolom sesuai schema aktual:
--   users (bukan profiles), notifications.student_id, latihan_results.student_id
--   materials.urutan (bukan order_index), questions.material_id
--   Index sudah ada: idx_materials_kelas_subject, idx_questions_material_level,
--     idx_unit_progress_user, idx_latihan_results_user, idx_user_streaks_user

-- ============================================================
-- INDEXES BARU (skip yg sudah ada)
-- ============================================================

-- users
CREATE INDEX IF NOT EXISTS idx_users_role   ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_kelas  ON public.users(kelas);

-- materials
CREATE INDEX IF NOT EXISTS idx_materials_subject_kelas
  ON public.materials(subject_id, kelas);
CREATE INDEX IF NOT EXISTS idx_materials_active
  ON public.materials(is_active) WHERE is_active = true;

-- unit_progress: user+unit (UNIQUE sudah ada, tapi eksplisit index bantu planner)
CREATE INDEX IF NOT EXISTS idx_unit_progress_user_unit
  ON public.unit_progress(user_id, unit_id);
CREATE INDEX IF NOT EXISTS idx_unit_progress_stars
  ON public.unit_progress(stars);

-- questions
CREATE INDEX IF NOT EXISTS idx_questions_tipe
  ON public.questions(tipe);

-- latihan_results: student+created (untuk dashboard guru "latihan minggu ini")
CREATE INDEX IF NOT EXISTS idx_latihan_results_created
  ON public.latihan_results(student_id, created_at);

-- notifications: student+is_read (query paling sering)
CREATE INDEX IF NOT EXISTS idx_notifications_student_read
  ON public.notifications(student_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created
  ON public.notifications(created_at);

-- student_achievements
CREATE INDEX IF NOT EXISTS idx_student_achievements_student
  ON public.student_achievements(student_id);

-- xp_logs
CREATE INDEX IF NOT EXISTS idx_xp_logs_student
  ON public.xp_logs(student_id, created_at);

-- daily_streaks
CREATE INDEX IF NOT EXISTS idx_daily_streaks_student
  ON public.daily_streaks(student_id);

-- achievements per kelas
CREATE INDEX IF NOT EXISTS idx_achievements_kelas
  ON public.achievements(kelas);

-- ============================================================
-- RLS POLICIES — hardening (semua pakai student_id/user_id aktual)
-- ============================================================

-- notifications: siswa hanya lihat notif sendiri
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT USING (student_id = auth.uid() OR public.is_guru());

DROP POLICY IF EXISTS "notifications_insert_guru" ON public.notifications;
CREATE POLICY "notifications_insert_guru" ON public.notifications
  FOR INSERT WITH CHECK (public.is_guru());

-- xp_logs: siswa lihat sendiri
ALTER TABLE public.xp_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "xp_logs_select_own" ON public.xp_logs;
CREATE POLICY "xp_logs_select_own" ON public.xp_logs
  FOR SELECT USING (student_id = auth.uid() OR public.is_guru());

-- daily_streaks: siswa lihat sendiri
ALTER TABLE public.daily_streaks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "daily_streaks_select_own" ON public.daily_streaks;
CREATE POLICY "daily_streaks_select_own" ON public.daily_streaks
  FOR SELECT USING (student_id = auth.uid() OR public.is_guru());

-- materials: semua authenticated bisa baca yang aktif
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "materials_select_active" ON public.materials;
CREATE POLICY "materials_select_active" ON public.materials
  FOR SELECT USING (is_active = true OR public.is_guru());

-- questions: semua authenticated bisa baca
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "questions_select_all" ON public.questions;
CREATE POLICY "questions_select_all" ON public.questions
  FOR SELECT USING (true);

-- latihan_results: siswa hanya insert/lihat sendiri
ALTER TABLE public.latihan_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "latihan_results_select_own" ON public.latihan_results;
CREATE POLICY "latihan_results_select_own" ON public.latihan_results
  FOR SELECT USING (student_id = auth.uid() OR public.is_guru());

DROP POLICY IF EXISTS "latihan_results_insert_own" ON public.latihan_results;
CREATE POLICY "latihan_results_insert_own" ON public.latihan_results
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- ============================================================
-- RPC: get_dashboard_data
-- 1 call = profile + subjects + streak + xp + notif count
-- Pakai nama kolom aktual: users, student_id, urutan, dll.
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_dashboard_data(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_kelas INTEGER;
  result  JSONB;
BEGIN
  -- Ambil kelas user sekali
  SELECT kelas INTO v_kelas FROM public.users WHERE id = p_user_id;

  SELECT jsonb_build_object(
    'profile', (
      SELECT jsonb_build_object(
        'nama',     u.nama,
        'kelas',    u.kelas,
        'level',    u.level,
        'avatar',   u.avatar,
        'xp_total', u.xp_total
      )
      FROM public.users u
      WHERE u.id = p_user_id
    ),

    'subjects', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id',        s.id,
        'kode',      s.kode,
        'nama',      s.nama,
        'icon',      s.icon,
        'urutan',    s.urutan,
        'total',     (SELECT COUNT(*) FROM public.materials m
                       WHERE m.subject_id = s.id AND m.kelas = v_kelas AND m.is_active),
        'completed', (SELECT COUNT(*) FROM public.unit_progress up
                       WHERE up.user_id = p_user_id
                         AND up.subject_id = s.id
                         AND up.stars > 0)
      ) ORDER BY s.urutan), '[]'::jsonb)
      FROM public.subjects s
      WHERE s.kelas = v_kelas
    ),

    'streak', (
      SELECT COALESCE(
        (SELECT current_streak FROM public.user_streaks WHERE user_id = p_user_id),
        (SELECT streak_count    FROM public.daily_streaks WHERE student_id = p_user_id),
        0
      )
    ),

    'notif_unread', (
      SELECT COUNT(*)
      FROM public.notifications
      WHERE student_id = p_user_id AND is_read = false
    ),

    'recent_xp', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'id',         x.id,
        'amount',     x.amount,
        'reason',     x.reason,
        'created_at', x.created_at
      ) ORDER BY x.created_at DESC), '[]'::jsonb)
      FROM (
        SELECT id, amount, reason, created_at
        FROM public.xp_logs
        WHERE student_id = p_user_id
        ORDER BY created_at DESC
        LIMIT 5
      ) x
    )
  ) INTO result;

  RETURN result;
END;
$$;

-- Revoke public, grant hanya authenticated
REVOKE ALL ON FUNCTION public.get_dashboard_data(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_dashboard_data(UUID) TO authenticated;
