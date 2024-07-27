import { create } from "zustand";

export interface AsyncState<T> {
  loading: boolean;
  data: null | T;
  error: unknown;
  // fetchData: () => void;
}

interface StateStore<T> extends AsyncState<T> {
  fetchData: () => void;
}

export default function createAsync<T>(
  fetchData: (...args: any[]) => Promise<T>
) {
  const store = create<StateStore<T>>()((set) => ({
    loading: false,
    data: null,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const data = await fetchData();
        set({ loading: false, data: data, error: null });
      } catch (error) {
        set({ loading: false, data: null, error });
      }
    },
  }));

  return store;
}
