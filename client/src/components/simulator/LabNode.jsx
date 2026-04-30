import { Handle, Position } from '@xyflow/react';

const styles = {
  base: 'min-w-[140px] rounded-lg border bg-slate-950/80 px-3 py-2 text-left shadow-md backdrop-blur',
  title: 'text-xs font-semibold uppercase tracking-wide text-sky-300',
  label: 'text-sm font-medium text-white',
};

const h =
  '!h-3 !w-3 !border-2 !border-slate-700 bg-slate-900 hover:!bg-slate-800 focus:!ring-2 focus:!ring-sky-500';

/**
 * Handle ids align with Mongo `simulatorConfig.correctConnections`.
 * Each edge must go from a `source` handle to a `target` handle.
 */
function HandlesForType({ type }) {
  if (type === 'powerSupply') {
    return (
      <>
        <Handle id="plus" type="source" position={Position.Right} className={`${h} !bg-amber-400`} />
        <Handle id="minus" type="target" position={Position.Left} className={`${h} !bg-slate-300`} />
      </>
    );
  }
  if (type === 'tube') {
    return (
      <>
        <Handle id="anode" type="target" position={Position.Right} className={`${h} !bg-violet-400`} />
        <Handle id="cathode" type="source" position={Position.Left} className={`${h} !bg-fuchsia-400`} />
      </>
    );
  }
  return (
    <>
      <Handle id="in" type="target" position={Position.Left} className={`${h} !bg-emerald-400`} />
      <Handle id="out" type="source" position={Position.Right} className={`${h} !bg-emerald-300`} />
    </>
  );
}

export default function LabNode({ data }) {
  const border =
    data?.type === 'powerSupply'
      ? 'border-amber-500/50'
      : data?.type === 'tube'
        ? 'border-violet-500/50'
        : data?.type === 'ammeter'
          ? 'border-emerald-500/50'
          : data?.type === 'voltmeter'
            ? 'border-cyan-500/50'
            : 'border-slate-500/50';

  return (
    <div className={`${styles.base} ${border}`}>
      <HandlesForType type={data?.type} />
      <div className={styles.title}>{String(data?.type || '').replace(/([A-Z])/g, ' $1')}</div>
      <div className={styles.label}>{data?.label}</div>
      {data?.description && <p className="mt-1 text-[11px] leading-snug text-slate-400">{data.description}</p>}
    </div>
  );
}
