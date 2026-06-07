# Stave — Decisions

## Color

Dark mode by default. Background `#0A0A0A` for the page, `#111111` for surfaces, `#1A1A1A` for elevated surfaces. Text `#FAFAFA` (primary), `#A1A1A1` (secondary/muted). Borders `#262626` (subtle dividers). Accent: blue `#3B82F6` (chosen over purple per the user's preference for a more restrained, Vercel-aligned feel). Accent is used for active states, links, primary CTAs, and the brand mark — never for decoration.

## Typography

Inter for UI, JetBrains Mono for code/IDs. Display: Inter, 56px / 64px line height, semibold (600), tight letter-spacing (-0.02em). Heading: Inter, 32px / 40px, semibold. Subheading: Inter, 20px / 28px, medium (500). Body: Inter, 16px / 24px, regular (400). Body small: 14px / 20px. Label: 13px / 16px, medium (500). Caption: 12px / 16px, regular. Code: JetBrains Mono, 14px / 20px, regular.

## Spacing

4px base scale. Generous for marketing (section breaks 96–128px, component spacing 24–32px), tighter for product UI (component spacing 8–16px, table cell padding 8–12px).

## Layout

12-column grid, 1280px max-width. Sidebar navigation on the left (240px wide, fixed). Main content area scrolls. Asymmetric hero for marketing with text on the left (columns 1–6), product preview on the right (columns 7–12). Generous top margin (96–128px). Single primary CTA in the hero.

## Elevation & depth

Flat. Borders define structure. 1px borders on dividers (`#262626`). No shadows in the chrome. No glassmorphism. The product preview in the hero is a designed illustration with a 1px border, no shadow.

## Shapes

Border radius scale: `0` (none), `4px` (sm), `6px` (md), `8px` (lg), `9999px` (full/pill). Buttons use `md` (6px). Cards use `lg` (8px). Pills/badges use `full`.

## Other

- **Hero copy:** "The database client that respects your time." Subhead: "Connect, browse, and query your data without the chrome." Primary CTA: "Get started." Secondary CTA: "Read the docs."
- **No emoji** anywhere in the UI.
- **Monospace** for code, SQL queries, IDs, and keyboard shortcuts.
- **Keyboard hints** visible in the UI where applicable (e.g., `⌘K` for the command palette).
- **Status colors:** green `#10B981` (success), red `#EF4444` (error), yellow `#F59E0B` (warning), blue (accent, for active states). Status colors are explicit, not decorative.
