import { useState, useEffect } from 'react';

export default function useAsync<T>(
  callback: () => Promise<Response>,
  skip = false
): [boolean, unknown, T | null, () => Promise<void>] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await callback();
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, []);

  return [loading, error, data, fetchData];
}
