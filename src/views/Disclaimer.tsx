import { Heading, Text, Stack, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Head from "../components/Head";

const text = [
  `'전북대 전학/전과 현황' 페이지 및 이에 포함된 모든 정보는 일반 정보
          목적으로 제공되며, 전북대학교와 어떠한 공식적인 관련이나 승인을
          나타내는 것이 아닙니다. 이 웹페이지에 포함된 모든 내용은 단순히 정보
          제공을 위한 것으로 간주되어야 하며, 전북대학교의 공식 정보나 입장을
          대변하지 않습니다. 이 웹페이지의 내용은 어떠한 보증이나 책임을
          부담하지 않으며, 어떠한 법적 또는 금융적 결정을 위한 권고사항이나
          조언으로 간주해서는 안 됩니다.`,
  `본 웹페이지의 내용을 사용함으로써 발생하는 어떠한 손실이나 손해에
          대해서도 책임을 지지 않습니다. 전북대학교와의 관련성이 없으며,
          전북대학교의 명백한 승인 없이 이 웹페이지의 내용이 사용되었다면 그러한
          사용은 당사자간의 독립적인 결정에 따라 이루어진 것이며, 전북대학교와
          어떠한 연관성도 갖지 않습니다.`,
  `본 웹페이지를 이용하는 경우, 이 면책 조항에 동의하는 것으로
          간주됩니다. 법적 문제나 의문 사항이 있는 경우, 전문 법률 자문을 구하는
          것이 좋습니다.`,
];

export default function Disclaimer() {
  return (
    <>
      <Head title="면책 조항" />
      <Heading size="md" mt={6} mb={3}>
        면책 조항
      </Heading>
      <Stack spacing={3}>
        {text.map((paragraph, i) => (
          <Text key={i}>{paragraph}</Text>
        ))}
      </Stack>

      <Flex justifyContent="flex-end" mt={4}>
        <Link
          as={RouterLink}
          to="/"
          color="teal.500"
          textDecoration="underline"
        >
          메인으로
        </Link>
      </Flex>
    </>
  );
}
