import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import { useTransferStore } from './store/transfer';

import AppBar from './components/AppBar';
import TransferViewer from './pages/TransferViewer';
import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';

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
  const fetchTransferData = useTransferStore((state) => state.fetchData);

  useEffect(() => {
    fetchTransferData();
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
