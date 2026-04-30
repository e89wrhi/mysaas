import Image from 'next/image';

import MaxWidthWrapper from '@/components/shared/max-width-wrapper';

export default function PreviewLanding() {
  return (
    <div className="pb-6 sm:pb-16">
      <MaxWidthWrapper>
        <div className="md:bg-muted/30 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
          <div className="relative aspect-video overflow-hidden">
            <Image
              className="size-full m-3 object-center dark:opacity-85 dark:invert"
              src="/_illustration/illu_device_dark.png"
              alt="preview landing"
              width={2000}
              height={1000}
              priority={true}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
