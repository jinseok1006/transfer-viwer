import { Routes, Route } from 'react-router-dom';

import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import TransferViewer from './pages/TransferViewer';

export default function Router() {
  return (
    <Routes>
      <Route index element={<TransferViewer />} />
      <Route path="disclaimer" element={<Disclaimer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
