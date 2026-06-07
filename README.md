# Lattice

> **Your agent, with Taste.**

A skills framework for AI engineers who code with AI. Lattice teaches any [agentskills.io](https://agentskills.io)-compatible agent how to build frontends that match what *you* wanted — not the default "AI purple-neon-glow" output.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![agentskills.io](https://img.shields.io/badge/agentskills.io-compatible-brightgreen)](https://agentskills.io)
[![Skills.sh](https://img.shields.io/badge/skills.sh-lattice-orange)](https://skills.sh)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./.github/CONTRIBUTING.md)

[Why Lattice?](#why-lattice) · [Quick start](#quick-start) · [How it works](#how-it-works) · [The 8-phase workflow](#the-8-phase-workflow) · [What's in the box](#whats-in-the-box) · [Worked example](#worked-example-stave) · [Documentation](./ARCHITECTURE.md) · [Contributing](#contributing)

---

## Why Lattice?

You've seen the AI default. The first thing any agent generates for a frontend looks like every other agent's first thing:

- Dark mode with **blue/purple/neon gradients**
- **Glow effects** on text and borders
- `bg-blue-500` standing in for a "primary" color
- Inline styles, no design system, components re-built on every page
- Generic 3-column feature grids with "🚀 Build faster" hero copy
- A finish line that somehow *still* looks like every other AI build

You push back. You write longer prompts. You say "make it look like Linear." The agent gets a little better. You iterate 5, 8, 12 times. You give up and ship something that's "fine."

**Lattice is the workflow that gets you to "this is what I wanted" in 3–4 cycles — and leaves your project with a real design system at the end.**

The trick: **a multimodal screenshot + grill + 3–4-iteration loop**, encoded as installable skills. The agent doesn't just "make it pretty." It grills you about your audience, analyzes your reference screenshots, builds, and pushes back when your feedback is too vague to act on. When you approve, it generates a `DESIGN.md` (Google's open standard) and enforces that design system on every future change.

Other skills on skills.sh — [`frontend-design`](https://skills.sh/anthropics/skills/frontend-design), [`web-design-guidelines`](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines), [`impeccable`](https://skills.sh/pbakaus/impeccable), [`ui-ux-pro-max`](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) — improve a default output. Lattice runs the workflow that *replaces* the default with your intent.

---

## Quick start

```bash
# 1. Install Lattice (one command, in any agent that supports agentskills.io)
npx skills add Lattice-skills/lattice

# 2. In your project, invoke the workflow
# (in your agent's chat)
"Use Lattice to design a landing page for my app. It's called [name]."

# 3. Answer 5 grill questions, drop 5–10 reference screenshots, iterate 3–4 times.
# When you say "this is what I wanted," you get a DESIGN.md.
```

That's it. One install. One invocation. A real design system when you're done.

---

## How it works

Lattice is a single installable package containing **one orchestrator skill** and **seven sub-skills**. The orchestrator is the spine — it runs an 8-phase workflow and routes to sub-skills at the right moment. Sub-skills load only when needed, so your agent's context stays lean.

```
┌──────────────────────────────────────────────────────────┐
│  Lattice orchestrator                                    │
│  The 8-phase workflow (see below)                        │
└──────┬───────────────────────────────────────────────────┘
       │  activates in order:
       ├──► grill              (Phase 1: product brief, Phase 4: alignment)
       ├──► references         (Phase 2: direction,  Phase 3: screenshot analysis)
       ├──► iterate            (Phase 5: build v1,    Phase 6: 3–4 cycles)
       ├──► design-md-extract  (Phase 7: extract DESIGN.md)
       ├──► enforce-design     (Phase 8: consistency mode)
       │
       │  constraint skills, run continuously:
       ├──► anti-default-aesthetic  (forbids purple/neon/glow defaults)
       └──► no-inline-styles        (consistency mode only — tokens only)
```

All 8 skills conform to the [agentskills.io](https://agentskills.io) open standard, originally developed by Anthropic and adopted by Claude Code, Cursor, Codex, GitHub Copilot, Gemini, opencode, Zed, and most other agents. Lattice works wherever your agent works.

---

## The 8-phase workflow

When you invoke Lattice, the agent runs an 8-phase workflow. Each phase has a clear input, output, and rule for when it ends. None of them can be silently skipped (with one exception: the design-system extraction at the end, which the user can opt out of).

| Phase | Skill | What happens | Output |
|---|---|---|---|
| **0. Activate** | `lattice` | You invoke Lattice explicitly. The agent restates the workflow and asks for confirmation. | — |
| **1. Product Grill** | `grill` | The agent asks 5 questions, one at a time, conversationally. *What is it? Who is it for? What do users do? What's the vibe? What is it NOT?* | `brief.md` |
| **2. Direction Selection** | `references` | The agent proposes 3–5 UI directions with reference sites. Web search first; falls back to the 5 starter archetypes in `references/catalog/`; falls back to the agent's own knowledge. You pick: as-is, with tweaks, or hybrid. | `brief.md` updated |
| **3. Screenshot Collection & Analysis** | `references` | You drop 5–10 screenshots of references (overall layout, components, different angles) and **1–2 anti-references** — sites you do NOT want to be like. The agent reads each image and extracts color, type, spacing, layout, elevation, and motion. | `analysis.md` |
| **4. Alignment** | `grill` | The agent presents its synthesis ("here's what I see in your references, here's what I'm planning for your product") and asks alignment questions, one at a time. Each question offers 2–3 grounded options with a recommendation and reasoning. | `decisions.md` |
| **5. Build v1** | `iterate` | The agent builds v1 in your stack (Next.js, Vite + React, SvelteKit, Astro, etc. — detected from `package.json`). Anti-default-aesthetic is active. The agent provides a self-critique: 3 things it would flag if it were you. | v1 code |
| **6. Iterate** | `iterate` | You give feedback — text and/or annotated screenshots. The agent enforces specificity. Vague feedback ("make it better") triggers a question + recommendation flow with explicit reasoning. Strictness escalates over cycles. Hard cap: 5 cycles. | v_n code |
| **7. DESIGN.md Extraction** | `design-md-extract` | The agent extracts a [Google Stitch `DESIGN.md`](https://github.com/google-labs-code/design.md) (Apache 2.0, open standard) from the approved v_n. Validates with `@google/design.md` CLI. Exports a `tailwind.config.ts` and an optional `tokens.json` (W3C DTCG). | `DESIGN.md`, `tailwind.config.ts` |
| **8. Consistency Mode** | `enforce-design` | Activates automatically. Every piece of frontend work from here on is checked against `DESIGN.md`. The `no-inline-styles` constraint is aggressive. The design system doesn't rot. | forever |

**Hard rule:** The grill is never skippable. Without `brief.md`, every other phase is guesswork. The design system extraction is opt-out (some users just want the frontend, not the design system file) — but the agent will gently push back on this.

---

## What's in the box

```
lattice/
├── SKILL.md                          ← orchestrator
├── README.md                         ← this file
├── ARCHITECTURE.md                   ← architecture decisions
├── PRODUCT.md                        ← product context
├── LICENSE                           ← Apache 2.0
│
├── skills/
│   ├── grill/SKILL.md                ← interview skill
│   ├── references/SKILL.md           ← direction + screenshot analysis
│   ├── iterate/SKILL.md              ← build + iterate
│   ├── design-md-extract/SKILL.md    ← generate DESIGN.md
│   ├── enforce-design/SKILL.md       ← consistency mode
│   ├── anti-default-aesthetic/SKILL.md  ← constraint: no purple/neon
│   └── no-inline-styles/SKILL.md     ← constraint: tokens only
│
├── references/
│   └── catalog/                      ← 5 starter archetypes
│       ├── README.md
│       ├── saas-marketing.md
│       ├── dense-dev-tool.md
│       ├── warm-consumer.md
│       ├── editorial-content.md
│       └── dashboard-admin.md
│
└── .lattice/examples/
    └── stave/                        ← end-to-end worked example
        ├── README.md                 ← walkthrough
        ├── brief.md
        ├── analysis.md
        ├── decisions.md
        ├── DESIGN.md
        └── v3/page.tsx
```

**The 5 starter archetypes** cover the most common AI-engineer use cases. The catalog is a fallback — the agent always prefers the user's own screenshots over the catalog. The 5 archetypes are:

1. **saas-marketing** — Stripe, Linear, Vercel style. Hero-focused, generous whitespace, big typography, single accent.
2. **dense-dev-tool** — Datadog, Vercel dashboard, Linear app style. Information-first, dark by default, restrained color.
3. **warm-consumer** — Notion, Cron, Posthog style. Soft color, friendly type, balanced whitespace.
4. **editorial-content** — Stripe blog, Substack, NYT style. Reading-first, classic type, generous margins.
5. **dashboard-admin** — Vercel dashboard, Supabase, Retool style. Tables, forms, status indicators.

---

## Worked example: Stave

The `.lattice/examples/stave/` folder contains a complete end-to-end Lattice session for a fictional product called **Stave** — a modern database client for backend engineers. It's the same product used as the example throughout Lattice's docs. The full walkthrough is in [`stave/README.md`](./.lattice/examples/stave/README.md).

### The session, in brief

> **You:** "Use Lattice to design a landing page for a developer tool I'm building. It's called Stave. It's a database client for teams that hate phpMyAdmin."
>
> **Agent:** "Lattice is an 8-phase workflow: 1. Grill you on the product, audience, and vibe. 2. Suggest 3–5 UI directions with reference sites. 3. Analyze 5–10 screenshots you provide. 4. Align on specific design decisions. 5. Build v1 in your stack. 6. Iterate 3–4 times on your feedback. 7. Extract a DESIGN.md. 8. Enforce the design system on all future work. Confirm to start, or tell me which phases to skip."
>
> **You:** "Confirm."

The agent asks 5 grill questions, drops 7 reference screenshots, asks 4 alignment questions, and iterates 3 times. Total time: ~30 minutes. The output: a ratified `DESIGN.md` and a real, working Next.js + Tailwind landing page.

### What the output looks like

The approved v3 uses tokens from `DESIGN.md` — no inline styles, no `bg-[#xxx]`, no `text-[14px]`. Just semantic class names that map to the design system.

```tsx
// v3/page.tsx — the approved version
<main className="min-h-screen bg-bg-base text-text-primary">
  <section className="mx-auto max-w-7xl px-6 pb-32 pt-32">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-6 flex flex-col justify-center">
        <h1 className="text-display-lg font-semibold tracking-tight text-text-primary">
          The database client that respects your time.
        </h1>
        <p className="mt-6 max-w-xl text-body-lg text-text-secondary">
          Connect, browse, and query your data without the chrome.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Button variant="primary" size="lg">Get started</Button>
          <Button variant="secondary" size="lg">Read the docs</Button>
        </div>
      </div>
      <div className="col-span-6 flex items-center">
        <Card className="w-full bg-surface-elevated p-6">
          <Code language="sql">{`SELECT users.id, COUNT(orders.id) AS order_count
FROM users LEFT JOIN orders ON orders.user_id = users.id
WHERE users.created_at > '2024-01-01'
GROUP BY users.id ORDER BY order_count DESC LIMIT 50;`}</Code>
        </Card>
      </div>
    </div>
  </section>
</main>
```

The `DESIGN.md` that gets generated is a real [Google Stitch format file](https://github.com/google-labs-code/design.md) — Apache 2.0, validated with `@google/design.md` CLI, exportable to Tailwind config and W3C DTCG. The full file is in [`stave/DESIGN.md`](./.lattice/examples/stave/DESIGN.md). The relevant excerpt:

```yaml
---
version: alpha
name: Stave
description: A modern database client for teams that find existing tools ugly or slow.
colors:
  bg-base: "#0A0A0A"
  surface: "#111111"
  surface-elevated: "#1A1A1A"
  border-subtle: "#262626"
  text-primary: "#FAFAFA"
  text-secondary: "#A1A1A1"
  accent: "#3B82F6"            # chosen over purple per user preference
  status-success: "#10B981"
  status-error: "#EF4444"
typography:
  display-lg: { fontFamily: "Inter", fontSize: "56px", fontWeight: 600, lineHeight: "64px", letterSpacing: "-0.02em" }
  body-md:    { fontFamily: "Inter", fontSize: "16px", fontWeight: 400, lineHeight: "24px" }
  code:       { fontFamily: "JetBrains Mono", fontSize: "14px", fontWeight: 400, lineHeight: "20px" }
spacing:
  1: "4px"   # base unit
  2: "8px"   3: "12px"  4: "16px"   6: "24px"   8: "32px"  16: "64px"  24: "96px"  32: "128px"
rounded:
  none: "0px"   sm: "4px"   md: "6px"   lg: "8px"   full: "9999px"
components:
  button-primary:
    background: "{colors.accent}"
    color: "{colors.text-primary}"
    padding: "{spacing.3} {spacing.6}"
    border-radius: "{rounded.md}"
    font: "{typography.label-md}"
---
```

**The agent's first attempt would not have produced this.** The dark-with-blue-accent color, the Inter type system, the 4px base spacing scale, the 6px button radius — every choice is grounded in either the user's brief (`focused, dense but not crowded, restrained color`) or their references (Linear, Vercel, Datadog). The "purple neon" default never enters the picture because the workflow never lets the agent fall back to it.

---

## Installation

Lattice installs in any agent that supports the [agentskills.io](https://agentskills.io) standard.

### One-line install

```bash
npx skills add Lattice-skills/lattice
```

That's it. The orchestrator and 7 sub-skills are now available in your agent. Invoke with phrases like:

- *"Use Lattice to design a landing page for [X]."*
- *"Let's design with Lattice."*
- *"Lattice this."*

### Per-agent notes

Lattice works in:

- **Claude Code** — `npx skills add Lattice-skills/lattice`
- **Cursor** — `npx skills add Lattice-skills/lattice`
- **Codex (OpenAI)** — `npx skills add Lattice-skills/lattice`
- **GitHub Copilot** — `npx skills add Lattice-skills/lattice`
- **opencode** — `npx skills add Lattice-skills/lattice`
- **Gemini CLI** — `npx skills add Lattice-skills/lattice`
- **Zed** — `npx skills add Lattice-skills/lattice`

For all of these, the install command is the same. The agent picks up the skills through its standard skill-loading mechanism (progressive disclosure: description loaded at startup, body loaded on activation, sub-skills loaded only when the orchestrator points to them).

### Verifying the install

After install, the agent should be able to list "lattice" in its available skills. The orchestrator's `description` field is:

> *Use this skill when the user asks to design, build, or redesign a frontend...*

If the agent doesn't recognize "use Lattice," check that the skill format is supported by your agent version. agentskills.io is supported by Claude Code, Cursor, Codex, Copilot, Gemini, opencode, Zed, and others. Full client list at [agentskills.io/clients](https://agentskills.io).

---

## Configuration

Lattice is opinionated and configuration-light. The two things you can tune:

### 1. The reference catalog

`references/catalog/` ships with 5 starter archetypes. You can:

- **Use as-is** — the agent's web search is the primary path; the catalog is a fallback.
- **Add your own archetypes** — create `references/catalog/<your-archetype>.md` following the same structure as the existing 5. The agent picks them up automatically.
- **Replace the catalog** — if you have a curated set of references for your team, drop them in and delete the defaults.

The catalog is **not a default to be applied uncritically**. The agent should always prefer the user's own screenshots over the catalog. The catalog is a safety net for when the user has not yet provided screenshots.

### 2. Vague-feedback patterns (the `iterate` skill)

The `skills/iterate/SKILL.md` skill ships with a seed list of vague patterns:

```regex
^make it (better|nicer|prettier|stand out|pop)$
^the .* is off$
^doesn't feel right$
^i don't like it$
^more polished$
^too (generic|busy|bland|sterile|cheesy|cute)$
^looks (ai|generic|amateur|templated)$
^feels (off|cheap|wrong|date|sterile)$
```

Patterns are matched case-insensitively, with allowance for filler words ("just," "kind of," "a bit"). When a pattern matches, the agent triggers the question + recommendation flow. Add to this list as you observe new patterns in your own sessions — it's a living list, not a grammar.

---

## How Lattice is different from existing skills

The skills.sh leaderboard is full of frontend skills. Why Lattice?

| Skill | What it does | What it doesn't do |
|---|---|---|
| [`frontend-design`](https://skills.sh/anthropics/skills/frontend-design) | Comprehensive frontend design guidelines + aesthetic guardrails | No audience modeling, no reference analysis, no iteration discipline, no design system output |
| [`web-design-guidelines`](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | UI conventions (spacing, type, interaction, a11y) | No workflow; static rules |
| [`impeccable`](https://skills.sh/pbakaus/impeccable) | Frontend polish (with 16 micro-skills) | No reference-grounding; agent improvises aesthetics |
| [`ui-ux-pro-max`](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) | UI/UX patterns | No workflow; static rules |
| [`design-taste-frontend`](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend) | Aesthetic direction (variance / motion / density dials) | No reference analysis, no iteration discipline, no design system output |
| [`extract-design-system`](https://skills.sh/arvindrk/extract-design-system) | Extracts design tokens from existing CSS | One-shot extraction, not part of a workflow |
| `shadcn` | shadcn/ui patterns | Stack-specific, not universal |
| **Lattice** | **Multimodal screenshot + grill + 3–4-iteration loop, ending in DESIGN.md** | — |

The differentiator is the **loop**. Lattice runs a workflow where:

1. The agent grills you about your audience and references before any code is written.
2. Your reference screenshots are analyzed multimodally, not as a vibe.
3. Vague feedback is pushed back on with explicit recommendations and a screenshot fallback.
4. The output is a real, valid Google Stitch `DESIGN.md` that any other agent can consume.

Other skills give you rules. Lattice gives you a workflow that produces a design system.

---

## Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — How Lattice is built. Skill structure, the 8-phase workflow, the iteration mechanic, the two-phase model (design vs. consistency), the v1 cut and rationale, and the open questions.
- **[PRODUCT.md](./PRODUCT.md)** — What Lattice is and why. Value proposition, user experience, MVP scope, future roadmap (v1.1 → v1.2 → v2), naming, anti-goals.
- **[.lattice/examples/stave/](./.lattice/examples/stave/)** — A full end-to-end worked example. README walks through every phase. `brief.md`, `analysis.md`, `decisions.md`, `DESIGN.md`, and the approved `v3/page.tsx` are all real artifacts.
- **[agentskills.io](https://agentskills.io)** — The open format Lattice is built on.
- **[Google Stitch DESIGN.md](https://github.com/google-labs-code/design.md)** — The open standard Lattice outputs.

---

## Use cases

**Lattice is for**:
- AI engineers building frontends with agents and frustrated by the gap between "the AI generated a frontend" and "the AI generated the frontend I wanted."
- Teams that want their AI-generated frontends to actually match their brand, not the model's defaults.
- Anyone who has tried other frontend skills and found them too shallow — rules without a workflow.

**Lattice is not for**:
- Designers using Figma as their primary tool (use Figma + a Stitch export instead).
- Non-technical users who want AI to "just make it look good" (Lattice requires engagement — grill questions, reference uploads, specific feedback).
- Teams that need a fully-spec'd design system up front (Lattice builds the design system *after* the design is approved, by extracting it from the iteration history).

---

## Roadmap

| Version | What ships |
|---|---|
| **v1 (now)** | The 8-phase workflow, 7 sub-skills, 5 starter archetypes, Stave example. New build only. |
| **v1.1** | `no-hallucinated-libs` skill (verified library catalog, starting with React/Next.js). More starter archetypes. |
| **v1.2** | `comp-extract-on-second-use` as a standalone skill. WCAG 2.2 AA validation wired into the iteration loop. |
| **v2** | Redesign support (extract current → diff vs. desired → migrate component-by-component). Mobile-specific constraints. Enterprise SSO flows. |

See [PRODUCT.md § Future Roadmap](./PRODUCT.md#future-roadmap) for the full plan.

---

## Contributing

Lattice is Apache 2.0 and contributions are welcome. The most useful things you can contribute:

1. **Bug reports** — if a skill's behavior doesn't match its description, open an issue.
2. **Skill improvements** — PRs to any `SKILL.md` are welcome. Each skill is a single markdown file with a YAML front matter. Keep the structure (`Goal`, `How to ...`, `Output`, `What this skill does not do`).
3. **New archetypes** — drop a new file in `references/catalog/` following the structure of the existing 5. Vibe, references, brief mapping, anti-references, suggested token profile.
4. **Worked examples** — the `.lattice/examples/stave/` folder is the template. Add a new example folder for a different product type. Real screenshots in `.lattice/examples/<your-product>/v_n/` are even better.
5. **Library catalog** (v1.1) — once `no-hallucinated-libs` ships, we'll need a curated catalog per stack. This is the largest single contribution surface.

When contributing a skill or archetype change, please:

- Keep the tone direct, opinionated, and concrete. Lattice always has a recommendation.
- Don't add "what if the user wants X" branches. Lattice recommends; the user accepts, rejects, or overrides.
- Don't add a "What if the agent is wrong?" hedge. The agent is opinionated; it can be wrong; the user catches it.
- Don't add Lorem ipsum examples. Real copy, real products.

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md) for the full contribution guide (TODO).

---

## License

Apache 2.0. See [LICENSE](./LICENSE).

The DESIGN.md output format is © Google, Apache 2.0, used as an open standard. The `@google/design.md` CLI is a separate package, also Apache 2.0.

---

## Acknowledgments

- **[agentskills.io](https://agentskills.io)** — the open format Lattice is built on, originally developed by Anthropic.
- **[Google Stitch DESIGN.md](https://github.com/google-labs-code/design.md)** — the open design-system standard Lattice outputs. Saved us from inventing a format.
- **[skills.sh](https://skills.sh)** — Vercel-hosted directory for the agentskills.io ecosystem. Where you found this.
- **Every existing frontend skill on skills.sh** — `frontend-design`, `impeccable`, `ui-ux-pro-max`, `web-design-guidelines`, `design-taste-frontend`, `extract-design-system`, and the rest. We learned from each of them. The frontier of agent-generated frontend design is being pushed by the community, and Lattice is one entry in a much larger conversation.
- **You** — for trying Lattice on your project. The framework gets better with every real use case. If you ship with Lattice, open an issue and tell us how it went.

---

*Your agent, with Taste.*
