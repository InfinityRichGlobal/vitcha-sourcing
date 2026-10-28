import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:4173', headless: true, trace: 'retain-on-failure' },
  projects: [{ name: 'chrome', use: { browserName: 'chromium', channel: 'chrome' } }, ...(process.env.TEST_WEBKIT ? [{ name: 'webkit', use: { browserName: 'webkit' as const } }] : [])],
  webServer: [
    { command: 'node tests/fixture-server.mjs', url: 'http://127.0.0.1:3901/api/health', reuseExistingServer: false },
    { command: process.env.TEST_PRODUCTION ? 'VITCHA_DEV_API=http://127.0.0.1:3901 npm run preview -- --host 127.0.0.1 --port 4173 --strictPort' : 'VITCHA_DEV_API=http://127.0.0.1:3901 npm run dev -- --port 4173 --strictPort', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
  ],
});
