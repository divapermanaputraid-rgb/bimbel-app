-- 001_foundation.sql

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nama TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('siswa', 'guru', 'admin')),
  kelas INTEGER CHECK (kelas IS NULL OR kelas IN (2, 6)),
  level INTEGER NOT NULL DEFAULT 1 CHECK (level IN (1, 2, 3)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.subjects (
  id TEXT PRIMARY KEY,
  kode TEXT NOT NULL,
  nama TEXT NOT NULL,
  icon TEXT,
  kelas INTEGER NOT NULL CHECK (kelas IN (2, 6)),
  urutan INTEGER NOT NULL
);

CREATE TABLE public.materials (
  id TEXT PRIMARY KEY,
  kelas INTEGER NOT NULL CHECK (kelas IN (2, 6)),
  subject_id TEXT NOT NULL REFERENCES public.subjects(id),
  judul TEXT NOT NULL,
  deskripsi TEXT,
  file_path TEXT NOT NULL,
  jumlah_halaman INTEGER NOT NULL DEFAULT 8,
  urutan INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  material_id TEXT NOT NULL REFERENCES public.materials(id),
  soal TEXT NOT NULL,
  pilihan JSONB NOT NULL,
  jawaban_benar TEXT NOT NULL CHECK (jawaban_benar IN ('a', 'b', 'c', 'd')),
  level INTEGER NOT NULL CHECK (level IN (1, 2, 3)),
  penjelasan TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_materials_kelas_subject ON public.materials(kelas, subject_id, urutan);
CREATE INDEX idx_questions_material_level ON public.questions(material_id, level);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, nama, role, kelas, level)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nama', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'siswa'),
    NULLIF(NEW.raw_user_meta_data->>'kelas', '')::INTEGER,
    COALESCE((NEW.raw_user_meta_data->>'level')::INTEGER, 1)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_guru()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'guru'
  );
$$;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_or_guru"
  ON public.users FOR SELECT
  USING (auth.uid() = id OR public.is_guru());

CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "subjects_select_authenticated"
  ON public.subjects FOR SELECT TO authenticated USING (true);

CREATE POLICY "materials_select_authenticated"
  ON public.materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "questions_select_authenticated"
  ON public.questions FOR SELECT TO authenticated USING (true);

INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan) VALUES
  ('k2-mtk', 'mtk', 'Matematika', '🔢', 2, 1);

INSERT INTO public.materials (
  id, kelas, subject_id, judul, deskripsi, file_path, jumlah_halaman, urutan
) VALUES (
  'k2-mtk-01',
  2,
  'k2-mtk',
  'Bermain dengan Bilangan 1-50',
  'Menghitung, membaca, menulis, dan mengurutkan bilangan sampai 50.',
  '/buku/kelas2/matematika/k2-mtk-01.html',
  8,
  1
);

INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan) VALUES
  ('k2-mtk-01', 'Mana yang lebih besar: 25 atau 18?',
   '{"a":"25","b":"18","c":"sama besar"}', 'a', 1, '25 lebih besar dari 18.'),
  ('k2-mtk-01', 'Angka berapa yang hilang: 10, 11, __, 13?',
   '{"a":"12","b":"14","c":"9"}', 'a', 1, 'Setelah 11 adalah 12.'),
  ('k2-mtk-01', 'Urutan dari kecil ke besar: 34, 12, 45. Yang di tengah adalah?',
   '{"a":"12","b":"34","c":"45"}', 'b', 2, 'Urutan: 12, 34, 45.'),
  ('k2-mtk-01', 'Bilangan di antara 20 dan 30 yang paling dekat dengan 27 dari opsi?',
   '{"a":"21","b":"26","c":"29"}', 'b', 2, '26 paling dekat ke 27.'),
  ('k2-mtk-01', 'X > 25 dan X < 30, X genap. Pilih yang benar:',
   '{"a":"24","b":"26","c":"30"}', 'b', 3, '26 genap, di antara 25 dan 30.'),
  ('k2-mtk-01', 'Manakah bilangan di antara 40 dan 50?',
   '{"a":"39","b":"45","c":"51"}', 'b', 3, '45 ada di antara 40 dan 50.');
