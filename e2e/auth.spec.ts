import { test, expect } from '@playwright/test';

test.describe('Authentication Redirects', () => {
  test('should redirect unauthenticated user to sign in when accessing dashboard', async ({ page }) => {
    // Go to a protected route
    await page.goto('/dashboard');

    // It should redirect to Clerk sign-in page
    // Clerk usually has "sign-in" in the URL
    await expect(page).toHaveURL(/.*sign-in.*/);
  });
});
