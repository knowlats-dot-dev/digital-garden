# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build to ./dist/
pnpm preview    # Preview production build locally
pnpm astro check  # Type-check .astro files
```

## Architecture

This is an **Astro 6** static site with **React** islands and **Tailwind CSS v4**.

### Content pipeline

Notes are plain Markdown files in `content/notes/` with YAML frontmatter (`title`, `date`, `tags[]`). They are **not** Astro Content Collections — they are read at build time by `src/lib/notes.ts` using `gray-matter` directly from the filesystem.

`src/lib/notes.ts` is the single source of truth for all note data. It:
- Parses frontmatter and extracts `[[wikilink]]` syntax (supporting `[[slug|alias]]`)
- Computes bidirectional backlinks across all notes in a single pass
- Builds React Flow graph data (`buildGraphData`)
- Converts wikilinks to `<a>` or `<span class="wikilink-missing">` HTML (`wikilinkToHtml`)

Slugs are derived from filenames (no `.md`). The `slugify` function lowercases and hyphenates — wikilink targets must match this form to resolve.

### Pages & routing

| Route | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Lists all notes sorted by date, tag filter bar |
| `/notes/[slug]` | `src/pages/notes/[slug].astro` | Individual note with rendered markdown, backlinks, graph |
| `/tags/[tag]` | `src/pages/tags/[tag].astro` | Notes filtered by tag |
| `/graph` | `src/pages/graph.astro` | Full-screen knowledge graph |

### Styling

Tailwind v4 with a custom dark theme defined in `src/styles/global.css` via `@theme`. Color tokens: `bg`, `surface`, `surface2`, `border`, `fg`, `muted`, `accent`, `accent-light`. The `.prose` class styles markdown-rendered HTML. Wikilink appearance is handled by `.wikilink` and `.wikilink-missing` classes in global CSS (not Tailwind utilities, because they target dynamically-generated HTML).

### KnowledgeGraph component

`src/components/KnowledgeGraph.tsx` is the only React island. It receives pre-computed `nodes` and `edges` from Astro (via `buildGraphData`), renders them with **React Flow**, and navigates to `/notes/[slug]` on node click. Tag-to-color mapping is hardcoded in `tagToColor`.
