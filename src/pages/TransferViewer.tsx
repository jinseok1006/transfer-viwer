import { Stack, Box } from '@chakra-ui/react';
import Filter from '../components/Filter';
import StatsCardsContainer from '../components/StatsCards';

export default function TransferViewer() {
  return (
    <Stack mt={2} direction="column" spacing={4} minH="800px">
      <Filter />
      <StatsCardsContainer />
      <Box h="50px" />
    </Stack>
  );
}
