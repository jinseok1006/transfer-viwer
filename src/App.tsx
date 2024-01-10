import React, { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Layout from './pages/Layout';
import Loading from './components/Loading';

const Router = React.lazy(() => import('./Router'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Layout />}>
          <Route
            path='*'
            element={
              <Suspense fallback={<Loading />}>
                <Router />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
