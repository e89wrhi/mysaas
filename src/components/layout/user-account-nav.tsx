'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Lock, LogOut, Settings } from 'lucide-react';
import { Drawer } from 'vaul';
import { useUser, SignOutButton } from '@clerk/nextjs';

import { useMediaQuery } from '@/hooks/use-media-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';

export function UserAccountNav() {
  const { user, isSignedIn } = useUser();

  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  const { isMobile } = useMediaQuery();
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

  if (!isSignedIn || !user) {
    return (
      <div className="size-8 animate-pulse rounded-full border bg-muted" />
    );
  }

  const role = user.publicMetadata.role as string | undefined;

  if (isLoading) {
    <Drawer.Root>
      <Drawer.Root open={open} onClose={closeDrawer}>
        <Drawer.Trigger onClick={() => setOpen(true)}>
          <Spinner />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-40 h-full bg-background/80 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-[10px] bg-background/60 backdrop-blur-xl px-3 text-sm">
            <Spinner />
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </Drawer.Root>;
  }

  if (isMobile) {
    return (
      <Drawer.Root open={open} onClose={closeDrawer}>
        <Drawer.Trigger className="rounded-full" onClick={() => setOpen(true)}>
          <UserAvatar name={name || `-`} image={imageUrl || ``} />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-40 h-full bg-background/80 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-[10px] bg-background/60 backdrop-blur-xl px-3 text-sm">
            <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
              <div className="my-3 h-1.5 w-16 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col">
                {name && <p className="font-medium">{name}</p>}
                {user.primaryEmailAddress && (
                  <p className="w-[200px] truncate text-muted-foreground">
                    {user.primaryEmailAddress.emailAddress}
                  </p>
                )}
              </div>
            </div>

            <ul role="list" className="mb-14 mt-1 w-full text-muted-foreground">
              {role === 'ADMIN' && (
                <li className="rounded-lg text-foreground hover:bg-muted">
                  <Link
                    href="/admin"
                    onClick={closeDrawer}
                    className="flex w-full items-center gap-3 px-2.5 py-2"
                  >
                    <Lock className="size-4" />
                    <p className="text-sm">Admin</p>
                  </Link>
                </li>
              )}

              <li className="rounded-lg text-foreground hover:bg-muted">
                <Link
                  href="/dashboard"
                  onClick={closeDrawer}
                  className="flex w-full items-center gap-3 px-2.5 py-2"
                >
                  <LayoutDashboard className="size-4" />
                  <p className="text-sm">Dashboard</p>
                </Link>
              </li>

              <li className="rounded-lg text-foreground hover:bg-muted">
                <Link
                  href="/settings"
                  onClick={closeDrawer}
                  className="flex w-full items-center gap-3 px-2.5 py-2"
                >
                  <Settings className="size-4" />
                  <p className="text-sm">Settings</p>
                </Link>
              </li>

              <li className="rounded-lg text-foreground hover:bg-muted cursor-pointer">
                <SignOutButton redirectUrl="/">
                  <div className="flex flex-row sign-out-button">
                    <LogOut className="icon" />
                    Sign Out
                  </div>
                </SignOutButton>
              </li>
            </ul>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar name={name || `-`} image={imageUrl || ``} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {name && <p className="font-medium">{name}</p>}
            {user.primaryEmailAddress && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.primaryEmailAddress.emailAddress}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {role === 'ADMIN' && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center space-x-2.5">
              <Lock className="size-4" />
              <p className="text-sm">Admin</p>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <LayoutDashboard className="size-4" />
            <p className="text-sm">Dashboard</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center space-x-2.5">
            <Settings className="size-4" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton redirectUrl="/">
            <Button variant="ghost" className="sign-out-button">
              <LogOut className="icon" />
              Sign out
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
