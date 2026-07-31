import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Notifikasi belum dibaca milik siswa
export function useNotifications(userId: string | undefined) {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, title, message, type, is_read')
        .eq('student_id', userId!)
        .eq('is_read', false)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60,       // 1 menit — sering berubah
    enabled: !!userId,
  });
}

// Progress materi per siswa
export function useUnitProgress(userId: string | undefined) {
  return useQuery({
    queryKey: ['unit_progress', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('unit_progress')
        .select('unit_id, subject_id, kelas, status, stars, best_score')
        .eq('user_id', userId!);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 2,  // 2 menit
    enabled: !!userId,
  });
}

// Materi per subject + kelas (untuk prefetch on hover)
export function useMaterials(subjectId: string | undefined, kelas: number | undefined) {
  return useQuery({
    queryKey: ['materials', subjectId, kelas],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('materials')
        .select('id, judul, deskripsi, file_path, urutan, badge_name, badge_emoji, bab')
        .eq('subject_id', subjectId!)
        .eq('kelas', kelas!)
        .order('urutan', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 10, // 10 menit — jarang berubah
    enabled: !!subjectId && !!kelas,
  });
}

// Subjects aktif
export function useSubjects() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('id, kode, nama, icon, kelas, urutan')
        .order('urutan', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 1000 * 60 * 10, // 10 menit
  });
}

// Hook untuk prefetch materi saat hover subject card
export function usePrefetchMaterials() {
  const queryClient = useQueryClient();
  return (subjectId: string, kelas: number) => {
    queryClient.prefetchQuery({
      queryKey: ['materials', subjectId, kelas],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('materials')
          .select('id, judul, deskripsi, file_path, urutan, badge_name, badge_emoji, bab')
          .eq('subject_id', subjectId)
          .eq('kelas', kelas)
          .order('urutan', { ascending: true });
        if (error) throw error;
        return data ?? [];
      },
      staleTime: 1000 * 60 * 10,
    });
  };
}

// Invalidate progress + notif setelah latihan selesai
export function useInvalidateAfterLatihan() {
  const queryClient = useQueryClient();
  return (userId: string) => {
    queryClient.invalidateQueries({ queryKey: ['unit_progress', userId] });
    queryClient.invalidateQueries({ queryKey: ['notifications', userId] });
  };
}
