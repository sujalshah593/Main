import { useEffect, useState } from 'react';
import { fetchLabs } from '../api/labsApi.js';

export function useLabs() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchLabs();
        if (!cancelled) setLabs(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load labs');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { labs, loading, error };
}
