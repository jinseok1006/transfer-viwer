import {
  Card,
  Center,
  Spinner,
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
} from '@chakra-ui/react';
import { COLLEGE_INDEX } from '../collegeIndex';

import { useFilterStore } from '../store/filter';
import { useTransferStore } from '../store/transfer';

export default function StatsCardsContainer() {
  const { loading, data: stats, error } = useTransferStore();
  if (error) {
    <div>에러발생</div>;
  }

  if (loading || !stats)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return <StatCardsContainer />;
}

function StatCardsContainer() {
  // const filteredStats: StatCardProps[] = [];
  const transferData = useTransferStore((state) => state.data)!;
  const { gradeFilter, collegeFilter, searchFilter } = useFilterStore();

  // 대학별 학과명 필터 생성
  const divisionFilter: readonly string[] = COLLEGE_INDEX.find(
    (idx) => idx.college === collegeFilter
  )!.divisions;

  // +검색어 학과명 필터 생성
  const activeDivisions =
    searchFilter === ''
      ? divisionFilter
      : divisionFilter.filter((div) => div.includes(searchFilter));

  // 학과명 필터된 transferData
  const filteredDivisions = transferData.filter((stat) => activeDivisions.includes(stat.division));

  if (filteredDivisions.length === 0) {
    return <NotFound />;
  }

  // +학년 필터된 transferData
  const filteredStats = filteredDivisions.map((division) => ({
    ...division,
    data: division.data.filter((e) => e[1] === gradeFilter),
  }));

  return filteredStats.map((stat) => {
    const grade = stat.data[0][1];
    return (
      <StatCard
        key={stat.division.toString()}
        division={stat.division}
        data={stat.data}
        grade={grade}
      />
    );
  });
}
// TODO: viewport하단에 닿으면 queue에 있던것을 몇개 빼내서 렌더링(무한스크롤)

interface StatCardProps {
  division: string;
  data: number[][];
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
        <Heading size="md" textAlign="center">
          {division}({grade + 2}학년)
        </Heading>
      </CardHeader>
      <Divider opacity={0.15} />
      <CardBody>
        <TableContainer>
          <Table size="sm" sx={tableStyles}>
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
                  <Tr key={year.toString()}>
                    <Td>{year}</Td>
                    <Td>{applicants}</Td>
                    <Td>{capacity}</Td>
                    <Td>{capacity === 0 ? '-' : (applicants / capacity).toFixed(2)}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

function NotFound() {
  return (
    <Text as="b" textAlign="center">
      유효한 결과가 없습니다.
      <br />
      검색어가 올바른지 확인해주세요.
    </Text>
  );
}
