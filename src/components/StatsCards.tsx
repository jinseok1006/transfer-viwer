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
import { useStatsStore, IStat } from '../store/stats';

export default function StatsCardsContainer() {
  const { loading, stats, error } = useStatsStore();
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
  const filteredStats: StatCardProps[] = [];
  const stats = useStatsStore((state) => state.stats);
  const { gradeFilter, collegeFilter, searchFilter } = useFilterStore();

  const activeDivisions = COLLEGE_INDEX.filter((col) =>
    collegeFilter.includes(col.college)
  ).reduce((pre, col) => [...pre, ...col.divisions], [] as string[]);
  if (!stats) return;

  stats.forEach((gradeStats, grade) => {
    if (grade !== gradeFilter) return;

    gradeStats.forEach((individualStat) => {
      if (!activeDivisions.includes(individualStat.division)) return;
      if (!individualStat.division.includes(searchFilter.toUpperCase())) return;
      filteredStats.push({ ...individualStat, grade });
    });
  });

  // debug
  // console.log(filteredStats);

  if (filteredStats.length === 0) {
    return (
      <Text as="b" textAlign="center">
        유효한 결과가 없습니다.
        <br />
        검색어가 올바른지 확인해주세요.
      </Text>
    );
  }

  return filteredStats.map((stat) => (
    <StatCard
      key={`${stat.division}_${stat.grade}`}
      division={stat.division}
      yearsData={stat.yearsData}
      grade={stat.grade}
    />
  ));
}
// TODO: viewport하단에 닿으면 queue에 있던것을 몇개 빼내서 렌더링(무한스크롤)

interface StatCardProps extends IStat {
  grade: number;
}

function StatCard({ division, grade, yearsData: statics }: StatCardProps) {
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
              {Object.keys(statics).map((year) => (
                <Tr key={`${year}`}>
                  <Td>{year}</Td>
                  <Td>{statics[parseInt(year)].applicants}</Td>
                  <Td>{statics[parseInt(year)].capacity}</Td>
                  <Td>{statics[parseInt(year)].rate}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}
