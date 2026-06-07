# Editorial Content Archetype

**Vibe:** Reading-first. Classic type. Generous margins. No chrome. The product is the words.

**Best for:** Blogs, documentation, long-form content, essays, articles, reading experiences. The UI disappears in service of the reading.

## Reference sites

### Stripe blog / press

- **What it does well:** Editorial design at its peak. The Stripe blog reads like a magazine. Generous margins. A custom serif for headlines. A clean sans-serif for body. Photography is treated as content, not decoration. The chrome is minimal — a small header, a footer with links. The page is a stage for the words.
- **What to borrow:** The marginalia. The way chrome is reduced to almost nothing. The type pairing.
- **What to be careful of:** Stripe's type is custom. Most projects do not have a custom typeface. Aim for the editorial discipline, not the literal type.

### Substack

- **What it does well:** Pure reading. The reader sees a single column of text, centered, with generous margins. The type is a serif designed for screen reading. The chrome is a small header and a subscribe button. The product is the writing. Nothing else.
- **What to borrow:** The single-column discipline. The reading-first type. The minimal chrome.
- **What to be careful of:** Substack is intentionally austere. A different product might want more structure (sidebar table of contents, related articles, etc.). Borrow the principles, not the minimalism specifically.

### The New York Times

- **What it does well:** Editorial design as a system. Multiple type families, multiple column widths, a clear hierarchy from headline to caption. Photography is treated as content. The site reads as a publication. The chrome (header, navigation) is recognizable but not loud.
- **What to borrow:** The type system. The way hierarchy is expressed through size, weight, and family — not just size.
- **What to be careful of:** The NYT's design is a system built over decades. A new product should not try to clone the whole system. Borrow the discipline of typographic hierarchy, not the specific system.

## Brief mapping

If the user's brief says:
- "blog," "publication," "long-form," "essays," "documentation" → this archetype is a strong fit
- "reading-first," "minimal chrome," "content-focused" → this archetype is a strong fit
- "product," "tool," "dashboard" → look at `dense-dev-tool.md` or `dashboard-admin.md` instead
- "marketing," "conversion-focused" → look at `saas-marketing.md` instead
- "consumer app," "social" → look at `warm-consumer.md` instead

## Anti-references for this archetype

- **Marketing chrome on content.** A blog with a sticky header, a sidebar CTA, and a "subscribe to our newsletter" pop-up. The chrome should be minimal when the content is the product.
- **Tiny body type.** Body text below 16px is hostile to readers. The reading type should be at least 16px, ideally 17–18px.
- **Bad type pairing.** A bold display sans-serif with a thin body sans-serif is not a system — it is a mess. Editorial design requires intentional type pairing.

## Suggested token profile

When the agent uses this archetype as a starting point, it typically results in:

- **Color:** light mode default, often warm (off-white or cream). Text is warm dark, not pure black. Accent is a single editorial color (often a deep red, blue, or gold) used for links and emphasis. Minimal palette.
- **Typography:** a serif for display/headlines, a sans-serif (or a different serif) for body. The display is allowed to be large (36–60px) but the body is the priority — readable, well-spaced, 17–19px. Line height 1.6–1.7 for body.
- **Spacing:** 8px base, but the rhythm is paragraph-driven. Section breaks are 2–3x the base. Generous margins on the content column (max-width 640–720px for reading).
- **Layout:** single-column content, centered, generous side margins. Optional sidebar for navigation or related content. The page is composed vertically.
- **Elevation:** none. Editorial design is flat. No shadows. No glassmorphism. No gradients.
- **Motion:** none. Pages do not animate. The reader scrolls. The chrome is static.

These are starting points, not prescriptions. The user's brief overrides the archetype.
