import React from 'react';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { SignInEmptyView } from '@/components/shared/signin-empty-view';
import { getCurrentProfile } from '@/lib/getCurrentProfile';
import { supabase } from '@/lib/supabase';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const result = await getCurrentProfile();
  if (!result) return <SignInEmptyView text="Dashboard" />;

  const { profile } = result;
  //console.error(`clerk: ${result.profile?.clerk_id}`);
  // Fetch profile from Supabase table (name + image)
  const { data: profileData } = await supabase
    .from('user')
    .select('id, name, image, email, clerk_id')
    .eq('clerk_id', profile?.clerk_id)
    .single();

  // Fetch products
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', profileData?.id)
    .order('created_at', { ascending: false });

  const products = productsData || [];

  return (
    <MaxWidthWrapper>
      <DashboardClient
        serverProducts={products}
        _name={profile?.name}
        _image={profile?.image}
        _userId={profile?.id}
      />
    </MaxWidthWrapper>
  );
}
