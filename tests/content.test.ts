import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  allRoutes,
  certificates,
  career,
  projects,
  projectSchema,
  validateContent,
  pathFor,
  contactUrl,
} from '../src/data/content';
import { serviceBenefits, faqFor } from '../src/data/benefits';
import { savings, savingsDefaults, formatHours } from '../src/data/savings';
test('content is valid, complete and only approved projects ship', () => {
  validateContent();
  assert.equal(certificates.length, 13);
  assert.equal(career.length, 4);
  assert.equal(projects.length, 20);
  for (const p of projects) assert.equal(projectSchema.parse(p).approved, true);
  assert.throws(() => projectSchema.parse({ ...projects[0], approved: false }));
});
test('each route has one language counterpart', () => {
  const routes = allRoutes();
  assert.equal(routes.length, 64);
  for (const route of routes) {
    assert.ok(
      routes.some(
        (r) =>
          r.id === route.id &&
          r.lang !== route.lang &&
          ('detail' in r ? r.detail : undefined) ===
            ('detail' in route ? route.detail : undefined),
      ),
    );
  }
  assert.equal(pathFor('skills', 'en'), '/en/skills/');
});
test('contact destinations match the existing main-site section', () => {
  assert.equal(contactUrl('de'), 'https://tracht-digital.de/#contact');
  assert.equal(contactUrl('en'), 'https://tracht-digital.de/en/#contact');
});
test('savings arithmetic matches the documented example', () => {
  const r = savings(savingsDefaults);
  assert.equal(Math.round(r.year), 134);
  assert.equal(Math.round(r.month * 10) / 10, 11.2);
  assert.equal(savings({ minutes: -5, perWeek: 10, share: 50 }).year, 0);
  assert.equal(
    savings({ minutes: 10, perWeek: 10, share: 500 }).year,
    (10 * 10 * 46) / 60,
  );
  assert.equal(formatHours(1234.5, 'de'), '1.235');
});
test('benefits mirror the five main-site services and FAQ is bilingual', () => {
  assert.equal(serviceBenefits.length, 5);
  for (const s of serviceBenefits) {
    assert.match(s.path.de, /^\/leistungen\/[a-z-]+$/);
    assert.match(s.path.en, /^\/en\/services\/[a-z-]+$/);
  }
  assert.ok(faqFor('de').length >= 5);
  assert.equal(faqFor('de').length, faqFor('en').length);
});
test('credential dates come from supplied documents', () => {
  assert.equal(
    certificates.find((c) => c.id === 'aha-product')?.date,
    '2026-09-16',
  );
  assert.equal(
    certificates.find((c) => c.id === 'moz-seo')?.date,
    '2026-09-27',
  );
  assert.equal(
    certificates.find((c) => c.id === 'data-analysis')?.date,
    '2026-09-28',
  );
});
