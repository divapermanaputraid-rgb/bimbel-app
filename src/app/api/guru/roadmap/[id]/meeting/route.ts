import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getMateriHariIni, tandaiPertemuanSelesai } from '@/lib/pertemuan';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await getMateriHariIni(params.id);

  return NextResponse.json({ data });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { pertemuan_ke } = await request.json();

  const success = await tandaiPertemuanSelesai(params.id, pertemuan_ke);

  if (!success) return NextResponse.json({ error: 'Failed to mark as done' }, { status: 500 });

  return NextResponse.json({ success: true });
}
