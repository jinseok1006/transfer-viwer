import { useState } from "react";
import { Box, Heading, Button, Stack } from "@chakra-ui/react";
import { useSearchParams, Link } from "react-router-dom";

import NotFound from "../NotFound";
import InterviewPostCard from "../../components/post/InterviewPostCard";

import { useAsync } from "react-use";

import transferInterviewApi from "../../api/transferInterivew";
import NoInterviewPost from "../../components/post/NoInterviewPost";
import Head from "../../components/common/Head";
// import Error from "../components/ErrorBoudary";
import Loading from "../../components/common/Loading";
import {
  useDepartmentLinkStore,
  useDivisionsStore,
} from "../../store/transferStatistics";
import { extractApiAttribues } from "../../utils/util";

import { useEffect } from "react";

export default function InterviewInfoPage() {
  const departmentLinks = useDepartmentLinkStore();

  const divisions = useDivisionsStore((state) => state.divisions);
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division");

  useEffect(() => {
    if (!departmentLinks.data) {
      departmentLinks.fetchData();
    }
  }, []);

  if (departmentLinks.isLoading) {
    return <Loading />;
  }
  if (departmentLinks.error) {
    throw new Error(
      "departmentLinks 로딩 실패\n" + departmentLinks.error.message
    );
  }
  if (!departmentLinks.data) return null;

  if (!division) {
    return <NotFound />;
  }
  if (!divisions.includes(division)) {
    console.log(divisions, division);
    return <NotFound />;
  }

  return (
    <>
      <Head title={division} />
      <InterviewInfoContainer division={division} />
      <InterviewWriteButton division={division} />
    </>
  );
}

function InterviewWriteButton({ division }: { division: string }) {
  return (
    <Box
      position="fixed"
      zIndex={10}
      bottom="10px"
      left="50%"
      width="90px"
      transform="translateX(-50%)"
    >
      <Button
        colorScheme="red"
        borderRadius="50px"
        width="100%"
        as={Link}
        to={`/interview/write-form?division=${division}`}
      >
        글쓰기
      </Button>
    </Box>
  );
}

function InterviewInfoContainer({ division }: { division: string }) {
  return (
    <>
      <Heading size="md" my={4}>
        {division}
      </Heading>
      <InterviewInfo division={division} />
    </>
  );
}

function InterviewInfo({ division: department }: { division: string }) {
  const [relatedDepartments, setRelatedDepartments] = useState<string[]>([]);
  const {
    data: departmentLinks,
    isLoading: departmentLinksLoading,
    error: departmentLinksError,
    fetchData: fetchDepartmentLinks,
  } = useDepartmentLinkStore();
  const {
    loading: postsLoading,
    error: postsError,
    value: postsData,
  } = useAsync(() => {
    // null의 의미 다시 생각해볼것..
    if (!relatedDepartments.length) return Promise.resolve(null);
    // TODO: 어차피 본인학과를 여기서 포함하기 때문에 link를 다시 작성해야겠네요.
    return transferInterviewApi.getPostByDepartments([
      department,
      ...relatedDepartments,
    ]);
  }, [relatedDepartments]);

  useEffect(() => {
    if (!departmentLinks) {
      fetchDepartmentLinks();
      return;
    }

    setRelatedDepartments(departmentLinks[department] || []);
  }, [department, departmentLinks, fetchDepartmentLinks]);

  if (departmentLinksLoading || postsLoading) {
    return <Loading />;
  }

  if (departmentLinksError) {
    throw new Error(
      "departmentLinks 로딩 실패\n" + departmentLinksError.message
    );
  }
  if (postsError) {
    throw new Error("postsState 로딩 실패\n" + postsError.message);
  }

  if (!departmentLinks || !postsData) return null;

  const posts = extractApiAttribues(postsData);

  if(!posts.length) return <NoInterviewPost />;

  return (
    <>
      <Stack direction="column" spacing={5}>
        {posts.map(
          (
            {
              department,
              year,
              isYearPrivate,
              grade,
              score,
              hasTakenCourse,
              content,
              isScorePrivate
            },
            i
          ) => (
            <InterviewPostCard
              key={i}
              department={department}
              isYearPrivate={isYearPrivate}
              year={year}
              grade={grade}
              score={score}
              hasTakenCourse={hasTakenCourse}
              content={content}
              isScorePrivate={isScorePrivate}
            />
          )
        )}
      </Stack>
    </>
  );
}
