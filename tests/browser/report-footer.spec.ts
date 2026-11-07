import { test, expect } from '@playwright/test';
import { buildExecutiveReportHtml } from '../../src/utils/exportReport';
import { buildFranchiseStoreReportHtml, buildLeadLabSpecReportHtml } from '../../src/utils/labAndStoreExport';
import { sampleCatalog } from '../../server/sample-pack.js';
import fs from 'node:fs/promises';

test.use({ serviceWorkers: 'block', launchOptions: { args: ['--disable-gpu'] } });

test('every report page includes its record identity and actual page count in the footer', async ({ page }) => {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const db = sampleCatalog();
  const store = db.franchiseStores[0];
  const entries = [
    { type: 'ซัพพลายเออร์', name: db.suppliers[0].name, html: buildExecutiveReportHtml(db.suppliers[0], n => n, 'print') },
    { type: 'ร้านน้ำ', name: db.drinkStores[0].storeName, html: buildExecutiveReportHtml(db.drinkStores[0], n => n, 'print') },
    { type: 'ทำเล', name: db.locations[0].name, html: buildExecutiveReportHtml(db.locations[0], n => n, 'print') },
    { type: 'สูตร R&D', name: db.leadLabItems[0].name, html: buildLeadLabSpecReportHtml(db.leadLabItems[0]) },
    { type: 'แฟรนไชส์', name: store.name, html: buildFranchiseStoreReportHtml(store, store.menuItems.map(menuItem => ({ menuItem, labItem: db.leadLabItems.find(lab => lab.id === menuItem.labItemId) }))) },
  ];
  await page.route('**/*', route => {
    if (['image', 'media', 'font'].includes(route.request().resourceType())) return route.abort();
    if (/html2pdf|fonts.googleapis.com/.test(route.request().url())) return route.fulfill({ body: '', contentType: 'text/plain' });
    return route.continue();
  });
  await page.addInitScript(() => { window.print = () => {}; });
  // Subset Thai fonts can expose combining marks as NUL in PDF text extraction.
  const normalized = (text: string) => text.normalize('NFKD').replace(/[\s\p{M}\u0000]/gu, '');
  for (const entry of entries) {
    await page.route('**/footer-report', route => route.fulfill({ body: entry.html, contentType: 'text/html' }));
    await page.goto('/footer-report', { waitUntil: 'load' });
    const bytes = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    await fs.writeFile(`test-results/footer-${entry.type.replaceAll('/', '-')}.pdf`, bytes);
    const task = getDocument({ data: new Uint8Array(bytes), useSystemFonts: true });
    const pdf = await task.promise;
    const expected = normalized(`ฉันจะเป็นหัวแถว | ${entry.type} : ${entry.name}`);
    for (let number = 1; number <= pdf.numPages; number++) {
      const content = await (await pdf.getPage(number)).getTextContent();
      const footer = normalized(content.items.filter((item: any) => item.str !== undefined && item.transform[5] < 42).map((item: any) => item.str).join(''));
      expect(footer, `${entry.type}, page ${number}`).toContain(expected);
      expect(footer).toContain(`${number}/${pdf.numPages}`);
    }
    await task.destroy();
    await page.unroute('**/footer-report');
  }
});
