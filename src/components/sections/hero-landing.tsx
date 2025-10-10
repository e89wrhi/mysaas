'use client';

import Link from 'next/link';
//import { env } from '@/../env.mjs;
import { Button } from '@/components/ui/button';
import AiTransformIllustration from './hero-illustration';
import { useUser } from '@clerk/nextjs';

export default function HeroLanding() {
  const { user, isSignedIn } = useUser();
  return (
    <section className="space-y-6 py-6 sm:py-20 lg:py-20">
      <AiTransformIllustration />
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Snap. Generate.{' '}
          <span className="text-gradient_orange-yellow font-extrabold">
            Sell.
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          Turn any product photo into a complete, marketplace-ready listing in
          seconds — titles, descriptions, and all.
        </p>
        {isSignedIn && user != null ? (
          <Link href={'/convert'} className="hidden md:block">
            <Button
              className="gap-2 px-5 rounded-full bg-green-400 text-2xl font-bold hover:bg-green-600"
              variant="default"
              size="lg"
            >
              Convert
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
}
