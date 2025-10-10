import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Missing Svix headers', { status: 400 });
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let event;
  try {
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  const { type, data } = event;

  try {
    if (type === 'user.created') {
      const user = data;
      await supabaseAdmin.from('user').insert({
        email: user.email_addresses?.[0]?.email_address || '',
        emailVerified:
          user.email_addresses?.[0]?.verification?.status === 'verified',
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        image: user.image_url,
        clerkUser: user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    if (type === 'user.deleted') {
      await supabaseAdmin.from('user').delete().eq('clerkUser.id', data.id); // dot notation for JSONB
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error handling Clerk webhook:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
