import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Note {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string
  rawContent: string
  backlinks: string[]
  outlinks: string[]
}

export interface GraphNode {
  id: string
  label: string
  slug: string
  tags: string[]
  /** Number of directly linked notes; used to size the node. */
  degree: number
}

export interface GraphLink {
  source: string
  target: string
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

const NOTES_DIR = path.join(process.cwd(), 'content')
const PINNED_NOTE_SLUGS = ['index', 'welcome']

function collectMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'templates') continue
      files.push(...collectMarkdownFiles(fullPath))
      continue
    }
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

// Extract [[wikilinks]] from content, supporting both [[slug]] and [[slug|alias]]
function extractWikilinks(content: string): string[] {
  const matches = content.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)
  return [...matches].map((m) => slugify(m[1].trim()))
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
}

function toTimestamp(date: string): number {
  if (!date) return Number.NEGATIVE_INFINITY
  const value = Date.parse(date)
  return Number.isNaN(value) ? Number.NEGATIVE_INFINITY : value
}

export function sortNotesForDisplay(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => {
    const pinnedIndexA = PINNED_NOTE_SLUGS.indexOf(a.slug)
    const pinnedIndexB = PINNED_NOTE_SLUGS.indexOf(b.slug)
    const isPinnedA = pinnedIndexA !== -1
    const isPinnedB = pinnedIndexB !== -1

    if (isPinnedA || isPinnedB) {
      if (isPinnedA && isPinnedB) return pinnedIndexA - pinnedIndexB
      return isPinnedA ? -1 : 1
    }

    const timeDiff = toTimestamp(b.date) - toTimestamp(a.date)
    if (timeDiff !== 0) return timeDiff

    return a.title.localeCompare(b.title)
  })
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return []
  const files = collectMarkdownFiles(NOTES_DIR)

  const notes: Note[] = files.map((filePath) => {
    const relativePath = path.relative(NOTES_DIR, filePath)
    const slugSource = relativePath
      .replace(/\.(md|mdx)$/i, '')
      .split(path.sep)
      .join(' ')
    const slug = slugify(slugSource)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ? String(data.date) : data.updated ? String(data.updated) : '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      content,
      rawContent: raw,
      backlinks: [],
      outlinks: extractWikilinks(content),
    }
  })

  // Populate backlinks
  const slugSet = new Set(notes.map((n) => n.slug))
  for (const note of notes) {
    for (const target of note.outlinks) {
      if (slugSet.has(target)) {
        const targetNote = notes.find((n) => n.slug === target)
        if (targetNote && !targetNote.backlinks.includes(note.slug)) {
          targetNote.backlinks.push(note.slug)
        }
      }
    }
  }

  return notes
}

export function getNoteBySlug(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug)
}

// Build the undirected, de-duplicated link set and a neighbor adjacency map
// shared by both the global and local graph builders.
function buildAdjacency(notes: Note[]): {
  links: GraphLink[]
  adjacency: Map<string, Set<string>>
} {
  const slugSet = new Set(notes.map((n) => n.slug))
  const adjacency = new Map<string, Set<string>>()
  for (const note of notes) adjacency.set(note.slug, new Set())

  const seen = new Set<string>()
  const links: GraphLink[] = []

  for (const note of notes) {
    for (const target of note.outlinks) {
      if (target === note.slug || !slugSet.has(target)) continue
      const [a, b] = [note.slug, target].sort()
      const key = `${a}--${b}`
      if (seen.has(key)) continue
      seen.add(key)
      links.push({ source: a, target: b })
      adjacency.get(a)!.add(b)
      adjacency.get(b)!.add(a)
    }
  }

  return { links, adjacency }
}

function toGraphNode(note: Note, degree: number): GraphNode {
  return { id: note.slug, label: note.title, slug: note.slug, tags: note.tags, degree }
}

// Global graph: every note as a node, every resolved wikilink as a link.
export function buildGraphData(notes: Note[]): GraphData {
  const { links, adjacency } = buildAdjacency(notes)
  const nodes = notes.map((note) => toGraphNode(note, adjacency.get(note.slug)?.size ?? 0))
  return { nodes, links }
}

// Local graph: the note plus every note reachable within `depth` hops, and the
// links among them. Node sizes still use each note's global degree.
export function buildLocalGraphData(notes: Note[], slug: string, depth = 1): GraphData {
  const { links, adjacency } = buildAdjacency(notes)
  const noteBySlug = new Map(notes.map((n) => [n.slug, n]))
  if (!noteBySlug.has(slug)) return { nodes: [], links: [] }

  const included = new Set<string>([slug])
  let frontier = [slug]
  for (let d = 0; d < depth; d++) {
    const next: string[] = []
    for (const current of frontier) {
      for (const neighbor of adjacency.get(current) ?? []) {
        if (included.has(neighbor)) continue
        included.add(neighbor)
        next.push(neighbor)
      }
    }
    frontier = next
  }

  const nodes = [...included]
    .map((s) => noteBySlug.get(s))
    .filter((n): n is Note => Boolean(n))
    .map((note) => toGraphNode(note, adjacency.get(note.slug)?.size ?? 0))

  const localLinks = links.filter((l) => included.has(l.source) && included.has(l.target))

  return { nodes, links: localLinks }
}

// Convert wikilinks to HTML anchor tags for display
export function wikilinkToHtml(content: string, validSlugs: Set<string>): string {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => {
    const slug = slugify(link.trim())
    const label = alias?.trim() ?? link.trim()
    if (validSlugs.has(slug)) {
      return `<a href="/notes/${slug}" class="wikilink">${label}</a>`
    }
    return `<span class="wikilink-missing">${label}</span>`
  })
}
