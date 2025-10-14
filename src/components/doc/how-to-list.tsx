'use client';

import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Steps = () => {
  const t = useTranslations();

  const data = [
    {
      title: t('how.step1.title'),
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            {t('how.step1.content')}
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt={t('how.step1.title')}
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: t('how.step2.title'),
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            {t('how.step2.content')}
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt={t('how.step2.title')}
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    {
      title: t('how.step3.title'),
      content: (
        <div>
          <p className="mb-8 text-lg md:text-2xl text-neutral-800 dark:text-neutral-200">
            {t('how.step3.content')}
          </p>
          <Image
            src="/_illustration/illu_phone_light.png"
            alt={t('how.step3.title')}
            height={300}
            width={300}
            className="h-140 w-70"
          />
        </div>
      ),
    },
    // Repeat for step4 → step7
  ];

  return data;
};

export function HowtoList() {
  const t = useTranslations();
  return (
    <div className="relative w-full overflow-clip">
      <h1 className="font-bold text-4xl mx-5 mt-10 md:mt-15">
        {t('how.title')}
      </h1>
      <Timeline data={Steps()} />
    </div>
  );
}
