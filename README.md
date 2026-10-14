# Julian Tracht · Freelancer portfolio

Bilingual personal portfolio and digital CV for **freelance.tracht-digital.de**.
Astro 7.3.8 renders all public routes to HTML; the official ClientRouter handles
client navigation, transitions and history. No application server, CMS, database,
contact form, tracker or PDF download is included.

## Start

Node 24, an authorized private-package credential and npm 11 are required.
See [INSTALL.md](INSTALL.md). Run `npm ci`, `npm run dev`, then `npm run quality`.
CI builds on main and pull requests; production is **manual only**.

## Features

- Eight views in German and English, four career details per language and 19
  approved portfolio entries per language (62 public URLs), with client work,
  own projects, demos, design studies and work in development clearly labelled.
- Shared TDS tokens, primitives, theme bootstrap and preference handling from
  the pinned private package `@tracht-digital-solutions/tds-shared@0.55.1`.
- Local fonts, responsive portrait, search/category/context/evidence filters,
  credential gallery, native accessible dialogs and progressive enhancement.
- Canonicals, language pairs, sitemap, social previews, semantic HTML and JSON-LD.
- Manual release pipeline with approved commit validation, release branch,
  secret webhook and live commit/route checks.

## Documentation

[Architecture](ARCHITECTURE.md) · [Design system](DESIGN-SYSTEM.md) ·
[Content](CONTENT.md) · [Deployment](DEPLOYMENT.md) · [Security](SECURITY.md) ·
[Verification](QA.md) · [Agent instructions](AGENTS.md)

## Rights

**Öffentlich einsehbar, alle Rechte vorbehalten.** Der Code kann gelesen und
zur Beurteilung der Programmierkenntnisse betrachtet werden. Es besteht keine
allgemeine Erlaubnis zum Kopieren, Verändern oder kommerziellen Weiterverwenden.
Die vollständigen Bedingungen und Ausnahmen stehen in [LICENSE](LICENSE).

**Publicly viewable, all rights reserved.** Public access permits inspection of
the code, but grants no general permission to copy, modify or commercially reuse
it. See [LICENSE](LICENSE) for the complete terms and exceptions.
Third-party libraries and fonts retain their own licenses; see [NOTICE.md](NOTICE.md).
Private package source, CV PDFs and certificate PDFs must never be committed.

## Release status

The source implementation is separate from the production site. Production
needs explicit approval, hosting configuration, a protected environment and
credentials described in DEPLOYMENT.md. A successful local build is not proof
of deployment. Further project references require individual publication approval.
