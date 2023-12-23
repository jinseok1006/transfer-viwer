import { Stack, Box } from '@chakra-ui/react';

import Filter from '../components/Filter';
import StatCardsContainer from '../components/StatsCards';

import Head from '../components/Head';

export default function TransferViewer() {
  return (
    <>
      <Head title='전북대 전학/전과 경쟁률 현황' />
      <Stack mt={2} direction='column' spacing={4} minH='800px'>
        <Filter />
        <StatCardsContainer />
        <Box h='50px' />
      </Stack>
    </>
  );
}
