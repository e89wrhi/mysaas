import Image from 'next/image';

import { testimonials } from '@/config/landing';
import { HeaderSection } from '@/components/shared/header-section';

export default function UsSection() {
  return (
    <section>
      <div className="container flex max-w-6xl flex-col gap-10 py-32 sm:gap-y-16">
        <HeaderSection
          label="About Us"
          title="About Us."
          subtitle="the team make miracle happen
            worldwide."
        />

        <div className="column-1 gap-5 mx-5 md:mx-10 space-y-4 space-y-5 md:columns-2 lg:columns-3 ">
          {testimonials.map((item) => (
            <div className="break-inside-avoid" key={item.name}>
              <div className="mb-4 flex flex-col items-start text-start gap-3">
                <Image
                  width={800}
                  height={800}
                  className="h-60 md:h-70 w-50 md:w-60 object-cover rounded-2xl"
                  src={item.image}
                  alt={item.name}
                />
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
