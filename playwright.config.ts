import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 120000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4390',
    headless: true,
    locale: 'de-DE',
    channel: process.platform === 'win32' ? 'chrome' : undefined,
  },
  webServer: {
    command: 'npm run preview -- --port 4390',
    url: 'http://127.0.0.1:4390',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
