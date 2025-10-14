'use client';

import Link from 'next/link';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const logos = [
  {
    title: 'wechat',
    href: 'https://nextjs.org/',
    icon: '/_social/wechat.png',
  },
  {
    title: 'Adobe',
    href: 'https://adobe.com/',
    icon: '/_social/adobe.png',
  },
  {
    title: 'Airbnb',
    href: 'https://www.airbnb.com/',
    icon: '/_social/airbnb.png',
  },
  {
    title: 'Apple',
    href: 'https://apple.com/',
    icon: '/_social/apple.png',
  },
  {
    title: 'Mastercard',
    href: 'https://mastercard.com/',
    icon: '/_social/mastercard.png',
  },
  {
    title: 'Paypal',
    href: 'https://paypal.com/',
    icon: '/_social/paypal.png',
  },
  {
    title: 'Netflix',
    href: 'https://www.netflix.com/',
    icon: '/_social/netflix.png',
  },
  {
    title: 'Snapchat',
    href: 'https://snapchat.com/',
    icon: '/_social/snapchat.png',
  },
];

export default function SocialsSection() {
  const t = useTranslations();
  return (
    <section className="flex flex-col py-14 text-muted-foreground">
      <h2 className="text-center text-sm font-semibold uppercase">
        {t('landing.socials')}
      </h2>
      <div className="overflow-hidden relative w-full my-10 md:my-15">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Original items */}
          {logos.map((logo) => (
            <Link
              key={logo.title}
              target="_blank"
              href={logo.href}
              aria-label={logo.title}
              className="grayscale transition hover:text-foreground hover:grayscale-0 inline-block mx-4"
            >
              <Image
                src={logo.icon}
                alt={logo.title}
                height={470}
                width={470}
                className="h-10 w-10"
              />
            </Link>
          ))}

          {/* Duplicate items for seamless looping */}
          {logos.map((logo) => (
            <Link
              key={logo.title + '-dup'}
              target="_blank"
              href={logo.href}
              aria-label={logo.title}
              className="grayscale transition hover:text-foreground hover:grayscale-0 inline-block mx-4"
            >
              <Image
                src={logo.icon}
                alt={logo.title}
                height={270}
                width={270}
                className="h-20 w-20 mx-10 md:mx-20"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
