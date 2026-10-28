import { test, expect, Page } from '@playwright/test';

// This macOS host's Metal driver cannot compile the WebGL shaders in headless mode.
test.use({ launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

async function signIn(page: Page) {
  const response = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  await page.addInitScript(token => sessionStorage.setItem('vitcha_session_token', token), token);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
}

test('China basemap loads with English labels and keeps its zoom across polling', async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await signIn(page);
  const map = page.getByTestId('english-map');
  await map.scrollIntoViewIfNeeded();
  await expect(map).toHaveAttribute('data-map-status', 'ready', { timeout: 60000 });
  await expect(map.locator('.leaflet-tile-loaded').first()).toBeVisible();
  await expect(map.getByText('Map language: English')).toBeVisible();
  // A marker's projected separation changes with zoom. It must not snap back on polling.
  const markers = map.locator('.leaflet-marker-icon');
  const before = await markers.first().getAttribute('style');
  await map.locator('.leaflet-control-zoom-in').click();
  await expect.poll(() => markers.first().getAttribute('style')).not.toBe(before);
  await page.waitForResponse(response => new URL(response.url()).pathname === '/api/data' && response.request().method() === 'GET');
  await expect(markers.first()).not.toHaveAttribute('style', before || '');
  await map.screenshot({ path: 'test-results/english-china-map.png' });
});
