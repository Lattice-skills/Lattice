# Lattice Worked Example — Stave

A full end-to-end Lattice session: from user invocation to a ratified `DESIGN.md`. The product is **Stave**, a database client for teams that hate phpMyAdmin — the same product used as the example in `PRODUCT.md`.

This example is illustrative, not literal. The exact phrasing of the agent's questions and the user's answers is compressed for readability. The artifacts (`brief.md`, `analysis.md`, `decisions.md`, `DESIGN.md`, the v3 code) are the real outputs of the workflow.

## The session

### Phase 0 — Activate

> **You:** "Use Lattice to design a landing page for a developer tool I'm building. It's called Stave. It's a database client for teams that hate phpMyAdmin."

> **Agent:** "Lattice is an 8-phase workflow: 1. Grill you on the product, audience, and vibe. 2. Suggest 3–5 UI directions with reference sites. 3. Analyze 5–10 screenshots you provide. 4. Align on specific design decisions. 5. Build v1 in your stack. 6. Iterate 3–4 times on your feedback. 7. Extract a `DESIGN.md` (Google Stitch open standard). 8. Enforce the design system on all future work. Confirm to start, or tell me which phases to skip."

> **You:** "Confirm."

### Phase 1 — Product Grill

The agent asks five questions, one at a time:

> **Agent:** "Tell me about Stave in one sentence. What does it do, and why does it exist?"

> **You:** "A modern database client for teams that find existing tools ugly or slow."

> **Agent:** "Who is the primary user? Concrete personas — not 'everyone.' If you had to name three people who would love Stave tomorrow, who are they?"

> **You:** "Backend engineers, 25–40, at series A–C startups. They've used DataGrip, TablePlus, Beekeeper. They want something that feels like Linear or Vercel."

> **Agent:** "What are the top 1–3 things users do in Stave? The verbs."

> **You:** "Connect to a database, browse tables, write and run a query."

> **Agent:** "Give me 3–5 adjectives that describe how Stave should feel."

> **You:** "Focused. Dense but not crowded. Restrained color. Confident typography. Like Linear, not like Stripe's marketing site."

> **Agent:** "What is Stave NOT? What references — sites, products, aesthetics — should we actively avoid?"

> **You:** "Not enterprise-y. Not cutesy. Not friendly. Not consumer."

The agent reads the project's `package.json` to detect the stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

The agent writes [`brief.md`](./brief.md).

### Phase 2 — Direction Selection

The agent searches the web for sites matching the brief, then falls back to the catalog.

> **Agent:** "Based on your brief, here are 3 directions to consider:
>
> 1. **Dense dev tool** — Linear, Vercel, Datadog style. Information-first, dark by default, restrained color.
> 2. **Editorial product page** — Stripe, Cron, Posthog style. Big typography, generous whitespace, hero-focused.
> 3. **Hybrid: dense product with editorial hero** — Vercel's marketing site is dense but the homepage has editorial weight.
>
> I'd recommend **#1** because your brief says 'focused, dense but not crowded,' and your Linear reference suggests you want information density. But the hero could borrow from #2 if you want a stronger first impression. Pick: as-is, with tweaks, or hybrid?"

> **You:** "#1 with a marketing-flavored hero. I want a strong first impression for new visitors, then density once they're in the product."

The agent appends the direction to `brief.md`.

### Phase 3 — Screenshot Collection & Analysis

> **Agent:** "Drop 5–10 screenshots in `.lattice/references/`:
> - 3–5 of overall layout / composition in the chosen direction
> - 2–3 of specific components (hero, nav, card, button, form)
> - 1–2 from different angles (mobile, dark mode, dense view)
> - 1–2 anti-references — sites you do NOT want to be like."

> **You:** *drops 7 screenshots from Linear (app + marketing), Vercel (dashboard), Datadog, and one anti-reference from a generic SaaS template*

The agent reads each image and produces [`analysis.md`](./analysis.md).

### Phase 4 — Alignment

> **Agent:** "Here's what I see in your references:
>
> - **Color:** predominantly dark, near-black backgrounds (#0A0A0A, #111111). Single accent color used sparingly. Your Linear ref uses purple, your Vercel ref uses blue. Pick one.
> - **Type:** Inter or Geist for everything. Tight letter-spacing. Bold for emphasis, regular for body.
> - **Spacing:** 4px base scale, generous in marketing pages, tighter in dashboard views.
> - **Layout:** 12-column grid, asymmetric hero, sidebar for product UI.
>
> I'm planning this for Stave: dark by default, single accent (your choice — blue or purple), Inter throughout, 4px base scale, 12-column grid. Confirm or push back."

> **You:** "Blue. Inter Display for headlines. Lighter hero, the marketing page is for new visitors, they need more breathing room than the dashboard."

The agent writes [`decisions.md`](./decisions.md).

### Phase 5 — Build v1

The agent builds v1 in Next.js. See [v3/page.tsx](./v3/page.tsx) for the structure of the final approved version. v1 was the first iteration, less polished.

The agent presents v1 and a self-critique:

> "v1 is at `app/page.tsx`. Here's what I built: a dark, dense landing page with a hero, three-column feature grid, and a code preview. Here's my self-critique — three things I'd flag if I were you:
>
> 1. The hero CTA might be too quiet — the accent color is restrained per your brief, but the CTA might be too restrained.
> 2. The feature grid is 3 columns. Your Linear reference uses a 2-column layout for features. Worth a look.
> 3. The code preview is a generic SQL example. I could swap it for something more Stave-specific if you have a use case in mind."

### Phase 6 — Iterate

> **You (cycle 1):** "The hero CTA needs more weight. Make the button bigger and add a subtle background fill, not just a border."

The agent builds v2. Specific feedback, no questions.

> **You (cycle 2):** "Two columns for features. The 3-column grid feels generic."

The agent builds v3. Specific feedback.

> **You:** "This is what I wanted."

The agent presents v3 and a summary. See [v3/page.tsx](./v3/page.tsx) for the approved version.

### Phase 7 — DESIGN.md Extraction

The agent loads `design-md-extract`. It reads `brief.md`, `analysis.md`, `decisions.md`, and v3. It extracts tokens. It writes [`DESIGN.md`](./DESIGN.md). It validates with `@google/design.md` CLI. It exports `tailwind.config.ts`.

> "DESIGN.md is at the project root. It validates. Tailwind config is exported. From now on, every frontend change has to respect DESIGN.md — Phase 8 is active. To add a new token, update DESIGN.md first. To add a new component, document it in DESIGN.md first. The `enforce-design` skill is now in charge."

### Phase 8 — Consistency Mode

`enforce-design` activates automatically. The `no-inline-styles` constraint is now aggressive. Every future change to the Stave frontend is checked against `DESIGN.md`.

## The artifacts

| File | What it is |
|---|---|
| [`brief.md`](./brief.md) | The product brief from Phase 1 + the direction from Phase 2 |
| [`analysis.md`](./analysis.md) | The visual + text analysis of the reference screenshots from Phase 3 |
| [`decisions.md`](./decisions.md) | The locked alignment decisions from Phase 4 |
| [`v3/page.tsx`](./v3/page.tsx) | The approved v3 of the Stave landing page (TypeScript + React) |
| [`DESIGN.md`](./DESIGN.md) | The Google Stitch DESIGN.md extracted in Phase 7 |

These are the durable files the project keeps. `DESIGN.md` is the source of truth for everything that follows.
