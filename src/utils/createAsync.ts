import { create } from 'zustand';

export interface AsyncState<T> {
  loading: boolean;
  data: null | T;
  error: unknown;
  fetchData: () => void;
}

export default function createAsync<T>(fetchData: () => Promise<Response>) {
  return create<AsyncState<T>>()((set) => ({
    loading: false,
    data: null,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const response = await fetchData();
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        set({ loading: false, data: data, error: null });
      } catch (err) {
        set({ loading: false, data: null, error: err });
      }
    },
  }));
}
