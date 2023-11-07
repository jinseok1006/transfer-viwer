import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface IFilterState {
  gradeFilter: number;
  collegeFilter: string;
  searchFilter: string;
  actions: IFilterStateActions;
}

interface IFilterStateActions {
  toggleGrade: (grade: number) => void;
  toggleCollege: (college: string) => void;
  resetFilter: () => void;
  changeSearch: (event: React.FormEvent) => void;
}

export const useFilterStore = create<IFilterState>()((set) => ({
  gradeFilter: 0,
  collegeFilter: '공과대학',
  searchFilter: '',
  actions: {
    toggleGrade: (inputGrade) => set({ gradeFilter: inputGrade }),
    toggleCollege: (inputCollege) => set({ collegeFilter: inputCollege }),
    changeSearch: (event) => {
      set({
        searchFilter: (event.target as HTMLInputElement).value,
      });
    },
    resetFilter: () =>
      set({
        searchFilter: '',
      }),
  },
}));

export const useFilterStateStore = () =>
  useFilterStore(
    useShallow((state) => ({
      gradeFilter: state.gradeFilter,
      collegeFilter: state.collegeFilter,
      searchFilter: state.searchFilter,
    }))
  );
