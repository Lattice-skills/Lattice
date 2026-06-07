---
name: iterate
description: "Use this skill in Phase 5 (build v1) and Phase 6 (iterate 3–4 cycles) of the Lattice workflow. The iterate skill is the heart of Lattice: it builds the first version of the frontend in the user's stack, then runs feedback cycles that converge on the design the user actually wanted. The iterate skill enforces specificity — vague feedback (\"make it better,\" \"feels off,\" \"doesn't feel right\") triggers a question + recommendation flow with explicit reasoning. Strictness escalates over cycles. There is a hard cap of 5 cycles. The `anti-default-aesthetic` constraint is active throughout."
---

# Iterate

The iterate skill is what makes Lattice different from every other frontend skill. It runs the build → feedback → rebuild loop with three disciplines that other skills don't have:

1. **Specificity enforcement.** Vague feedback triggers a grounded question + recommendation flow. No "what do you want?" questions.
2. **Escalating strictness.** Cycle 1 of vagueness is gentle. Cycle 2 is firmer. Cycle 3+ calls it out.
3. **Hard cap.** 5 cycles max. After 5, the agent suggests extraction even if the user is not satisfied.

This skill assumes the Lattice orchestrator has produced `brief.md`, `analysis.md`, and `decisions.md`, and that the user has confirmed `decisions.md` (Phase 4 complete). The user's tech stack is known from `brief.md`.

The `skills/anti-default-aesthetic/SKILL.md` constraint is **active throughout this skill**. Read it.

---

## Step 1 — Build v1 (Phase 5)

### Goal

Produce a working v1 of the user's frontend in their stack, grounded in `brief.md` + `analysis.md` + `decisions.md`.

### Before you write code

Re-read all three input files. Do not re-derive the brief — it is locked. Re-read `decisions.md` like a contract.

Detect the stack from the project:

- `package.json` with `next` → Next.js (App Router preferred, Pages Router if existing)
- `package.json` with `react` + `vite` → Vite + React
- `package.json` with `@sveltejs/kit` → SvelteKit
- `package.json` with `astro` → Astro
- `package.json` with `@remix-run/*` → Remix
- `package.json` with `vue` + `vite` → Vue
- `package.json` with `svelte` only (no kit) → Svelte (SPA)
- No `package.json` or empty project → ask the user

Detect the styling system:

- `tailwind.config.*` → Tailwind CSS (default for new projects if the user has no preference)
- `postcss.config.*` with `autoprefixer` only → plain CSS / CSS Modules
- `styled-components` / `@emotion/react` in deps → CSS-in-JS
- `vanilla-extract` → vanilla-extract
- `unocss` / `@unocss/*` → UnoCSS
- Nothing detected → ask, default to Tailwind

### Anti-default-aesthetic check

Before writing v1, read `skills/anti-default-aesthetic/SKILL.md`. Apply every rule. The most common violations to watch for:

- Purple/blue/neon accent colors without explicit user choice.
- Glow effects on text or borders.
- `backdrop-filter: blur(...)` glassmorphism unless the user asked for it.
- Generic dark mode (`bg-gray-900 text-white`) without a specific palette.
- Generic "AI emoji hero" (`🚀 Build faster`).
- Tailwind palette names used as semantic colors (`bg-blue-500` for primary).
- Default font stacks (Inter, system-ui) without explicit user choice.

### Build v1

Produce a v1 that:

- **Implements the locked decisions in `decisions.md`.** Color, type, spacing, layout, elevation — all per the contract.
- **Has real components, not inline divs.** Extract anything that appears more than once into a component file.
- **Has no inline styles.** Use the styling system detected above. CSS variables, Tailwind tokens, or theme objects.
- **Has tokens, even if loose.** Even at v1, use named CSS variables for color and type scale. The `design-md-extract` skill will formalize them.
- **Is a real frontend, not a placeholder.** Real copy (from the brief), real components, real interactions. Not "Lorem ipsum. Lorem ipsum. Lorem ipsum."
- **Reflects the audience and vibe from `brief.md`.** A dev tool feels different from a consumer app. A landing page feels different from a dashboard.

The v1 should be a complete, runnable frontend. If the project has a dev server (`npm run dev`), the user should be able to load it in a browser and see the design.

### Self-critique (required)

After building v1, the agent must produce a self-critique. Three things the agent would flag if it were the user. Examples:

> "v1 is at `app/page.tsx`. Here's what I built: [summary]. Here's my self-critique — three things I'd flag if I were you:
>
> 1. The hero uses a single accent color but I'm not sure if the saturation is right — you might want to dial it back.
> 2. The card grid is 3 columns on desktop, but I haven't tested it on tablet. There may be a layout gap at the breakpoint.
> 3. The body type size is 16px. For a developer tool, that might feel too large — Linear uses 14px for body. Worth a look."

The self-critique is not optional. It is the agent's honest first take, before the user has said anything. It signals that the agent is thinking critically, not just shipping.

### Output: v1 + summary

Tell the user:

- Where v1 is (`app/page.tsx` or equivalent).
- A short summary of what was built.
- The self-critique.
- An invitation for feedback.

> "v1 is at `[path]`. Run `[dev command]` to see it. Take a look and tell me what to change. The more specific the feedback, the faster we converge."

Do not move to Step 2 until the user has reviewed v1 and given feedback.

---

## Step 2 — Iterate (Phase 6)

### Loop structure

```
cycle = 0
vague_streak = 0
current = v1

while True:
  feedback = user feedback on current
  cycle += 1
  
  if feedback is "ship it" / "this is what I wanted":
    return current  # done → Phase 7
  
  if feedback is specific:
    next = build(current, feedback)  # see "Specific feedback" below
    current = next
    vague_streak = 0
  else:
    vague_streak += 1
    response = question_and_recommend(feedback, current)
    # user picks an option or provides new feedback
    feedback = response
    if feedback is specific:
      next = build(current, feedback)
      current = next
      vague_streak = 0
  
  if cycle >= 5:
    suggest_extraction(current)  # hard cap
    return current
  
  if vague_streak >= 2:
    call_it_out(current)  # escalation
```

### Detecting specific vs. vague feedback

**Specific feedback** names an element AND a change AND a desired outcome. Examples:

- ✅ "The hero CTA — increase padding-x by 50%, change weight to semibold."
- ✅ "The card grid — change from 3 columns to 2 on tablet."
- ✅ "The headline — color is too cool, push it warmer by ~10%."
- ✅ "[annotated screenshot] Change the color of this button to match this one."

**Vague feedback** doesn't name all three. Examples:

- ❌ "Make it better."
- ❌ "The hero is off."
- ❌ "Doesn't feel right."
- ❌ "I don't like it."
- ❌ "More polished."
- ❌ "Too generic."
- ❌ "Looks AI-generated."
- ❌ "Feels cheap."
- ❌ "Hmm, not quite."

### The vague-feedback pattern list (seed)

The skill maintains a list of vague patterns to detect. The list grows over time as new patterns are observed. The seed list:

```
^make it (better|nicer|prettier|stand out|pop)$
^the .* is off$
^doesn't feel right$
^i don't like it$
^more polished$
^too (generic|busy|bland|sterile|cheesy|cute)$
^looks (ai|generic|amateur|templated)$
^feels (off|cheap|wrong|date|sterile)$
^hmm[, ]+not quite$
^nope$
^try again$
^something('s| is) missing$
```

Patterns are matched case-insensitively, allowing filler words ("just," "kind of," "a bit"). The agent does not need to be a strict regex matcher — it can use judgment. The list exists to be a starting point, not a complete grammar.

When the user feedback matches a vague pattern, trigger the question + recommendation flow.

### Question + recommendation flow

When feedback is vague:

1. **Identify the dimension(s) the user is gesturing at.** A small mental model:
   - "feels off" / "doesn't feel right" → vibe
   - "too tall" / "cramped" / "spacious" → layout
   - "too cold" / "too warm" / "wrong color" → color
   - "too busy" / "empty" → density
   - "lacks polish" / "amateur" → motion + spacing + typography
   - "looks generic" / "looks AI" → aesthetic (the worst sign — usually means the user is reacting to a default they cannot name)

2. **For each dimension, generate 2–3 options** grounded in:
   - `brief.md` (vibe adjectives, anti-references, audience)
   - `analysis.md` (the patterns the agent extracted from references)
   - The diff between the last two iterations (what already changed)
   - "Best of" picks from the references for each dimension

3. **For each dimension, pick a recommendation** with explicit reasoning:

   > "I'd recommend **centered hero** because your brief says 'focused, single-action' and your Notion reference uses centered composition. Want to go with that, or try one of the others?"

4. **Always offer the screenshot fallback** as one of the options:

   > "...or drop a screenshot of what you have in mind — that's the most precise option."

### Specificity escalation

The strictness of the question + recommendation flow escalates over the number of consecutive vague cycles.

**Vague streak = 1 (gentle):**

> "I want to be precise here — could you tell me which of these dimensions is the main concern? [list of dimensions] Or drop a screenshot of what you're imagining."

**Vague streak = 2 (firmer):**

> "I need a specific change to make real progress. Here are 3 options — pick one, give me a different one, or drop a screenshot:
>
> 1. [option grounded in references]
> 2. [option grounded in brief]
> 3. [option grounded in iteration delta]"

**Vague streak ≥ 3 (call it out):**

> "Your feedback has been vague for [N] cycles in a row. Two paths forward:
>
> (a) drop a screenshot of what you're imagining — that's the most precise option
> (b) call v_[n-1] done and move to extraction
>
> We can keep iterating after extraction if you want. But there are diminishing returns here."

The "vague streak ≥ 3 = call it out" rule is also a soft stop condition for the iteration loop.

### Specific feedback handling

When feedback is specific, do not re-ask questions. Build the next version directly.

The diff from v_{n-1} to v_n should be small. If the feedback implies a large change, check with the user:

> "Just to confirm — when you say 'change the layout,' you mean [X] or [Y]? I want to make sure I get the intent."

The output of each cycle is:

1. The diff (what changed, in 2–3 sentences).
2. The new version (v_n) at the same file path.
3. An invitation for the next round of feedback.

### Hard cap

After 5 cycles, the agent must suggest extraction:

> "We've hit the iteration cap. v_[n] is at `[path]`. Even if it's not perfect, I think we have enough to extract a real design system from. We can always keep iterating after Phase 7. Move to extraction?"

The hard cap exists because there are diminishing returns beyond 5 cycles. The user can override ("one more") but the agent should not auto-continue past 5.

### Stop conditions

The loop ends when:

1. **User says "ship it" / "this is what I wanted" / "looks good."** Move to Phase 7.
2. **Vague streak ≥ 3 and user agrees to extract.** Move to Phase 7.
3. **Cycle ≥ 5 and user agrees to extract.** Move to Phase 7.
4. **User explicitly says "stop iterating."** Move to Phase 7.

Phase 7 is `skills/design-md-extract/SKILL.md`. Load it.

---

## Cross-cutting rules

### The agent always has a recommendation

Every iteration step where the user's input is vague produces a recommendation with explicit reasoning. The user can accept, reject, or override. The agent never just asks "what do you want?" without grounding the question.

### Don't drift from the brief

If the user requests something that contradicts `brief.md` (e.g., "make it dark" but the brief says "warm consumer" and the references are light), surface the conflict:

> "Your brief says 'warm consumer' and your references are light. Going dark is a bigger change than a typical iteration. Do you want to update the brief, or is this a one-off change for v_n?"

If the user wants to update the brief, write the change to `brief.md` and continue. The brief is a living document but changes to it are explicit.

### Anti-default-aesthetic stays active

The `anti-default-aesthetic` constraint applies to every iteration, not just v1. Do not let v_n regress into defaults just because the user is iterating fast. The constraint is more lenient in design mode (some roughness is fine while iterating) but defaults are never fine.

### Real copy, not Lorem ipsum

Every iteration uses real copy from `brief.md`. The user's product has a name, a value prop, a tagline. Use them. Lorem ipsum is a tell that the agent did not read the brief.

## What this skill does not do

- The iterate skill does not interview the user. That is the `grill` skill.
- The iterate skill does not propose UI directions or analyze screenshots. That is the `references` skill.
- The iterate skill does not generate `DESIGN.md`. That is the `design-md-extract` skill.
- The iterate skill does not enforce `DESIGN.md` (it does not exist yet). That is the `enforce-design` skill, active from Phase 8.
