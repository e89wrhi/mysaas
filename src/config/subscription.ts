import { PlansRow, SubscriptionPlan } from '@/types';
import { env } from '@/../env.mjs';

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Starter',
    description: 'Perfect for getting started',
    benefits: [
      'Up to 10 product descriptions per month',
      'Basic AI-generated descriptions',
      'Standard e-commerce platforms (Amazon, Shopify)',
      'Email support',
    ],
    limitations: [
      'Limited to basic descriptions',
      'No custom branding options',
      'No priority processing',
      'No advanced analytics',
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
    title: 'Pro',
    description: 'For growing businesses',
    benefits: [
      'Up to 100 product descriptions per month',
      'Advanced AI with detailed specifications',
      'All major platforms (Amazon, Shopify, Etsy, eBay)',
      'Priority processing',
      'Custom branding options',
      'Advanced analytics and insights',
      'Priority email support',
    ],
    limitations: ['Monthly limit applies', 'No dedicated account manager'],
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
    title: 'Business',
    description: 'For power sellers',
    benefits: [
      'Unlimited product descriptions',
      'Premium AI with SEO optimization',
      'All platforms + custom integrations',
      'Instant processing',
      'White-label branding',
      'Detailed analytics and reporting',
      'Dedicated account manager',
      '24/7 priority support',
      'Custom API access',
      'Bulk upload capabilities',
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

export const plansColumns = [
  'starter',
  'pro',
  'business',
  'enterprise',
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: 'Monthly Product Descriptions',
    starter: '10',
    pro: '100',
    business: 'Unlimited',
    enterprise: 'Unlimited',
    tooltip: 'Number of AI-generated product descriptions per month.',
  },
  {
    feature: 'E-commerce Platforms',
    starter: 'Amazon, Shopify',
    pro: 'All Major Platforms',
    business: 'All + Custom',
    enterprise: 'All + Custom',
    tooltip: 'Supported e-commerce platforms for product listings.',
  },
  {
    feature: 'AI Quality',
    starter: 'Basic',
    pro: 'Advanced',
    business: 'Premium',
    enterprise: 'Premium',
    tooltip: 'Level of AI sophistication and detail in descriptions.',
  },
  {
    feature: 'Processing Speed',
    starter: 'Standard',
    pro: 'Priority',
    business: 'Instant',
    enterprise: 'Instant',
    tooltip: 'Speed of AI processing and generation.',
  },
  {
    feature: 'Custom Branding',
    starter: false,
    pro: 'Basic',
    business: 'White-label',
    enterprise: 'White-label',
    tooltip: 'Customization options for branding and styling.',
  },
  {
    feature: 'Analytics & Insights',
    starter: 'Basic',
    pro: 'Advanced',
    business: 'Detailed',
    enterprise: 'Custom',
    tooltip: 'Level of analytics and performance insights available.',
  },
  {
    feature: 'API Access',
    starter: false,
    pro: false,
    business: 'Standard',
    enterprise: 'Full',
    tooltip: 'API access for integration with other tools.',
  },
  {
    feature: 'Bulk Upload',
    starter: false,
    pro: false,
    business: true,
    enterprise: true,
    tooltip: 'Ability to upload and process multiple products at once.',
  },
  {
    feature: 'Customer Support',
    starter: 'Email',
    pro: 'Priority Email',
    business: '24/7 Priority',
    enterprise: 'Dedicated Manager',
    tooltip: 'Level of customer support and response time.',
  },
  {
    feature: 'SEO Optimization',
    starter: false,
    pro: 'Basic',
    business: true,
    enterprise: true,
    tooltip: 'Advanced SEO optimization for product descriptions.',
  },
];
