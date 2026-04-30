import { useEffect, useState } from 'react';
import { fetchExperimentsForLab } from '../api/labsApi.js';

export function useExperiments(labId) {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(Boolean(labId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!labId) {
      setExperiments([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchExperimentsForLab(labId);
        if (!cancelled) setExperiments(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load experiments');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [labId]);

  return { experiments, loading, error };
}
