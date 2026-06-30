import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ForceGraph2D, {
  type ForceGraphMethods,
  type NodeObject,
  type LinkObject,
} from 'react-force-graph-2d'

interface GraphNodeData {
  id: string
  label: string
  slug: string
  tags: string[]
  degree: number
}

interface GraphLinkData {
  source: string
  target: string
}

type FGNode = NodeObject<GraphNodeData>
type FGLink = LinkObject<GraphNodeData, GraphLinkData>
type FGMethods = ForceGraphMethods<GraphNodeData, GraphLinkData>

interface Props {
  data: { nodes: GraphNodeData[]; links: GraphLinkData[] }
  activeSlug?: string
}

const FONT = 'Inter, ui-sans-serif, system-ui, sans-serif'

// Node radius grows with its number of connections, like Obsidian.
function radiusForDegree(degree: number): number {
  return 3 + Math.sqrt(degree) * 1.6
}

// A link's endpoint is a string id before the simulation runs and a node
// object afterwards; normalise to the id either way.
function endpointId(end: FGLink['source']): string {
  if (end && typeof end === 'object') return String((end as FGNode).id)
  return String(end)
}

export default function KnowledgeGraph({ data, activeSlug }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<FGMethods | undefined>(undefined)
  const didFitRef = useRef(false)

  const [size, setSize] = useState({ width: 0, height: 0 })
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  )

  // Track theme so the canvas colors follow the dark/light toggle.
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark')),
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Size the canvas to its container (the sidebar can also dispatch `resize`).
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const colors = useMemo(
    () =>
      isDark
        ? {
            bg: '#030712',
            node: '#cbd5e1',
            link: '#374151',
            linkActive: '#f87171',
            accent: '#f87171',
            label: '#e5e7eb',
          }
        : {
            bg: '#f9fafb',
            node: '#64748b',
            link: '#cbd5e1',
            linkActive: '#dc2626',
            accent: '#dc2626',
            label: '#374151',
          },
    [isDark],
  )

  // Undirected adjacency built from the original (string) link ids, used for
  // hover highlighting. Built from `data` so it is unaffected by the mutation
  // react-force-graph performs on the cloned graph below.
  const adjacency = useMemo(() => {
    const map = new Map<string, Set<string>>()
    const link = (a: string, b: string) => {
      if (!map.has(a)) map.set(a, new Set())
      map.get(a)!.add(b)
    }
    for (const l of data.links) {
      const s = String(l.source)
      const t = String(l.target)
      link(s, t)
      link(t, s)
    }
    return map
  }, [data])

  // react-force-graph mutates node/link objects (adds x/y, resolves
  // source/target to node refs), so hand it a private clone with a stable
  // identity to avoid resetting the simulation on every re-render.
  const graphData = useMemo(
    () => ({
      nodes: data.nodes.map((n) => ({ ...n })),
      links: data.links.map((l) => ({ ...l })),
    }),
    [data],
  )

  const ready = size.width > 0 && size.height > 0

  // Tune the forces for Obsidian-like spacing once the graph is mounted.
  useEffect(() => {
    const fg = fgRef.current
    if (!fg || !ready) return
    fg.d3Force('charge')?.strength(-110)
    fg.d3Force('link')?.distance(30)
    fg.d3ReheatSimulation()
  }, [ready, graphData])

  const isNodeHot = useCallback(
    (id: string) => !hoverId || id === hoverId || !!adjacency.get(hoverId)?.has(id),
    [hoverId, adjacency],
  )

  const isLinkHot = useCallback(
    (link: FGLink) =>
      !!hoverId && (endpointId(link.source) === hoverId || endpointId(link.target) === hoverId),
    [hoverId],
  )

  const nodeCanvasObject = useCallback(
    (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const x = node.x ?? 0
      const y = node.y ?? 0
      const id = String(node.id)
      const isActive = node.slug === activeSlug
      const hot = isNodeHot(id)
      const r = radiusForDegree(node.degree ?? 0)

      ctx.globalAlpha = hot ? 1 : 0.2
      ctx.beginPath()
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      ctx.fillStyle = isActive ? colors.accent : colors.node
      ctx.fill()

      // Labels are screen-constant size; fade out only when zoomed far out.
      const zoomAlpha = Math.max(0, Math.min(1, (globalScale - 0.08) / 0.18))
      const forceLabel = isActive || id === hoverId
      if (zoomAlpha > 0.03 || forceLabel) {
        const fontSize = 12 / globalScale
        ctx.font = `${fontSize}px ${FONT}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.globalAlpha = (hot ? 1 : 0.25) * (forceLabel ? 1 : zoomAlpha)
        ctx.fillStyle = colors.label
        ctx.fillText(node.label ?? id, x, y + r + 2 / globalScale)
      }

      ctx.globalAlpha = 1
    },
    [activeSlug, colors, hoverId, isNodeHot],
  )

  const nodePointerAreaPaint = useCallback(
    (node: FGNode, color: string, ctx: CanvasRenderingContext2D) => {
      const r = radiusForDegree(node.degree ?? 0) + 2
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI)
      ctx.fill()
    },
    [],
  )

  const linkColor = useCallback(
    (link: FGLink) => (isLinkHot(link) ? colors.linkActive : colors.link),
    [colors, isLinkHot],
  )

  const linkWidth = useCallback((link: FGLink) => (isLinkHot(link) ? 1.6 : 1), [isLinkHot])

  const onNodeClick = useCallback((node: FGNode) => {
    window.location.href = `/notes/${node.slug}`
  }, [])

  const onNodeHover = useCallback((node: FGNode | null) => {
    setHoverId(node ? String(node.id) : null)
    if (typeof document !== 'undefined') {
      document.body.style.cursor = node ? 'pointer' : ''
    }
  }, [])

  return (
    <div ref={containerRef} className="graph-container h-full w-full overflow-hidden rounded-xl">
      <nav className="sr-only" aria-label="Knowledge graph nodes">
        <p>Use this list to open notes from the knowledge graph.</p>
        <ul>
          {data.nodes.map((node) => (
            <li key={node.id}>
              <button
                type="button"
                onClick={() => onNodeClick(node)}
                aria-current={node.slug === activeSlug ? 'page' : undefined}
              >
                {node.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {ready && (
        <ForceGraph2D<GraphNodeData, GraphLinkData>
          ref={fgRef}
          graphData={graphData}
          width={size.width}
          height={size.height}
          backgroundColor={colors.bg}
          nodeRelSize={4}
          nodeCanvasObjectMode={() => 'replace'}
          nodeCanvasObject={nodeCanvasObject}
          nodePointerAreaPaint={nodePointerAreaPaint}
          linkColor={linkColor}
          linkWidth={linkWidth}
          linkHoverPrecision={6}
          onNodeClick={onNodeClick}
          onNodeHover={onNodeHover}
          cooldownTicks={120}
          onEngineStop={() => {
            if (didFitRef.current) return
            const fg = fgRef.current
            if (!fg) return
            // Frame the connected cluster; orphan notes can drift to the edges.
            if (graphData.links.length > 0) {
              fg.zoomToFit(400, 60, (n) => ((n as FGNode).degree ?? 0) > 0)
            } else {
              fg.zoomToFit(400, 60)
            }
            didFitRef.current = true
          }}
        />
      )}
    </div>
  )
}
