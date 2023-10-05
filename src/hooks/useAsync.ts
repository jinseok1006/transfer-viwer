import { create } from 'zustand';

export interface AsyncState<T> {
  loading: boolean;
  data: null | T;
  error: any;
  fetchData: () => void;
}

export function useAsync<T>(callback: () => Promise<T>) {
  return create<AsyncState<T>>()((set) => ({
    loading: false,
    data: null,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const data = await callback();
        set({ loading: false, data, error: null });
      } catch (error) {
        set({ loading: false, data: null, error });
      }
    },
  }));
}
