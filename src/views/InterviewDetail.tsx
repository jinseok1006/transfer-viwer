import { Box, Heading, Button, Stack } from "@chakra-ui/react";
import { useSearchParams, Link } from "react-router-dom";

import NotFound from "./NotFound";
import InterviewPostCard from "../components/InterviewPostCard";

import { useAsync } from "react-use";

import transferInterviewApi from "../api/transferInterivew";
import NoInterviewPost from "../components/NoInterviewPost";
import Head from "../components/Head";
// import Error from "../components/ErrorBoudary";
import Loading from "../components/Loading";
import { useDepartmentLinkStore, useDivisionsStore } from "../store/transferStatistics";
import { extractApiAttribues } from "../utils/util";
import staticDataApi from "../api/staticData";
import { useEffect } from "react";


export default function InterviewInfoPage() {
  const departmentLinks= useDepartmentLinkStore();
  
  const divisions = useDivisionsStore((state) => state.divisions);
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division");

  useEffect(()=> {
    if(!departmentLinks.data) {
      departmentLinks.fetchData();
    }
  }, []);
  
  if (departmentLinks.loading) {
    return <Loading />;
  }
  if (departmentLinks.error || !departmentLinks.data) {
    throw new Error('departmentLinks 데이터 로딩 실패');
  }

  if (!division) return <NotFound />;
  if (!divisions.includes(division)) return <NotFound />;

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
      {/* <InterviewInfo division={division} /> */}
    </>
  );
}

function InterviewInfo({ division : department }: { division: string }) {


//   const departmentLinksState = useAsync(getDepartmentLinks);
//   const departmentLinks = departmentLinksState.value;
//   const relatedDepartments = departmentLinks[division];
//   const { loading, error, value } = useAsync(
//     () => fetchInterviewPostByDepartments(relatedDepartments),
//     [relatedDepartments]
//   );


//   if(departmentLinksState.error || !departmentLinksState.value ) {
//     return <Error error={departmentLinksState.error} />;
//   }

//   if (departmentLinksState.loading) {
//     return <Loading />;
//   }

//   // const departmentLinks = departmentLinksState.value;
//   // const relatedDepartments = departmentLinks[division];




//   if (error || !value) {
//     return <Error error={error} />;
//   }
//   if (loading) {
//     return <Loading />;
//   }

//   const interviewPosts = extractApiAttribues(value);

//   // console.log('success');

//   if (interviewPosts.length === 0) {
//     return <NoInterviewPost />;
//   }



//   return (
//     <>
//       <Stack direction="column" spacing={5}>
//         {interviewPosts.map(
//           (
//             { department, year, isYearPrivate, grade, score,  hasTakenCourse, content },
//             i
//           ) => (
//             <InterviewPostCard
//               key={i}
//               department={department}
//               isYearPrivate={isYearPrivate}
//               year={year}
//               grade={grade}
//               score={score}
//               hasTakenCourse={hasTakenCourse}
//               content={content}
//             />
//           )
//         )}
//       </Stack>
//     </>
//   );
}
