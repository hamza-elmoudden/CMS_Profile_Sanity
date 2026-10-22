# Schema Documentation (cmsprofile)

Documentation for the Sanity Studio v6 content model of the portfolio CMS for
hamzaelmouddane.ma (project `330yc9gl`, dataset `production`).

This folder contains documentation **only** — no application code lives here.

## Layout

- `README.md` — this file.
- `schema.txt` — complete overview: every model/object, all enums, all
  relationships, every GROQ query with its exact returned shape, data flows,
  a compact model table, and an ASCII dependency map.
- `Fragments.txt` — the shared GROQ fragments (`SEO_FRAGMENT`,
  `IMAGE_FRAGMENT`, `SKILL_FRAGMENT`) with their shapes.
- One `.txt` file per schema/model/object (e.g. `Project.txt`, `Post.txt`,
  `Seo.txt`, `PortableText.txt`). Each file covers purpose, fields, relations,
  input shape, response shape, GROQ queries that touch the type, enums,
  validation rules, and gotchas.

## Conventions

- File names mirror the Sanity type names: `project` → `Project.txt`,
  `seo` (object) → `Seo.txt`.
- Field tables are generated from `defineField` definitions only. Anything not
  determinable from the schema (e.g. nullability, which Sanity infers at
  runtime) is marked `UNKNOWN` with a reason.
- GROQ projections are **explicit** — the frontend never receives full
  documents. Slugs are projected as `"slug": slug.current`, images expand via
  `IMAGE_FRAGMENT`, skills via `SKILL_FRAGMENT`, SEO via `SEO_FRAGMENT`.

## How to update when schemas change

1. Edit the schema in `schemaTypes/<name>.ts`.
2. Update the matching `docs/schema/<Name>.txt` file:
   - add/remove/modify rows in the `## Fields` table,
   - update `## Relations`, `## Enums`, `## Validation Rules` if affected.
3. If a GROQ query in `schemaTypes/queries.ts` changed, update
   `schema.txt` (the query catalog) and `## Response Shape` /
   `## API / Service Usage` in the affected model files.
4. If a new type was added: create `docs/schema/<Name>.txt`, register the type
   in `schemaTypes/index.ts`, and add it to `schema.txt`'s table and
   dependency map.
5. Verification checklist:
   - every type registered in `schemaTypes/index.ts` has a `.txt` file here,
   - every exported query in `queries.ts` appears in `schema.txt` with its
     exact projection shape,
   - `npx tsc --noEmit` passes (the only available check; there are no tests).

## Important gotchas (from AGENTS.md, reflected in the docs)

- `structure.ts` is **not wired in** — `sanity.config.ts` calls
  `structureTool()` with no options, so singleton enforcement and the custom
  sidebar are currently inert.
- `contact.ts` exports `contacts` but the type `name` is `contact`.
- `homePage` (and other pages) have a free-text `jsonLd` field annotated as
  needing `@sanity/code-input`, which is not installed.
- `blockContent.ts` is **not registered** in `index.ts` (legacy/alternate);
  the active rich text is `portableText.ts` / `bodyField`.
- Project/dataset are hardcoded in both `sanity.config.ts` and `sanity.cli.ts`.
- `contact` documents contain visitor PII — never expose them via public GROQ.
