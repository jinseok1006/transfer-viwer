import { Box, Text, Heading, Image, Center, Button } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Head from "../components/Head";

export default function NotFound() {
  const { pathname, search } = useLocation();
  const { host } = window.location;

  return (
    <>
      <Head title="404 Not Found" />
      <Box mt={5}>
        <Center>
          <Image src="/not_found.svg" boxSize="300px" />
        </Center>

        <Text my={5} textAlign="center" px={4}>
          "{host + pathname + search}" 경로에는 아무것도 존재하지 않습니다. 찾는
          경로가 올바른지 확인하세요. 문제가 있다면 사이트 소유자에게
          문의하십시오.
        </Text>
        <Center mt={12}>
          <Button as={RouterLink} colorScheme="teal" w="160px" to="/">
            메인으로
          </Button>
        </Center>
      </Box>
    </>
  );
}
