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
  // Compare the widest pin separation: records can share GPS coordinates,
  // so the first two pins need not be distinct locations.
  const markers = map.locator('.leaflet-marker-icon');
  const separation = () => markers.evaluateAll(nodes => {
    const points = nodes.map(node => node.getBoundingClientRect());
    let widest = 0;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        widest = Math.max(widest, Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y));
      }
    }
    return widest;
  });
  const before = await separation();
  expect(before).toBeGreaterThan(0);
  await map.locator('.leaflet-control-zoom-in').click();
  await expect.poll(separation).toBeGreaterThan(before * 1.5);
  await expect(map.locator('.leaflet-zoom-anim')).toHaveCount(0);
  await page.waitForTimeout(500);
  const zoomed = await separation();
  await page.waitForResponse(response => new URL(response.url()).pathname === '/api/data' && response.request().method() === 'GET');
  await expect.poll(async () => Math.abs((await separation()) - zoomed)).toBeLessThan(15);
  await map.screenshot({ path: 'test-results/english-china-map.png' });
});

test('pasting a place link uses its pin instead of the map viewport and accepts zero coordinates',async({page})=>{
 await signIn(page);
 await page.route('**/api/geocode/search**',r=>r.fulfill({json:[]}));
 const input=page.getByPlaceholder('🔍 ค้นหาสถานที่ หรือ วางพิกัด (lat, lng) หรือ วางลิงก์ Google Maps...');
 await input.fill('https://www.google.com/maps/place/Tea/@13.75,100.49,12z/data=!3d13.751!4d100.492');
 await expect(page.getByText('📍 ตรวจพบพิกัด (13.75100, 100.49200)',{exact:true})).toBeVisible();
 await input.fill('0, 100');await expect(page.getByText('📍 ตรวจพบพิกัด (0.00000, 100.00000)',{exact:true})).toBeVisible();
});
