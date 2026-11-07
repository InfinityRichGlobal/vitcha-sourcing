import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test.use({ viewport: { width: 390, height: 844 }, launchOptions: { args: ['--disable-gpu'] } });

test('map pins decode Drive, uploaded and embedded photos for all three record types', async ({ page }) => {
  const pixel = fs.readFileSync('tests/fixtures/photo.png');
  await page.route(/^https:\/\/mt\d\.google\.com\/vt\?/, route => route.fulfill({ contentType: 'image/png', body: pixel }));
  const driveRequests: string[] = [];
  await page.route(/^https:\/\/lh3\.googleusercontent\.com\/d\/qa-map-photo=/, route => {
    driveRequests.push(route.request().url()); return route.fulfill({ contentType: 'image/png', body: pixel });
  });
  const login = await page.request.post('/api/login', { data: { idOrEmail: 'qa-admin', pin: 'qa-only-876543' } });
  expect(login.ok()).toBeTruthy(); const { token } = await login.json();
  const headers = { Authorization: `Bearer ${token}` };
  await page.addInitScript(t => sessionStorage.setItem('vitcha_session_token', t), token);
  const upload = await page.request.post('/api/upload', { headers, data: { mimeType: 'image/png', base64: `data:image/png;base64,${pixel.toString('base64')}` } });
  expect(upload.ok()).toBeTruthy(); const { url } = await upload.json();
  const key = `map-photo-${Date.now()}`;
  const common = { category: 'ชา', rating: 4, quickTags: [], catalogItems: [], drinkItems: [], status: 'scouted' };
  const records = [
    { route: 'suppliers', id: `${key}-supplier`, name: 'หมุดโรงงาน "ชา" <QA>', location: { lat: 10, lng: 100 }, photos: { storefrontAndAtmosphere: ['https://drive.google.com/file/d/qa-map-photo/view'], contactCards: [] } },
    { route: 'drink-stores', id: `${key}-store`, name: 'หมุดร้านน้ำ QA', storeName: 'หมุดร้านน้ำ QA', location: { lat: 15, lng: 101 }, photos: { storefrontAndAtmosphere: [], drinkCups: [url] }, ratings: { taste: 4, aesthetics: 4, value: 4, speed: 4 } },
    { route: 'locations', id: `${key}-location`, name: 'หมุดทำเล QA', location: { lat: 17, lng: 103 }, photos: { storefrontAndAtmosphere: [], floorPlanAndSpecs: [`data:image/png;base64,${pixel.toString('base64')}`] }, ratings: { footTraffic: 4, visibility: 4, accessibility: 4, valueRoi: 4 } },
  ];
  try {
    for (const { route, ...record } of records) {
      const saved = await page.request.post(`/api/${route}`, { headers, data: { ...common, ...record } });
      expect(saved.ok(), await saved.text()).toBeTruthy();
    }
    await page.goto('/'); const map = page.getByTestId('english-map');
    await map.getByRole('button', { name: 'Thailand', exact: true }).click();
    for (const record of records) {
      const image = map.locator('.custom-map-pin').getByRole('img', { name: record.name, exact: true });
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBeTruthy();
    }
    expect(driveRequests).toContain('https://lh3.googleusercontent.com/d/qa-map-photo=s96');
    await expect(map.locator('mediaimage')).toHaveCount(0);
    await map.locator('.custom-map-pin').getByRole('img', { name: records[0].name, exact: true }).click();
    await expect(map.getByRole('heading', { name: records[0].name, exact: true })).toBeVisible();
    await expect.poll(() => map.getByRole('img', { name: 'Thumbnail', exact: true }).evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0)).toBeTruthy();
  } finally {
    for (const record of records) await page.request.delete(`/api/${record.route}/${record.id}`, { headers, data: { revision: 1 } });
  }
});
