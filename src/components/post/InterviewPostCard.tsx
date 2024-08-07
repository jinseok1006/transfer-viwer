import { Card, CardBody, Flex, Text, Divider, Box } from "@chakra-ui/react";
import type { InterviewPost } from "../../types";

export const score2Str = {
  private: "비공개",
  less3: "3점대 미만",
  early3: "3점대 초반",
  mid3: "3점대 중반",
  late3: "3점대 후반",
  early4: "4점대 초반",
  late4: "4점대 후반",
};

export default function InterviewPostCard({
  department,
  year,
  isYearPrivate,
  grade,
  score,
  hasTakenCourse,
  content,
  isScorePrivate
}: InterviewPost) {
  
  return (
    <Card>
      <CardBody fontSize="sm">
        <Flex gap={2} flexDirection="column">
          <Flex>
            <Text fontWeight="bold" flexBasis="34%">
              학과명
            </Text>
            <Text flex="1">
              {department}({grade}학년)
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold" flexBasis="34%">
              지원년도
            </Text>
            <Text flex="1">{isYearPrivate ? "비공개" : `${year}년`}</Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold" flexBasis="34%">
              평균평점
            </Text>
            <Text flex="1">{!score ? "비공개" : score2Str[score]}</Text>
          </Flex>
          <Flex>
            <Text fontWeight="bold" flexBasis="34%">
              전공 선수강 여부
            </Text>
            <Text flex="1">{hasTakenCourse ? "수강" : "미수강"}</Text>
          </Flex>
        </Flex>
        <Divider mt={3} />
        <Box pt={3}>
          <Text fontWeight="bold">면접 후기</Text>
          {content
            .split("\n")
            .map((line, i) =>
              line === "" ? <br key={i} /> : <Text key={i}>{line}</Text>
            )}
        </Box>
      </CardBody>
    </Card>
  );
}
