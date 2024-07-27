import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Divider,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  Tbody,
  Td,
  Text,
  Stack,
  Center,
} from '@chakra-ui/react';

import { useFilterStateStore } from '../store/filter';

import {
  useCollegeDivisionStore,
  useTransferStatisticsStore,
} from '../store/transferStatistics';
import type { TransferData } from '../store/transferStatistics';

export default function StatCardsContainer() {
  const transferStatisticsData = useTransferStatisticsStore(
    (state) => state.data
  )!;
  const collegeDivisionsData = useCollegeDivisionStore((state) => state.data)!;
  const { gradeFilter, collegeFilter, searchFilter } = useFilterStateStore();

  // 대학별 학과명 필터 생성
  const divisionFilter: readonly string[] = collegeDivisionsData.find(
    (idx) => idx.college === collegeFilter
  )!.divisions;

  // +검색어 학과명 필터 생성 / 빈칸이면 이전 값 투과
  const activeDivisions =
    searchFilter === ''
      ? divisionFilter
      : divisionFilter.filter((div) =>
          div.includes(searchFilter.toUpperCase())
        );

  // 학과명 필터된 transferData
  const filteredDivisions = transferStatisticsData.filter((stat) =>
    activeDivisions.includes(stat.division)
  );

  if (filteredDivisions.length === 0) {
    return <NotFound />;
  }

  // +학년 필터된 transferData
  const filteredStats = filteredDivisions
    .map((division) => ({
      ...division,
      data: division.data.filter((e) => e[1] === gradeFilter),
    }))
    .filter((division) => division.data.length > 0);

  return (
    <Stack direction='column' spacing={4} mt={4}>
      {filteredStats.map(({ division, data }) => (
        <StatCard
          key={division}
          division={division}
          data={data}
          grade={data[0][1]}
        />
      ))}
    </Stack>
  );
}
//
// TODO: viewport하단에 닿으면 queue에 있던것을 몇개 빼내서 렌더링(무한스크롤)

interface StatCardProps {
  division: string;
  data: TransferData[];
  grade: number;
}

function StatCard({ division, grade, data }: StatCardProps) {
  const tableStyles = {
    'td, th': {
      textAlign: 'center',
    },
  };

  return (
    <Card>
      <CardHeader>
        <Heading size='md' textAlign='center'>
          {division}({grade + 2}학년)
        </Heading>
      </CardHeader>
      <Divider opacity={0.15} />
      <CardBody>
        <TableContainer>
          <Table size='sm' sx={tableStyles}>
            <Thead>
              <Tr>
                <Th>연도</Th>
                <Th>지원자수</Th>
                <Th>선발인원</Th>
                <Th>경쟁률</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                //@ts-ignore
                data.map(([year, grade, capacity, applicants]) => (
                  <StatCardRow
                    key={year.toString()}
                    year={year}
                    capacity={capacity}
                    applicants={applicants}
                  />
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

interface StatCardRowProps {
  year: number;
  capacity: number;
  applicants: number;
}

function StatCardRow({ year, capacity, applicants }: StatCardRowProps) {
  const invalid = capacity === 0;
  const newest = year === 2024;
  const rate = invalid ? null : (applicants / capacity).toFixed(2);
  return (
    <Tr>
      <Td>{year}</Td>
      <Td>{invalid ? '-' : newest ? ' ' : applicants}</Td>
      <Td>{capacity}</Td>
      <Td>{invalid ? '-' : newest ? ' ' : rate}</Td>
    </Tr>
  );
}

const NotFound = React.memo(function NotFound() {
  return (
    <Center mt={4}>
      <Text as='b' textAlign='center'>
        유효한 결과가 없습니다.
        <br />
        검색어가 올바른지 확인해주세요.
      </Text>
    </Center>
  );
});
