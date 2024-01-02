import { useState } from 'react';
import {
  Input,
  Box,
  Text,
  Stack,
  Card,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { COLLEGE_INDEX } from '../assets/collegeIndex';
import InterviewPostCard from '../components/InterviewPostCard';
import { Link } from 'react-router-dom';
import NoInterviewPost from '../components/NoInterviewPost';
import useAsync from '../hooks/useAsync';
import Head from '../components/Head';
import { fetchNewestInterviewPosts } from '../api/api';
import Error from '../components/Error';
const divisionList = COLLEGE_INDEX.flatMap((col) => col.divisions);

interface DivisionSearchForm {
  onSubmit: (e: React.FormEvent) => void;
}
function DivisionSearchForm({ onSubmit }: DivisionSearchForm) {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup my={4}>
        <Input
          placeholder='학과명으로 찾기'
          backgroundColor='white'
          name='search'
        />
        <InputRightElement>
          <Button type='submit' variant='ghost'>
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default function InterviewIndexPage() {
  return (
    <>
      <Head title='면접정보' />
      <InterviewIndex />
    </>
  );
}

function InterviewIndex() {
  const [search, setSearch] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get('search')!;
    setSearch((value as string).toUpperCase());
  };

  const filteredDivision = divisionList.filter((div) => div.includes(search));

  return (
    <>
      <DivisionSearchForm onSubmit={onSubmit} />
      {search === '' ? (
        <NewestInterviewPostsContainer />
      ) : filteredDivision.length ? (
        filteredDivision.map((div) => (
          <Link to={`view?division=${div}`} key={div}>
            <Card my={2} p={2}>
              <Text fontWeight='bold'>{div}</Text>
            </Card>
          </Link>
        ))
      ) : (
        <Text textAlign='center'>Not Found</Text>
      )}
    </>
  );
}

function NewestInterviewPostsContainer() {
  return (
    <Box>
      <Heading size='md' py={3}>
        📝 최근 게시된 면접정보!
      </Heading>
      <NewestInterviewPosts />
    </Box>
  );
}

function NewestInterviewPosts() {
  const [loading, error, newestInterviewPosts] = useAsync(
    fetchNewestInterviewPosts
  );

  if (error) {
    return <Error error={error} />;
  }
  if (loading || !newestInterviewPosts) {
    return <p>로딩중</p>;
  }

  if (newestInterviewPosts.length === 0) {
    return <NoInterviewPost />;
  }

  return (
    <Stack direction='column' spacing={5}>
      {newestInterviewPosts.map(
        ({ division, year, grade, score, takeLecture, body }, i) => (
          <InterviewPostCard
            key={i}
            division={division}
            year={year}
            grade={grade}
            score={score}
            takeLecture={takeLecture}
            body={body}
          />
        )
      )}
    </Stack>
  );
}
