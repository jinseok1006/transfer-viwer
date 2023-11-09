import { useEffect } from 'react';
import { Stack, Box } from '@chakra-ui/react';

import Filter from '../components/Filter';
import StatsCardsContainer from '../components/StatsCards';
import { useTransferStore } from '../store/transfer';
import Head from '../components/Head';

export default function TransferViewer() {
  const transferData = useTransferStore((state) => state.data);
  const fetchTransferData = useTransferStore((state) => state.fetchData);
  useEffect(() => {
    if (!transferData) {
      fetchTransferData();
    }
  }, []);

  return (
    <>
      <Head title="경쟁률 현황" />
      <Stack mt={2} direction="column" spacing={4} minH="800px">
        <Filter />
        <StatsCardsContainer />
        <Box h="50px" />
      </Stack>
    </>
  );
}
