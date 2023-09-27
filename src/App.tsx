import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import { useStatsStore } from './store/stats';
import TransferViewer from './pages/TransferViewer';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import AppBar from './components/AppBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyApp />}>
          <Route index element={<TransferViewer />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function MyApp() {
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

  return (
    <>
      <AppBar />
      <Container maxW="md">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
