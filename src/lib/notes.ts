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
  data: { label: string; slug: string; tags: string[] }
  position: { x: number; y: number }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
}

const NOTES_DIR = path.join(process.cwd(), 'content')

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

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return []
  const files = collectMarkdownFiles(NOTES_DIR)

  const notes: Note[] = files.map((filePath) => {
    const relativePath = path.relative(NOTES_DIR, filePath)
    const slugSource = relativePath.replace(/\.(md|mdx)$/i, '').split(path.sep).join(' ')
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

// Build graph data for React Flow
export function buildGraphData(notes: Note[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const angleStep = (2 * Math.PI) / Math.max(notes.length, 1)
  const radius = Math.min(300, 80 * notes.length)

  const nodes: GraphNode[] = notes.map((note, i) => ({
    id: note.slug,
    data: { label: note.title, slug: note.slug, tags: note.tags },
    position: {
      x: Math.cos(i * angleStep) * radius + radius + 100,
      y: Math.sin(i * angleStep) * radius + radius + 100,
    },
  }))

  const edgeSet = new Set<string>()
  const edges: GraphEdge[] = []

  for (const note of notes) {
    for (const target of note.outlinks) {
      const key = [note.slug, target].sort().join('--')
      if (!edgeSet.has(key) && notes.some((n) => n.slug === target)) {
        edgeSet.add(key)
        edges.push({ id: `${note.slug}-${target}`, source: note.slug, target })
      }
    }
  }

  return { nodes, edges }
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
