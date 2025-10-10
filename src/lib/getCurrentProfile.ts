// lib/getCurrentProfile.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { currentUser } from '@clerk/nextjs/server';

export async function getCurrentProfile() {
  const user = await currentUser(); // server-side Clerk user
  if (!user) return null;

  const supabase = createRouteHandlerClient({ cookies });
  const { data: profile } = await supabase
    .from('user')
    .select('id, name, image, email, clerk_id')
    .eq('clerk_id', user.id)
    .single();

  return { user, profile };
}
