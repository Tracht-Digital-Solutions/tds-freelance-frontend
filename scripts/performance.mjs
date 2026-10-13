import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.argv[2] || 'http://127.0.0.1:4390';
await mkdir('.private/performance', { recursive: true });
const chrome = await launch({
  chromePath:
    process.platform === 'win32'
      ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
      : chromium.executablePath(),
  chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  for (const [mode, config] of [
    ['mobile', undefined],
    ['desktop', desktopConfig],
  ]) {
    const result = await lighthouse(
      origin,
      {
        port: chrome.port,
        output: 'json',
        onlyCategories: [
          'performance',
          'accessibility',
          'seo',
          'best-practices',
        ],
        logLevel: 'error',
      },
      config,
    );
    const report = result.lhr;
    await writeFile(
      `.private/performance/${mode}.json`,
      JSON.stringify(report, null, 2),
    );
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    const lcp = report.audits['largest-contentful-paint'].numericValue;
    const cls = report.audits['cumulative-layout-shift'].numericValue;
    console.log(JSON.stringify({ mode, scores, lcpMs: Math.round(lcp), cls }));
    if (scores.performance < 90 || cls >= 0.1)
      throw new Error(`Performance budget failed (${mode})`);
  }
} finally {
  chrome.kill();
}
