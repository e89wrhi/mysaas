import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId)
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

    // Delete from Clerk
    await clerkClient.users.deleteUser(userId);

    // Supabase deletion handled by webhook (user.deleted)
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Error deleting user:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
