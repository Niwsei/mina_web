import { test, expect } from '@playwright/test';

test('take screenshot of promotions page', async ({ page }) => {
  await page.goto('http://localhost:3000/promotions');
  await page.screenshot({ path: 'jules-scratch/verification/promotions.png' });
});
