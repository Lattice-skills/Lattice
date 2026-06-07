---
name: anti-default-aesthetic
description: Use this constraint skill in any Lattice phase that involves design or iteration (Phases 5, 6, and 8). The skill prevents the agent from producing generic "AI default" frontends — dark mode with blue/purple/neon gradients, glow effects, glassmorphism, generic Inter or system fonts, blue-500/Tailwind palette colors used as semantic tokens, emoji-laden hero sections, and other patterns the model is biased toward. The skill is active in design phase (where it is enforced but not aggressively) and in consistency phase (where it is enforced strictly). The skill does not pick a design — it only forbids the defaults.
---

# Anti-Default Aesthetic

This is a **constraint** skill. It does not design. It forbids.

The model that powers Lattice is biased toward a small set of "default" frontends. Every user has seen them: dark backgrounds, blue/purple accent colors, neon glow, glassmorphism, "🚀 Build faster" hero copy, blue-500 in Tailwind used as a primary color, Inter loaded from Google Fonts as the universal type choice.

These defaults are not bad in themselves. They are bad because they are **default** — they appear in every AI build, regardless of product, audience, or vibe. The user is paying for Lattice specifically to avoid them.

This skill enforces the absence of defaults. It is active in:

- **Phase 5 (build v1).** Enforced but lenient — v1 is allowed some roughness.
- **Phase 6 (iterate).** Enforced. Defaults do not sneak in during cycles.
- **Phase 8 (consistency mode).** Enforced strictly. The design system is the design system.

The skill is **not** active in Phases 1–4 (grill, direction, analysis, alignment) — those phases are about understanding the user, not building UI.

---

## The forbidden defaults

### Color

- **No purple/blue/neon accents without explicit user choice.** If the user did not pick an accent color in `decisions.md`, do not pick one. Pick a neutral (warm gray, off-white, black) and let the user's references guide the next iteration.
- **No `bg-blue-500`, `text-purple-600`, `from-indigo-500` etc. used as semantic colors.** Tailwind palette names are not tokens. They are color names. The design system maps roles (`primary`, `accent`, `text`) to specific values, not to palette names.
- **No generic dark mode (`bg-gray-900 text-white`).** Dark mode is a choice. If the user did not ask for dark mode, the v1 should be light or have a deliberate dark palette, not "we made it dark by default."
- **No glow effects.** `box-shadow: 0 0 40px rgba(blue, 0.5)` and similar. Glow is a tell. The only exception is if the user explicitly asked for it.
- **No gradient text (`bg-gradient-to-r from-X to-Y bg-clip-text text-transparent`) unless the user asked for it.** Same for gradient backgrounds, gradient borders, etc.

### Type

- **No default font stacks (`Inter`, `system-ui`, `sans-serif`) without explicit user choice.** The user picks the type family in Phase 4 alignment. If the type is not picked, v1 should either use a system stack without comment or call out the missing decision and recommend one.
- **No `font-bold` for emphasis unless the design's weight scale includes `bold`.** Semantic weight tokens (`heading`, `body`, `label`) are the right answer.
- **No `text-2xl`, `text-3xl` etc. used as semantic sizes.** The size scale is a token, not a class name.
- **No Google Fonts loaded without explicit user choice.** Inter from Google Fonts is the most overused default in AI frontends. If the user did not pick a family, do not default to Inter.

### Layout

- **No glassmorphism (`backdrop-blur`, `backdrop-filter: blur(...)`) unless the user asked for it.** Glass is a tell.
- **No 12-column "boilerplate" hero with centered text and a single CTA, unless it fits the brief.** Every AI agent builds this hero. The user has seen it 1000 times.
- **No emoji as design elements (`🚀 Build faster`, `✨ AI-powered`, `💡 Get started`).** Emoji as icons is fine (in a nav or as a status indicator). Emoji as design system tokens is a tell.

### Components

- **No `shadcn/ui` defaults shipped without curation.** shadcn is a great starting point, but the defaults are default. If the user is on shadcn, the agent should review the components and customize them to the design system.
- **No copied Material/Tailwind UI/Ant Design blocks without modification.** The user can tell.
- **No "feature grid" with three columns of icon + title + description, unless the brief says feature grid.** This is the most overused pattern in AI frontends.

### Motion

- **No default Tailwind transitions (`transition-all duration-200`).** If motion is a token, use it. If not, leave it out.
- **No infinite animations, pulsing dots, or other "AI vibe" motion.** Pulse is a tell.

### Copy

- **No "Built for [X]" hero copy as a default.** The user has a product name and a value prop. Use them.
- **No "Empower your [X] with the power of [Y]" copy.** Marketing-speak is a tell.
- **No Lorem ipsum in v_n.** Real copy from `brief.md`. Always.

---

## How the skill enforces

The skill does not run as a separate step. It is a filter the agent applies continuously while building and iterating.

When the agent is about to write code that matches one of the forbidden patterns, it must:

1. **Stop.** Do not write the code yet.
2. **Check the brief and decisions.** Does the user have a choice that overrides the default? If yes, follow the user's choice.
3. **If no, choose a non-default alternative.** This is the most common path. The agent picks a non-default color, type, layout, etc. and proceeds.
4. **Document the choice in the response.** Tell the user what was chosen and why. "I went with [X] because [Y] is in the brief and [Z] is what the references do." The user can override.

The skill does not need to be perfect on v1. v1 is allowed to make calls that the user might want to change. The skill is about avoiding the *specific defaults* that appear in every AI build, not about being a perfect designer.

By Phase 8 (consistency mode), the design system the user ratified encodes the non-default choices. The skill becomes a guard against regressions, not against the original sin.

---

## Common overrides

There are situations where a default is not actually a default — it is the user's choice:

- **User explicitly asks for dark mode.** Dark mode is fine.
- **User picks purple as the accent.** Purple is fine.
- **User picks Inter in `decisions.md`.** Inter is fine.
- **User references a site that uses glow effects.** Glow is fine.
- **User says "make it feel like [AI-default site]."** That is the user's brief; honor it. The skill does not override the user.

The skill is a constraint, not a taste arbiter. If the user has made a choice, the choice wins.

---

## When the skill does not apply

- Phases 1–4 (grill, direction, analysis, alignment). The user is being interviewed; no UI is being built.
- The user has explicitly overridden a rule.
- The design system in `DESIGN.md` (Phase 8) encodes a pattern that would otherwise be a default. E.g., if `DESIGN.md` says primary is `#5B6CFF`, that is the design system's choice, not a default. Use it.

---

## The short version

If the agent is about to write a piece of code that looks like every other AI frontend, do not write it. Pick a non-default alternative. Tell the user what was picked and why. Move on.
