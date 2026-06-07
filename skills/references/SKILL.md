---
name: references
description: Use this skill in two phases of the Lattice workflow: (1) Phase 2 — direction selection, where the agent proposes 3–5 UI directions with reference sites based on `brief.md`; (2) Phase 3 — screenshot collection & multimodal analysis, where the agent analyzes 5–10 reference screenshots the user provides and extracts color, typography, spacing, layout, elevation, and motion patterns into `analysis.md`. In Phase 2, the agent first searches the web for matching reference sites, then falls back to the 5 starter archetypes in `references/catalog/`, then falls back to its own knowledge of well-designed sites. In Phase 3, the agent reads each image multimodally and produces a structured analysis.
---

# References

The references skill is Lattice's connection to the visual world. It does two things:

- **Phase 2 — Direction Selection:** given `brief.md`, propose 3–5 UI directions with reference sites, and let the user pick.
- **Phase 3 — Screenshot Collection & Multimodal Analysis:** given 5–10 reference screenshots from the user, extract the design patterns into `analysis.md`.

The skill does **not** design the UI. It collects the references the rest of the workflow builds from.

This skill assumes the Lattice orchestrator has produced `brief.md` (Phase 1 complete). If it has not, defer to the orchestrator's Phase 1.

The `references/catalog/` directory in this repo contains 5 starter archetypes used as a fallback when web search returns no good matches. Read the relevant archetype files when the agent falls back.

---

## Part 1 — Direction Selection (Phase 2)

### Goal

Propose 3–5 UI directions grounded in the user's brief. Each direction has a name, 2–3 reference sites, and a mapping from the brief's vibe adjectives. The user picks one (as-is, with tweaks, or hybrid).

### The fallback chain

The agent uses this chain to find references:

1. **Web search.** Search for sites that match the brief's vibe, audience, and jobs. Look for products the user has not seen — discovery is part of the value.
2. **Catalog fallback.** If web search returns no good matches, pull from `references/catalog/`. The catalog has 5 archetypes. Pick the 2–3 archetypes that best match the brief.
3. **Own knowledge.** If the catalog does not fit, use the agent's own knowledge of well-designed sites (Linear, Stripe, Vercel, Notion, Cron, Posthog, Datadog, Anthropic, etc.). Be honest about which ones you are pulling from your training data vs. which ones you have specific knowledge of.

The chain is fall-through. The agent always tries web search first. The catalog is a fallback for offline or empty search results, not a default.

### How to propose

The agent proposes 3–5 directions. The exact number depends on the brief — a tightly-scoped brief might have 2 viable directions; a broad brief might have 5.

For each direction:

```markdown
### [N]. [Direction name] — [one-line description]

**Reference sites:**
- [site 1] — [what it does well that maps to the brief]
- [site 2] — [what it does well]
- [site 3, optional] — [what it does well]

**Brief mapping:**
- vibe: [adjective 1] → [how this direction expresses it]
- vibe: [adjective 2] → [how]
- audience: [persona] → [why this direction works for them]
- anti-references avoided: [which anti-references from brief this direction does NOT match]
```

The reference sites should be **real, well-known, currently designed products**. The agent should be able to describe what each does well specifically. Vague references ("a clean modern SaaS site") are useless — name the site.

### Presenting to the user

The agent presents the directions, then makes a recommendation:

> "Based on your brief, here are 3 directions to consider:
>
> 1. **Dense dev tool** — Linear, Vercel, Datadog style. Information-first, dark by default, restrained color.
> 2. **Editorial product page** — Stripe, Cron, Posthog style. Big typography, generous whitespace, hero-focused.
> 3. **Hybrid: dense product with editorial hero** — Vercel's marketing site is dense but the homepage has editorial weight.
>
> I'd recommend **#1** because your brief says 'focused, dense but not crowded,' and your Linear reference suggests you want information density. But the hero could borrow from #2 if you want a stronger first impression.
>
> Pick: as-is, with tweaks, or hybrid?"

The agent always has a recommendation. The recommendation is grounded in the brief (vibe adjectives, audience, anti-references), not in the agent's taste.

### User picks

The user picks one of:

- **As-is.** The direction is the starting point for Phase 3.
- **With tweaks.** The user adds modifications ("#1 but lighter," "#1 with a marketing-focused hero"). The agent records the tweaks in `brief.md`.
- **Hybrid.** The user combines two directions ("#1 for the product, #2 for the marketing site"). The agent records the hybrid in `brief.md`.

### Output: brief.md append

Append a `## Direction` section to `brief.md`:

```markdown
## Direction

[Direction name] — [one-line description]

**Reference sites:** [site 1], [site 2], [site 3]

**Tweaks / hybrid notes:** [user's modifications, if any]
```

Do not proceed to Phase 3 until the user confirms the direction.

---

## Part 2 — Screenshot Collection & Multimodal Analysis (Phase 3)

### Goal

Collect 5–10 reference screenshots from the user and extract the design patterns (color, type, spacing, layout, elevation, motion) into `analysis.md`.

### Asking for screenshots

The agent asks for screenshots organized in a folder:

> "Drop 5–10 screenshots in `.lattice/references/`:
>
> - **3–5 of overall layout / composition** in the chosen direction
> - **2–3 of specific components** (hero, nav, card, button, form, table)
> - **1–2 from different angles** (mobile, dark mode, dense view)
> - **1–2 anti-references** — sites the user does NOT want to be like
>
> Or paste URLs and I'll download them."

The folder is `.lattice/references/` at the project root. The agent creates the folder if it does not exist.

If the user pastes URLs, the agent downloads the screenshots to `.lattice/references/`. The user can also point the agent at a folder that already exists.

### Anti-references

Anti-references are explicit. The user names the sites they do NOT want to be like. The agent should ask:

> "What are 1–2 sites that you actively want to NOT be like? These will be documented in the analysis and DESIGN.md's Do's & Don'ts section."

Anti-references are not optional. They are the most efficient signal the user can give for what they do not want.

### Multimodal analysis

For each screenshot, the agent reads the image and extracts:

#### Color

- **Mode:** dark / light / mixed.
- **Background:** describe (near-black, off-white, gradient, etc.). Approximate hex.
- **Surface:** describe (cards, panels, etc.). Approximate hex.
- **Text:** primary text color. Approximate hex.
- **Text (secondary):** secondary/muted text. Approximate hex.
- **Accent:** the dominant accent color. Approximate hex.
- **Other notable colors:** borders, status (success/warning/danger), etc.

If a screenshot uses CSS variables or a known design system, note that.

#### Typography

- **Font family:** name the family (Inter, Geist, IBM Plex, etc.) or describe if unknown.
- **Display / heading:** describe the headline type — size, weight, letter spacing.
- **Body:** describe the body type — size, weight, line height.
- **Label / UI:** describe the label type — size, weight, used for buttons, captions, etc.
- **Code:** if visible, describe the monospace type.
- **Hierarchy:** how many distinct sizes are used? How is hierarchy expressed (size, weight, color)?

#### Spacing & density

- **Density:** generous / standard / dense / very dense.
- **Base unit:** estimate (4px, 8px).
- **Rhythm:** is the spacing regular (consistent scale) or irregular (one-off values)?
- **Whitespace:** how much breathing room between elements?

#### Layout

- **Grid:** estimate the column count (12, 16, asymmetric, single-column).
- **Hero composition:** centered / split / asymmetric / full-bleed.
- **Navigation pattern:** top nav, sidebar, hybrid, none.
- **Content structure:** how is the page organized? (single CTA, feature grid, editorial sections, etc.)

#### Elevation & depth

- **Approach:** flat / soft shadow / hard shadow / glassmorphism / borders only.
- **Shadow color:** tinted (e.g., blue-tinted) or neutral?
- **Border use:** how are borders used? (subtle dividers, strong outlines, etc.)

#### Motion

- **Static screenshots:** motion is unknown. Note "static — motion not visible."
- **If motion is visible** (the user described it, or a video was provided): describe the easing, duration, and what moves.

### Writing analysis.md

The agent writes `analysis.md` at the project root. One section per screenshot, then a synthesis section that pulls out the patterns across all screenshots.

```markdown
# [Product name] — Reference Analysis

## Screenshot 1 — [site name, page]

![description](.lattice/references/01-site-page.png)

**Color:** [palette]
**Typography:** [type]
**Spacing:** [density, base unit, rhythm]
**Layout:** [grid, composition, navigation]
**Elevation:** [approach]
**Motion:** [if known]

## Screenshot 2 — ...

## Anti-references

### [site name] — [page]

![description](.lattice/references/anti-01.png)

**Why this is an anti-reference:** [the user's reasoning, captured verbatim if possible]
**What we explicitly avoid:** [bullet list of patterns from this site to avoid]

## Synthesis

After analyzing all [N] screenshots, here are the patterns that emerge:

**Color:** [cross-screenshot pattern]
**Typography:** [cross-screenshot pattern]
**Spacing:** [cross-screenshot pattern]
**Layout:** [cross-screenshot pattern]
**Elevation:** [cross-screenshot pattern]
**Motion:** [cross-screenshot pattern, or "static — motion to be defined in alignment"]

**Conflicts resolved:** [if any references contradict each other, how the agent resolved them]
**Anti-references confirmed:** [what we will NOT do, distilled from the anti-references section]
```

### Conflicts between references

It is normal for references to contradict each other. Linear is dense; Stripe is editorial; Vercel is somewhere in between. When references conflict:

1. Note the conflict explicitly in the synthesis.
2. Resolve toward the brief, not the references. The brief is the source of truth.
3. Surface the conflict to the user in Phase 4 alignment. The user resolves the remaining tension.

The agent should not pretend references agree when they do not. Honesty > false synthesis.

### Output: analysis.md

`analysis.md` at the project root. Re-read in Phase 4 (alignment) and Phase 7 (extraction).

---

## What this skill does not do

- The references skill does not interview the user. That is the `grill` skill.
- The references skill does not build anything. It collects and analyzes references.
- The references skill does not lock decisions. The user does that in Phase 4 with the `grill` skill's alignment part.
