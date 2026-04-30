'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MarketingConfigs } from '@/config/marketing';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import { SignInButton, useUser } from '@clerk/nextjs';
import { UserAccountNav } from './user-account-nav';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({}: NavBarProps) {
  const scrolled = useScroll(10);
  const { user, isSignedIn } = useUser();
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex w-full items-center justify-center transition-all duration-300 ease-in-out',
        scrolled
          ? 'h-16 border-b bg-background/80 backdrop-blur-lg shadow-sm'
          : 'h-20 bg-transparent'
      )}
    >
      <div className="w-full max-w-7xl flex items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2.5">
            <Image
              height={32}
              width={32}
              src="/logo.png"
              alt="logo"
              className="h-7 w-7"
            />
            <span className="font-sans text-xl font-bold tracking-tight">
              {siteConfig.name}
            </span>
          </Link>

          {MarketingConfigs()?.mainNav?.length ? (
            <nav className="hidden md:flex gap-8">
              {MarketingConfigs().mainNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    item.href.startsWith(`/${selectedLayout}`)
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />

          {isSignedIn && user != null ? (
            <div className="flex items-center space-x-4">
              <Link
                href={'/convert'}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.add className="size-5" />
              </Link>
              <UserAccountNav />
            </div>
          ) : (
            <SignInButton>
              <Button
                className="hidden border-[2px] rounded-[0px] md:flex px-6 text-sm"
                variant="outline"
              >
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
