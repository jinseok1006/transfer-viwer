import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Disclaimer from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import TransferViewer from './pages/TransferViewer';
import InterviewInfoPage from './pages/InterviewDetail';
import InterviewIndexPage from './pages/InterviewIndex';
import InterviewWriteFormPage from './pages/InterviewWriteForm';

import {
  useCollegeDivisionStore,
  useTransferStatisticsStore,
} from './store/transfer-statistics';
import Loading from './components/Loading';
import ErrorComponent from './components/Error';

export default function Router() {
  const collegeDivisions = useCollegeDivisionStore();
  const transferStatistics = useTransferStatisticsStore();

  useEffect(() => {
    collegeDivisions.fetchData();
    transferStatistics.fetchData();
  }, []);

  if (collegeDivisions.error || transferStatistics.error) {
    return (
      <ErrorComponent
        errors={[collegeDivisions.error, transferStatistics.error]}
      />
    );
  }

  if (
    collegeDivisions.loading ||
    transferStatistics.loading ||
    !collegeDivisions.data ||
    !transferStatistics.data
  ) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<TransferViewer />} />
        <Route path='disclaimer' element={<Disclaimer />} />
        <Route path='interview' element={<InterviewIndexPage />} />
        <Route path='interview/view' element={<InterviewInfoPage />} />
        <Route
          path='interview/write-form'
          element={<InterviewWriteFormPage />}
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
