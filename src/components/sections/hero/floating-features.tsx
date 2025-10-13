'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const FloatingComponents: React.FC<{}> = () => {
  const t = useTranslations();
  return (
    <div className="hidden lg:flex relative w-full h-full">
      {/* Card 1 - Top Left */}
      <Card
        className="absolute group top-16 left-60 h-[140px] w-[140px] rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 shadow-xl animate-[levitate_12s_ease_infinite_0s] z-10
      transform transition-transform duration-500 hover:scale-130 hover:shadow-2xl"
      >
        <Image
          alt="Lamp"
          className="object-cover h-full w-full rounded-xl"
          height={180}
          src="/_products/shoe.png"
          width={120}
        />
        <Button
          className="absolute bottom-2 left-2 right-2 p-2 shadow-md
          mx-2 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {t('landing.convert')}
        </Button>
      </Card>

      {/* Card 2 - Top Right */}
      <Card
        className="absolute group top-24 right-56 h-[260px] w-[260px] rounded-3xl bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 shadow-xl animate-[levitate_12s_ease_infinite_1s] z-10
      transform transition-transform duration-500 hover:scale-130 hover:shadow-2xl"
      >
        <Image
          alt="Chair"
          className="object-cover h-full w-full rounded-xl"
          height={200}
          src="/_products/chair.png"
          width={200}
        />
        <Button
          className="absolute bottom-2 left-2 right-2 p-2 shadow-md
          mx-2 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {t('landing.convert')}
        </Button>
      </Card>

      {/* Card 3 - Bottom Left */}
      <Card
        className="absolute group bottom-23 left-100 h-[100px] w-[100px] rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 shadow-xl animate-[levitate_12s_ease_infinite_2s] z-10
      transform transition-transform duration-500 hover:scale-200 hover:shadow-2xl"
      >
        <Image
          alt="Camera"
          className="object-cover h-full w-full rounded-xl"
          height={180}
          src="/_products/lamp.png"
          width={120}
        />
        <Button
          className="absolute bottom-2 left-2 right-2 p-2 shadow-md
          mx-2 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {t('landing.convert')}
        </Button>
      </Card>

      {/* Card 4 - Bottom Right */}
      <Card
        className="absolute group bottom-16 right-74 h-[150px] w-[150px] rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-500 shadow-xl animate-[levitate_12s_ease_infinite_2.5s] z-10
                   transform transition-transform duration-500 hover:scale-150 hover:shadow-2xl"
      >
        <Image
          alt="Chair"
          className="h-full w-auto items-center rounded-xl"
          height={200}
          src="/_products/lamp2.png"
          width={200}
        />
        <Button
          className="absolute bottom-2 left-2 right-2 p-2 shadow-md
          mx-2 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {t('landing.convert')}
        </Button>
      </Card>

      {/* Center Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
    </div>
  );
};
