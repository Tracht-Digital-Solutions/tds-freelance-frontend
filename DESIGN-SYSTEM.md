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

Fonts use the actual TDS mapping: Lato (`--font-display`), Plus Jakarta Sans
(`--font-body`) and JetBrains Mono (`--font-mono`). Fontsource faces are imported
in Astro frontmatter, preserving font URL rebasing and emitting local assets.
No Google Fonts calls or other third-party font requests are made.

The portfolio adds numbered side navigation, a personal portrait stage, editorial
headings, a career rail, skill disclosures and a credential gallery. Components
use shared card/button/input geometry. Main content stays visible before scripting.
CSS transforms support deliberate hover effects; Astro handles view transitions.
Reduced motion disables decorative transitions and hover movement.

Responsive breakpoints: 1150, 800 and 590px. Below 800px a native disclosure
navigation replaces the sidebar. Actions and controls are at least 44px high.
Dialogs use `margin:auto`, native focus trapping, Escape, a labeled close button
and native focus return. Filtering uses accessible controls and live result counts.

The portrait is right-aligned inside an asymmetric frame: its existing cut edge
coincides with the frame edge. The original photo is unchanged. The caption is
a separate solid band. Navigation and the values block share one sticky container
with bounded height so they cannot scroll over one another; short desktop
viewports may scroll the sidebar internally.
