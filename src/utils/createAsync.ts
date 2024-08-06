import { create } from "zustand";

export interface AsyncState<T> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  // fetchData: () => void;
}

interface AsyncStateStore<T> extends AsyncState<T> {
  fetchData: () => void;
}

export default function createAsync<T>(
  callback: (...args: any[]) => Promise<T>
) {
  const store = create<AsyncStateStore<T>>()((set) => ({
    isLoading: false,
    data: null,
    error: null,
    fetchData: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await callback();
        set({ isLoading: false, data: data, error: null });
      } catch (error) {
        set({ isLoading: false, data: null, error: error as Error });
      }
    },
  }));

  return store;
}
