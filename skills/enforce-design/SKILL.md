---
name: enforce-design
description: Use this skill in Phase 8 of the Lattice workflow — when `DESIGN.md` exists in the project root. The skill runs in consistency mode: every piece of frontend work is checked against `DESIGN.md` before it lands. Tokens only — no inline styles, no new component without a DESIGN.md entry, no token changes without updating DESIGN.md first. The `no-inline-styles` constraint is active and aggressive. The skill is the discipline layer that keeps the design system from rotting.
---

# Enforce Design

The enforce-design skill is Lattice's consistency mode. Once `DESIGN.md` exists at the project root, this skill activates automatically. From that point on, every piece of frontend work in the project is checked against `DESIGN.md` before it lands.

This skill is the discipline layer. It does not design — it guards. Its only job is to make sure that what got ratified in Phase 7 stays ratified.

The `skills/no-inline-styles/SKILL.md` constraint is **active and aggressive** throughout this skill. Read it.

---

## What the skill checks

For every piece of frontend work the agent does (a new component, a CSS change, a new file, a refactor), the agent must verify:

### 1. Tokens only

- **No inline styles.** No `style={{ ... }}` in JSX, no `style="..."` in HTML, no `style.backgroundColor = "..."` in JS, no `element.style = "..."` unless it is a dynamic runtime value that cannot be a token (e.g. a chart's data-driven color).
- **No raw color values.** No `#fff`, no `rgb(...)`, no `oklch(...)` outside of `DESIGN.md`. Every color comes from a token: `bg-primary`, `text-secondary`, `border-muted`, etc. The token name maps to a path in `DESIGN.md`.
- **No raw font sizes, weights, or families.** No `text-[14px]`, no `font-bold` (if the design uses semantic weight tokens), no `font-sans` (if the design uses a named family). All from tokens.
- **No raw spacing values.** No `p-[17px]`, no arbitrary `mt-7`. Spacing is from the scale in `DESIGN.md`.

### 2. New components require a DESIGN.md entry

If the agent is asked to add a new component (e.g., a `Card` or `Modal`), it must:

1. Check if the component exists in `DESIGN.md`'s `## Components` section.
2. If it does, use the documented token references.
3. If it does not, **add it to `DESIGN.md` first**, with token references for color, typography, spacing, rounded, etc.
4. Then build the component.

The order is: document in DESIGN.md → build the component. Never the other way around.

### 3. Token changes require updating DESIGN.md first

If the user wants to change a token (e.g., "make the primary color more saturated"):

1. Update `DESIGN.md` first. Change the token's value in the YAML front matter.
2. Update the prose section that explains the token (e.g., the Colors section).
3. Validate `DESIGN.md` against the spec.
4. Re-export `tailwind.config.ts` (or equivalent).
5. The change propagates to every component that uses the token.

The user does not "edit the design in code" — they edit `DESIGN.md` and the code follows.

### 4. Contrast and accessibility

When the agent adds a text-on-background pair, it must verify the contrast ratio against WCAG AA (4.5:1 for body, 3:1 for large text and UI components). The `@google/design.md` CLI's validator catches most of these — run it after any change.

### 5. Component variants

If the agent adds a variant to an existing component (e.g., a `Button` gains a `destructive` variant):

1. Add the variant to `DESIGN.md` with its token references.
2. Document the variant in the `## Components` section.
3. Build the variant in code.

---

## How the skill runs

The skill is **automatic**. There is no explicit "run enforce-design" step. The agent checks every piece of frontend work against `DESIGN.md` as part of normal operation.

When the user asks for frontend work, the agent:

1. **Reads `DESIGN.md`.** This is the first thing it does, before any other context. Not "if relevant" — always. The design system is the source of truth.
2. **Verifies the requested change is consistent.** If it is, builds it. If it isn't, surfaces the conflict (see "Conflicts" below).
3. **Documents any new component or token** in `DESIGN.md` before building it.
4. **Validates** `DESIGN.md` after changes that affect tokens or components.

### Reading DESIGN.md

`DESIGN.md` is the agent's spec. The agent reads:

- The YAML front matter for tokens (colors, typography, spacing, rounded, components).
- The `## Components` section for documented components and their variants.
- The `## Do's and Don'ts` section for explicit rules.

The body sections (Overview, Colors, Typography, Layout, Elevation, Shapes) provide the *why* — useful for defending a design choice but not for guarding consistency.

### Conflicts

If the user's request conflicts with `DESIGN.md`, surface it explicitly. Do not silently override.

Examples of conflicts:

- User says "add a red button" but the design does not have a red token.
- User says "use a different font" but the typography is locked.
- User says "add a card with rounded-lg" but the rounded scale has `none, sm, md, full` (no `lg`).
- User says "make it 13px" but the type scale is 12/14/16/20/24.

When a conflict is detected:

> "DESIGN.md has [token-or-rule] locked. Your request implies [change]. To make this change, I need to update DESIGN.md first:
>
> 1. [add new token X]
> 2. [add new component variant Y]
> 3. [update Z section]
>
> Then build. Confirm?"

The user can override ("I know, do it anyway, I'll fix DESIGN.md later"). The agent builds it but flags the inconsistency in the response.

### New project context

If the project is new (no existing `DESIGN.md`), `enforce-design` does not apply. The Lattice workflow is in design phase, not consistency phase. Tell the user:

> "No DESIGN.md in the project root. Lattice is in design phase. Run the Lattice workflow to get a DESIGN.md extracted, or use another skill."

### DESIGN.md not present after Phase 7

If the user has run the Lattice workflow but `DESIGN.md` is missing from the project root (deleted, moved, never written), the agent should:

1. Check if the user wanted to remove it intentionally. (If yes, the project is back in design mode.)
2. If not, suggest re-running the extract skill.

---

## Anti-default-aesthetic in consistency mode

The `anti-default-aesthetic` constraint remains active. Consistency mode does not relax it. The design system the user ratified is the design system that stays. If the user wants to introduce a default aesthetic, that is a `DESIGN.md` change, not a code change.

---

## Validating DESIGN.md

When the agent changes `DESIGN.md`, it should validate the file:

```bash
npx @google/design.md validate DESIGN.md
```

If validation fails, fix the file and re-run. Validation catches:

- Malformed YAML.
- Missing required sections.
- WCAG contrast violations.
- Token type mismatches.

If the validator is not available, the agent should still apply the spec manually (see `design-md-extract/SKILL.md` for the spec summary).

---

## Exporting tokens

When tokens change, the agent should re-export the Tailwind config and (optionally) DTCG tokens:

```bash
npx @google/design.md export --format tailwind DESIGN.md
npx @google/design.md export --format dtcg DESIGN.md
```

Confirm before overwriting an existing `tailwind.config.ts`. The export is destructive to the existing config.

---

## What this skill does not do

- The enforce-design skill does not design. It guards.
- The enforce-design skill does not interview the user. That is the `grill` skill.
- The enforce-design skill does not analyze screenshots or propose directions. That is the `references` skill.
- The enforce-design skill does not build v1. That is the `iterate` skill.
- The enforce-design skill does not generate `DESIGN.md`. That is the `design-md-extract` skill.

The enforce-design skill's only role is to keep `DESIGN.md` as the source of truth in the project. When `DESIGN.md` exists, this skill is always on.
