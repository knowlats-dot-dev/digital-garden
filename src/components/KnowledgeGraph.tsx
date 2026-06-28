import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type NodeTypes,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

interface NoteNodeData {
  label: string
  slug: string
  tags: string[]
  active?: boolean
}

function NoteNode({ data }: { data: NoteNodeData }) {
  const tagColor = data.tags[0] ? tagToColor(data.tags[0]) : '#ef4444'

  return (
    <div
      className={[
        'max-w-45 min-w-30 cursor-pointer rounded-[10px] border-[1.5px] px-3.5 py-2.5 transition-all duration-200',
        data.active
          ? 'border-accent-light bg-[color-mix(in_oklch,var(--color-accent)_20%,transparent)] shadow-[0_0_16px_color-mix(in_oklch,var(--color-accent)_40%,transparent)]'
          : 'bg-surface border-border shadow-none',
      ].join(' ')}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: tagColor, width: 8, height: 8 }}
      />
      <div className="text-muted mb-1 flex flex-wrap gap-1 text-[0.78rem]">
        {data.tags.slice(0, 2).map((t) => (
          <span key={t} className="bg-surface2 rounded-full px-1.5 py-px text-[0.7rem]">
            #{t}
          </span>
        ))}
      </div>
      <div className="text-fg text-[0.85rem] leading-[1.3] font-semibold">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: tagColor, width: 8, height: 8 }}
      />
    </div>
  )
}

function tagToColor(tag: string): string {
  const colors: Record<string, string> = {
    productivity: '#4ade80',
    tools: '#fb923c',
    meta: '#ef4444',
    system: '#38bdf8',
    obsidian: '#a78bfa',
    workflow: '#f472b6',
    'note-taking': '#34d399',
  }
  return colors[tag] ?? '#ef4444'
}

const nodeTypes: NodeTypes = { noteNode: NoteNode }

interface Props {
  nodes: Array<{ id: string; data: NoteNodeData; position: { x: number; y: number } }>
  edges: Array<{ id: string; source: string; target: string }>
  activeSlug?: string
}

export default function KnowledgeGraph({
  nodes: initialNodes,
  edges: initialEdges,
  activeSlug,
}: Props) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark')),
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const colors = useMemo(
    () =>
      isDark
        ? {
            bg: '#030712',
            surface: '#111827',
            surface2: '#1f2937',
            border: '#374151',
            accent: '#ef4444',
            accentLight: '#f87171',
          }
        : {
            bg: '#f9fafb',
            surface: '#ffffff',
            surface2: '#f3f4f6',
            border: '#e5e7eb',
            accent: '#dc2626',
            accentLight: '#dc2626',
          },
    [isDark],
  )

  const rfNodes = useMemo(
    () =>
      initialNodes.map((n) => ({
        ...n,
        type: 'noteNode' as const,
        data: { ...n.data, active: n.id === activeSlug },
      })),
    [initialNodes, activeSlug],
  )

  const rfEdges = useMemo(
    () =>
      initialEdges.map((e) => ({
        ...e,
        style: { stroke: colors.border, strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: colors.border, width: 12, height: 12 },
        animated: false,
      })),
    [initialEdges, colors],
  )

  const [nodes, , onNodesChange] = useNodesState(rfNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges)

  useEffect(() => {
    setEdges(rfEdges)
  }, [rfEdges, setEdges])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    window.location.href = `/notes/${node.data.slug}`
  }, [])

  return (
    <div className="graph-container bg-bg h-full w-full overflow-hidden rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: colors.bg }}
      >
        <Background color={colors.border} gap={20} size={1} />
        <Controls
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
          }}
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(n) => (n.data?.active ? colors.accentLight : colors.surface2)}
          maskColor={isDark ? 'rgba(3,7,18,0.7)' : 'rgba(249,250,251,0.7)'}
          style={{
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
          }}
        />
      </ReactFlow>
    </div>
  )
}
