import { SidebarNavItem, SiteConfig } from '@/types';
import { env } from '@/../env.mjs';
import og from '@/assets/lamp_icon.png';

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

export const footerLinks: SidebarNavItem[] = [
  {
    title: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Enterprise', href: '/enterprise' },
      { title: 'Terms', href: '/tos' },
      { title: 'Privacy', href: '/privacy' },
    ],
  },
  {
    title: 'Product',
    items: [
      { title: 'Security', href: '/security' },
      { title: 'Customization', href: '/customization' },
      { title: 'Customers', href: '/customers' },
      { title: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Docs',
    items: [
      { title: 'Introduction', href: '/doc' },
      { title: 'Installation', href: '/doc' },
      { title: 'Components', href: '/doc' },
      { title: 'Code Blocks', href: '/doc' },
    ],
  },
];
