import React from 'react';
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
  WrapItem,
} from '@chakra-ui/react';

import { useFilterStore, useFilterStateStore } from '../store/filter';
import { COLLEGES } from '../assets/collegeIndex';

const GRADES = [0, 1, 2] as const;

// TODO: 필터 분리하고 memo하기
export default function Filter() {
  const { toggleCollege, toggleGrade, resetFilter, changeSearch } =
    useFilterStore((state) => state.actions);

  const { gradeFilter, collegeFilter, searchFilter } = useFilterStateStore();

  return (
    <Card>
      <CardBody>
        <Stack spacing={4}>
          <CollegeFilter
            toggleCollege={toggleCollege}
            collegeFilter={collegeFilter}
          />
          <GradeFilter toggleGrade={toggleGrade} gradeFilter={gradeFilter} />
          <SearchFilter
            searchFilter={searchFilter}
            changeSearch={changeSearch}
            resetFilter={resetFilter}
          />
        </Stack>
      </CardBody>
    </Card>
  );
}

interface SearchFilterProps {
  searchFilter: string;
  changeSearch: (e: React.FormEvent) => void;
  resetFilter: () => void;
}
const SearchFilter = React.memo(
  ({ searchFilter, changeSearch, resetFilter }: SearchFilterProps) => (
    <>
      <Box>
        <Heading size="sm" mb={3}>
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
    </>
  )
);

interface GradeFilterProps {
  toggleGrade: (grade: number) => void;
  gradeFilter: number;
}
const GradeFilter = React.memo(
  ({ toggleGrade, gradeFilter }: GradeFilterProps) => {
    return (
      <Box>
        <Heading size="sm" mb={3}>
          학년
        </Heading>
        <Wrap gap={4}>
          {GRADES.map((grade) => (
            <WrapItem key={grade}>
              <Button
                size="sm"
                onClick={() => toggleGrade(grade)}
                isActive={grade === gradeFilter}
              >
                {grade + 2}학년
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    );
  }
);

interface CollegeFilterProps {
  collegeFilter: string;
  toggleCollege: (col: string) => void;
}
const CollegeFilter = React.memo(
  ({ collegeFilter, toggleCollege }: CollegeFilterProps) => {
    return (
      <Box>
        <Heading size="sm" mb={3}>
          대학
        </Heading>
        <Wrap gap={4}>
          {COLLEGES.map((col) => (
            <WrapItem key={col}>
              <Button
                size="sm"
                name={col}
                isActive={col === collegeFilter}
                onClick={() => toggleCollege(col)}
              >
                {col}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    );
  }
);
