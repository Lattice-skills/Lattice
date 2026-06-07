# Warm Consumer Archetype

**Vibe:** Soft color. Friendly type. Balanced whitespace. Approachable. The product feels like it was made by humans who care, not by a tool that has never met a user.

**Best for:** Consumer apps, productivity tools, content platforms, social products, anything where the audience is a person, not a job title. The product feels less like a tool and more like a workspace.

## Reference sites

### Notion

- **What it does well:** Friendly, soft color. The accent color is muted, not saturated. Type is a humanist sans-serif that feels welcoming. Generous whitespace without feeling empty. The sidebar is organized but not technical. The product feels calm. Animation is gentle — pages fade in, blocks rearrange softly.
- **What to borrow:** The color restraint. The humanist type. The gentle motion.
- **What to be careful of:** Notion's design has evolved significantly. The current product has a different feel from its earlier marketing. Anchor on the principles (calm, soft, human) not the literal 2024 design.

### Cron (calendar)

- **What it does well:** Editorial product design. The product is a calendar, and the design makes the calendar feel like a magazine. Strong type hierarchy with a serif display and a sans-serif body. Generous whitespace. Single accent (a yellow) used sparingly. The product feels considered, not generic.
- **What to borrow:** The editorial weight. The way a functional product can have personality.
- **What to be careful of:** Cron is one product with one strong opinion. Borrowing its specific look can feel derivative. Borrow the editorial approach, not the specific type or color.

### Posthog (marketing)

- **What it does well:** Personality in a developer-tool context. The marketing site is warm — friendly illustrations, conversational copy, soft color. The product (an analytics tool) is shown with personality: charts with friendly labels, status messages that sound like a human wrote them. The brand has a voice.
- **What to borrow:** The voice. The way personality can live inside a functional product.
- **What to be careful of:** Posthog's personality is theirs. A different brand should find their own voice. Do not copy Posthog's specific illustrations or copy.

## Brief mapping

If the user's brief says:
- "warm," "friendly," "approachable," "human" → this archetype is a strong fit
- "consumer," "productivity," "content," "social" → this archetype is a strong fit
- "developer tool," "CLI," "dashboard" → look at `dense-dev-tool.md` or `dashboard-admin.md` instead
- "marketing page," "conversion-focused" → look at `saas-marketing.md` instead
- "documentation," "long-form reading" → look at `editorial-content.md` instead

## Anti-references for this archetype

- **Cold, generic SaaS.** A consumer product that looks like B2B SaaS (blue-500, hero CTA, "Trusted by 10,000+") is a category mismatch. The product should feel like it was made for the audience.
- **Cute overload.** Hand-drawn illustrations everywhere, playful microcopy, emoji as design elements. Warmth is not the same as cuteness.
- **Generic dark mode.** A consumer product defaulting to dark mode is signaling that it has not thought about its audience. Most consumer products ship light first.

## Suggested token profile

When the agent uses this archetype as a starting point, it typically results in:

- **Color:** light mode default. Soft, desaturated palette. Accent is muted (not a saturated primary). Background is warm (slight cream or off-white, not pure white). Text is warm dark (not pure black).
- **Typography:** humanist sans-serif (Inter, IBM Plex Sans, or similar) or a humanist serif for display. Body 16–17px (larger than dev tools). Line height 1.5–1.6 (more breathing room).
- **Spacing:** 8px base, balanced (1.0–1.5x for components, 1.5–2x for sections). Generous but not empty.
- **Layout:** 12-column grid, single-column content, sidebar for navigation. Centered or asymmetric compositions. Generous margins.
- **Elevation:** soft shadows. Subtle, not dramatic. Borders are warm gray, not cold.
- **Motion:** gentle. Fade-ins, soft transitions (200–300ms), no bouncy animations. Pages feel like they breathe.

These are starting points, not prescriptions. The user's brief overrides the archetype.
