import {
  Card,
  CardBody,
  Stack,
  Box,
  Heading,
  Wrap,
  Button,
  Input,
  Flex,
} from '@chakra-ui/react';
import { create } from 'zustand';

export default function FilterContainer() {
  return <Filter />;
}

const COLLEGES = [
  '간호대학',
  '공과대학',
  '글로벌융합대학',
  '농업생명과학대학',
  '사범대학',
  '사회과학대학',
  '상과대학',
  '생활과학대학',
  '수의과대학',
  '예술대학',
  '인문대학',
  '자연과학대학',
  '환경생명자원대학',
  '본부',
] as const;
const GRADES = [2, 3, 4] as const;

interface IFilterState {
  gradeFilter: boolean[];
  collegeFilter: { college: string; isActived: boolean }[];
  searchFilter: string;
  toggleGrade: (idx: number) => void;
  toggleCollege: (event: React.MouseEvent) => void;
  hasAnyFilterFalse: () => boolean;
  resetFilter: () => void;
  changeSearch: (event: React.FormEvent) => void;
}

export const useFilterStore = create<IFilterState>()((set, get) => ({
  gradeFilter: [true, false, false],
  collegeFilter: COLLEGES.map((col) => ({ college: col, isActived: false })),
  searchFilter: '',
  toggleGrade: (inputGrade: number) =>
    set((state) => ({
      gradeFilter: state.gradeFilter.map((value, grade) =>
        grade === inputGrade ? !value : value
      ),
    })),
  toggleCollege: (event) => {
    const { name } = event.target as HTMLButtonElement;
    set((state) => ({
      collegeFilter: state.collegeFilter.map((college) => ({
        college: college.college,
        isActived:
          college.college === name ? !college.isActived : college.isActived,
      })),
    }));
  },
  changeSearch: (event) => {
    set({ searchFilter: (event.target as HTMLInputElement).value });
  },
  hasAnyFilterFalse: () =>
    get().collegeFilter.every((college) => college.isActived === false) ||
    get().gradeFilter.every((value) => value === false),
  resetFilter: () =>
    set({
      collegeFilter: COLLEGES.map((col) => ({
        college: col,
        isActived: false,
      })),
      gradeFilter: [true, false, false],
      searchFilter: '',
    }),
}));

function Filter() {
  const {
    gradeFilter,
    collegeFilter,
    searchFilter,
    toggleCollege,
    toggleGrade,
    resetFilter,
    changeSearch,
  } = useFilterStore();

  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <Box>
            <Heading size="sm" mb={3}>
              대학
            </Heading>
            <Wrap gap={4}>
              {collegeFilter.map((col) => (
                <Button
                  size="sm"
                  name={col.college}
                  key={col.college}
                  isActive={col.isActived}
                  onClick={toggleCollege}
                >
                  {col.college}
                </Button>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading size="sm" mb={3}>
              학년
            </Heading>
            <Wrap gap={4}>
              {GRADES.map((grade, i) => (
                <Button
                  size="sm"
                  onClick={() => toggleGrade(i)}
                  key={i}
                  isActive={gradeFilter[i]}
                >
                  {grade}학년
                </Button>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading size="sm" mb={3}>
              {/* TODO: 이 새끼 대소문자 가림 */}
              검색
            </Heading>
            <Input
              placeholder="학과명"
              value={searchFilter}
              onChange={changeSearch}
            />
          </Box>
          <Flex justifyContent="flex-end">
            <Button size="sm" colorScheme="red" onClick={resetFilter}>
              초기화
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
