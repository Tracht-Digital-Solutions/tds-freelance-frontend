# Deployment runbook

## Current boundary

Source lives at `Tracht-Digital-Solutions/tds-freelance-frontend`, default branch
`main`. This is a static Astro site, not a Passenger/Node application. Main pushes
and PRs run quality.yml and upload the static build; **they do not deploy**.
Only manual `release.yml` publishes `release` and calls a hosting webhook.

## Required hosting configuration

1. Create `freelance.tracht-digital.de` with DNS and a valid TLS certificate.
2. Configure a static document root and a Git checkout tracking the `release`
   branch. The branch root is the complete webroot, including `.htaccess`.
3. Give the host read-only repository access. A public repository can be pulled
   without a package token; the compiled release has no private package install.
4. Use the provider-generated deployment webhook. If using Plesk Git, configure
   its documented repository pull/deployment hook and deployment target. The
   workflow calls the secret URL with POST (Plesk's hook answers a GET with 404); verify that matches this
   actual host before the first release. No custom shell-execution endpoint.
5. Serve directory index.html for every route; do not rewrite missing routes to
   the home page. Configure the 404 document and equivalent security headers for
   nginx or any host that ignores Apache .htaccess. Disable caching for
   `build-info.json`; hashed `_astro/` assets may use immutable caching.
6. Keep the previous release artifact for rollback and define an atomic publish
   mechanism on the host. A Plesk deployment should copy the checkout to the
   configured document root. The actual host has not been accessed in this task.

## GitHub configuration

- Allow this repository to read the private `tds-shared` package with GITHUB_TOKEN,
  or set `NPM_TOKEN` with authorized `read:packages`. Cross-repository private
  Packages access does not follow from source repository visibility alone.
- The `production` environment is configured with required review by `jtracht`
  and deployment restricted to main. Protect main with the `check` quality gate.
- Set secret `DEPLOY_WEBHOOK_URL` in production. Do not log it or commit it.
- Production build needs no public environment variables. Workflow permissions
  are read-only for verification and contents:write only for release publication.

## Release procedure

1. Review public contents and confirm individual reference approvals. Confirm
   the main-domain privacy notice covers the portfolio's subdomain, static hosting
   logs and preference storage. The live notice was reachable but did not explicitly
   mention `freelance.tracht-digital.de` on 13 October 2026; coverage needs review.
2. Obtain explicit production release approval. Copy the full approved main SHA.
3. Run the manual Production release workflow from main with that SHA. It refuses
   a malformed SHA or a source not contained in main, reruns the complete checks,
   and uploads the exact checked build. A failed gate cannot deploy.
4. Approve the protected production environment. The job checks that the HTTPS
   webhook secret exists before it updates the release branch.
5. After notification it polls build-info.json for up to four minutes, matching
   the approved SHA, then smoke-tests all sitemap routes for substantive HTML.
6. Inspect mobile/desktop and contact/legal destinations on the live domain.
   A published release branch alone is **not** a successful deployment.

The site has not been released as part of the implementation. No host credentials,
DNS configuration, webhook or production environment approval were supplied.

## Failure and rollback

A webhook failure or a stale/missing live stamp fails the workflow after the branch
may already have changed. Check the host's Git deployment log, target directory,
TLS and cache settings. Do not assume that failure means the old site is still live.

To roll back, select a previously approved known-good main SHA and run the same
manual workflow, with renewed release authorization. It rebuilds and verifies that
source before publishing. Alternatively restore the saved static artifact through
the host's deployment facility and compare its stamp. Verify all routes again.

Existing TDS SSR release workflows are references only; no Node restart, server
bundle or `npm install` on the production host is necessary here.
