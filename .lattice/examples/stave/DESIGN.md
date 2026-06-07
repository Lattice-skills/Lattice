---
version: alpha
name: Stave
description: A modern database client for teams that find existing tools ugly or slow. Built for backend engineers at fast-moving startups.
colors:
  bg-base: "#0A0A0A"
  surface: "#111111"
  surface-elevated: "#1A1A1A"
  border-subtle: "#262626"
  text-primary: "#FAFAFA"
  text-secondary: "#A1A1A1"
  text-muted: "#71717A"
  accent: "#3B82F6"
  accent-hover: "#2563EB"
  status-success: "#10B981"
  status-error: "#EF4444"
  status-warning: "#F59E0B"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "56px"
    fontWeight: 600
    lineHeight: "64px"
    letterSpacing: "-0.02em"
  heading-lg:
    fontFamily: "Inter"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.01em"
  heading-sm:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: "28px"
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label-md:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "16px"
  caption:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
spacing:
  0: "0px"
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
  32: "128px"
rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
components:
  button-primary:
    background: "{colors.accent}"
    color: "{colors.text-primary}"
    padding: "{spacing.3} {spacing.6}"
    border-radius: "{rounded.md}"
    font: "{typography.label-md}"
    border: "1px solid {colors.accent}"
    hover-background: "{colors.accent-hover}"
  button-secondary:
    background: "transparent"
    color: "{colors.text-primary}"
    padding: "{spacing.3} {spacing.6}"
    border-radius: "{rounded.md}"
    font: "{typography.label-md}"
    border: "1px solid {colors.border-subtle}"
    hover-border: "{colors.text-secondary}"
  card:
    background: "{colors.surface-elevated}"
    border: "1px solid {colors.border-subtle}"
    border-radius: "{rounded.lg}"
    padding: "{spacing.6}"
  code:
    background: "{colors.bg-base}"
    color: "{colors.text-primary}"
    font: "{typography.code}"
    padding: "{spacing.4}"
    border-radius: "{rounded.md}"
---

# Stave — Design System

## Overview

Stave is a modern database client for backend engineers at fast-moving startups. The audience is technical, opinionated, and time-constrained. The vibe is **focused, dense but not crowded, restrained color, confident typography** — like Linear, not like Stripe's marketing site.

The design system is built around the brief's anti-references: no enterprise chrome, no cutesy illustrations, no friendly consumer aesthetics. Every pixel earns its place.

The hybrid direction means the marketing page is editorial-weighted (generous spacing, larger type, asymmetric hero) while the product UI (when built) will be denser (Linear-style sidebar, table-first layout, restrained color). Both share the same token system.

## Colors

Dark mode is the default and the only mode for v1. The palette is built on three near-black neutrals (`bg-base`, `surface`, `surface-elevated`) and a single accent (`#3B82F6` blue, chosen over purple per the user's preference for a more restrained, Vercel-aligned feel). The accent is reserved for active states, links, primary CTAs, and the brand mark — never for decoration.

Status colors (`success`, `error`, `warning`) are explicit, not decorative. They appear where functional: alerts, form validation, real-time status indicators.

Text is layered: `text-primary` for body and headings, `text-secondary` for less important copy, `text-muted` for captions and meta. The hierarchy is expressed through value, not size alone.

**Anti-references:** No purple/blue gradients, no neon glow, no glassmorphism, no Tailwind palette names (`bg-blue-500`) used as semantic colors. Every color value lives in this file.

## Typography

Inter for UI, JetBrains Mono for code. The type system is functional, not expressive — sizes and weights earn their hierarchy, not decoration.

Display sizes (`display-lg`, `heading-lg`) are reserved for marketing and major page headers. Body sizes (`body-lg`, `body-md`, `body-sm`) cover most content. `label-md` is for buttons, nav items, and other interactive elements. `caption` is for meta information, timestamps, and footnotes.

Letter-spacing is tight: `-0.02em` for display, `-0.01em` for headings, default for body. The system reads as confident, not loose.

Monospace (`typography.code`) is used for SQL queries, IDs, file paths, and keyboard shortcuts. Never for UI text.

## Layout

12-column grid, 1280px max-width. The marketing page uses an asymmetric hero (text columns 1–6, product preview columns 7–12). Section breaks are 96–128px vertical padding.

The product UI (when built) will use a fixed 240px sidebar on the left and a scrolling main content area. Tables are 0.5–1x the base spacing unit. Components are 1.0–1.5x the base.

The spacing scale is 4px-based. Generous for marketing, tighter for product. The same scale applies in both contexts; the rhythm differs.

## Elevation & Depth

Flat. Borders define structure. 1px borders (`{colors.border-subtle}`) on dividers, cards, and inputs. No shadows in the chrome. No glassmorphism. The product preview in the hero is a designed illustration with a 1px border, no shadow.

This is a deliberate choice. Elevation in dense UIs is visual noise; in marketing contexts, it is a tell. The flat aesthetic is the brand.

## Shapes

Border radius scale: `none` (0), `sm` (4px), `md` (6px), `lg` (8px), `full` (9999px). Buttons use `md`. Cards use `lg`. Pills and badges use `full`. Inputs match buttons (`md`).

The scale is small and intentional. Rounded corners should feel confident, not soft.

## Components

### Button (primary)

The primary action. Solid accent background, primary text, `md` radius. Used for the main CTA on a page or in a section. Hover state darkens the background to `accent-hover`.

### Button (secondary)

The secondary action. Transparent background, `border-subtle` border, primary text. Hover state brightens the border to `text-secondary`. Used alongside the primary button when there are two options.

### Card

A container for related content. `surface-elevated` background, `border-subtle` border, `lg` radius, `spacing.6` padding. Used for product previews, feature blocks, and content groupings.

### Code

A container for code snippets and monospace content. `bg-base` background (deeper than the card's surface-elevated, for visual hierarchy), `md` radius, `spacing.4` padding. The `typography.code` role applies.

## Do's and Don'ts

### Do

- Use semantic token names (`bg-bg-base`, `text-text-primary`) — never palette names.
- Use the spacing scale. If a value is not on the scale, justify it.
- Use the type system. If a size is not in the typography roles, justify it.
- Reference tokens via the `{path.to.token}` syntax in component definitions.
- Update `DESIGN.md` before adding a new token or component.
- Validate `DESIGN.md` with `@google/design.md` after any change.

### Don't

- No purple/blue gradients or neon glow. The accent is restrained.
- No glassmorphism (`backdrop-blur`, `backdrop-filter`).
- No emoji as design elements. Emoji in copy is fine; emoji as icons is not.
- No 3-column feature grids with icon + title + description. The feature grid is the most overused AI default.
- No "Trusted by 10,000+ teams" logo walls.
- No Tailwind palette names (`bg-blue-500`) used as semantic colors.
- No inline styles, no raw color values in code, no arbitrary `text-[14px]` values.
- No default font stacks without explicit user choice.
- No bouncy animations. Transitions are 50–200ms, ease-out, no spring.
