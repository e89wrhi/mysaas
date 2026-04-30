'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroLanding() {
  const { user, isSignedIn } = useUser();
  const t = useTranslations();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-40 pb-0 overflow-hidden bg-background">
      {/* Subtle refined luxury grid background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, black 30%, transparent 80%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 30%, transparent 80%)',
        }}
      ></div>

      {/* Minimalist Premium Product Showcase */}
      <div className="relative w-full max-w-[100vw] h-[35vh] md:h-[45vh] flex flex-row items-end justify-center mt-auto pointer-events-none">
        {/* Subtle glow behind the showcase */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] md:w-4/5 h-[80%] bg-primary/10 blur-[120px] rounded-[100%] mix-blend-screen pointer-events-none z-0"></div>

        <div className="relative w-1/4 md:w-1/6 md:min-w-[150px] aspect-[3/4] opacity-70 -mr-4 md:-mr-12 shrink-0 z-10 hover:opacity-100 transition-opacity">
          <Image
            src="/_products/lamp.png"
            alt="Lamp"
            fill
            className="object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
          />
        </div>

        <div className="relative w-1/3 md:w-1/5 md:min-w-[200px] aspect-[4/5] opacity-90 -mr-6 md:-mr-16 shrink-0 z-20 hover:opacity-100 transition-opacity">
          <Image
            src="/_products/chair.png"
            alt="Chair"
            fill
            className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_60px_rgba(255,255,255,0.08)]"
          />
        </div>

        <div className="relative w-2/5 md:w-1/4 md:min-w-[280px] aspect-square shrink-0 z-30 transform md:-translate-y-4">
          <Image
            src="/_products/shoe.png"
            alt="Shoe"
            fill
            className="object-contain object-bottom drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_40px_80px_rgba(255,255,255,0.1)] scale-110"
            priority
          />
        </div>

        <div className="relative w-1/3 md:w-1/5 md:min-w-[200px] aspect-[4/5] opacity-90 -ml-6 md:-ml-16 shrink-0 z-20 hover:opacity-100 transition-opacity">
          <Image
            src="/_products/phone.png"
            alt="Phone"
            fill
            className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_30px_60px_rgba(255,255,255,0.08)]"
          />
        </div>

        <div className="relative w-1/4 md:w-1/6 md:min-w-[150px] aspect-[3/4] opacity-70 -ml-4 md:-ml-12 shrink-0 z-10 hover:opacity-100 transition-opacity">
          <Image
            src="/_products/pc.png"
            alt="PC"
            fill
            className="object-contain object-bottom drop-shadow-2xl dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
          />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full max-w-7xl mx-auto h-full flex-grow">
        {/* Ultra-premium typography */}
        <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-sans font-black tracking-tighter text-foreground mb-4 uppercase leading-[0.85]">
          {t('landing.headline')}
        </h1>

        <p className="text-lg md:text-2xl font-medium text-muted-foreground max-w-2xl mt-6 mb-12 tracking-wide">
          {t('landing.subheadline')}
        </p>

        <div className="flex items-center justify-center mb-16 z-20">
          {isSignedIn && user != null ? (
            <Link href="/convert">
              <Button className="px-12 py-7 text-sm md:text-base tracking-[0.2em] uppercase font-bold border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-500 rounded-none shadow-2xl">
                {t('landing.button')}
              </Button>
            </Link>
          ) : (
            <Button className="px-12 py-7 text-sm md:text-base tracking-[0.2em] uppercase font-bold border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-500 rounded-none shadow-2xl">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
