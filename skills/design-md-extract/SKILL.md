---
name: design-md-extract
description: Use this skill in Phase 7 of the Lattice workflow — when the user says "this is what I wanted," "ship it," or "looks good." The skill generates a Google Stitch DESIGN.md (Apache 2.0 open standard) at the project root, inferred from the approved v_n of the frontend, cross-referenced with brief.md and decisions.md. The skill validates the output with `@google/design.md` CLI, then exports a `tailwind.config.ts` and an optional `tokens.json` (W3C DTCG). The output is the durable artifact the project keeps forever — every other agent in the ecosystem can read it.
---

# DESIGN.md Extract

The extract skill turns the approved v_n of the user's frontend into a Google Stitch DESIGN.md file. DESIGN.md is the durable design system artifact the project keeps forever. It is the source of truth for the `enforce-design` skill in Phase 8.

This skill assumes:

- The Lattice orchestrator has produced `brief.md`, `analysis.md`, and `decisions.md`.
- The user has approved a v_n of the frontend (the iterate skill is done).
- The user has said "this is what I wanted," "ship it," or "looks good."

If any of these are not true, defer to the orchestrator. Do not jump to extraction.

---

## Why DESIGN.md

DESIGN.md is not a Lattice invention. It is [Google Stitch's open standard](https://github.com/google-labs-code/design.md), Apache 2.0, alpha. It is a two-layer format:

- **YAML front matter** — machine-readable design tokens (colors, typography, spacing, rounded, components). Typed per the DESIGN.md spec.
- **Markdown body** — human-readable design rationale in 8 required sections: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's & Don'ts.

DESIGN.md is:

- **Tool-agnostic.** Any agent or design tool can read it.
- **Exportable.** `@google/design.md` CLI converts tokens to Tailwind config and W3C DTCG `tokens.json`.
- **Validatable.** The CLI catches WCAG contrast violations, missing required sections, malformed tokens.
- **Version-controllable.** It's a file. It diffs. It PRs.
- **Portable.** The user can uninstall Lattice and the file still works.

Lattice's extract skill is opinionated about *how* DESIGN.md gets generated — inferred from the iteration history, cross-referenced with the brief and decisions — but the output format is the open standard.

---

## The extraction process

### Step 1 — Re-read the inputs

Read these four files before doing anything:

- `brief.md` — product, audience, vibe, anti-references, direction.
- `analysis.md` — patterns extracted from the user's reference screenshots.
- `decisions.md` — the alignment outcomes locked at the end of Phase 4.
- The approved v_n — the actual frontend code at the user's stack's entry point.

The v_n is the source of truth for the tokens. The brief and decisions are the source of truth for the prose. The analysis is the bridge between them.

### Step 2 — Detect or install `@google/design.md`

Check if `@google/design.md` is already installed in the user's project:

```bash
ls node_modules/@google/design.md 2>/dev/null
```

If not, install it (do not ask — it is a build-time dep, not a runtime one):

```bash
npm install --save-dev @google/design.md
```

(Adapt the install command to the user's package manager: `pnpm add -D`, `yarn add -D`, etc.)

### Step 3 — Read the DESIGN.md spec

Before writing the file, fetch the spec to make sure the syntax is current. The DESIGN.md format is `alpha` and may have evolved:

```bash
npx @google/design.md --help
npx @google/design.md validate --help
```

If the CLI fails to install or run, fall back to the in-skill spec summary at the bottom of this file. Do not invent token types — use only the types in the spec.

### Step 4 — Extract tokens from v_n

Walk the v_n code and extract:

#### Colors

For each color used (in CSS, in Tailwind config, in component code, in inline styles):

- Identify the **role** (primary, secondary, accent, background, surface, text, border, muted, success, warning, danger, info, etc.). Roles are semantic — they describe what the color is for, not what it is.
- Map each role to a token name (`{colors.primary}`, `{colors.text-primary}`, etc.).
- Note the actual value (hex, rgb, oklch).
- Note contrast pairs (text on background, etc.) — the spec validator will check these.

If `decisions.md` specified a single accent color, enforce that. The v_n is the source of truth for what was actually used.

#### Typography

For each text style used (font family, size, weight, line height, letter spacing):

- Identify the **role** (`display-lg`, `display-md`, `heading-lg`, `heading-md`, `heading-sm`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`, `caption`, `code`).
- Group by family. If multiple families are used, name them (`{typography.family.sans}`, `{typography.family.mono}`).
- Group by size, weight, line height, letter spacing — the tokens that compose a typography role.

The brief and decisions are the source of truth for family choice. The v_n is the source of truth for sizes and weights used.

#### Spacing

Extract the spacing scale from v_n. Identify the **base unit** (usually 4px or 8px) and the scale (typically `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`).

Name the tokens (`{spacing.0}`, `{spacing.1}`, ..., or `{spacing.xs}`, `{spacing.sm}`, etc. — match the user's existing naming convention in Tailwind config, if any).

#### Rounded (border radius)

Extract border-radius values. Name them (`{rounded.none}`, `{rounded.sm}`, `{rounded.md}`, `{rounded.lg}`, `{rounded.full}`).

#### Components

For each distinct component in v_n (Button, Card, Input, Nav, Hero, etc.), document:

- The component name.
- The token references that compose it (color, typography, spacing, rounded).
- Variants (sizes, states).

The component section is the most opinionated — keep it lean. Document the components that exist in v_n, not components the user might want in the future.

### Step 5 — Write DESIGN.md

Write the file at the project root. Two parts: YAML front matter + markdown body.

#### YAML front matter

```yaml
---
version: alpha
name: <project name from brief.md>
description: <one-sentence product description from brief.md>
colors:
  primary: <Color>
  secondary: <Color>
  # ...
typography:
  <role>:
    fontFamily: <string>
    fontSize: <Dimension>
    fontWeight: <number>
    lineHeight: <Dimension | number>
    letterSpacing: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
rounded:
  <scale-level>: <Dimension>
components:
  <component-name>:
    <token-name>: <string | {path.to.token} reference>
---
```

`Color` and `Dimension` types are defined by the DESIGN.md spec. Use only the spec's types. Token references use `{path.to.token}` syntax.

#### Markdown body

The body has 8 required sections, in this order. Omit any that do not apply, but try to include all 8.

1. **Overview (a.k.a. "Brand & Style").** 2–3 sentences. The product's vibe, the audience, the direction. Quote the vibe adjectives from `brief.md`. Reference the chosen direction.

2. **Colors.** The palette, organized by role. Note contrast pairs (text on background). Reference the anti-references from `brief.md` — what colors were deliberately avoided.

3. **Typography.** The type system, the family choice, the scale, the weight hierarchy. Reference the brief's "confident typography" or "editorial" cues.

4. **Layout (a.k.a. "Layout & Spacing").** The grid, the base unit, the spacing scale, the density choice (generous / standard / dense). Reference `decisions.md` if the density was locked.

5. **Elevation & Depth.** The shadow / border / glassmorphism approach. Reference the brief and decisions.

6. **Shapes.** Border-radius scale. Reference the brief and v_n.

7. **Components.** Each component documented with its token references. Lean — document what exists in v_n, not what could exist.

8. **Do's and Don'ts.** Distilled from the brief's anti-references and the choices made in `decisions.md`. This is the most opinionated section. Be specific.

### Step 6 — Validate

Run the DESIGN.md CLI validator:

```bash
npx @google/design.md validate DESIGN.md
```

If validation fails, fix the file and re-run. Do not skip validation. The validator catches:

- Malformed YAML.
- Missing required sections.
- WCAG contrast violations (text on background pairs).
- Token type mismatches.

If the validator reports contrast violations, surface them to the user and ask whether to fix the design (preferred) or accept the violation (the user can override; not recommended for production).

### Step 7 — Export to Tailwind config

Run the Tailwind export:

```bash
npx @google/design.md export --format tailwind DESIGN.md
```

The output is a `tailwind.config.ts` at the project root. If the user already has a `tailwind.config.*`, the export will overwrite it. Confirm with the user before doing so.

If the user is not on Tailwind, skip this step. Note in the summary that Tailwind export is available and the user can run it manually later.

### Step 8 — Export to W3C DTCG (optional)

For projects that prefer the W3C DTCG standard, also export:

```bash
npx @google/design.md export --format dtcg DESIGN.md
```

The output is a `tokens.json` at the project root. Skip if the user is on Tailwind and does not care about DTCG.

### Step 9 — Summarize

Tell the user:

- `DESIGN.md` is at the project root.
- It validates against the spec.
- `tailwind.config.ts` was generated (or skipped).
- `tokens.json` was generated (or skipped).
- Phase 8 (consistency mode) is now active.
- The project stays consistent as long as `DESIGN.md` exists.

> "DESIGN.md is at the project root. It validates. Tailwind config is exported. From now on, every frontend change has to respect DESIGN.md — Phase 8 is active. To add a new token, update DESIGN.md first. To add a new component, document it in DESIGN.md first. The `enforce-design` skill is now in charge."

---

## Fallback spec summary

If the `@google/design.md` CLI is not available (offline, install failed, etc.), use this summary of the DESIGN.md alpha spec. It is enough to write a valid file.

### Token types

```yaml
# Color — string (hex, rgb, oklch, named)
primary: "#5B6CFF"
secondary: oklch(0.7 0.1 250)
neutral-50: rgb(250 250 250)

# Dimension — string (with unit) or number (treated as px)
spacing-1: "4px"
spacing-2: "8px"
spacing-3: 12

# Duration — string (with unit) or number (ms)
motion-fast: "150ms"
motion-slow: 300

# Cubic bezier — string
motion-ease: "cubic-bezier(0.2, 0.8, 0.2, 1)"

# Shadow — string (CSS shadow syntax)
shadow-sm: "0 1px 2px rgba(0, 0, 0, 0.05)"

# Font weight — number or string
weight-regular: 400
weight-bold: "700"
```

### Front-matter schema (v1)

```yaml
version: alpha              # required
name: <string>              # required
description: <string>       # required
colors: <Color>             # optional
typography: <Typography>    # optional
spacing: <Spacing>          # optional
rounded: <Rounded>          # optional
motion: <Motion>            # optional
elevation: <Elevation>      # optional
components: <Components>    # optional
```

### Reference syntax

Tokens can reference other tokens using `{path.to.token}` syntax:

```yaml
components:
  button-primary:
    background: "{colors.primary}"
    color: "{colors.text-inverse}"
    padding: "{spacing.2} {spacing.4}"
    border-radius: "{rounded.md}"
    font: "{typography.label-md}"
```

This is what makes DESIGN.md a real design system, not a flat list of values.

### Body sections (required order)

1. Overview
2. Colors
3. Typography
4. Layout
5. Elevation & Depth
6. Shapes
7. Components
8. Do's and Don'ts

A section can be omitted if there is nothing to say. But try to include all 8.

---

## What this skill does not do

- The extract skill does not build or modify the frontend. The approved v_n is read-only input.
- The extract skill does not enforce the design system. That is the `enforce-design` skill (Phase 8).
- The extract skill does not interview the user. The brief, analysis, and decisions are read-only input.
- The extract skill does not propose UI directions or analyze screenshots. That is the `references` skill.

The extract skill's only output is `DESIGN.md` (+ optional `tailwind.config.ts` + `tokens.json`). It is the boundary between design phase and consistency phase.
