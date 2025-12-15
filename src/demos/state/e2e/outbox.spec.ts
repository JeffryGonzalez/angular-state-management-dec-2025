import { HttpResponse } from 'msw';
import { test, expect } from './fixture';

test('Going to the outbox page', async ({ page, worker, http }) => {
  // Start the MSW server before running the tests
  await worker.use(
    http.get('https://some-api/products', async () => {
      return HttpResponse.json([]);
    }),
  );
  await page.goto('http://localhost:4201/outbox');
  await expect(page.getByText('Business "Rules"')).toBeVisible();
});

test('Just a Few', async ({ page, worker, http }) => {
  // Start the MSW server before running the tests
  await page.goto('http://localhost:4201/outbox');
  await worker.use(
    http.get('https://some-api/products', async () => {
      return HttpResponse.json([
        { id: '1', name: 'BEER', price: 32.23 },
        { id: '2', name: 'WINE', price: 12.23 },
      ]);
    }),
    http.delete('https://some-api/products/:id', async (req) => {
      const { id } = req.params as unknown as { id: string };
      if (id === '1') {
        return new HttpResponse('Could Not Delete', { status: 400 });
      }
      return new HttpResponse('', { status: 204 });
    }),
  );
  await page.goto('http://localhost:4201/outbox');
  await expect(page.getByText('Business "Rules"')).toBeVisible();
  const tableBody = page.locator('tbody');
  const firstRow = tableBody.locator('tr').first();
  const secondRow = tableBody.locator('tr').nth(1);
  const deleteButton = firstRow.getByRole('button', { name: 'Delete' });
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  await expect(
    page.getByText('Could Not Delete', { exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'clear error' }).click();
  await expect(
    page.getByText('Could Not Delete', { exact: true }),
  ).not.toBeVisible();

  const secondDeleteButton = secondRow.getByRole('button', {
    name: 'Delete',
  });
  await secondDeleteButton.click();
  await expect(secondRow).not.toBeVisible();
});
