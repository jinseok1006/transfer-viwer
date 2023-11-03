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

import { useFilterStore } from '../store/filter';
import { COLLEGES } from '../collegeIndex';

const GRADES = [0, 1, 2] as const;

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
          <Box>
            <Heading size="sm" mb={3}>
              검색
            </Heading>
            <Input placeholder="학과명" value={searchFilter} onChange={changeSearch} />
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
