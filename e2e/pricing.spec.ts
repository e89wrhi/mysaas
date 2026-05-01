import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('should display pricing cards', async ({ page }) => {
    // Check for common pricing card elements
    const pricingCards = page.locator('div').filter({ hasText: /Free|Pro|Enterprise/i });
    await expect(pricingCards.first()).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();
  });

  test('should display compare plans section', async ({ page }) => {
    await expect(page.getByText(/Compare plans/i)).toBeVisible();
  });
});
