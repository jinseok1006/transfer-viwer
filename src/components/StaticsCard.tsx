import {
  Card,
  Center,
  Spinner,
  Text,
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
import collegeIndex from '../collegeIndex';

import { useFilterStore } from './Filter';
import { useStaticsStore } from '../App';

export interface IStatics {
  division: string;
  statics: {
    [year: number]: {
      capacity: number;
      applicants: number;
      rate: number;
    };
  };
}

export default function Cards() {
  const { hasAnyFilterFalse } = useFilterStore();
  const { loading, statics, error } = useStaticsStore();
  if (error) {
    <div>에러발생</div>;
  }

  if (loading || !statics)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  if (hasAnyFilterFalse()) {
    return (
      <Center>
        <Text fontWeight="bold">태그별 필터를 최소 하나이상 선택해주세요.</Text>
      </Center>
    );
  }

  return <StaticsCardContainer />;
}

function StaticsCardContainer() {
  const statics = useStaticsStore((state) => state.statics);
  const { gradeFilter, collegeFilter, searchFilter } = useFilterStore();
  const filteredStatics: (IStatics & { grade: number })[] = [];
  const filteredColleges = collegeFilter
    .filter((col) => col.isActived)
    .map((col) => col.college);
  const filteredDivisions = collegeIndex
    .filter((col) => filteredColleges.includes(col.college))
    .reduce((pre, col) => [...pre, ...col.divisions], [] as string[]);
  if (!statics) return;

  statics.forEach((stat, grade) => {
    if (!gradeFilter[grade]) return;

    stat.forEach((s) => {
      if (!filteredDivisions.includes(s.division)) return;
      if (!s.division.includes(searchFilter.toUpperCase())) return;
      filteredStatics.push({ ...s, grade });
    });
  });

  console.log(filteredStatics);

  return filteredStatics.map((stat) => (
    <StaticsCard
      key={`${stat.division}_${stat.grade}`}
      division={stat.division}
      statics={stat.statics}
      grade={stat.grade}
    />
  ));
}

interface StaticsCardProps {
  division: string;
  grade: number;
  statics: {
    [year: number]: {
      capacity: number;
      applicants: number;
      rate: number;
    };
  };
}

function StaticsCard({ division, grade, statics }: StaticsCardProps) {
  const tableStyles = {
    'td, th': {
      textAlign: 'center',
    },
  };
  // TODO: viewport 하단에 닿으면 카드 하단 margin이 없음 clear
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
                  <Td>{statics[parseInt(year)].rate}%</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}
