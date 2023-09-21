import { useEffect } from 'react';
import { Container, Stack } from '@chakra-ui/react';
import { create } from 'zustand';
import axios from 'axios';

import FilterContainer from './components/Filter';
import AppBar from './components/AppBar';
import Cards, { IStatics } from './components/StaticsCard';

interface IStaticState {
  loading: boolean;
  statics: null | IStatics[][];
  error: any;
  load: () => void;
  success: (data: any) => void;
  fail: (err: any) => void;
}

export const useStaticsStore = create<IStaticState>()((set) => ({
  loading: false,
  statics: null,
  error: null,
  load: () => set({ loading: true, statics: null, error: null }),
  success: (data) => set({ loading: false, statics: data, error: null }),
  fail: (err) => set({ loading: false, statics: null, error: err }),
}));

function App() {
  const { load, success, fail } = useStaticsStore();

  useEffect(() => {
    async function fetchStatics() {
      try {
        load();
        const response = await axios.get(
          `${window.location.protocol}//${window.location.host}/statics.json`
        );
        success(response.data);
      } catch (err) {
        fail(err);
      }
    }

    fetchStatics();
  }, []);

  return (
    <>
      <AppBar />
      <Container maxW="md" pt={1}>
        <Stack mt={2} direction="column" spacing={4}>
          <FilterContainer />
          <Cards />
        </Stack>
      </Container>
    </>
  );
}

export default App;
