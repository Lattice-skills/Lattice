# Reference Catalog

This catalog contains 5 starter archetypes the Lattice agent uses as a fallback when web search returns no good matches for a UI direction. The agent reads the relevant archetype file(s) based on the user's `brief.md` and proposes directions grounded in the references below.

The 5 archetypes cover the most common AI-engineer use cases. They are not exhaustive — Lattice is designed to be universal by the user's screenshots (per the architecture's first design principle). The catalog is the safety net, not the default.

## How the agent uses the catalog

When Phase 2 of the Lattice workflow (direction selection) reaches the catalog fallback step:

1. Read the user's `brief.md` (vibe adjectives, audience, anti-references).
2. Identify the 2–3 archetypes that best match the brief.
3. Propose directions using the references in those archetype files.
4. Fall back to the agent's own knowledge of well-designed sites if no archetype fits.

The catalog is **not** a default to be applied uncritically. The agent should always prefer the user's own screenshots (from Phase 3) over the catalog. The catalog is a safety net for when the user has not yet provided screenshots.

## The 5 archetypes

| Archetype | Vibe | Best for |
|---|---|---|
| [saas-marketing](./saas-marketing.md) | Hero-focused, generous whitespace, big typography, single accent | Marketing pages, landing pages, "above the fold" first impressions |
| [dense-dev-tool](./dense-dev-tool.md) | Information-first, dark by default, restrained color, high density | Developer tools, dashboards, IDEs, command-line UIs |
| [warm-consumer](./warm-consumer.md) | Soft color, friendly type, balanced whitespace, accessible | Consumer apps, productivity tools, content platforms |
| [editorial-content](./editorial-content.md) | Reading-first, classic type, generous margins, no chrome | Blogs, documentation, content sites, long-form reading |
| [dashboard-admin](./dashboard-admin.md) | Tables, forms, density, status indicators, action surfaces | Admin panels, internal tools, data-heavy interfaces |

## Curation status

The reference sites in each archetype file are well-known products the agent can describe with confidence. The list is not exhaustive — there are many good designs in each category. The list is a starting point. Real users with real briefs will pull in references the agent has not seen, and that is the design of Lattice.

When you add new archetypes, follow the same structure: vibe, references, what each does well, brief mapping. Avoid more than 5–7 reference sites per archetype. The agent's job is to pick from the list, not to be overwhelmed by it.
