import { FeatureLdg, InfoLdg, TestimonialType } from '@/types';
import { useTranslations } from 'next-intl';

export function Infos(): InfoLdg[] {
  const t = useTranslations();
  return [
    {
      title: t('infos.section1.title'),
      description: t('infos.section1.description'),
      image: '/_static/illustrations/product-ai.jpg',
      list: [
        {
          title: t('infos.section1.list1.title'),
          description: t('infos.section1.list1.description'),
          icon: 'settings',
        },
        {
          title: t('infos.section1.list2.title'),
          description: t('infos.section1.list2.description'),
          icon: 'laptop',
        },
        {
          title: t('infos.section1.list3.title'),
          description: t('infos.section1.list3.description'),
          icon: 'search',
        },
      ],
    },
    {
      title: t('infos.section2.title'),
      description: t('infos.section2.description'),
      image: '/_avatars/a9.png',
      list: [
        {
          title: t('infos.section2.list1.title'),
          description: t('infos.section2.list1.description'),
          icon: 'laptop',
        },
        {
          title: t('infos.section2.list2.title'),
          description: t('infos.section2.list2.description'),
          icon: 'search',
        },
        {
          title: t('infos.section2.list3.title'),
          description: t('infos.section2.list3.description'),
          icon: 'settings',
        },
      ],
    },
  ];
}

export function Features(): FeatureLdg[] {
  const t = useTranslations();
  return [
    {
      title: t('features.aiListingGenerator.title'),
      description: t('features.aiListingGenerator.description'),
      link: '/',
      icon: 'sparkles',
    },
    {
      title: t('features.marketplaceIntegration.title'),
      description: t('features.marketplaceIntegration.description'),
      link: '/',
      icon: 'cart',
    },
    {
      title: t('features.smartTaggingSeo.title'),
      description: t('features.smartTaggingSeo.description'),
      link: '/',
      icon: 'search',
    },
    {
      title: t('features.bulkUploadSupport.title'),
      description: t('features.bulkUploadSupport.description'),
      link: '/',
      icon: 'copy',
    },
    {
      title: t('features.performanceInsights.title'),
      description: t('features.performanceInsights.description'),
      link: '/',
      icon: 'chart',
    },
    {
      title: t('features.collaborativeWorkspace.title'),
      description: t('features.collaborativeWorkspace.description'),
      link: '/',
      icon: 'users',
    },
  ];
}

export function Testimonials(): TestimonialType[] {
  const t = useTranslations();
  return [
    {
      name: t('testimonials.sarahMiller.name'),
      job: t('testimonials.sarahMiller.job'),
      image: '/_avatars/a1.png',
      review: t('testimonials.sarahMiller.review'),
    },
    {
      name: t('testimonials.jamesRoberts.name'),
      job: t('testimonials.jamesRoberts.job'),
      image: '/_avatars/a2.png',
      review: t('testimonials.jamesRoberts.review'),
    },
    {
      name: t('testimonials.oliviaChen.name'),
      job: t('testimonials.oliviaChen.job'),
      image: '/_avatars/a3.png',
      review: t('testimonials.oliviaChen.review'),
    },
    {
      name: t('testimonials.davidLopez.name'),
      job: t('testimonials.davidLopez.job'),
      image: '/_avatars/a4.png',
      review: t('testimonials.davidLopez.review'),
    },
    {
      name: t('testimonials.ninaPatel.name'),
      job: t('testimonials.ninaPatel.job'),
      image: '/_avatars/a5.png',
      review: t('testimonials.ninaPatel.review'),
    },
    {
      name: t('testimonials.robertGreen.name'),
      job: t('testimonials.robertGreen.job'),
      image: '/_avatars/a6.png',
      review: t('testimonials.robertGreen.review'),
    },
    {
      name: t('testimonials.elenaCruz.name'),
      job: t('testimonials.elenaCruz.job'),
      image: '/_avatars/a7.png',
      review: t('testimonials.elenaCruz.review'),
    },
  ];
}
