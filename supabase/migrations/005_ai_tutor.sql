-- 005_ai_tutor.sql

CREATE TABLE IF NOT EXISTS public.ai_chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  material_id TEXT REFERENCES public.materials(id),
  pertanyaan TEXT NOT NULL,
  jawaban_ai TEXT NOT NULL,
  model TEXT NOT NULL,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_logs_select" ON public.ai_chat_logs
  FOR SELECT USING (auth.uid() = student_id OR public.is_guru());
