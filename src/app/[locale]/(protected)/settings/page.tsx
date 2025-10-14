'use client';

import React, { useEffect, useState } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserAvatar } from '@/components/shared/user-avatar';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { Icons } from '@/components/shared/icons';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import LoadingView from '@/components/shared/loading-view';
import { SignInEmptyView } from '@/components/shared/signin-empty-view';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const t = useTranslations();
  const { user, isSignedIn } = useUser();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  if (!isSignedIn || !user) return <SignInEmptyView text="Settings" />;

  if (isLoading) {
    return <LoadingView />;
  }

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    setIsDeleting(true);
    try {
      // Call your server API to delete the user from Clerk + Supabase
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to delete account');

      toast.success(`Account deleted successfully.`);

      // Sign out and redirect
      window.location.href = '/';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast.error(
        error.message || 'Failed to delete account. Please try again.'
      );
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto p-6 space-y-8">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <UserAvatar
            name={name || user.emailAddresses[0]?.emailAddress || 'User'}
            image={imageUrl || ''}
          />
          <div>
            <h1 className="text-2xl font-bold">
              {t('settings.welcome')}{' '}
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

        {/* Delete Account Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('settings.account')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('settings.deleteTitle')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t('settings.deleteSub')}
                </p>
              </div>
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('settings.delete')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('settings.deleteTitle')}</DialogTitle>
                    <DialogDescription>
                      {t('settings.deleteSub')}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={isDeleting}
                    >
                      {t('settings.cancel')}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.update')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={'/settings/update'}
              className="flex flex-row items-center"
            >
              <Icons.add className="h-4 w-4 mr-2" />
              {t('settings.updateSub')}
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('settings.signout')}</CardTitle>
          </CardHeader>
          <CardContent>
            <SignOutButton>
              <Button variant="outline">
                <Icons.arrowRight className="h-4 w-4 mr-2" />
                {t('settings.signout')}
              </Button>
            </SignOutButton>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
