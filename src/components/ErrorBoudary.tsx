import { useRouteError } from "react-router-dom";
import { Box, Text, Center, Button, Image } from "@chakra-ui/react";
import Head from "../components/Head";
import { Link as RouterLink } from "react-router-dom";

export default function ErrorBoudary() {
  const error = useRouteError() as Error;
  // console.error(error);

  // return (
  //   <>
  //     <p>에러 발생</p>
  //     <pre>{error.message}</pre>
  //   </>
  // );

  return (
    <>
      <Head title="404 Not Found" />
      <Box mt={5}>
        <Center>
          <Image src="/access_denied.svg" boxSize="300px" />
        </Center>

        <Text my={5} textAlign="center" px={4}>
          {error.message}
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
