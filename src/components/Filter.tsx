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

import { COLLEGES } from '../collegeIndex';

const GRADES = [0, 1, 2] as const;

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
    set({ searchFilter: (event.target as HTMLInputElement).value });
  },
  resetFilter: () =>
    set({
      collegeFilter: '공과대학',
      gradeFilter: 0,
      searchFilter: '',
    }),
}));

// TODO: 초기화 버튼 input 태그만

export default function Filter() {
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
              {COLLEGES.map((col) => (
                <Button
                  size="sm"
                  name={col}
                  key={col}
                  isActive={col === collegeFilter}
                  onClick={() => toggleCollege(col)}
                >
                  {col}
                </Button>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading size="sm" mb={3}>
              학년
            </Heading>
            <Wrap gap={4}>
              {GRADES.map((grade) => (
                <Button
                  size="sm"
                  onClick={() => toggleGrade(grade)}
                  key={grade}
                  isActive={grade === gradeFilter}
                >
                  {grade + 2}학년
                </Button>
              ))}
            </Wrap>
          </Box>
          <Box>
            <Heading size="sm" mb={3}>
              {/* TODO: 이 새끼 대소문자 가림 clear */}
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
