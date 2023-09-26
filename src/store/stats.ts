import { create } from 'zustand';

export interface IStat {
  division: string;
  yearsData: {
    [year: number]: {
      capacity: number;
      applicants: number;
      rate: number;
    };
  };
}
export interface IStatsState {
  loading: boolean;
  stats: null | IStat[][];
  error: any;
  load: () => void;
  success: (data: any) => void;
  fail: (err: any) => void;
}

export const useStatsStore = create<IStatsState>()((set) => ({
  loading: false,
  stats: null,
  error: null,
  load: () => set({ loading: true, stats: null, error: null }),
  success: (data) => set({ loading: false, stats: data, error: null }),
  fail: (err) => set({ loading: false, stats: null, error: err }),
}));
