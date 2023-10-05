import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import { useTransferStore } from './store/stats';
import { useDobuleMajorStore } from './store/doubleMajor';

import AppBar from './components/AppBar';
import TransferViewer from './pages/TransferViewer';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import { DoubleTest } from './pages/DobleMajorViewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyApp />}>
          <Route index element={<TransferViewer />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
          <Route path="test" element={<DoubleTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function MyApp() {
  const fetchTransferData = useTransferStore((state) => state.fetchData);
  const fetchDoubleMajorData = useDobuleMajorStore((state) => state.fetchData);

  useEffect(() => {
    fetchTransferData();
    fetchDoubleMajorData();
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
