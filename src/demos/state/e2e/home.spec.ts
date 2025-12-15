import { test, expect } from '@playwright/test';

test('can load', async ({ page }) => {
  await page.goto('http://localhost:4200');

  // Check if the main heading is visible
  const eventsLink = page.getByRole('link', { name: 'Ngrx Events' });
  await expect(eventsLink).toBeVisible();
  await eventsLink.click();
  await expect(page).toHaveURL(/.*ngrx-events/);
  await page.getByRole('link', { name: 'Counter' }).click();
  await expect(page).toHaveURL(/.*ngrx-events\/counter/);
  const current = page.getByTestId('current');
  await expect(current).toHaveText('0');
  const incrementButton = page.getByRole('button', { name: '+' });
  await expect(incrementButton).toBeVisible();
  await incrementButton.click();
  await expect(current).toHaveText('1');
  const decrementButton = page.getByRole('button', { name: '-' });
  await expect(decrementButton).toBeVisible();
  await decrementButton.click();
  await expect(current).toHaveText('0');
  await page.locator('button').filter({ hasText: '5' }).click();
  await incrementButton.click();
  await incrementButton.click();
  await expect(current).toHaveText('10');
  const resetButton = page.getByRole('button', { name: 'Reset' });
  await expect(resetButton).toBeVisible();
  await resetButton.click();
  await expect(current).toHaveText('0');
});
