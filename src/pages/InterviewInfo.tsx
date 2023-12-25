import {
  Card,
  Box,
  Heading,
  CardBody,
  Text,
  Flex,
  Divider,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { COLLEGE_INDEX } from '../../assets/collegeIndex';
import NotFound from './NotFound';
import { contains } from '../utils';

export default function InterviewInfoContainer() {
  const { division } = useParams();

  if (!division) return <NotFound />;
  if (!COLLEGE_INDEX.some((col) => contains(col.divisions, division)))
    return <NotFound />;

  return (
    <>
      <InterviewInfo division={division} />
      <InterviewWriteButton division={division} />
    </>
  );
}

function InterviewWriteButton({ division }: { division: string }) {
  return (
    <Box
      position='fixed'
      zIndex={10}
      bottom='10px'
      left='50%'
      width='90px'
      transform='translateX(-50%)'
    >
      <Button
        colorScheme='red'
        borderRadius='50px'
        width='100%'
        as={Link}
        to={`/interview/write-form?division=${division}`}
      >
        글쓰기
      </Button>
    </Box>
  );
}

function InsperationCard() {
  return (
    <Card>
      <CardBody>
        <Text>
          💡 새로운 길을 탐색하는 사람들을 위해 도움을 주는 소중한 글을 기다리고
          있어요!
        </Text>
      </CardBody>
    </Card>
  );
}

function InterviewInfo({ division }: { division: string }) {
  return (
    <Box>
      <Box>
        <Heading size='md' my={4}>
          {division}
        </Heading>
      </Box>
      <Stack direction='column' spacing={5}>
        <InfoCard
          year={2023}
          grade={0}
          score='less3'
          takeLecture
          body='asdasd'
        />
        <InfoCard
          year={2023}
          grade={0}
          score='less3'
          takeLecture
          body='asdasd'
        />
        <InfoCard
          year={2023}
          grade={0}
          score='less3'
          takeLecture
          body='asdasd'
        />
        <InfoCard
          year={2023}
          grade={0}
          score='less3'
          takeLecture
          body='asdasdasdadq'
        />
      </Stack>
    </Box>
  );
}

export interface InfoCardProps {
  year: number | 'private';
  grade: number;
  score: 'early4' | 'late4' | 'early3' | 'mid3' | 'late3' | 'less3' | 'private';
  takeLecture: boolean;
  body: string;
}

export const score2Str = {
  early4: '4점대 초반',
  late4: '4점대 후반',
  early3: '3점대 초반',
  mid3: '3점대 중반',
  late3: '3점대 초반',
  less3: '3점대 미만',
  private: '비공개',
};

function InfoCard({ year, grade, score, takeLecture, body }: InfoCardProps) {
  return (
    <Card>
      <CardBody>
        <Flex gap={2} flexDirection='column'>
          <Flex>
            <Text fontWeight='bold' flexBasis='37%'>
              지원학년
            </Text>
            <Text flex='1'>{grade + 2}학년</Text>
          </Flex>
          <Flex>
            <Text fontWeight='bold' flexBasis='37%'>
              지원년도
            </Text>
            <Text flex='1'>{year === 'private' ? '비공개' : `${year}년`}</Text>
          </Flex>
          <Flex>
            <Text fontWeight='bold' flexBasis='37%'>
              평균평점
            </Text>
            <Text flex='1'>{score2Str[score]}</Text>
          </Flex>
          <Flex>
            <Text fontWeight='bold' flexBasis='37%'>
              전공 선수강 여부
            </Text>
            <Text flex='1'>{takeLecture ? '수강' : '미수강'}</Text>
          </Flex>
        </Flex>
        <Divider mt={3} />
        <Box py={3}>
          <Text fontWeight='bold'>면접 후기</Text>
          <Text mt={1}>{body}</Text>
        </Box>
      </CardBody>
    </Card>
  );
}
