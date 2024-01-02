import { Routes, Route } from 'react-router-dom';

import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import TransferViewer from './pages/TransferViewer';
import InterviewInfoPage from './pages/InterviewInfo';
import InterviewIndexPage from './pages/InterviewIndex';
import InterviewWriteFormPage from './pages/InterviewWriteForm';

export default function Router() {
  return (
    <Routes>
      <Route index element={<TransferViewer />} />
      <Route path='disclaimer' element={<Disclaimer />} />
      <Route path='interview' element={<InterviewIndexPage />} />
      <Route path='interview/view' element={<InterviewInfoPage />} />
      <Route path='interview/write-form' element={<InterviewWriteFormPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
