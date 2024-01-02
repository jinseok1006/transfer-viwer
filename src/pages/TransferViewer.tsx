import { Stack } from '@chakra-ui/react';

import Filter from '../components/Filter';
import StatCardsContainer from '../components/StatsCards';

import { Helmet } from 'react-helmet-async';

export default function TransferViewer() {
  return (
    <>
      <Helmet>
        <title>전북대학교 전학/전과 현황</title>
      </Helmet>
      <Stack direction='column' spacing={4} minH='800px' mt={4}>
        <Filter />
        <StatCardsContainer />
      </Stack>
    </>
  );
}
