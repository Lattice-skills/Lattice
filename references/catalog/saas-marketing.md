# SaaS Marketing Archetype

**Vibe:** Hero-focused. Generous whitespace. Big typography. Single accent color. Confident.

**Best for:** Marketing pages, landing pages, "above the fold" first impressions. The homepage of a SaaS product where the goal is to convert a visitor in 8 seconds.

## Reference sites

### Stripe

- **What it does well:** Editorial hero with a sharp, almost-newspaper feel. The product UI is rendered in a hero "preview" that looks like a screenshot but is actually a designed illustration. Big serif headlines paired with sans-serif body. Single accent (the Stripe blue) used sparingly — for the CTA and key links. Generous whitespace between sections. The site reads as a *publication*, not a marketing page.
- **What to borrow:** The hero composition. The restraint with color. The way the product preview is staged.
- **What to be careful of:** Stripe's typography is custom (a variant of Sohne). Most projects do not have a custom typeface. Aim for the composition and restraint, not the literal type.

### Linear

- **What it does well:** Product-led marketing. The hero shows the product in action, not a generic "we help teams do X" headline. The site feels like a developer's tool, not a marketing brochure. Black-and-white photography in the changelog. Strong type hierarchy. The product screenshot is staged with intent — every pixel is composed.
- **What to borrow:** The product-in-hero composition. The restraint. The "this is a tool" tone.
- **What to be careful of:** Linear's site is dense by SaaS-marketing standards. If your brief says "generous whitespace," do not borrow Linear's density. Borrow the composition, not the rhythm.

### Vercel

- **What it does well:** Editorial weight in a developer-tool context. The hero is a single statement with a developer-flavored product preview. Strong type. The page mixes marketing copy (light, generous) with developer-flavored sections (denser, more technical) — a hybrid that suits a dev-tool brand.
- **What to borrow:** The hybrid rhythm. The way the page transitions from marketing to developer.
- **What to be careful of:** Vercel's site changes frequently. What looks like Vercel today may look different in 6 months. Anchor on the principles, not the specific layout.

## Brief mapping

If the user's brief says:
- "modern," "clean," "confident," "editorial," "minimal" → this archetype is a strong fit
- "developer-friendly," "tool," "product-led" → consider this archetype (especially Linear or Vercel)
- "warm," "friendly," "consumer" → look at `warm-consumer.md` instead
- "dense," "information-first" → look at `dense-dev-tool.md` or `dashboard-admin.md` instead
- "documentation," "reading-first," "long-form" → look at `editorial-content.md` instead

## Anti-references for this archetype

- **Default SaaS templates.** The "Feature grid with three icons + headlines + descriptions" pattern. The "Trusted by 10,000+ companies" logo wall with no context. The "🚀 Build faster" hero. The "Get started for free" CTA with no context.
- **Stock photography.** A startup team laughing around a laptop. A woman pointing at a screen. These are signals that the product has no visual identity of its own.
- **Gradient backgrounds.** A blue-to-purple gradient with white text on top. The most overused default in AI frontends.

## Suggested token profile

When the agent uses this archetype as a starting point, it typically results in:

- **Color:** light mode default, single accent (often a saturated color used sparingly), near-black text on white, gray scale for secondary text and borders.
- **Typography:** one sans-serif family, large display sizes (48–80px for hero), tight body (16–18px), 1.4–1.5 line height, restrained weight hierarchy.
- **Spacing:** 8px base, generous (1.5–2x the base for sections, 0.5–1x for components).
- **Layout:** 12-column grid, single-column hero, asymmetric product preview, generous section margins.
- **Elevation:** flat or soft shadow. No glassmorphism. Borders are subtle.
- **Motion:** restrained. Fade-ins, slight scale on hover. Nothing bouncy.

These are starting points, not prescriptions. The user's brief overrides the archetype.
