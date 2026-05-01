import { test, expect } from '@playwright/test';

test.describe('Static Content Pages', () => {
  const pages = ['about', 'privacy', 'terms', 'security'];

  for (const pageName of pages) {
    test(`should render ${pageName} page`, async ({ page }) => {
      await page.goto(`/${pageName}`);
      
      // Check for heading (usually the page name capitalized)
      // Some pages might use different titles, but they should at least load without 404
      await expect(page.getByRole('heading')).toBeVisible();
    });
  }
});
