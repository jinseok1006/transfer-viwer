import { useEffect } from 'react';
import { Container, Stack, Box } from '@chakra-ui/react';
import { create } from 'zustand';
import axios from 'axios';

import Filter from './components/Filter';
import AppBar from './components/AppBar';
import StatsCardsContainer, { IStat } from './components/StatsCards';

interface IStatsState {
  loading: boolean;
  stats: null | IStat[][];
  error: any;
  load: () => void;
  success: (data: any) => void;
  fail: (err: any) => void;
}

export const useStatsStore = create<IStatsState>()((set) => ({
  loading: false,
  stats: null,
  error: null,
  load: () => set({ loading: true, stats: null, error: null }),
  success: (data) => set({ loading: false, stats: data, error: null }),
  fail: (err) => set({ loading: false, stats: null, error: err }),
}));

function App() {
  const { load, success, fail } = useStatsStore();

  useEffect(() => {
    async function fetchStats() {
      try {
        load();
        const response = await axios.get(
          `${window.location.protocol}//${window.location.host}/stats.json`
        );
        success(response.data);
      } catch (err) {
        fail(err);
      }
    }

    fetchStats();
  }, []);

  // TODO: 백그라운드 컬러 회색으로 clear
  return (
    <>
      <AppBar />
      <Container maxW="md">
        <Stack mt={2} direction="column" spacing={4} minH="800px">
          <Filter />
          <StatsCardsContainer />
          <Box h="50px" />
        </Stack>
      </Container>
    </>
  );
}

export default App;
