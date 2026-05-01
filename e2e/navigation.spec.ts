import { test, expect } from '@playwright/test';

test('navigation links are present', async ({ page }) => {
  await page.goto('/');

  // Check if logo is present
  await expect(page.getByRole('link', { name: /logo/i })).toBeVisible();

  // Check for Sign In button
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

test('can navigate to pricing page', async ({ page }) => {
  await page.goto('/');
  const pricingLink = page.getByRole('link', { name: /pricing/i });
  
  if (await pricingLink.isVisible()) {
    await pricingLink.click();
    await expect(page).toHaveURL(/\/pricing/);
  }
});
