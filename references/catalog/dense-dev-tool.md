# Dense Dev Tool Archetype

**Vibe:** Information-first. Dark by default. Restrained color. High information density. Built for engineers who do not want chrome getting in the way.

**Best for:** Developer tools, dashboards, IDEs, command-line-adjacent UIs, internal tools. The product is a tool, and the design should disappear in service of the work.

## Reference sites

### Linear (app)

- **What it does well:** Information density without clutter. Sidebar navigation that scales to 50+ projects without becoming a wall. Keyboard-first interactions visible in the UI (kbd-style hints). Restrained accent color (a single purple) used for status and active states. Dark mode by default, with a clean light mode. Type is functional, not expressive. Every pixel earns its place.
- **What to borrow:** The density. The restraint. The keyboard-first signals.
- **What to be careful of:** Linear's density comes from years of iteration. Do not try to ship day-one at Linear's density without a clear brief that wants it. Start standard-dense and tighten if the user asks.

### Vercel (dashboard)

- **What it does well:** Information density that breathes. The deployment list, logs, and settings are dense but never claustrophobic. Strong use of monospace for technical content. The accent (a single blue) is reserved for status indicators. Dark mode by default, but not a moody dark — a working dark.
- **What to borrow:** The "working dark" palette. The use of monospace for technical content. The way density is achieved with consistent spacing, not crammed layout.
- **What to be careful of:** Vercel's design language is opinionated. A team building a different dev tool will want to differentiate, not clone. Borrow the principles, not the literal choices.

### Datadog

- **What it does well:** Maximum information density. The product is a monitoring tool, and the UI optimizes for engineers who want to see everything at once. Charts, tables, status indicators, drill-downs — all visible without scrolling. Color is functional (red for alerts, green for healthy) and restrained in the chrome.
- **What to borrow:** The functional color. The information density. The status-indicator vocabulary.
- **What to be careful of:** Datadog's density is extreme. Most products are not monitoring tools. If the brief does not say "monitoring" or "observability," do not push this far.

## Brief mapping

If the user's brief says:
- "developer tool," "IDE," "CLI," "terminal-adjacent" → this archetype is a strong fit
- "dashboard," "data," "metrics," "monitoring" → this archetype (especially Datadog) is a strong fit
- "marketing," "landing page," "hero-focused" → look at `saas-marketing.md` instead
- "warm," "consumer," "friendly" → look at `warm-consumer.md` instead
- "documentation," "reading-first" → look at `editorial-content.md` instead

## Anti-references for this archetype

- **Light mode defaults.** A dev tool that ships with a white background and "toggle dark mode" as a feature is signaling that the team does not use their own product.
- **Marketing copy in the chrome.** A dev tool with a hero that says "Empower your engineering teams to ship faster" is a marketing page, not a tool.
- **Emoji as icons.** Dev tools use real icons (Lucide, Heroicons, Tabler). Emoji in a sidebar is a tell.
- **Generic blue accents.** If every dev tool uses blue-500 as the accent, the accent stops being meaningful. Pick a color that fits the brand (or use a single neutral).

## Suggested token profile

When the agent uses this archetype as a starting point, it typically results in:

- **Color:** dark mode default. Background near-black (#0A0A0A or similar). Surfaces slightly lighter (#111111, #1A1A1A). Text near-white. A single accent used for active states and status, not for branding.
- **Typography:** one sans-serif for UI, one monospace for technical content. Body 13–14px (not 16px — dev tools are denser). Display sizes are still larger but the gap between display and body is tighter than marketing.
- **Spacing:** 4px base (tighter than marketing). 1.0–1.5x the base for most components. Tighter than marketing, looser than data tables.
- **Layout:** sidebar nav + main content. Dense tables. Multiple panels. Status indicators throughout.
- **Elevation:** flat or subtle borders. Shadows are rare. Borders define structure.
- **Motion:** minimal. State changes are instant or have a 50–100ms transition. No bouncy animations.

These are starting points, not prescriptions. The user's brief overrides the archetype.
