import { Card, CardBody, Text } from '@chakra-ui/react';

export default function NoInterviewPost() {
  return (
    <Card my={4}>
      <CardBody>
        <Text>
          💡 아직 등록된 글이 없네요. 공유하실 정보가 있으신가요?
        </Text>
      </CardBody>
    </Card>
  );
}
