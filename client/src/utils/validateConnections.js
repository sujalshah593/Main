/**
 * Builds a canonical string for a directed wire between typed instrument handles.
 */
export function connectionKey(fromType, fromHandle, toType, toHandle) {
  return `${fromType}|${fromHandle}|${toType}|${toHandle}`;
}

/**
 * Compares user edges (resolved to component types) with the authoritative correctConnections list.
 * Uses sorted multiset equality so order of wiring does not matter.
 */
export function validateConnections(nodes, edges, correctConnections) {
  const idToType = {};
  nodes.forEach((n) => {
    idToType[n.id] = n.data?.type;
  });

  const actual = [];
  for (const e of edges) {
    const fromType = idToType[e.source];
    const toType = idToType[e.target];
    if (!fromType || !toType || !e.sourceHandle || !e.targetHandle) continue;
    actual.push(connectionKey(fromType, e.sourceHandle, toType, e.targetHandle));
  }

  const expected = (correctConnections || []).map((c) =>
    connectionKey(c.fromType, c.fromHandle, c.toType, c.toHandle)
  );

  actual.sort();
  expected.sort();
  const ok = actual.length === expected.length && actual.every((v, i) => v === expected[i]);
  return { ok, actual, expected };
}
