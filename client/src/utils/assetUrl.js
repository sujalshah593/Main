/**
 * Resolves a path like `/practicals/foo.pdf` to a full URL when `VITE_API_URL` is set
 * (static files live on the API origin, not under `/api`).
 */
export function resolvePublicAssetUrl(assetPath) {
  if (!assetPath?.trim()) return null;
  const p = assetPath.trim();
  if (/^https?:\/\//i.test(p)) return p;
  const base = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
  return base ? `${base}${p}` : p;
}
