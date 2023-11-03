import { create } from 'zustand';
interface IFilterState {
  gradeFilter: number;
  collegeFilter: string;
  searchFilter: string;
  toggleGrade: (grade: number) => void;
  toggleCollege: (college: string) => void;
  resetFilter: () => void;
  changeSearch: (event: React.FormEvent) => void;
}

export const useFilterStore = create<IFilterState>()((set) => ({
  gradeFilter: 0,
  collegeFilter: '공과대학',
  searchFilter: '',
  toggleGrade: (inputGrade) => set({ gradeFilter: inputGrade }),
  toggleCollege: (inputCollege) => set({ collegeFilter: inputCollege }),
  changeSearch: (event) => {
    set({ searchFilter: (event.target as HTMLInputElement).value.toUpperCase() });
  },
  resetFilter: () =>
    set({
      searchFilter: '',
    }),
}));
