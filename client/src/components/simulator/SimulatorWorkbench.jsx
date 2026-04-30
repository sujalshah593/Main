import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LabNode from './LabNode.jsx';
import { validateConnections } from '../../utils/validateConnections.js';
import { resolvePublicAssetUrl } from '../../utils/assetUrl.js';

const nodeTypes = { labNode: LabNode };

function formatConnectionLabel(connection) {
  if (!connection) return '';
  const from = `${connection.fromType}.${connection.fromHandle}`;
  const to = `${connection.toType}.${connection.toHandle}`;
  return `${from} -> ${to}`;
}

function Palette({ palette, onDragStart }) {
  if (!palette?.length) return null;
  return (
    <div className="w-full shrink-0 space-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-3 lg:w-56">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Components</div>
      <p className="text-[11px] text-slate-500">Drag onto the canvas, then connect handles to build the circuit.</p>
      <div className="space-y-2">
        {palette.map((item) => (
          <div
            key={item.type}
            className="cursor-grab rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 active:cursor-grabbing"
            onDragStart={(event) => {
              event.dataTransfer.setData('application/reactflow', item.type);
              event.dataTransfer.effectAllowed = 'move';
              onDragStart?.(item);
            }}
            draggable
          >
            <div className="font-medium">{item.label}</div>
            {item.description && <div className="mt-0.5 text-[11px] text-slate-400">{item.description}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowCanvas({ simulatorConfig, tall }) {
  const { screenToFlowPosition } = useReactFlow();
  const paletteMap = useMemo(() => {
    const m = {};
    (simulatorConfig?.palette || []).forEach((p) => {
      m[p.type] = p;
    });
    return m;
  }, [simulatorConfig]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const hintImageHref = useMemo(
    () => resolvePublicAssetUrl(simulatorConfig?.hintImagePath),
    [simulatorConfig?.hintImagePath]
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !paletteMap[type]) return;
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const meta = paletteMap[type];
      const id = crypto.randomUUID();
      const newNode = {
        id,
        type: 'labNode',
        position,
        data: { type, label: meta.label, description: meta.description },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [paletteMap, screenToFlowPosition, setNodes]
  );

  const handleValidate = () => {
    const { ok } = validateConnections(nodes, edges, simulatorConfig?.correctConnections);
    setResult(ok ? 'correct' : 'incorrect');
  };

  const clearBoard = () => {
    setNodes([]);
    setEdges([]);
    setResult(null);
  };

  const frameHeight = tall ? 'min(78vh,720px)' : '420px';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-0 flex-col gap-3 lg:flex-row" style={{ height: frameHeight }}>
        <Palette palette={simulatorConfig?.palette} />
        <div className="relative min-h-[280px] min-w-0 flex-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            className="h-full w-full"
          >
            <Background gap={18} size={1} color="#1e293b" />
            <MiniMap
              className="!rounded-lg !border !border-slate-700 !bg-slate-900"
              nodeColor={() => '#334155'}
              maskColor="rgba(15,23,42,0.65)"
            />
            <Controls showInteractive={false} />
          </ReactFlow>
          <div className="pointer-events-none absolute left-3 top-3 max-w-[220px] rounded-md bg-slate-950/80 px-2 py-1 text-[11px] text-slate-400">
            Drag parts from the palette. Connect source → target handles, then validate.
          </div>
          <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowHint((v) => !v)}
              className="rounded-lg border border-indigo-500/60 bg-indigo-900/40 px-3 py-1.5 text-xs font-semibold text-indigo-100 hover:bg-indigo-800/50"
            >
              {showHint ? 'Hide hint' : 'Show hint'}
            </button>
            <button
              type="button"
              onClick={() => setShowAnswer((v) => !v)}
              className="rounded-lg border border-amber-500/60 bg-amber-900/40 px-3 py-1.5 text-xs font-semibold text-amber-100 hover:bg-amber-800/50"
            >
              {showAnswer ? 'Hide answer' : 'Show answer'}
            </button>
            <button
              type="button"
              onClick={clearBoard}
              className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleValidate}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-500"
            >
              Validate setup
            </button>
          </div>
        </div>
      </div>
      {showHint && (
        <div className="space-y-3 rounded-lg border border-indigo-500/40 bg-indigo-950/50 px-4 py-3 text-sm text-indigo-100">
          <div className="font-semibold">Hint</div>
          <p className="text-indigo-100/90">
            {simulatorConfig?.hintText || 'Start from the power supply and complete one closed loop to the return terminal.'}
          </p>
          {hintImageHref && (
            <a
              href={hintImageHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-semibold uppercase tracking-wide text-indigo-300 hover:text-indigo-200"
            >
              Open hint figure ↗
            </a>
          )}
        </div>
      )}
      {showAnswer && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-950/50 px-4 py-3 text-sm text-amber-100">
          <div className="mb-2 font-semibold">Answer key (required wiring)</div>
          <ul className="list-disc space-y-1 pl-5 text-amber-100/95">
            {(simulatorConfig?.correctConnections || []).map((connection, index) => (
              <li key={`${formatConnectionLabel(connection)}-${index}`}>{formatConnectionLabel(connection)}</li>
            ))}
          </ul>
        </div>
      )}
      {result === 'correct' && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/80 px-4 py-3 text-sm font-semibold text-emerald-100">
          Correct setup — your wiring matches the model topology for this experiment.
        </div>
      )}
      {result === 'incorrect' && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-950/80 px-4 py-3 text-sm font-semibold text-rose-100">
          Incorrect setup — adjust connections so every required wire matches the lab key (types and handle ids).
        </div>
      )}
    </div>
  );
}

/**
 * Simulator region: palette + canvas + validation feedback.
 * `ReactFlowProvider` enables `screenToFlowPosition` for palette drops.
 */
export default function SimulatorWorkbench({ simulatorConfig, variant = 'embedded' }) {
  const tall = variant === 'fullscreen';
  if (!simulatorConfig) {
    return <p className="text-slate-400">Simulator configuration missing for this experiment.</p>;
  }
  return (
    <ReactFlowProvider>
      <FlowCanvas simulatorConfig={simulatorConfig} tall={tall} />
    </ReactFlowProvider>
  );
}
