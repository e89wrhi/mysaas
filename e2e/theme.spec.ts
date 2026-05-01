import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test('should toggle dark/light mode', async ({ page }) => {
    await page.goto('/');

    // Get the toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();

    // Switch to dark mode
    await page.getByRole('menuitem', { name: /dark/i }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Switch back to light mode
    await themeToggle.click();
    await page.getByRole('menuitem', { name: /light/i }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
