# Stave — Reference Analysis

## Screenshot 1 — Linear (app)

**Color:** Dark mode by default. Background near-black (#0A0A0A, #111111). Surfaces slightly lighter (#1A1A1A). Text near-white (#FAFAFA). Accent is a single purple (#5E6AD2) used for active states, links, and the brand mark — never for decoration.

**Typography:** Inter for UI. Tight letter-spacing. Body is 13–14px, regular weight. Headings are larger (16–20px) with semibold weight. The product is dense; the type is functional, not expressive. Monospace is used for keyboard shortcuts and IDs.

**Spacing:** 4px base scale. Tighter than marketing pages. Components are 1.0–1.5x the base. The sidebar is 240px wide. The main content area has 16–24px padding.

**Layout:** Sidebar navigation on the left, fixed. Main content area scrolls. Project lists are nested. Inbox, My Issues, Views, Projects. Status indicators (todo, in progress, done) are colored.

**Elevation:** Flat. Borders define structure. Subtle 1px borders on dividers. No shadows in the chrome.

**Motion:** Minimal. State changes are instant or 50–100ms transitions. No bouncy animations. Pages do not animate in.

## Screenshot 2 — Linear (marketing)

**Color:** Same palette as the app — dark mode, near-black, single purple accent. The marketing site is visually consistent with the product.

**Typography:** Inter Display for headlines (a tighter, more display-oriented cut). Larger sizes than the app — 48–64px for hero. Body 16–17px. Generous line height.

**Spacing:** More generous than the app. 8px base for marketing, 4px for app. Section breaks are 2–3x the base.

**Layout:** 12-column grid. Asymmetric hero with text on the left, product preview on the right. Single CTA. Section breaks are full-width with vertical padding.

**Elevation:** Flat. The product preview is a designed illustration, not a screenshot.

**Motion:** Subtle. Fade-ins on scroll. The product preview animates in once. No bouncy animations.

## Screenshot 3 — Vercel (dashboard)

**Color:** Dark mode by default. Background near-black. Surfaces slightly lighter. Accent is a single blue (#0070F3) used for status indicators (deployed, building, error) and the brand mark.

**Typography:** Geist Sans for UI, Geist Mono for technical content (deployment IDs, logs). Body 13–14px. Display sizes are larger in marketing contexts.

**Spacing:** 4px base. Dense — multiple panels visible at once. Tables are 0.5–1x the base.

**Layout:** Sidebar on the left, fixed. Main content area with cards and tables. Status indicators throughout. Multiple panels for related data (deployments, domains, analytics).

**Elevation:** Flat. Borders define structure. No shadows.

**Motion:** Minimal. Real-time updates (deployments, logs) animate. Page transitions are instant.

## Screenshot 4 — Datadog

**Color:** Dark mode. Background very dark (near-black). A wide range of status colors for charts and metrics (green for healthy, red for critical, yellow for warning). The chrome itself is restrained — the status colors live in the data, not the chrome.

**Typography:** Functional sans-serif. Body 12–13px. Monospace for metrics and IDs. The UI optimizes for information density, not expression.

**Spacing:** 4px base, very tight. Multiple panels visible. Tables are tight. Information density is the design goal.

**Layout:** Multi-panel. Sidebar for navigation. Main content is divided into widgets. Each widget is a chart, table, or status indicator.

**Elevation:** Flat. Borders and grid lines define structure.

**Motion:** Real-time updates animate. Charts redraw. Status indicators pulse for active alerts.

## Anti-references

### Generic SaaS template

**Why this is an anti-reference:** The hero has a "🚀 Build faster" headline, a "Trusted by 10,000+ teams" logo wall, and three feature cards with icons + titles + descriptions. The product is invisible. The design is interchangeable with thousands of other SaaS sites.

**What we explicitly avoid:**
- Emoji in the hero.
- Logo walls of "trusted by."
- 3-column feature grids with icon + title + description.
- "Get started for free" CTAs without context.
- Blue-to-purple gradient backgrounds.
- Stock photography of teams laughing around laptops.

## Synthesis

After analyzing all 4 references, the patterns that emerge:

**Color:** Dark mode is the default across all references. Backgrounds are near-black (#0A0A0A, #111111). Surfaces are slightly lighter (#1A1A1A). Text is near-white. A **single accent color** is used for active states, links, and the brand mark. The accent is saturated but not neon. Linear uses purple; Vercel uses blue. The choice is brand-specific.

**Typography:** Inter or Geist throughout. Tight letter-spacing. Functional, not expressive. Body 13–14px in the product, 16–17px in marketing. Display sizes are larger but the gap between display and body is tighter than consumer apps.

**Spacing:** 4px base scale. Tighter than marketing-focused designs. Components are 1.0–1.5x the base. Section breaks in marketing are 2–3x the base.

**Layout:** Sidebar navigation on the left, fixed. Main content area scrolls. Multi-panel layouts for dashboards. Asymmetric hero for marketing with text on one side, product preview on the other.

**Elevation:** Flat. Borders define structure. Subtle 1px dividers. No shadows in the chrome. No glassmorphism.

**Motion:** Minimal. State changes are instant or 50–100ms transitions. No bouncy animations. Real-time updates (status, logs) animate.

**Conflicts resolved:** The references are mostly aligned. The one tension is between Linear's restrained color (purple used very sparingly) and Datadog's wider use of color (status colors in data). The synthesis: status colors are functional, not decorative. The accent color is restrained; status colors are explicit when needed.

**Anti-references confirmed:**
- No emoji as design elements.
- No 3-column feature grids with icon + title + description.
- No "trusted by" logo walls.
- No gradient backgrounds.
- No glassmorphism.
- No bouncy animations.
