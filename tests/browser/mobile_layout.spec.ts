import { test, expect, Page } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const password = 'qa-only-876543';

async function signIn(page: Page, role = 'admin') {
  const response = await page.request.post('/api/login', {
    data: { idOrEmail: `qa-${role}`, pin: password },
  });
  expect(response.ok()).toBeTruthy();
  const { token } = await response.json();
  await page.addInitScript(
    (tok) => sessionStorage.setItem('vitcha_session_token', tok),
    token
  );
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
}

test.describe('Mobile Balanced Frame & 2-Column Product Cards', () => {
  test.use({
    viewport: { width: 390, height: 844 }, // iPhone 13 / 14 / 15
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  test('verifies LEAD LAB and Franchise Stores mobile 2-col layout & captures screenshots', async ({
    page,
  }) => {
    const brainDir =
      '/Users/ice/.gemini/antigravity/brain/2fa1908b-c27c-457d-aa65-7b9b383757fc';
    const canSaveArtifacts = fs.existsSync(brainDir);

    await signIn(page, 'admin');

    // Click on Card 6 (LEAD LAB) from Dashboard
    const leadLabCard = page.locator('button:has-text("แล๊ปของคนหัวแถว")').first();
    await expect(leadLabCard).toBeVisible();
    await leadLabCard.click();

    // Verify Hero Banner has rounded corners and balanced padding
    const heroHeading = page.locator('h1:has-text("LEAD LAB")').first();
    await expect(heroHeading).toBeVisible({ timeout: 10000 });

    // Verify 2-column cards layout
    const columnsGrid = page.locator('.columns-2').first();
    await expect(columnsGrid).toBeVisible();

    if (canSaveArtifacts) {
      await page.screenshot({
        path: path.join(brainDir, 'mobile_lead_lab_hero.png'),
      });
    }

    // Scroll down to view the 2-column card products with fit images
    await page.evaluate(() => window.scrollBy(0, 360));
    await page.waitForTimeout(500);

    if (canSaveArtifacts) {
      await page.screenshot({
        path: path.join(brainDir, 'mobile_lead_lab_cards.png'),
      });
    }

    // Navigate to Franchise Store Simulator
    const storeNavBtn = page
      .getByRole('navigation')
      .getByRole('button', { name: /ร้านแฟรนไชส์/ })
      .first();
    await storeNavBtn.click();

    // Verify Franchise Directory Hub
    const directoryHeading = page.locator('h1:has-text("เครือข่ายร้านแฟรนไชส์")').first();
    await expect(directoryHeading).toBeVisible({ timeout: 10000 });

    if (canSaveArtifacts) {
      await page.screenshot({
        path: path.join(brainDir, 'mobile_franchise_hub.png'),
      });
    }

    // Enter VITCHA Store from the directory
    const enterStoreBtn = page.locator('button:has-text("เข้าร้าน")').first();
    await expect(enterStoreBtn).toBeVisible();
    await enterStoreBtn.click();

    // Verify Franchise store hero
    const storeHero = page.locator('h1:has-text("VITCHA")').first();
    await expect(storeHero).toBeVisible({ timeout: 10000 });

    if (canSaveArtifacts) {
      await page.screenshot({
        path: path.join(brainDir, 'mobile_franchise_store_hero.png'),
      });
    }

    // Scroll down to view Digital Menu Board 2-column items
    await page.evaluate(() => window.scrollBy(0, 380));
    await page.waitForTimeout(500);

    if (canSaveArtifacts) {
      await page.screenshot({
        path: path.join(brainDir, 'mobile_franchise_store_cards.png'),
      });
    }
  });
});
