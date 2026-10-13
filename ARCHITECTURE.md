# Architecture and source analysis

## Findings (13 October 2026)

- The existing landing frontend at main `05c2d5e` is Astro with a Node adapter,
  React islands and a file-backed page cache. Its main contact anchor is `contact`
  in both languages. Live responses for both roots and legal pages returned 200.
- Shared package source is locally 0.56.0; the landing site's installed, published
  dependency is 0.55.1. This portfolio pins **0.55.1**, not a local sibling path.
  No sibling repository was modified. Shared CSS is bundled by Vite but the
  private package source is not vendored or committed publicly.
- The core frontend package is a host for composed product extensions, not a
  standalone public portfolio. Its account gates and APIs are deliberately absent.
- The blog/tools sources demonstrate the token/surface split and local fonts.
  Their CMS, advertising, account and SSR infrastructure is unnecessary here.
- Existing Actions publish a manually built release and notify a host webhook.
  The portfolio copies the principle, not the SSR/Passenger release tree.
- CVs in DE/EN agree on four roles and education. Original certificate documents
  supply exact learning-path titles, issuers and dates. No proficiency levels
  beyond documented knowledge are inferred. Two projects were individually approved
  in the task: the TDS company site and TD Tools. Other research is excluded from Git.

## Implementation

`src/data/content.ts` owns stable IDs, language routes, profile, career, education,
skills, project schemas and approved records. `certificates.json` owns credential
facts. `projects.json` contains additional approved work, including the main-site
references and design studies, IdleArcade and the in-development JavaScript light/
shadow framework. Source evidence is the public reference catalogue and GitHub
code; project status and ownership were confirmed by Julian in this task. Zod parses records and rejects duplicate IDs, duplicate routes and
unapproved projects. `allRoutes()` is the common inventory for generation,
sitemap and tests.

`src/pages/[...path].astro` prerenders every inventory route. `Layout.astro` owns
the shared shell/head/navigation; `View.astro` composes the views. All substantive
content is HTML at build time. No React hydration is needed for these interactions.
Small TypeScript handlers enhance native details, filters and dialogs after each
`astro:page-load`. The ClientRouter owns back/forward, scroll restoration and
route announcements. Focus moves to main after a client route change without
changing restored scroll position; the theme is retained before swaps.

Explicit English/deep routes always win. Only an ambiguous root entry negotiates
language, honoring a remembered selection before browser language. First-visit
browser detection is guarded per session. Metadata stays deterministic and robots
receive the static requested HTML. Theme uses shared pre-paint and write APIs;
the portfolio does not start shared account synchronization or API requests.

## Deployment boundary

`dist/` is a standalone static document root with real HTML directories. It must
not be rewritten wholesale to `/index.html`. Source belongs on `main`; approved
static output goes to `release`. The release workflow validates a full SHA on main,
runs all checks, waits on the protected production environment and verifies the
serving build stamp. See DEPLOYMENT.md for host setup and rollback.

Official routing reference: [Astro ClientRouter and view transitions](https://docs.astro.build/en/guides/view-transitions/).
