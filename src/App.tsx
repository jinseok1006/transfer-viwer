import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Center, Spinner } from '@chakra-ui/react';

import Layout from './pages/Layout';

const Router = React.lazy(() => import('./Router'));

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route
          path="*"
          element={
            <React.Suspense
              fallback={
                <Center>
                  <Spinner />
                </Center>
              }
            >
              <Router />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
