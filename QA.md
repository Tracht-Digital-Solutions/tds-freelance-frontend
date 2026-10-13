# Verification

## Local verification, 13 October 2026

- Astro/TypeScript content checks: no errors. Zod validates public records,
  bilingual editorial strings, unique IDs/paths and project approval flags.
- Four content tests pass; 62 public URLs plus a noindex 404 build successfully.
- Static output check verifies complete main content, exactly one H1, unique
  titles, descriptions, canonical/hreflang pairs, sitemap inclusion, valid JSON-LD,
  internal resources, local fonts, social assets and absence of PDFs.
- Eight Playwright scenarios pass: route audits in light/dark, SPA/history/focus,
  theme persistence, language correspondence, skill/project/credential filters,
  native modal Escape/focus return, no-JS details/navigation and reduced motion.
- axe-core WCAG A/AA checks pass on all 62 routes in both themes. This is automated
  coverage, not a claim of a complete human WCAG certification or a complete
  screen-reader audit.
- Widths 360, 768, 1280 and 1920px checked for overflow, with mobile navigation.
  Desktop and mobile screenshots reviewed visually. All content remains visible
  before client scripting.
- Contact roots in DE/EN and main-domain legal URLs returned HTTP 200. Both
  roots expose `id="contact"`. Approved project previews are actual public-site
  captures, not invented mockups.
- npm security audit reports zero known vulnerabilities for the pinned install.

GitHub Linux CI also passed all gates, including the performance audit and artifact
upload: [Quality gates run](https://github.com/Tracht-Digital-Solutions/tds-freelance-frontend/actions/runs/38454124519).
The `static-site` artifact contains the verified static document root and a commit stamp.

## Performance budget and measurement

Budget: all emitted JS combined <100KB raw, all emitted CSS combined <150KB raw,
individual assets <1.2MB, Lighthouse homepage performance ≥90 and CLS <0.1 in
mobile/desktop lab runs. Local output: approximately 21.5KB JS and 118KB CSS.

Lighthouse 13.5.0 local production preview, cold lab navigation:

| Mode    | Performance | Accessibility | Best practices | SEO |   LCP |   CLS |
| ------- | ----------: | ------------: | -------------: | --: | ----: | ----: |
| Mobile  |          97 |           100 |            100 | 100 | 2.26s | 0.023 |
| Desktop |         100 |           100 |            100 | 100 | 0.45s | 0.001 |

These are local lab results, not production field Core Web Vitals or guaranteed
scores. CPU, browser version and hosting/network conditions affect results.
Run `npm run audit:perf -- <preview-origin>` against a built preview to repeat.
CI also runs the mobile/desktop performance gate before producing its artifact.

## Remaining production checks

Host/DNS/TLS/webhook configuration, protected production approval, applicability
of the main-domain privacy notice, actual security headers, serving commit stamp
and live smoke tests must be verified before calling the site deployed. Use
DEPLOYMENT.md. The GitHub runner has successfully installed the package with its built-in token.
No host access was provided; CI success does not prove host access.

## Repeatable commands

`npm run quality` runs type checks, content tests, build, static verification and
browser checks. `npm run audit:perf` expects a preview server (default port 4390).
`npm audit` checks the locked dependency installation. Test results and research
live in ignored folders and must not be published as source artifacts.

The scroll regression checks multiple document positions at 1024, 1280 and
1920px wide with a 640px-high viewport. It asserts that navigation never intersects
the values block and that the sidebar has no horizontal overflow. Project filters
cover the seven design studies and the one explicitly in-development framework.
