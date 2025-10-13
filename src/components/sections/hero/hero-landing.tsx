'use client';

import Link from 'next/link';
//import { env } from '@/../env.mjs;
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import SplitText from '@/components/SplitText';
import Image from 'next/image';
import Orb from '../../Orb';
import { FloatingComponents } from './floating-features';

export default function HeroLanding() {
  const { user, isSignedIn } = useUser();
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* 🔹 Background layer */}
      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={150}
          forceHoverState={false}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <FloatingComponents />
      </div>

      {/* 🔹 Foreground content */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center text-center h-full px-6">
        <div className="w-[300px] h-[150px] md:w-[350px] md:h-[140px] mt-10 mb-2 overflow-hidden relative">
          <Image
            src="/_illustration/illu_phone_dark.png"
            alt="Device"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>

        <SplitText
          text="Snap. Generate. Sell."
          className="text-4xl md:text-6xl font-extrabold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <SplitText
          text="Turn any product photo into a complete, shop-ready listing in seconds — titles, descriptions, and all."
          className="text-sm md:text-2xl font-normal text-center w-2/4 mt-4"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <div className="flex items-center justify-center mt-6">
          {isSignedIn && user != null ? (
            <Link href="/convert" className="pointer-events-auto">
              <Button
                className="px-5 rounded-full size-3xl"
                variant="default"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
