# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build to ./dist/
pnpm preview    # Preview production build locally
pnpm astro check  # Type-check .astro files
```

## Browser testing

A Playwright MCP server is configured in `.mcp.json` and enabled via `.claude/settings.json`. Use the `mcp__playwright__*` tools to navigate, screenshot, and interact with the running dev server at `http://localhost:4321` for visual verification of UI changes.

> **Do not download the `chrome-for-testing` browser.** The Playwright MCP is configured to use the already-installed `chromium` channel (`--browser chromium` in `.mcp.json`). If a tool call asks to install `chrome-for-testing`, do not run the install — stay on the existing channel.

## Architecture

This is an **Astro 6** static site with **React** and **Svelte 5** islands and **Tailwind CSS v4**.

### Content pipeline

Notes are plain Markdown (`.md`/`.mdx`) files read at build time by `src/lib/notes.ts` with `gray-matter` directly from the filesystem — they are **not** Astro Content Collections. `getAllNotes()` walks `content/notes` recursively (`NOTES_DIR = content/notes`), skipping dot-entries and the `templates/` directory. Recognized frontmatter: `title` (falls back to the slug), `date` (falls back to `updated`, else empty), and `tags[]` (defaults to `[]`).

`src/lib/notes.ts` is the single source of truth for note data. It:

- Parses frontmatter and extracts `[[wikilink]]` syntax (supporting `[[slug|alias]]`)
- Computes `outlinks` and bidirectional backlinks
- Builds force-graph data via `buildGraphData` (global) and `buildLocalGraphData(notes, slug, depth=1)` (local neighborhood); both return `{ nodes, links }` and each node includes `degree`
- Converts wikilinks to `<a>` or `<span class="wikilink-missing">` HTML (`wikilinkToHtml`)
- Sorts notes for display with `sortNotesForDisplay`: pinned notes first (`index`, `welcome`), then newest-first by date, then title

Slugs are derived from each file's **basename** (not full nested path): `path.parse(relativePath).name` then `slugify` (lowercase; strip punctuation; collapse whitespace to hyphens; Unicode-aware via `\p{L}`, so Thai is preserved). Wikilink targets are slugified with the same function.

### Pages & routing

| Route           | File                           | Notes                                                    |
| --------------- | ------------------------------ | -------------------------------------------------------- |
| `/`             | `src/pages/index.astro`        | Lists all notes sorted by date, tag filter bar           |
| `/notes/[slug]` | `src/pages/notes/[slug].astro` | Individual note with rendered markdown, backlinks, graph |
| `/tags/[tag]`   | `src/pages/tags/[tag].astro`   | Notes filtered by tag                                    |
| `/graph`        | `src/pages/graph.astro`        | Full-screen knowledge graph                              |
| `/search.json`  | `src/pages/search.json.ts`     | Build-time JSON corpus for client-side search            |

### Styling

Tailwind v4 with a custom dark theme defined in `src/styles/global.css` via `@theme`. Color tokens: `bg`, `surface`, `surface2`, `border`, `fg`, `muted`, `accent`, `accent-light`. The `.prose` class styles markdown-rendered HTML. Wikilink appearance is handled by `.wikilink` and `.wikilink-missing` classes in global CSS (not Tailwind utilities, because they target dynamically-generated HTML).

### KnowledgeGraph component

`src/components/KnowledgeGraph.tsx` is a React island (`client:only="react"`) that renders an Obsidian-style force-directed graph with **`react-force-graph-2d`** (HTML canvas + d3-force). It takes a `data={{ nodes, links }}` prop and optional `activeSlug`. Nodes are circles sized by `degree`; labels are canvas-drawn and fade with zoom; hovering a node highlights it plus its neighbors and dims the rest; clicking navigates to `/notes/[slug]`. Live physics, dragging, zoom and pan come from the library. The canvas is sized to its container via a `ResizeObserver`, and dark/light colors follow the `.dark` class through a `MutationObserver`. `/graph` passes the global graph; each note's sidebar passes its local graph (`buildLocalGraphData`).

### Svelte 5 islands

Three Svelte 5 components handle interactive UI using runes (`$state`, `$effect`, `$props`):

- `ThemeToggle.svelte` — dark/light toggle; persists to `localStorage`, syncs to `document.documentElement.classList`.
- `Search.svelte` — trigger button that opens the search modal; reads platform to show ⌘K vs Ctrl+K.
- `SearchModal.svelte` — full search modal rendered via a `portal` action into `document.body`. Lazily fetches `/search.json` and builds the lunr index on first open; subsequent queries run client-side with 150 ms debounce. Keyboard shortcuts: ⌘K / Ctrl+K to open/close, Esc to close.

### Search

`src/lib/search.ts` wraps **lunr 2.x** with English + Thai multi-language support (`lunr-languages`). Two bugs in `lunr-languages` are patched inline: the Thai tokenizer returns plain strings instead of `lunr.Token` objects, which is fixed by wrapping the tokenizer. The index is singleton-cached per page load — it is built once from the `/search.json` corpus and reused across queries.

`src/pages/search.json.ts` generates the corpus at build time: it strips Markdown syntax, resolves wikilinks to plain text, segments Thai text into words via `wordcut`, and truncates each document's content to 5000 characters.
