import Link from 'next/link';
//import { env } from '@/../env.mjs';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import AiTransformIllustration from './hero-illustration';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
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

        <div
          className="flex justify-center md:space-x-4
          items-center flex-col md:flex-row space-y-2 md:space-y-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(buttonVariants({ size: 'lg' }), 'gap-2 rounded-full')}
          >
            <span>Go Pricing</span>
            <Icons.arrowRight className="size-4" />
          </Link>

          <div
            className="flex flex-row border border-2 border-gray-200
            rounded-full dark:border-gray-800 px-6 py-2 items-center shrink-0"
          >
            <div className="flex flex-row -space-x-4 md:-space-x-5">
              <Avatar className="h-7 border border-2 border-white dark:border-black w-7 bg-gray-100 dark:bg-gray-900">
                <AvatarImage
                  alt="Picture"
                  height={50}
                  width={50}
                  src="/_avatars/a1.png"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  <span className="sr-only">A</span>
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-7 border border-2 border-white dark:border-black w-7 bg-gray-100 dark:bg-gray-900">
                <AvatarImage
                  alt="Picture"
                  height={50}
                  width={50}
                  src="/_avatars/a2.png"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  <span className="sr-only">A</span>
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-7 border border-2 border-white dark:border-black w-7 bg-gray-100 dark:bg-gray-900">
                <AvatarImage
                  alt="Picture"
                  height={50}
                  width={50}
                  src="/_avatars/a3.png"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  <span className="sr-only">A</span>
                </AvatarFallback>
              </Avatar>
            </div>
            <p>
              <span className="hidden sm:inline-block">22k customers</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
