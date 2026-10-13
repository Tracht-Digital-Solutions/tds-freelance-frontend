import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { allRoutes } from '../../src/data/content';
for (const theme of ['light', 'dark'])
  test(`all direct routes render and pass core accessibility rules (${theme})`, async ({
    page,
  }) => {
    await page.addInitScript(
      (theme) => localStorage.setItem('tds-theme', theme),
      theme,
    );
    for (const route of allRoutes()) {
      await page.goto(route.path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', route.lang);
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(
        audit.violations,
        `${route.path}: ${JSON.stringify(audit.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });
test('navigation is client-side, history works, language and theme persist', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    (window as Window & { proof?: string }).proof = 'same-document';
  });
  await page.locator('.desktop-nav a[href="/karriere/"]').click();
  await expect(page).toHaveURL(/\/karriere\/$/);
  expect(
    await page.evaluate(() => (window as Window & { proof?: string }).proof),
  ).toBe('same-document');
  await expect(page.locator('#main')).toBeFocused();
  await page.locator('a[href="/karriere/amotiq/"]').first().click();
  await expect(page.locator('h1')).toContainText('amotIQ');
  await page.goBack();
  await expect(page).toHaveURL(/\/karriere\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/karriere\/amotiq\/$/);
  await page.locator('[data-locale="en"]').click();
  await expect(page).toHaveURL(/\/en\/career\/amotiq\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('.theme-toggle').click();
  const theme = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme!);
  await page.goto('/');
  await expect(page).toHaveURL(/\/en\/$/);
});
test('filters, details and certificate dialog work in both languages', async ({
  page,
}) => {
  for (const lang of ['de', 'en']) {
    await page.goto(lang === 'de' ? '/faehigkeiten/' : '/en/skills/');
    await page.locator('[data-search]').fill('ASP.NET');
    await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
    await page.locator('.skill-card:visible summary').click();
    await expect(page.locator('.skill-card:visible')).toHaveAttribute(
      'open',
      '',
    );
    await page.locator('.reset-filter').click();
    await expect(page.locator('[data-filter-item]:visible')).toHaveCount(39);
    await page.locator('select[data-category]').selectOption('frontend');
    await expect(page.locator('[data-filter-item]:visible')).toHaveCount(7);
    await page.locator('[data-search]').fill('nonexistent');
    await expect(page.locator('[data-no-results]')).toBeVisible();
    await page.goto(lang === 'de' ? '/zertifikate/' : '/en/certifications/');
    await page.locator('select[data-category]').selectOption('security');
    await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
    await page.locator('.certificate-card:visible summary').click();
    await page.locator('.certificate-card:visible .preview-button').click();
    await expect(page.locator('dialog[open]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('dialog[open]')).toHaveCount(0);
    await expect(
      page.locator('.certificate-card:visible .preview-button'),
    ).toBeFocused();
    await page.goto(lang === 'de' ? '/projekte/' : '/en/projects/');
    await page.locator('select[data-category]').selectOption({ index: 1 });
    await expect(page.locator('[data-filter-item]:visible')).toHaveCount(1);
  }
});
test('responsive layouts stay within viewport', async ({ page }) => {
  for (const width of [360, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/faehigkeiten/', '/zertifikate/', '/kontakt/']) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${width}: ${route}`,
      ).toBe(true);
      if (width === 360 && route === '/') {
        await page.locator('.mobile-menu>summary').click();
        await page.locator('.mobile-menu a[href="/ueber-mich/"]').click();
        await expect(page.locator('h1')).toContainText('Neugier');
      }
    }
  }
});
test('without JavaScript content, navigation and details remain available', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4390/zertifikate/');
  await expect(page.locator('.certificate-card')).toHaveCount(13);
  await page.locator('.certificate-card summary').first().click();
  await expect(
    page.locator('.certificate-card details').first(),
  ).toHaveAttribute('open', '');
  await page.locator('.desktop-nav a[href="/karriere/"]').click();
  await expect(page.locator('.timeline-row')).toHaveCount(4);
  await context.close();
});
test('explicit language routes and reduced motion are respected', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/skills/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(
    await page.evaluate(
      () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    ),
  ).toBe(true);
  await page.goto('/ueber-mich/');
  await expect(page).toHaveURL(/\/ueber-mich\/$/);
});
