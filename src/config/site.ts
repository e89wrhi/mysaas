import { SidebarNavItem, SiteConfig } from '@/types';
import { env } from '@/../env.mjs';
import og from '@/assets/lamp_icon.png';
import { useTranslations } from 'next-intl';

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'Port',
  description:
    'Ai tool to convert Image to Product listing for Amazon, ebay, etsy....',
  url: site_url,
  ogImage: og.src,
  links: {
    twitter: 'https://twitter.com/mytwi',
    github: 'https://github.com/mygit',
  },
  mailSupport: 'support@port.com',
};

export function FooterLinks(): SidebarNavItem[] {
  const t = useTranslations();
  return [
    {
      title: t('footer.companyTitle'),
      items: [
        { title: t('footer.about'), href: '/about' },
        { title: t('footer.enterprise'), href: '/enterprise' },
        { title: t('footer.terms'), href: '/tos' },
        { title: t('footer.privacy'), href: '/privacy' },
      ],
    },
    {
      title: t('footer.productTitle'),
      items: [
        { title: t('footer.security'), href: '/security' },
        { title: t('footer.customization'), href: '/customization' },
        { title: t('footer.customers'), href: '/customers' },
        { title: t('footer.changelog'), href: '/changelog' },
      ],
    },
    {
      title: t('footer.docsTitle'),
      items: [
        { title: t('footer.introduction'), href: '/how' },
        { title: t('footer.installation'), href: '/how' },
        { title: t('footer.components'), href: '/how' },
        { title: t('footer.codeBlocks'), href: '/how' },
      ],
    },
  ];
}
