import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, name } = data;

    if (!id) {
      return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
    }

    // Combine first and last name
    const fullName = name.trim();

    const { error } = await supabaseAdmin
      .from('user')
      .update({
        name: fullName,
        updated_at: new Date().getTime(),
      })
      .eq('clerk_id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
