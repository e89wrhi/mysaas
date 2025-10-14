'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/shared/user-avatar';
import { toast } from 'sonner';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { supabase } from '@/lib/supabase';
import LoadingView from '@/components/shared/loading-view';
import { SignInEmptyView } from '@/components/shared/signin-empty-view';
//import { useTranslations } from 'next-intl';

export default function UpdatePage() {
  //const t = useTranslations();
  const { user, isSignedIn } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  //const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // --- Fetch Supabase profile ---
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('user')
        .select('name, image, email')
        .eq('clerk_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load user profile.');
      } else {
        //setProfile(data);
        setName(data.name || '');
        setImageUrl(data.image || '');
      }

      setIsLoading(false);
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, supabase]);

  if (!isSignedIn || !user) return <SignInEmptyView text="Profile" />;

  if (isLoading) {
    return <LoadingView />;
  }
  const handleUpdateName = async () => {
    if (!user?.id) return;
    if (!name) {
      toast.error('Please enter a name to update.');
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          name: name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update name');

      toast.success('Name updated successfully.');

      // Refresh Clerk user info client-side
      await user.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating name:', error);
      toast.error(error.message || 'Failed to update name.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto p-6 space-y-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <UserAvatar
            name={`${name}` || user.emailAddresses[0]?.emailAddress || 'User'}
            image={imageUrl || ''}
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back,{' '}
              {name ||
                user.emailAddresses[0]?.emailAddress?.split('@')[0] ||
                'User'}
              !
            </h1>
            <p className="text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>

        <div className="m-7">
          <h1 className="font-bold text-3xl mb-6">Update Name</h1>
          <div className="space-y-4">
            <div className="space-y-6">
              <label className="text-sm font-medium">First Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <Button
              onClick={handleUpdateName}
              className="rounded-full"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
