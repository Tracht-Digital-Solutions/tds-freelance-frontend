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
test('content is valid, complete and only approved projects ship', () => {
  validateContent();
  assert.equal(certificates.length, 13);
  assert.equal(career.length, 4);
  assert.equal(projects.length, 19);
  for (const p of projects) assert.equal(projectSchema.parse(p).approved, true);
  assert.throws(() => projectSchema.parse({ ...projects[0], approved: false }));
});
test('each route has one language counterpart', () => {
  const routes = allRoutes();
  assert.equal(routes.length, 62);
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
