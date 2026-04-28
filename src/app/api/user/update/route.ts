import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    // Combine first and last name
    const fullName = name.trim();

    const { error } = await supabaseAdmin
      .from('user')
      .update({
        name: fullName,
        updated_at: new Date().getTime(),
      })
      .eq('clerk_id', userId);

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
