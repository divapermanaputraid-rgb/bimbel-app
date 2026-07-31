-- 038_alter_materials_metadata.sql

-- Hapus constraint lama
ALTER TABLE public.materials DROP CONSTRAINT IF EXISTS materials_kelas_check;

-- Tambah constraint baru untuk support kelas 1-6
ALTER TABLE public.materials ADD CONSTRAINT materials_kelas_check CHECK (kelas IN (1, 2, 3, 4, 5, 6));
ALTER TABLE public.subjects DROP CONSTRAINT IF EXISTS subjects_kelas_check;
ALTER TABLE public.subjects ADD CONSTRAINT subjects_kelas_check CHECK (kelas IN (1, 2, 3, 4, 5, 6));

-- Tambah kolom baru
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS bab INTEGER DEFAULT 1;
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS badge_name TEXT;
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS badge_emoji TEXT;
ALTER TABLE public.materials ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Rename urutan to order_index for clarity if needed, but since it's used elsewhere, we'll keep `urutan`
-- and rename `judul` to `title` logic is handled in API mapping, or we just stick to existing `judul` and `urutan`.
