# Design system

The app imports the published TDS `base.css`, `primitives.css` and
`surfaces/marketing.css` through the package exports. Tailwind PostCSS compiles
the shared `@theme` declarations. Do not recreate package tokens locally or
publish package source. Design changes that require sibling edits need separate
authorization.

Verified light tokens: navy `#050F68`, bordeaux `#820933`, coral `#FF7A9C`, paper
`#FAFAF7`, black `#0B0A07`. The shared dark theme changes structural and text tokens;
fixed navy surfaces use `--color-surface-navy` so they retain contrast in both modes.
The portfolio rose panels are a local personal composition with fixed dark text.

The portfolio has its own typeface pair on purpose, so the person reads apart from
the company site: Bricolage Grotesque (`--font-display`, overridden in `global.css`)
and Instrument Sans (`--font-body`). JetBrains Mono (`--font-mono`) stays from TDS and,
with the colours, cards and hard shadows, ties the site to the brand. Fontsource faces are imported
in Astro frontmatter, preserving font URL rebasing and emitting local assets.
No Google Fonts calls or other third-party font requests are made.

A fixed navy spine carries identity, numbered side navigation and values and meets the
footer. The site adds a personal portrait stage with a constructed bordeaux quarter
circle, the shared brand bar under each page heading, a bordeaux closing band, editorial
headings, a career rail, skill disclosures and a credential gallery. Components
use shared card/button/input geometry. Main content stays visible before scripting.
CSS transforms support deliberate hover effects; Astro handles view transitions.
Reduced motion disables decorative transitions and hover movement.

No gradients. Text stays at 0.68rem or larger. Dark fills take a coral hard shadow,
never a navy one. Responsive breakpoints: 1150, 1000, 800 and 590px. Below 800px a native disclosure
navigation replaces the sidebar. Actions and controls are at least 44px high.
Dialogs use `margin:auto`, native focus trapping, Escape, a labeled close button
and native focus return. Filtering uses accessible controls and live result counts.

The portrait is right-aligned inside its frame: its existing cut edge
coincides with the frame edge. The original photo is unchanged. The caption is
a separate solid band. Navigation and the values block share one sticky container
with bounded height so they cannot scroll over one another; short desktop
viewports may scroll the sidebar internally.

Minimal shadows match the main site: shared hard 6px card offsets and 3px
button offsets, with translucent navy ink in light mode and the shared dark ink.
Primary buttons use the shared primitive, including its coral shadow. Interactive
cards lift 2px on hover/focus; buttons press into their shadow. Shadows are never
animated, decorative/text elements stay flat, and reduced motion disables lifting.
