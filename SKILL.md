---
name: lattice
description: Use this skill when the user asks to design, build, or redesign a frontend (landing page, dashboard, marketing site, app shell, component, or full product UI) and wants the output to match their specific audience and references — not generic AI defaults. Activates on phrases like "use Lattice," "design with Lattice," "let's design with Lattice," "lattice this," or when the user explicitly names Lattice. Lattice is an 8-phase workflow: grill the user on product/audience/vibe, propose UI directions, analyze reference screenshots, align on decisions, build v1, iterate 3–4 cycles until approved, extract a Google Stitch DESIGN.md, then enforce the design system forever. Do not activate for non-frontend work, backend tasks, copy editing, or when the user has not invoked Lattice by name.
---

# Lattice

Lattice is a frontend design framework for AI engineers. It runs an 8-phase workflow that turns the gap between "the AI generated a frontend" and "the AI generated the frontend I wanted" into a 3–4 iteration process — and leaves the project with a real, enforced design system at the end.

This is the **orchestrator**. It coordinates the workflow. It does not do design work itself. Each phase is performed by a sub-skill that is loaded only when needed:

- `skills/grill/SKILL.md` — Phase 1 (product brief) and Phase 4 (alignment)
- `skills/references/SKILL.md` — Phase 2 (direction) and Phase 3 (screenshot analysis)
- `skills/iterate/SKILL.md` — Phase 5 (build v1) and Phase 6 (cycles)
- `skills/design-md-extract/SKILL.md` — Phase 7 (DESIGN.md)
- `skills/enforce-design/SKILL.md` — Phase 8 (consistency)
- `skills/anti-default-aesthetic/SKILL.md` — constraint, active in design + iteration + consistency
- `skills/no-inline-styles/SKILL.md` — constraint, active in consistency mode only

## Hard rules

1. **Explicit invocation only.** Lattice does not auto-detect frontend work. Wait for the user to say "use Lattice" or equivalent. False-positive risk is too high for a multi-step process.
2. **Phases are not skippable.** The user can stop early ("just write me a landing page, skip the design system"). They cannot skip the grill (Phase 1) — without a brief, every other phase is guesswork.
3. **The agent recommends, the user decides.** Every iteration step where the user's input is vague produces a recommendation with explicit reasoning. The user accepts, rejects, or overrides. The agent never asks "what do you want?" without grounding the question.
4. **Multimodal is required.** The screenshot + iteration loop is the differentiator. If the agent cannot see images, Lattice degrades clearly — it does not pretend to work. Tell the user.
5. **DESIGN.md is the artifact.** The framework's value is the design system file the project keeps. The skill output is a valid Google Stitch DESIGN.md (Apache 2.0, alpha).
6. **Tech-agnostic.** Lattice does not pick the stack. The user's project determines it. The agent reads `package.json`, `tsconfig.json`, `svelte.config.js`, etc. to detect the stack and build in kind.

## The 8-phase workflow

### Phase 0 — Activate

You have been triggered by the user. Restate the workflow in 4 lines and ask for confirmation:

> "Lattice is an 8-phase workflow:
> 1. Grill you on the product, audience, and vibe
> 2. Suggest 3–5 UI directions with reference sites
> 3. Analyze 5–10 screenshots you provide
> 4. Align on specific design decisions
> 5. Build v1 in your stack
> 6. Iterate 3–4 times on your feedback
> 7. Extract a `DESIGN.md` (Google Stitch open standard)
> 8. Enforce the design system on all future work
>
> Confirm to start, or tell me which phases to skip."

**Output:** user has confirmed. Move to Phase 1.

### Phase 1 — Product Grill

Load `skills/grill/SKILL.md`. Run the product brief interview. Five questions, one at a time, conversationally:

1. What is the product? (one sentence, then expand)
2. Who is it for? (concrete personas — not "everyone")
3. What are the top 1–3 things users do? (jobs to be done)
4. Brand vibe — 3–5 adjectives.
5. What is this product NOT? (anti-references — what to actively avoid)

The user's stack is read from the project (do not ask). If no project exists, ask.

**Output:** `brief.md` at the project root, ~30–60 lines. Confirm with the user before continuing.

### Phase 2 — Direction Selection

Load `skills/references/SKILL.md` (Part 1: direction selection). With `brief.md` as input, propose 3–5 UI directions. For each, name it, give 2–3 reference sites, and map the brief's vibe adjectives to it.

Strategy:
1. Web search for sites matching the brief's vibe, audience, and jobs.
2. If web search returns no good matches, pull from `references/catalog/` (5 starter archetypes).
3. If still nothing, use your own knowledge of well-designed sites.

User picks: as-is, with tweaks, or hybrid of two directions.

**Output:** the chosen direction appended to `brief.md` as a `## Direction` section.

### Phase 3 — Screenshot Collection & Analysis

Load `skills/references/SKILL.md` (Part 2: screenshot analysis). Ask the user for 5–10 screenshots organized in `.lattice/references/`:

- 3–5 of overall layout / composition
- 2–3 of specific components (hero, nav, card, button, form, table)
- 1–2 from different angles (mobile, dark mode, dense view)
- 1–2 anti-references (sites the user does NOT want to be like)

For each screenshot, extract: color palette, typography, spacing, layout, elevation, motion.

**Output:** `analysis.md` at the project root.

### Phase 4 — Alignment

Load `skills/grill/SKILL.md` (Part 2: alignment). Present the synthesis:

> "Here's what I see in your references. Here's what I'm planning for your product. Use as-is, or with these tweaks."

Ask alignment questions, one at a time, focused on the delta between references and product. Each question offers 2–3 grounded options with a recommendation and reasoning.

**Output:** `decisions.md` at the project root, ~20 lines.

### Phase 5 — Build v1

Load `skills/iterate/SKILL.md` (Step 1: build v1). Also load `skills/anti-default-aesthetic/SKILL.md` as an active constraint.

Build v1 in the user's stack. State what was built. Provide a self-critique with 3 things to flag.

**Output:** v1 code. A short summary of the diff from empty → v1. A self-critique.

### Phase 6 — Iterate

Load `skills/iterate/SKILL.md` (Steps 2–N: iteration loop). Loop:

```
for n in 1, 2, 3, ...:
  1. user provides feedback on v_{n-1}
  2. agent parses feedback for specificity
  3. if specific → build v_n
  4. if vague → ask + recommend (per iterate skill)
  5. agent builds v_n, states the diff
  6. stop when user says "ship it" OR feedback is vague for 2 consecutive cycles
  hard cap: 5 cycles
```

**Output:** approved v_n. The user says "this is what I wanted."

### Phase 7 — DESIGN.md Extraction

Load `skills/design-md-extract/SKILL.md`. Generate a Google Stitch DESIGN.md at the project root. Validate with `@google/design.md` CLI. Export `tailwind.config.ts` and (optionally) `tokens.json` (W3C DTCG).

**Output:** `DESIGN.md`, `tailwind.config.ts`. Optional: `tokens.json`.

### Phase 8 — Consistency Mode

`skills/enforce-design/SKILL.md` activates automatically. From this point on, every piece of frontend work is checked against `DESIGN.md`. Load `skills/no-inline-styles/SKILL.md` as an aggressive constraint.

**Output:** the project stays consistent forever.

## Output files

Lattice produces four durable files in the user's project:

| File | Phase | Purpose |
|---|---|---|
| `brief.md` | 1, 2 | Product + audience + direction. Re-read in every subsequent phase. |
| `analysis.md` | 3 | Visual + text analysis of the user's reference screenshots. |
| `decisions.md` | 4 | The alignment outcomes locked at the end of Phase 4. |
| `DESIGN.md` | 7 | The Google Stitch design system. The artifact Lattice leaves behind. |

These four files are the project's design system source of truth. `brief.md`, `analysis.md`, and `decisions.md` are the human-readable rationale. `DESIGN.md` is the machine-readable spec.

## What to do when

| User says | You do |
|---|---|
| "use Lattice" / "design with Lattice" | Phase 0 → Phase 1 |
| "skip the grill, just build it" | Tell them the grill is required. Offer to do a 60-second version. |
| "skip the design system" | Allow it. Note the project will not have enforcement. |
| "I just want to redesign the hero" | Reject (out of v1 scope). Suggest the v2 redesign workflow. |
| "drop a screenshot" | Treat as the strongest input. Multimodal > text. |
| "this is what I wanted" | Move to Phase 7. |
| "this isn't what I wanted" | Stay in Phase 6. Do not move to extraction. |

## Tone

Direct, opinionated, and concrete. The agent always has a recommendation and explains it. Vague prompts get pushed back. The user is the director, not the only source of ideas.
