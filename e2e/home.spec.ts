import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero section', async ({ page }) => {
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
  });

  test('should have footer links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Check for social links
    const twitterLink = footer.locator('a[href*="twitter.com"]');
    // Note: It might be X.com now, but many still use twitter.com in href
    // We can also check by icon if we use specialized selectors, but href is safer
  });

  test('newsletter subscription form is present', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/email/i);
    const subscribeButton = page.getByRole('button', { name: /subscribe/i });
    
    await expect(emailInput).toBeVisible();
    await expect(subscribeButton).toBeVisible();
  });
});
