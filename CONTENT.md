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

Add a name to the appropriate skill group or create a validated explicit record.
Allowed levels: documented, foundation, advanced, expert. Default **documented**
means the skill appears in the CV, not a proficiency claim. Change the level only
after confirmation. Categories, contexts, level choices and searches are generated
from the records. No percentage bars. Keep German/English context references valid.

## Projects: approval before any commit

Only individually approved records may enter the public `projects` array. The
schema requires `approved:true` and bilingual title, summary, category, stage,
role, technologies and sections. Put research, candidate names and confidential
drafts outside tracked files (`.private/` locally, or a private approval channel).
An approval flag in code does **not** replace a human approval in the task.

Use a stable ID; optional image must be an authorized local web asset. GitHub and
website URLs are optional. Never fabricate screenshots, client quotes, metrics
or a finished/live status. Named examples from an employer require usage clearance.
Use `kind` to distinguish client, own, demo, study and development. Link a project
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
