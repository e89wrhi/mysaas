import { describe, it, expect, vi } from 'vitest';
import { PricingData, PlanColumns, ComparePlans } from './subscription';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/../env.mjs', () => ({
  env: {
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: 'pro_monthly',
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: 'pro_yearly',
    NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID: 'biz_monthly',
    NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID: 'biz_yearly',
  },
}));

describe('subscription config', () => {
  describe('PricingData', () => {
    it('should return three plans', () => {
      const data = PricingData();
      expect(data.length).toBe(3);
      expect(data[0].prices.monthly).toBe(0);
      expect(data[1].prices.monthly).toBe(29);
      expect(data[2].prices.monthly).toBe(79);
    });
  });

  describe('PlanColumns', () => {
    it('should return correct columns', () => {
      const columns = PlanColumns();
      expect(columns).toContain('pricing.starter');
      expect(columns).toContain('pricing.pro');
    });
  });

  describe('ComparePlans', () => {
    it('should return a list of features', () => {
      const features = ComparePlans();
      expect(features.length).toBeGreaterThan(0);
      expect(features[0].feature).toBe('pricing.featureMonthlyProductDescriptions');
    });
  });
});
