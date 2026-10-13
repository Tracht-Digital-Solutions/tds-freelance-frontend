# tds-freelance-frontend

Static Astro portfolio for Julian Tracht. Work only in this repository. Follow
the user's explicit publication approvals; never infer reference approval from
repository visibility or from this file.

Commands: `npm ci`, `npm run dev`, `npm run quality`. Windows E2E uses installed
Chrome; Linux needs `npx playwright install --with-deps chromium`.

- Shared TDS design is a pinned private package; never vendor its source or edit siblings.
- All views ship complete static HTML; retain ClientRouter navigation and DE/EN parity.
- No original PDFs, exact home address, availability, rates or unapproved references.
- Keep all confidential research outside tracked files. Never publish projects automatically.
- Use only confirmed proficiency levels. No invented metrics, quotes or customer screenshots.
- Production is manual and needs explicit approval; never run release from a normal push.
- Native interactions must remain usable without JS; respect reduced motion and focus.
- Any `dialog` must declare `margin:auto`.

Read before editing: [architecture](ARCHITECTURE.md) for routes/runtime,
[design](DESIGN-SYSTEM.md) for styling/motion, [content](CONTENT.md) for facts,
[deployment](DEPLOYMENT.md) for workflows, [security](SECURITY.md) for public assets,
[QA](QA.md) for checks.
