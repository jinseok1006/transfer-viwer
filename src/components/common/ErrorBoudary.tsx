import { useRouteError } from "react-router-dom";
import { Box, Text, Center, Button, Image } from "@chakra-ui/react";
import Head from "./Head";
import { useNavigate } from "react-router-dom";

export default function ErrorBoudary() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

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
          <Button colorScheme="teal" w="160px" onClick={() => navigate(-1)}>
            뒤로가기
          </Button>
        </Center>
      </Box>
    </>
  );
}
