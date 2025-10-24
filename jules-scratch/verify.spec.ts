import { test, expect } from '@playwright/test';

test('take screenshots', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'jules-scratch/home.png' });

  await page.goto('http://localhost:3000/menu');
  await page.screenshot({ path: 'jules-scratch/menu.png' });
});
