import { Routes, Route } from 'react-router-dom';

import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import TransferViewer from './pages/TransferViewer';
import InterviewInfoContainer from './pages/InterviewInfo';
import InterviewIndex from './pages/InterviewIndex';
import InterviewWriteForm from './pages/InterviewWriteForm';

export default function Router() {
  return (
    <Routes>
      <Route index element={<TransferViewer />} />
      <Route path='disclaimer' element={<Disclaimer />} />
      <Route path='interview' element={<InterviewIndex />} />
      <Route path='interview/:division' element={<InterviewInfoContainer />} />
      <Route path='interview/write-form' element={<InterviewWriteForm />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
