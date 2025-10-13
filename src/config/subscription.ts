import { PlansRow, SubscriptionPlan } from '@/types';
import { env } from '@/../env.mjs';
import { useTranslations } from 'next-intl';

export function PricingData(): SubscriptionPlan[] {
  const t = useTranslations();
  return [
    {
      title: t('pricing.starterTitle'),
      description: t('pricing.starterDescription'),
      benefits: [
        t('pricing.starterBenefit1'),
        t('pricing.starterBenefit2'),
        t('pricing.starterBenefit3'),
        t('pricing.starterBenefit4'),
      ],
      limitations: [
        t('pricing.starterLimitation1'),
        t('pricing.starterLimitation2'),
        t('pricing.starterLimitation3'),
        t('pricing.starterLimitation4'),
      ],
      prices: {
        monthly: 0,
        yearly: 0,
      },
      stripeIds: {
        monthly: null,
        yearly: null,
      },
    },
    {
      title: t('pricing.proTitle'),
      description: t('pricing.proDescription'),
      benefits: [
        t('pricing.proBenefit1'),
        t('pricing.proBenefit2'),
        t('pricing.proBenefit3'),
        t('pricing.proBenefit4'),
        t('pricing.proBenefit5'),
        t('pricing.proBenefit6'),
        t('pricing.proBenefit7'),
      ],
      limitations: [t('pricing.proLimitation1'), t('pricing.proLimitation2')],
      prices: {
        monthly: 29,
        yearly: 288,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
      },
    },
    {
      title: t('pricing.businessTitle'),
      description: t('pricing.businessDescription'),
      benefits: [
        t('pricing.businessBenefit1'),
        t('pricing.businessBenefit2'),
        t('pricing.businessBenefit3'),
        t('pricing.businessBenefit4'),
        t('pricing.businessBenefit5'),
        t('pricing.businessBenefit6'),
        t('pricing.businessBenefit7'),
        t('pricing.businessBenefit8'),
        t('pricing.businessBenefit9'),
        t('pricing.businessBenefit10'),
      ],
      limitations: [],
      prices: {
        monthly: 79,
        yearly: 768,
      },
      stripeIds: {
        monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
        yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
      },
    },
  ];
}

export function PlanColumns(): string[] {
  const t = useTranslations();
  return [
    t('pricing.starter'),
    t('pricing.pro'),
    t('pricing.business'),
    t('pricing.enterprise'),
  ];
}

export function ComparePlans(): PlansRow[] {
  const t = useTranslations();
  return [
    {
      feature: t('pricing.featureMonthlyProductDescriptions'),
      starter: t('pricing.starterValueMonthlyProductDescriptions'),
      pro: t('pricing.proValueMonthlyProductDescriptions'),
      business: t('pricing.businessValueMonthlyProductDescriptions'),
      enterprise: t('pricing.enterpriseValueMonthlyProductDescriptions'),
      tooltip: t('pricing.tooltipMonthlyProductDescriptions'),
    },
    {
      feature: t('pricing.featureEcommercePlatforms'),
      starter: t('pricing.starterValueEcommercePlatforms'),
      pro: t('pricing.proValueEcommercePlatforms'),
      business: t('pricing.businessValueEcommercePlatforms'),
      enterprise: t('pricing.enterpriseValueEcommercePlatforms'),
      tooltip: t('pricing.tooltipEcommercePlatforms'),
    },
    {
      feature: t('pricing.featureAiQuality'),
      starter: t('pricing.starterValueAiQuality'),
      pro: t('pricing.proValueAiQuality'),
      business: t('pricing.businessValueAiQuality'),
      enterprise: t('pricing.enterpriseValueAiQuality'),
      tooltip: t('pricing.tooltipAiQuality'),
    },
    {
      feature: t('pricing.featureProcessingSpeed'),
      starter: t('pricing.starterValueProcessingSpeed'),
      pro: t('pricing.proValueProcessingSpeed'),
      business: t('pricing.businessValueProcessingSpeed'),
      enterprise: t('pricing.enterpriseValueProcessingSpeed'),
      tooltip: t('pricing.tooltipProcessingSpeed'),
    },
    {
      feature: t('pricing.featureCustomBranding'),
      starter: false,
      pro: t('pricing.proValueCustomBranding'),
      business: t('pricing.businessValueCustomBranding'),
      enterprise: t('pricing.enterpriseValueCustomBranding'),
      tooltip: t('pricing.tooltipCustomBranding'),
    },
    {
      feature: t('pricing.featureAnalyticsInsights'),
      starter: t('pricing.starterValueAnalyticsInsights'),
      pro: t('pricing.proValueAnalyticsInsights'),
      business: t('pricing.businessValueAnalyticsInsights'),
      enterprise: t('pricing.enterpriseValueAnalyticsInsights'),
      tooltip: t('pricing.tooltipAnalyticsInsights'),
    },
    {
      feature: t('pricing.featureApiAccess'),
      starter: false,
      pro: false,
      business: t('pricing.businessValueApiAccess'),
      enterprise: t('pricing.enterpriseValueApiAccess'),
      tooltip: t('pricing.tooltipApiAccess'),
    },
    {
      feature: t('pricing.featureBulkUpload'),
      starter: false,
      pro: false,
      business: true,
      enterprise: true,
      tooltip: t('pricing.tooltipBulkUpload'),
    },
    {
      feature: t('pricing.featureCustomerSupport'),
      starter: t('pricing.starterValueCustomerSupport'),
      pro: t('pricing.proValueCustomerSupport'),
      business: t('pricing.businessValueCustomerSupport'),
      enterprise: t('pricing.enterpriseValueCustomerSupport'),
      tooltip: t('pricing.tooltipCustomerSupport'),
    },
    {
      feature: t('pricing.featureSeoOptimization'),
      starter: false,
      pro: t('pricing.proValueSeoOptimization'),
      business: true,
      enterprise: true,
      tooltip: t('pricing.tooltipSeoOptimization'),
    },
  ];
}
