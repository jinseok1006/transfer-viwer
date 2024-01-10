import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import Filter from '../components/Filter';
import StatCardsContainer from '../components/StatsCards';

export default function TransferViewer() {
  return (
    <>
      <Helmet>
        <title>전북대학교 전학/전과 현황</title>
      </Helmet>
      <Box mt={4}>
        <Filter />

        <StatCardsContainer />
      </Box>
    </>
  );
}
