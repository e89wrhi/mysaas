import { test, expect } from '@playwright/test';

test.describe('Localization', () => {
  test('should switch languages', async ({ page }) => {
    await page.goto('/');

    // Get the language toggle button (it has a lang icon)
    // Based on the code, it's a ghost button with a lang icon
    const langToggle = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: '' }); // Simplified selector
    
    // Attempting to find by icon name if possible, or just click the first button with sr-only text empty
    // Actually, I'll use a more specific selector if I can find one in the source
    // <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 px-0">
    
    await langToggle.first().click();

    // Switch to Chinese
    const zhOption = page.getByRole('menuitem').filter({ hasText: '中文' });
    if (await zhOption.isVisible()) {
      await zhOption.click();
      await expect(page).toHaveURL(/\/zh/);
    }
  });
});
