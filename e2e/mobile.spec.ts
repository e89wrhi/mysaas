import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 13'] });

test('mobile navigation menu works', async ({ page }) => {
  await page.goto('/');

  // Check for hamburger menu button (usually visible on mobile)
  const menuButton = page.getByRole('button', { name: /menu|toggle/i });
  if (await menuButton.isVisible()) {
    await menuButton.click();
    
    // Check if navigation links appear in the mobile menu
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
  }
});
