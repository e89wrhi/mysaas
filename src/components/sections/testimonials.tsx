import Image from 'next/image';

import { testimonials } from '@/config/landing';
import { HeaderSection } from '@/components/shared/header-section';

export default function Testimonials() {
  return (
    <section>
      <div className="container flex max-w-6xl flex-col gap-10 py-32 sm:gap-y-16">
        <HeaderSection
          label="Testimonials"
          title="What our clients are sharing."
          subtitle="Discover the glowing feedback from our delighted customers
            worldwide."
        />

        <div className="column-1 gap-5 space-y-5 md:columns-2 lg:columns-3 ">
          {testimonials.map((item) => (
            <div className="break-inside-avoid" key={item.name}>
              <div className="relative rounded-3xl bg-muted/45">
                <div className="flex flex-col px-4 py-5 sm:p-6">
                  <div className="relative mb-4 flex items-center gap-3">
                    <Image
                      width={100}
                      height={100}
                      className="size-12 shrink-0 rounded-full border"
                      src={item.image}
                      alt={item.name}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.job}
                      </p>
                    </div>
                  </div>
                  <q className="text-muted-foreground">{item.review}</q>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
