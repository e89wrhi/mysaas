'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { marketingConfig } from '@/config/marketing';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import Image from 'next/image';
import { LocaleChange } from './change-locale';
import { ModeToggle } from './mode-toggle';
import { SignInButton, useUser } from '@clerk/nextjs';
import { UserAccountNav } from './user-account-nav';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { user, isSignedIn } = useUser();
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? 'border-b' : 'bg-transparent') : 'border-b'
      }`}
    >
      <MaxWidthWrapper className="flex h-14 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1">
            <Image
              height={60}
              width={60}
              src="/logo.png"
              alt="logo"
              className="h-8 w-8"
            />
            <span className="font-urban text-xl font-bold text-green-400">
              {siteConfig.name}
            </span>
          </Link>

          {marketingConfig && marketingConfig.mainNav.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {marketingConfig.mainNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  prefetch={true}
                  className={cn(
                    'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                    item.href.startsWith(`/${selectedLayout}`)
                      ? 'text-foreground'
                      : 'text-foreground/60',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          <LocaleChange pathname="" />
          <ModeToggle />

          {isSignedIn && user != null ? (
            <UserAccountNav />
          ) : (
            <SignInButton>
              <Button
                className="hidden gap-2 px-5 rounded-full md:flex bg-green-400"
                variant="default"
                size="sm"
              >
                <span>Sign In</span>
                <Icons.arrowRight className="size-4" />
              </Button>
            </SignInButton>
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
