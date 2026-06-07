# Dashboard / Admin Archetype

**Vibe:** Tables, forms, density, status indicators, action surfaces. The UI is a tool for operators.

**Best for:** Admin panels, internal tools, data-heavy interfaces, ops dashboards, anything where the user is doing work — not browsing, not reading, not marketing themselves. The UI optimizes for getting work done.

## Reference sites

### Vercel (dashboard)

- **What it does well:** Information density that breathes. The deployment list, logs, and settings are dense but never claustrophobic. Strong use of monospace for technical content. The accent (a single blue) is reserved for status indicators. Dark mode by default, but not a moody dark — a working dark.
- **What to borrow:** The "working dark" palette. The use of monospace for technical content. The way density is achieved with consistent spacing, not crammed layout.
- **What to be careful of:** Vercel's design language is opinionated. A team building a different admin tool will want to differentiate, not clone. Borrow the principles, not the literal choices.

### Supabase (dashboard)

- **What it does well:** Database and table management with clarity. Tables are dense but readable. Status indicators (active, paused, error) are color-coded but not garish. Forms are clear, with inline validation. The dashboard is a real product UI, not a marketing surface. Color is functional (red for errors, green for success) and restrained in the chrome.
- **What to borrow:** The table discipline. The functional color. The way forms are designed for input, not for show.
- **What to be careful of:** Supabase is opinionated about its brand (green). A different product should pick its own accent.

### Retool

- **What it does well:** Internal tools for operators. The UI is a canvas for building apps that other people will use inside a company. Forms, tables, buttons, inputs — all dense, all functional. The design is utilitarian in the best sense. Color is muted. Type is functional.
- **What to borrow:** The utilitarian discipline. The way the UI gets out of the way of the work.
- **What to be careful of:** Retool is intentionally utilitarian. A consumer-facing admin panel might want a slightly warmer feel. Borrow the discipline, not the austerity.

## Brief mapping

If the user's brief says:
- "admin," "internal tool," "ops," "operator" → this archetype is a strong fit
- "tables," "forms," "data," "CRUD" → this archetype is a strong fit
- "marketing," "landing page," "consumer" → look at `saas-marketing.md` or `warm-consumer.md` instead
- "developer tool" (general) → look at `dense-dev-tool.md` instead
- "documentation," "reading-first" → look at `editorial-content.md` instead

## Anti-references for this archetype

- **Pretty empty dashboards.** A dashboard with three big "metric cards" and nothing else is a screenshot, not a product. Real admin tools are dense.
- **Marketing copy in chrome.** An admin panel with a hero that says "Manage your data with confidence" is a marketing page, not a tool.
- **No status indicators.** A table without status columns (active, paused, error, pending) is a CSV. Real admin tools have status vocabulary.
- **Modals for everything.** Real admin tools use inline editing, side panels, and direct manipulation. Modals are for confirmations, not for forms.

## Suggested token profile

When the agent uses this archetype as a starting point, it typically results in:

- **Color:** light or dark mode (both should work — admin tools are used all day). Background is near-white or near-black, not pure. Text is high-contrast. Accent is functional (links, primary buttons, active states). Status colors (success, warning, danger, info) are defined and used consistently.
- **Typography:** one sans-serif for UI, one monospace for IDs, code, and technical content. Body 13–14px (smaller than consumer apps — operators are used to dense UIs). Display sizes are still larger but the gap is tighter.
- **Spacing:** 4px base (tight). Components are 1.0–1.5x the base. Tables are 0.5–1x the base. Density is the point.
- **Layout:** sidebar nav + main content area. Tables are common. Forms are common. Status indicators throughout. Multiple panels for related data.
- **Elevation:** flat or subtle borders. Shadows are rare. Tables use row borders or zebra striping.
- **Motion:** minimal. State changes are instant or have a 50–100ms transition. No bouncy animations.

These are starting points, not prescriptions. The user's brief overrides the archetype.
