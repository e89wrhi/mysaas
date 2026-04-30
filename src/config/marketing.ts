import { MarketingConfig } from '@/types';
import { useTranslations } from 'next-intl';

export function MarketingConfigs(): MarketingConfig {
  const t = useTranslations();
  return {
    mainNav: [
      {
        title: t('marketing.pricing'),
        href: '/pricing',
      },
      {
        title: t('marketing.howTo'),
        href: '/how',
      },
    ],
  };
}
