import { useState, useEffect } from 'react';
export default function useAsync<T>(
  callback: () => Promise<T>,
  skip = false
): [boolean, unknown, T | null, () => Promise<void>] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = async () => {
    setLoading(false);
    setError(null);
    try {
      const data = await callback();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, []);

  return [loading, error, data, fetchData];
}
