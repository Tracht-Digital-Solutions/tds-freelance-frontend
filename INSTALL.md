# Installation

1. Install Node 24 and npm 11. Clone this repository.
2. Export `NPM_TOKEN` in the current terminal using a credential authorized for
   `read:packages` in Tracht-Digital-Solutions. Never write a real token to `.npmrc`.
   The committed `.npmrc` contains an environment reference only. In Actions,
   grant this repository access to tds-shared or set the `NPM_TOKEN` secret.
3. Run `npm ci`. The lockfile pins versions and includes optional platform packages.
   Do not copy another repository's node_modules or private package source.
4. Run `npm run dev` and open the printed URL. For a production-shaped preview,
   run `npm run build` then `npm run preview -- --port 4390`.
5. Run `npm run quality`. Windows browser tests use installed Chrome. On Linux/CI,
   install test Chromium with `npx playwright install --with-deps chromium` first.

Astro 7 manages preview processes. Use `npx astro preview stop` **in this repository**
before starting a new preview at a different port. Other TDS apps may occupy 4321.

No runtime environment variables or server database are needed. `npm run verify`
checks the built output; `npm run test:e2e` starts its own preview at 4390 if needed.
Social preview images are committed generated assets. Regenerate them with
`node scripts/social-images.mjs` if the public name or role changes.
