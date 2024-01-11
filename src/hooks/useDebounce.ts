import { useEffect } from 'react';

export default function useDebounce<T>(
  value: T,
  delay: number,
  setDebounceValue: (value: T) => void
) {
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    console.log(value);
    return () => clearTimeout(timer);
  }, [value]);
}
