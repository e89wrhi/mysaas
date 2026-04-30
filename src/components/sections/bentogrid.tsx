'use client';

import Image from 'next/image';
import MaxWidthWrapper from '@/components/shared/max-width-wrapper';
import { useTranslations } from 'next-intl';

export default function BentoGrid() {
  const t = useTranslations();
  return (
    <section className="py-24 md:py-32 bg-background">
      <MaxWidthWrapper>
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t('landing.intelligentListing') || 'Intelligent Features'}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Everything you need inside a beautifully crafted grid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* First card (Original Avatar Timeline) */}
          <div className="lg:col-span-2 relative overflow-hidden bg-muted/30 border border-border/50 p-8 md:p-12 h-full flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-foreground mb-16">
              AI Powered Workflow
            </h3>

            {/* Vertical line and avatars */}
            <div className="relative w-full max-w-sm mx-auto before:absolute before:inset-0 before:ml-[1.4rem] md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:rounded-full before:bg-green-500/30">
              <div className="relative flex flex-col space-y-12">
                {/* First item */}
                <div className="relative flex flex-row md:w-[calc(50%+1rem)] items-center md:justify-end gap-6 z-10 w-full group">
                  <span className="order-2 md:order-1 block h-fit rounded-full bg-background border px-4 py-2 text-sm font-semibold tracking-wider uppercase drop-shadow-sm group-hover:-translate-x-2 transition-transform">
                    {t('landing.analyzing') || 'Analyzing'}
                  </span>
                  <div className="order-1 md:order-2 size-12 ring-8 ring-background bg-muted rounded-full overflow-hidden shrink-0 mt-0">
                    <Image
                      width={120}
                      height={120}
                      className="size-full object-cover"
                      src="/_avatars/a3.png"
                      alt="avatar"
                    />
                  </div>
                </div>

                {/* Second item */}
                <div className="relative flex flex-row md:ml-[calc(50%-1.5rem)] items-center gap-6 z-10 w-full group">
                  <div className="size-12 ring-8 ring-background bg-muted rounded-full overflow-hidden shrink-0">
                    <Image
                      width={120}
                      height={120}
                      className="size-full object-cover"
                      src="/_avatars/a4.png"
                      alt="avatar"
                    />
                  </div>
                  <span className="block h-fit rounded-full bg-green-500 text-white px-4 py-2 text-sm font-semibold tracking-wider uppercase drop-shadow-lg group-hover:translate-x-2 transition-transform">
                    {t('landing.generating') || 'Generating'}
                  </span>
                </div>

                {/* Third item */}
                <div className="relative flex flex-row md:w-[calc(50%+1rem)] items-center md:justify-end gap-6 z-10 w-full group">
                  <span className="order-2 md:order-1 block h-fit rounded-full bg-background border px-4 py-2 text-sm font-semibold tracking-wider uppercase drop-shadow-sm group-hover:-translate-x-2 transition-transform">
                    {t('landing.done') || 'Completed'}
                  </span>
                  <div className="order-1 md:order-2 size-12 ring-8 ring-background bg-muted rounded-full overflow-hidden shrink-0">
                    <Image
                      width={120}
                      height={120}
                      className="size-full object-cover"
                      src="/_avatars/a7.png"
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Gallery Grid format matching their First Design Bento layout */}
          <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-3 gap-6 h-[600px] lg:h-auto">
            {/* Gallery Item 1 */}
            <div className="relative overflow-hidden bg-muted/40 border border-border/50 group h-full min-h-[180px]">
              <Image
                src="/_illustration/illu_device2_dark.png"
                alt="Gallery Image 1"
                fill
                className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium">Lightning Fast</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="relative overflow-hidden bg-muted/40 border border-border/50 group h-full min-h-[180px]">
              <Image
                src="/_illustration/illustration.png"
                alt="Gallery Image 2"
                fill
                className="object-cover object-left opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium">100% Custom</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="relative col-span-2 lg:col-span-1 overflow-hidden bg-muted/40 border border-border/50 group h-full min-h-[180px]">
              <Image
                src="/_illustration/illu_phone_dark.png"
                alt="Gallery Image 3"
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-medium">Synced Everywhere</p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
