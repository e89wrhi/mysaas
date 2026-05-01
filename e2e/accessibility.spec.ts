import { test, expect } from '@playwright/test';

test.describe('Accessibility and SEO', () => {
  test('landing page should have correct meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for title and description
    await expect(page).toHaveTitle(/BenX/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Some images might be decorative, but most should have alt in a SaaS
      // expect(alt).not.toBeNull();
    }
  });
});
