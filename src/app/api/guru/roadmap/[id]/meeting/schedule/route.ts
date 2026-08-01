import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const ke = url.searchParams.get('ke');

  if (!ke) {
    return NextResponse.json({ error: 'pertemuan_ke is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('pertemuan_schedule')
    .select('id, pertemuan_ke, status')
    .eq('template_id', params.id)
    .eq('pertemuan_ke', ke)
    .single();

  if (error) {
    // If not found, let's create a stub schedule so attendance can work
    // In a real app this might be generated up front, but auto-vivification is safe here
    if (error.code === 'PGRST116') { // no rows returned
        const { data: newSched, error: insertErr } = await supabase
            .from('pertemuan_schedule')
            .insert({
                template_id: params.id,
                pertemuan_ke: ke,
                status: 'terjadwal'
            })
            .select('id')
            .single();

        if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });
        return NextResponse.json({ id: newSched.id });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
