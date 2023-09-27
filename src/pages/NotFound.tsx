import { Box, Text, Heading, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
export default function NotFound() {
  const location = useLocation();

  return (
    <Box mt={3}>
      <Heading textAlign="center" size="lg">
        404 Not Found
      </Heading>
      <Text py={3}>not found {location.pathname + location.search}</Text>
      <Flex justifyContent="flex-end">
        <Link
          as={RouterLink}
          to="/"
          color="teal.500"
          textDecoration="underline"
        >
          메인으로
        </Link>
      </Flex>
    </Box>
  );
}
