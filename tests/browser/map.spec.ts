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
  // Compare two pins' screen separation: a single pin can stay at the zoom center.
  const markers = map.locator('.leaflet-marker-icon');
  const separation = () => markers.evaluateAll(nodes => {
    const a = nodes[0].getBoundingClientRect();
    const b = nodes[1].getBoundingClientRect();
    return Math.hypot(a.x - b.x, a.y - b.y);
  });
  const before = await separation();
  expect(before).toBeGreaterThan(0);
  await map.locator('.leaflet-control-zoom-in').click();
  await expect.poll(separation).toBeGreaterThan(before * 1.5);
  await expect(map.locator('.leaflet-zoom-anim')).toHaveCount(0);
  const zoomed = await separation();
  await page.waitForResponse(response => new URL(response.url()).pathname === '/api/data' && response.request().method() === 'GET');
  await expect.poll(separation).toBeCloseTo(zoomed, 0);
  await map.screenshot({ path: 'test-results/english-china-map.png' });
});
