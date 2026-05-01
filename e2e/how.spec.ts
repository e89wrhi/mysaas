import { test, expect } from '@playwright/test';

test.describe('How It Works Page', () => {
  test('should display carousel', async ({ page }) => {
    await page.goto('/how');
    
    // Check if the carousel or its major components are visible
    // Based on the page name, we expect steps or a carousel mechanism
    const carousel = page.locator('div').filter({ has: page.locator('button') }); // Usually carousels have buttons
    await expect(page.getByText(/Step|Next|Previous/i).first()).toBeVisible();
  });
});
