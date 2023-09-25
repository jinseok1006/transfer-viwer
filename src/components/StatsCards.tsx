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
} from '@chakra-ui/react';
import { COLLEGE_INDEX } from '../collegeIndex';

import { useFilterStore } from './Filter';
import { useStatsStore, IStat } from '../store';

// 학과 1개의 데이터

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
  // const activeColleges = collegeFilter
  //   .filter((col) => col.isActived)
  //   .map((col) => col.college);

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

  // TODO: 만약 filteredStats가 없으면 올바른 검색어가 아니라는 안내 문구 추가.

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
