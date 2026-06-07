---
name: no-inline-styles
description: Use this constraint skill in Phase 8 of the Lattice workflow — consistency mode, after `DESIGN.md` exists. The skill forbids inline styles, raw color values, raw spacing values, raw typography values, and any other code-level design system bypass. Every visual property must reference a token defined in `DESIGN.md`. The skill is aggressive — there is no "it's a small one-off" exception. Dynamic runtime values (e.g., data-driven chart colors) are allowed when the alternative is impossible, and the agent should still document them in `DESIGN.md` when practical. The skill is the discipline layer that keeps `DESIGN.md` from rotting.
---

# No Inline Styles

This is a **constraint** skill. It enforces the discipline of design tokens in code. It is active in:

- **Phase 8 (consistency mode).** Aggressive. Every piece of frontend work is checked.

It is **not** active in Phases 1–7 (design phase). During design phase, some inline values are acceptable — the design system is not yet extracted, and the agent needs to iterate fast. By Phase 8, every value should be a token.

The skill assumes `DESIGN.md` exists at the project root. If it does not, this skill does not apply.

---

## The rule

Every visual property in frontend code must be a reference to a token in `DESIGN.md`. Tokens are accessed through the styling system the project uses:

- **Tailwind CSS:** semantic class names (`bg-primary`, `text-secondary`, `p-4`, `rounded-md`) backed by `tailwind.config.ts` generated from `DESIGN.md`.
- **CSS variables:** `var(--colors-primary)`, `var(--spacing-4)`, etc., defined in a global stylesheet generated from `DESIGN.md`.
- **CSS-in-JS (Emotion, styled-components):** theme objects accessed as `props.theme.colors.primary`.
- **vanilla-extract:** `vars.color.primary`, `vars.spacing[4]`, etc., generated from `DESIGN.md`.
- **Astro, Svelte, Vue:** similar — a theme or variables file generated from `DESIGN.md`.

Whatever the system, the rule is the same: **values come from `DESIGN.md`, not from inline code**.

---

## What is forbidden

### Inline styles

```jsx
// ❌ FORBIDDEN
<div style={{ backgroundColor: '#5B6CFF', padding: '16px' }}>...</div>
<div style="background: #5B6CFF; padding: 16px">...</div>
```

```jsx
// ✅ ALLOWED
<div className="bg-primary p-4">...</div>
<div className={styles.card}>...</div>
```

### Raw color values

```jsx
// ❌ FORBIDDEN
<div className="bg-[#5B6CFF]">...</div>
<p style={{ color: 'rgb(91, 108, 255)' }}>...</p>
```

```jsx
// ✅ ALLOWED
<div className="bg-primary">...</div>
<p className="text-primary">...</p>
```

### Raw spacing values

```jsx
// ❌ FORBIDDEN
<div className="p-[17px] mt-[13px]">...</div>
<div style={{ padding: '17px' }}>...</div>
```

```jsx
// ✅ ALLOWED
<div className="p-4 mt-3">...</div>  // assuming the scale includes 3 and 4
```

### Raw typography values

```jsx
// ❌ FORBIDDEN
<h1 className="text-[42px] font-[600] leading-[1.1]">...</h1>
<p style={{ fontSize: '14px', fontWeight: 400 }}>...</p>
```

```jsx
// ✅ ALLOWED
<h1 className="text-display-lg">...</h1>
<p className="text-body-md">...</p>
```

### Tailwind palette names as semantic colors

```jsx
// ❌ FORBIDDEN
<button className="bg-blue-500 text-white">...</button>
<div className="border-gray-200">...</div>
```

```jsx
// ✅ ALLOWED
<button className="bg-primary text-inverse">...</button>
<div className="border-muted">...</div>
```

Tailwind palette names (`blue-500`, `gray-200`, etc.) are color *names*, not design tokens. They are not part of the design system. Using them as semantic colors is a token bypass.

### Arbitrary values

```jsx
// ❌ FORBIDDEN
<div className="bg-[oklch(0.7_0.1_250)]">...</div>
<div className="rounded-[7px]">...</div>
```

```jsx
// ✅ ALLOWED
<div className="bg-accent">...</div>  // assuming DESIGN.md has an accent token
<div className="rounded-md">...</div>  // assuming the rounded scale includes md
```

---

## What is allowed

### Dynamic runtime values

Some visual properties cannot be tokens because they are data-driven at runtime:

```jsx
// ✅ ALLOWED — chart color derived from data
<Bar fill={dataPoint.color} />

// ✅ ALLOWED — status indicator
<div style={{ backgroundColor: status === 'ok' ? 'var(--colors-success)' : 'var(--colors-danger)' }} />
```

When a value is truly dynamic, the token reference (`var(--colors-success)`) is still a token, not an inline value. If the value is hardcoded and not a token, it is a violation.

### Third-party components with hardcoded styles

Some libraries (e.g., charting libraries, rich text editors) accept inline style props that the agent cannot avoid. These are acceptable as long as the values come from tokens:

```jsx
// ✅ ALLOWED — passing a token to a third-party component
<Chart stroke="var(--colors-primary)" />

// ❌ FORBIDDEN — hardcoding a value the library accepts
<Chart stroke="#5B6CFF" />
```

If the third-party component requires a value (not a CSS variable), document it in `DESIGN.md` as a "third-party mapping" and use the token in user code.

### Generated styles

Styles generated by a build step (e.g., Tailwind's atomic CSS, CSS Modules, vanilla-extract) are not "inline styles" in the forbidden sense. They are the output of the token system. They are allowed.

### User-set preferences

If the user has set a personal preference (e.g., "I want a slightly larger margin on my dashboards"), that is a token change — update `DESIGN.md` first, then apply. Do not bypass the design system for personal preferences.

---

## How the skill enforces

The skill runs as a check on every piece of frontend work the agent does in Phase 8.

When the agent is about to write code:

1. **Check for inline styles.** Search the change for `style=`, `style:`, `className="...arbitrary-value..."`, and similar.
2. **Check for raw color values.** Search for `#[0-9a-fA-F]{3,8}`, `rgb(`, `oklch(`, `hsl(` outside of `DESIGN.md` and the generated config.
3. **Check for raw spacing/typography values.** Search for `p-[`, `m-[`, `text-[`, etc.
4. **Check for Tailwind palette names as semantic colors.** Search for `bg-blue-`, `text-purple-`, etc. used outside the palette.
5. **If any are found, fix them.** Replace with token references.
6. **If the agent thinks the violation is justified** (e.g., a third-party component), document the exception in `DESIGN.md` and proceed.

The agent is not expected to be a linter. The check is best-effort. The discipline is what matters.

---

## What the skill does not do

- The skill does not generate `DESIGN.md`. That is the `design-md-extract` skill.
- The skill does not pick the styling system. The project picks it.
- The skill does not override user choices. If the user explicitly says "use #5B6CFF for this one button," the agent can do that — but the agent should also add a `colors.primary` token to `DESIGN.md` so the value is documented.

The skill's only role is to keep `DESIGN.md` as the source of truth in the project. When `DESIGN.md` exists, this skill is always on.
