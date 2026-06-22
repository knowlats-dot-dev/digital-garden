import React, { useCallback, useMemo } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface NoteNodeData {
  label: string;
  slug: string;
  tags: string[];
  active?: boolean;
}

function NoteNode({ data }: { data: NoteNodeData }) {
  const tagColor = data.tags[0] ? tagToColor(data.tags[0]) : '#7c6af7';

  return (
    <div
      className={[
        'rounded-[10px] px-3.5 py-2.5 min-w-30 max-w-45 cursor-pointer transition-all duration-200 border-[1.5px]',
        data.active
          ? 'bg-[rgba(124,106,247,0.25)] border-accent-light shadow-[0_0_16px_rgba(124,106,247,0.4)]'
          : 'bg-surface border-border shadow-none',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Top} style={{ background: tagColor, width: 8, height: 8 }} />
      <div className="text-[0.78rem] text-muted mb-1 flex gap-1 flex-wrap">
        {data.tags.slice(0, 2).map((t) => (
          <span key={t} className="bg-surface2 rounded-full px-1.5 py-px text-[0.7rem]">
            #{t}
          </span>
        ))}
      </div>
      <div className="text-[0.85rem] font-semibold text-fg leading-[1.3]">{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: tagColor, width: 8, height: 8 }} />
    </div>
  );
}

function tagToColor(tag: string): string {
  const colors: Record<string, string> = {
    productivity: '#4ade80',
    tools: '#fb923c',
    meta: '#7c6af7',
    system: '#38bdf8',
    obsidian: '#a78bfa',
    workflow: '#f472b6',
    'note-taking': '#34d399',
  };
  return colors[tag] ?? '#7c6af7';
}

const nodeTypes: NodeTypes = { noteNode: NoteNode };

interface Props {
  nodes: Array<{ id: string; data: NoteNodeData; position: { x: number; y: number } }>;
  edges: Array<{ id: string; source: string; target: string }>;
  activeSlug?: string;
}

export default function KnowledgeGraph({ nodes: initialNodes, edges: initialEdges, activeSlug }: Props) {
  const rfNodes = useMemo(
    () =>
      initialNodes.map((n) => ({
        ...n,
        type: 'noteNode' as const,
        data: { ...n.data, active: n.id === activeSlug },
      })),
    [initialNodes, activeSlug],
  );

  const rfEdges = useMemo(
    () =>
      initialEdges.map((e) => ({
        ...e,
        style: { stroke: '#2e3348', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#2e3348', width: 12, height: 12 },
        animated: false,
      })),
    [initialEdges],
  );

  const [nodes, , onNodesChange] = useNodesState(rfNodes);
  const [edges, , onEdgesChange] = useEdgesState(rfEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    window.location.href = `/notes/${node.data.slug}`;
  }, []);

  return (
    <div className="w-full h-full bg-bg rounded-xl overflow-hidden">
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
        style={{ background: '#0f1117' }}
      >
        <Background color="#2e3348" gap={20} size={1} />
        <Controls
          style={{ background: '#1a1d27', border: '1px solid #2e3348', borderRadius: '8px' }}
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(n) => (n.data?.active ? '#a997ff' : '#22263a')}
          maskColor="rgba(15,17,23,0.7)"
          style={{ background: '#1a1d27', border: '1px solid #2e3348', borderRadius: '8px' }}
        />
      </ReactFlow>
    </div>
  );
}
