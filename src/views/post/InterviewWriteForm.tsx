import React, { useState } from "react";
import {
  Box,
  Stack,
  Select,
  RadioGroup,
  Radio,
  Button,
  Wrap,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

import transferInterviewApi from "../../api/transferInterivew";
import Head from "../../components/common/Head";
import { useDivisionsStore } from "../../store/transferStatistics";
import { InterviewPost } from "../../types";

const YEARS = [2020, 2021, 2022, 2023, 2024];
const GRADES = [2, 3, 4];

export default function InterviewWriteFormPage() {
  const divisions = useDivisionsStore((state) => state.divisions);
  const [searchParams] = useSearchParams();
  const division = searchParams.get("division");

  if (!division) return <NotFound />;

  if (!divisions.includes(division)) return <NotFound />;
  // if (!COLLEGE_INDEX.some((col) => contains(col.divisions, division)))
  //   return <NotFound />;

  return (
    <>
      <Head title="면접정보 작성" />
      <InterviewWriteForm division={division} />
    </>
  );
}


function InterviewWriteForm({ division }: { division: string }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmtting] = useState(false);

  // const { getRootProps, getRadioProps } = useRadioGroup({
  //   name: "grade",
  //   defaultValue: "2",
  //   onChange: console.log,
  // });
  // const group = getRootProps();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // const payload = new URLSearchParams(Array.from(formData) as string[][]);
    // console.log(Array.from(formData));

    const payload = Array.from(formData).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as InterviewPost
    );

    if (payload.score === "private") {
      payload.isScorePrivate = true;
      delete payload.score;
    }
    if (payload.year === "private") {
      payload.isYearPrivate = true;
      delete payload.year;
    }

    if (!confirm("정말로 등록할까요?")) return;

    setIsSubmtting(true);
    try {
      await transferInterviewApi.submitPost(payload);
      alert("등록되었습니다.");
      navigate(`/interview/view?division=${division}`);
    } catch (err) {
      const error = err as Error;
      console.log(error);
      alert("등록실패\n" + error.message);
    }
    setIsSubmtting(false);
  };

  return (
    <Box mt={5}>
      <form onSubmit={onSubmit}>
        <Stack direction="column" spacing={3}>
          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              지원한 전공
            </FormLabel>
            <Select name="department" bg="blackAlpha.50">
              <option>{division}</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              지원년도
            </FormLabel>
            <Box maxW="40%">
              <Select placeholder="지원년도" name="year" bg="blackAlpha.50">
                <option value="private">연도 비공개</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              지원시 학년
            </FormLabel>
            <Box maxW="40%">
              <Select placeholder="지원학년" name="grade" bg="blackAlpha.50">
                {GRADES.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}학년
                  </option>
                ))}
              </Select>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              지원시 평점
            </FormLabel>

            <Box w="60%">
              <Select placeholder="평균평점" name="score" bg="blackAlpha.50">
                <option value="private">평점 비공개</option>
                <option value="less3">3점대 미만</option>
                <option value="early3">3점대 초반</option>
                <option value="mid3">3점대 중반</option>
                <option value="late3">3점대 후반</option>
                <option value="early4">4점대 초반</option>
                <option value="late4">4점대 후반</option>
              </Select>
            </Box>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              전공 선수강 여부
            </FormLabel>
            <RadioGroup name="hasTakenCourse" colorScheme="red">
              <Wrap>
                <Radio value="true">수강</Radio>
                <Radio value="false">미수강</Radio>
              </Wrap>
            </RadioGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontWeight="bold" mb={2}>
              면접 전략
            </FormLabel>
            <Textarea
              name="content"
              h="220px"
              placeholder="어떻게 준비하면 좋을까요?"
              bg="blackAlpha.50"
            ></Textarea>
          </FormControl>
        </Stack>

        <Box pt={10}>
          <Button
            width="100%"
            type="submit"
            isLoading={isSubmitting}
            colorScheme="red"
          >
            등록하기
          </Button>
        </Box>
      </form>
    </Box>
  );
}
