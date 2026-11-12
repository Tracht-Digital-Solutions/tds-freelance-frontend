# Content editing

Public facts live in `src/data/content.ts`, `src/data/projects.json` and `src/data/certificates.json`.
Keep technical IDs stable; translate editorial values with `{de,en}` / `l()`.
Editorial headings, story, values, AI position and all interface labels live in
`src/data/editorial.json`, validated through `editorial.ts`. Components call typed
`copy(key, lang)` references. Maintain existing semantic keys when changing wording.
Both translations must be nonempty. Do not add locale branching to route generation.

## Profile and story

Profile contains public business contacts only. Never add a private street address,
rates, availability, invented career facts or CV download. Story facts: Mindstorms
NXT, C++ at twelve, self-taught Batch/Java, Raspberry Pi, private development and music.
Legal pages remain links to the main domain; do not duplicate legal texts.

## Career and education

Add a record to `career` with a unique lowercase hyphenated ID, company, localized
period/role/summary/tasks and technology list. Details and language URLs are derived
automatically. Update `education` for qualifications. Check periods against the
source documents; do not infer dates or outcomes. Employer logos need usage permission.

## Skills

Skills live in `skillTree` (`content.ts`): area (`categories`) → sub-group
(`skillSubgroups`) → `[name, keywords]`. Area and sub-group order is the display
order; skills sort A–Z per language at render time. Use `l(de, en)` for names
that differ by language; the English name is the stable ID and the icon key in
`skillIcons.ts`. `keywords` are search-only synonyms in both languages: add the
umbrella terms people search for (e.g. Vue → "js framework javascript-framework")
so a search for a category finds its members. Area labels are deliberately not
searchable, so "Datenbank" does not match every data format.
Skill cards are static (icon, name, sub-group): not expandable, no proficiency
level or evidence filter. No percentage bars. Only list technologies actually
used in work or projects; planned tools (e.g. self-hosted monitoring) stay out.

The shared search in `client.ts` splits the query into tokens (AND), folds
case/diacritics, treats `-`/`_` as spaces, keeps `#`, `+`, `.` and tolerates
German plural endings. Containers marked `data-filter-group` hide with their
last visible item. Update the browser test when skill counts change.

## Projects: approval before any commit

Only individually approved records may enter the public `projects` array. The
schema requires `approved:true` and bilingual title, summary, category, stage,
role, technologies and sections. Put research, candidate names and confidential
drafts outside tracked files (`.private/` locally, or a private approval channel).
An approval flag in code does **not** replace a human approval in the task.

Use a stable ID; optional image must be an authorized local web asset. GitHub and
website URLs are optional. Never fabricate screenshots, client quotes, metrics
or a finished/live status. Named examples from an employer require usage clearance.
Use `kind` to distinguish client, employer, own, demo, study and development;
the overview renders one section per kind (`projectGroups`). Employment projects
stay anonymised: no client, customer or internal product names. `featured`
projects lead their section at full width. Without an image, `cover` sets the
drawn cover headline. Link a project
to a career station only with a supported `careerId`. Capture dimensions in
`imageWidth` and `imageHeight` to reserve the correct space on detail pages.
Project routes, sitemap and language links update automatically. Add regression
coverage when publishing new content; update the expected inventory count in tests.

## Credentials

Each JSON record needs ID, exact title, issuer, ISO date, category, subject skills
and `/images/certificates/<id>.webp`. Titles deliberately preserve the official
English learning-path names in both languages. Translate UI only. Category values:
management, development, data, ai, security, marketing.

Never commit original PDFs, certificate IDs or signature identifiers. Render an
authorized, reduced preview from the document, excluding the ID footer, and check
it visually. Image previews remain technically saveable; make no contrary claim.
The gallery describes learning-path certificates, not university degrees or exams.
When changing the catalogue size, update the Zod count, overview count and tests.

## Validation

Run `npm run quality` before merging. It covers Zod/TypeScript, static HTML,
language parity, metadata, links, assets, PDF exclusion, browser interactions and
automated accessibility. CONTENT.md does not authorize a production release.
