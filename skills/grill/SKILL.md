---
name: grill
description: Use this skill in two situations: (1) Phase 1 of the Lattice workflow — to interview the user about their product, audience, brand vibe, and anti-references, and produce `brief.md`; (2) Phase 4 of the Lattice workflow — to align with the user on the delta between their reference screenshots and the product they actually want to build, and produce `decisions.md`. The grill is conversational, one question at a time, never form-like. The agent always has a recommendation. The user is the director, not the only source of ideas.
---

# Grill

The grill is Lattice's interview skill. It runs in two phases of the Lattice workflow:

- **Phase 1 — Product Grill:** interview the user to produce `brief.md`. The brief is the design brief the rest of the workflow re-reads in every subsequent phase.
- **Phase 4 — Alignment Grill:** present a synthesis of the references and ask alignment questions, one at a time, until the user is ready to build. The output is `decisions.md`.

This skill assumes the Lattice orchestrator (`SKILL.md` at the repo root) has already been activated and the user has confirmed the workflow. If it has not, defer to the orchestrator's Phase 0 first.

---

## Part 1 — Product Grill (Phase 1)

### Goal

Produce `brief.md` at the project root. One file, 30–60 lines. Re-used as context in every subsequent Lattice phase. Five questions, asked one at a time, conversationally.

### How to ask

Ask **one question at a time**. Never all five in one message. The interview is a conversation, not a form. Wait for the user's answer before asking the next question.

If the user's answer is vague, ask a follow-up that makes the answer concrete. Push for specifics, but do not interrogate. The agent's job is to make it easy for the user to give a useful answer.

If the user says "you decide" or "I don't know," make a recommendation and ask the user to accept, reject, or amend. The agent always has an opinion.

### The five questions

#### Q1 — What is the product?

> "Tell me about [product] in one sentence. What does it do, and why does it exist?"

Follow-up if vague: "Who is the alternative it replaces, and why do people dislike that alternative?"

The answer goes into the `## Product` section of `brief.md` as a single, sharp paragraph. Aim for 2–4 sentences total after follow-ups.

#### Q2 — Who is it for?

> "Who is the primary user? Concrete personas — not 'everyone.' If you had to name three people who would love this product tomorrow, who are they?"

Follow-up if vague: "Age range? Role? What tools do they currently use? What do they complain about?"

The answer goes into the `## Audience` section. Aim for 2–3 sentences describing a specific, recognizable person. The agent should be able to picture this user.

#### Q3 — Top 1–3 jobs to be done

> "What are the top 1–3 things users do in [product]? The verbs. 'Connect a database.' 'Run a query.' Not 'manage data.' Concrete actions."

Follow-up if vague: "If the user only did one thing in [product] for 5 minutes, what would that be?"

The answer goes into the `## Jobs to be done` section as a numbered list. Each item is a verb phrase. Aim for 1–3 items. If the user lists more, push back: "Pick the top 3. The rest is implied."

#### Q4 — Brand vibe

> "Give me 3–5 adjectives that describe how [product] should feel. Not features — *vibe*. Think about the closest reference sites you've used. (Examples: focused, dense, restrained, confident, editorial, warm, sharp, calm.)"

Follow-up if vague: "Pick 3 sites that get the vibe right. What do they have in common? Strip it down to 3 adjectives."

The answer goes into the `## Vibe` section as a bulleted list of exactly 3–5 adjectives. No more. These adjectives are the words the agent will use to defend design choices throughout the rest of the workflow.

#### Q5 — What is this product NOT?

> "What is [product] NOT? What references — sites, products, aesthetics — should we actively avoid? Think of designs that make you say 'anything but that.'"

Follow-up if vague: "What's the closest competitor, and what specifically is wrong with how they look? What would you change if you had to fix their site in a week?"

The answer goes into the `## Anti-references` section as a bulleted list. These are the things the agent will refuse to ship. When in doubt later, the agent checks the anti-references list.

### Tech stack

The agent reads the user's project to detect the stack (`package.json`, `tsconfig.json`, `svelte.config.js`, `vite.config.ts`, `next.config.js`, `tailwind.config.*`, `astro.config.*`, etc.). Do **not** ask the user what stack they use if the project is already there.

If the project is empty, ask:

> "What stack do you want to build in? (Next.js, Vite + React, SvelteKit, Astro, Remix, plain HTML/CSS/JS, etc.) If you don't have a preference, say 'you pick' and I'll default to Next.js + Tailwind."

### Output: `brief.md`

Write the file at the project root with this structure:

```markdown
# [Product name] — Brief

## Product

[2–4 sentences. The sharp version of Q1.]

## Audience

[2–3 sentences. A specific, recognizable person.]

## Jobs to be done

1. [verb phrase]
2. [verb phrase]
3. [verb phrase, if applicable]

## Vibe

- [adjective 1]
- [adjective 2]
- [adjective 3]
- [adjective 4, optional]
- [adjective 5, optional]

## Anti-references

- [thing 1 to avoid]
- [thing 2 to avoid]
- [thing 3 to avoid, optional]

## Stack

[Next.js 14 (App Router) + TypeScript + Tailwind CSS / etc. Detected from package.json or chosen by the user.]

## Direction

[Empty in Part 1. Filled in by Phase 2 of the Lattice workflow.]
```

### Confirm before continuing

After writing `brief.md`, read it back to the user in full and ask:

> "Here's your brief. Confirm as-is, or amend. Once you confirm, I'll move to direction selection."

Do not proceed to Phase 2 until the user confirms.

---

## Part 2 — Alignment Grill (Phase 4)

### Goal

Present the synthesis of `brief.md` + `analysis.md` and ask alignment questions, one at a time, until the user is ready to build. The output is `decisions.md`.

### The synthesis

After Phase 3 has produced `analysis.md`, write the synthesis in this format (do not put it in a file — present it inline to the user):

> "Here's what I see in your references:
> - **Color:** [pattern across references]
> - **Type:** [pattern]
> - **Spacing:** [pattern]
> - **Layout:** [pattern]
> - **Elevation:** [pattern]
> - **Vibe adjectives from brief mapped to references:** [mapping]
>
> I'm planning this for [product]: [one-paragraph synthesis]. Confirm or push back."

Wait for the user to respond. The response often answers several alignment questions at once. The agent's job is to identify the *delta* — what the user is reacting to, not what they are restating.

### Alignment question structure

For each delta, ask one question at a time. Each question:

1. Identifies the **dimension** the user is gesturing at (color, type, spacing, layout, density, motion, vibe).
2. Offers 2–3 **grounded options** — each anchored in something the user has already approved (a reference screenshot, a brief adjective, a decision already made).
3. Makes a **recommendation** with explicit reasoning. The agent always has an opinion.
4. Always offers the **screenshot fallback** as one of the options, not as a last resort:

   > "...or drop a screenshot of what you have in mind — that's the most precise option."

### Common alignment questions

These are the questions that show up in nearly every project. The agent should be ready to ask any of them without needing to be prompted. They are not all asked — only the ones where the delta is real.

- **Color mode.** "Your references are dark-mode-first; should v1 be dark or light? I'd recommend [X] because [reasoning from brief]."
- **Type density.** "References are typographically dense. Do you want that density on day one, or start generous and tighten later?"
- **Editorial vs. utility.** "Your references lean editorial; your product is a tool. Keep editorial vibe, or pull toward utility?"
- **Accent color.** "Your references use [X]; your brief says 'restrained color.' Pick a single accent — I'd recommend [X] because [reasoning]."
- **Whitespace.** "References are generous; your product is a dashboard. Match the references' whitespace, or compress for utility?"
- **Type family.** "References use [X]; your brief says 'confident typography.' Confirm [X], or pick from these [alternatives grounded in references]."

The agent picks the questions that are real for this project. Three to six questions is typical.

### Stop condition

The loop ends when the user says:
- "yes, build it"
- "yes, with these adjustments" (and lists them)
- "looks good"

The agent does not move to Phase 5 until the user explicitly approves. The agent should be ready to keep going if the user has more deltas.

### Output: `decisions.md`

Write the file at the project root with this structure:

```markdown
# [Product name] — Decisions

## Color

[Locked decisions. Mode (dark/light), palette, accent, neutrals.]

## Typography

[Locked decisions. Family, scale, weight hierarchy.]

## Spacing

[Locked decisions. Base unit, scale, density (generous / standard / dense).]

## Layout

[Locked decisions. Grid, hero composition, navigation pattern.]

## Elevation & depth

[Locked decisions. Flat / soft shadow / hard shadow / glassmorphism.]

## Other

[Any other locked decisions. Motion, copy voice, component-specific choices.]
```

Each section is 1–3 sentences. Total file should be ~20 lines. This is the design contract for Phase 5.

### Confirm before continuing

After writing `decisions.md`, read it back in full and ask:

> "Here's what's locked. Confirm, or amend. Once you confirm, I'll start building v1."

Do not proceed to Phase 5 until the user confirms.

---

## Cross-phase behavior

The grill is the only sub-skill that runs in two Lattice phases (1 and 4). The two parts have different inputs and outputs, but the conversational discipline is the same:

- One question at a time.
- Specific > general.
- Always have a recommendation.
- Always offer the screenshot fallback.
- Confirm with the user before moving on.

The agent should never "complete" the grill and immediately start doing the next thing. Each part ends with confirmation.

## What this skill does not do

- The grill does not propose UI directions. That is the `references` skill (Phase 2).
- The grill does not analyze screenshots. That is the `references` skill (Phase 3).
- The grill does not build anything. It only interviews and writes `brief.md` / `decisions.md`.
