# Security and privacy

No application backend, contact handling, analytics, advertising or external
scripts are deployed. Public business contact links are intentional. Search and
filtering run locally; gallery content is static. Original PDFs and unapproved
research are excluded from source and output.

Theme/language choices use local storage and shared TDS preference cookies
through the published package. No account synchronization is started. The shared
cookie can span `.tracht-digital.de`; document it in the applicable privacy policy.
Storage failures preserve a functional site. The portfolio makes no promise that
public images cannot be saved.

The Apache header example restricts sources to the same origin, prevents framing
and disables camera/microphone/location. Inline scripts are needed for the
pre-paint theme bootstrap and Astro runtime; the baseline CSP therefore allows
inline scripts/styles. A future stricter hash policy must include the exact built
scripts. Do not claim this is a nonce-based policy. Configure equivalent headers
in nginx if `.htaccess` is ignored. Enable HTTPS and HSTS at the hosting layer after
checking all relevant subdomains. Never put tokens in `PUBLIC_*` variables.

Private package source is not vendored; compiled design CSS and the small browser
helpers are bundled for use under their existing package authorization. Fonts and
dependencies retain licenses. No source maps are published by default.

Release requires a manually selected main commit and all quality gates. Set
production environment protection with required reviewers and restrict trusted
workflow changes. Store a narrowly authorized Packages token and deployment URL
in Secrets. The webhook should be the hosting provider's secret hook, not an
arbitrary unauthenticated shell endpoint. A failed webhook/live verification fails
the run even if the release branch already exists; follow the rollback runbook.

Report security issues privately to kontakt@tracht-digital.de. Avoid public issues
containing credentials, personal data or exploit details before coordination.
