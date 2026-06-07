# Contributing to Lattice

Thanks for your interest in Lattice. The framework is Apache 2.0 and contributions are welcome.

## What to contribute

The most useful things, in priority order:

1. **Bug reports** — open an issue if a skill's behavior doesn't match its `SKILL.md` description. Include the agent you were using, the inputs you gave, the output you got, and the output you expected.
2. **Skill improvements** — PRs to any `SKILL.md`. Each skill is a single markdown file with a YAML front matter (`name`, `description`). Keep the structure: `Goal` → `How to ...` → `Output` → `What this skill does not do`.
3. **New archetypes** — drop a new file in `references/catalog/<your-archetype>.md` following the structure of the existing 5 (vibe, references, brief mapping, anti-references, suggested token profile).
4. **Worked examples** — `.lattice/examples/` is open. The Stave example is the template. Add a new example folder for a different product type. Real screenshots in `v_n/` are even better.
5. **Library catalog** (v1.1) — once `no-hallucinated-libs` ships, we'll need a curated per-stack catalog. This is the largest single contribution surface.

## Style

Lattice is opinionated. When contributing, please:

- **Keep the tone direct, opinionated, and concrete.** Lattice always has a recommendation.
- **Don't add "what if the user wants X" branches.** Lattice recommends; the user accepts, rejects, or overrides.
- **Don't add "what if the agent is wrong?" hedges.** The agent is opinionated; it can be wrong; the user catches it.
- **Don't add Lorem ipsum examples.** Real copy, real products.
- **Don't add marketing fluff.** Read the existing skills — they read like engineering docs, not blog posts. Match that.

## Skill format (agentskills.io)

Each skill is a folder with a `SKILL.md` at the root. The front matter must include:

```yaml
---
name: <skill-name>
description: <one-paragraph description ending with when to use it; the description is what the agent sees at startup>
---
```

The body is markdown. The orchestrator's `description` is the only one loaded at agent startup. Sub-skill descriptions are loaded on demand. Keep `description` sharp — it's how the agent decides whether to load the skill.

## Pull request process

1. Fork the repo and create a feature branch.
2. Make your changes.
3. If you changed a `SKILL.md`, read the file in full and check it still matches the orchestrator's phase model (see `ARCHITECTURE.md`).
4. If you added an archetype, run a Lattice session mentally against a real product and check the archetype would have helped.
5. Open a PR. The description should include: what you changed, why, and (if applicable) a worked example.

## Reporting security issues

Please don't open a public issue for security vulnerabilities. Email the maintainers (see the repo's GitHub profile) instead.

## License

By contributing, you agree that your contributions will be licensed under Apache 2.0 — the same license as the project.
