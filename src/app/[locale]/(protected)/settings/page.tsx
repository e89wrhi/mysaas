'use client';

import React, { useState } from 'react';
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

export default function SettingsPage() {
  const { user, isSignedIn } = useUser();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isSignedIn || !user) {
    return <p>Please sign in to view your settings.</p>;
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
            name={
              user.fullName || user.emailAddresses[0]?.emailAddress || 'User'
            }
            image={user.imageUrl || ''}
          />
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back,{' '}
              {user.fullName ||
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
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your account? This action
                      cannot be undone. This will permanently delete all your
                      products and profile.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign Out</CardTitle>
          </CardHeader>
          <CardContent>
            <SignOutButton>
              <Button variant="outline">
                <Icons.arrowRight className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </SignOutButton>
          </CardContent>
        </Card>
      </div>
    </MaxWidthWrapper>
  );
}
