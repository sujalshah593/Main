import { useEffect, useState } from 'react';
import { fetchExperimentById } from '../api/labsApi.js';

export function useExperiment(id) {
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setExperiment(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchExperimentById(id);
        if (!cancelled) setExperiment(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load experiment');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { experiment, loading, error };
}
