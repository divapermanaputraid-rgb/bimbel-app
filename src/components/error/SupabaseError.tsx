'use client';

import type { PostgrestError } from '@supabase/supabase-js';

export function SupabaseError({ error }: { error: PostgrestError }) {
  return (
    <div className="p-4 text-center">
      <div className="text-4xl mb-2">🛢️❌</div>
      <h3 className="font-bold text-red-600">Database Error</h3>
      <p className="text-sm text-gray-600">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 text-blue-500 underline text-sm"
      >
        Coba Lagi
      </button>
    </div>
  );
}
