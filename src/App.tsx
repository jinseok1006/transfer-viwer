// import { lazy } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Layout from "./views/Layout";
import ErrorComponent from "./components/common/ErrorBoudary";

// convert dynamic import following components
import Disclaimer from "./views/Disclaimer";
import NotFound from "./views/NotFound";
import TransferViewer from "./views/TransferViewer";
import InterviewInfoPage from "./views/post/InterviewDetail";
import InterviewIndexPage from "./views/post/InterviewIndex";
import InterviewWriteFormPage from "./views/post/InterviewWriteForm";
import DataSource from "./views/DataSource";
import GlobalDataLoader from "./components/GlobalDataLoder";



const routeElements = (
  <Route path="/" element={<Layout />}>
    <Route path="*" errorElement={<ErrorComponent />}>
      <Route path="*" element={<GlobalDataLoader />}>
        <Route index element={<TransferViewer />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="data-source" element={<DataSource />} />
        <Route path="interview">
          <Route index element={<InterviewIndexPage />} />
          <Route path="view" element={<InterviewInfoPage />} />
          <Route path="write-form" element={<InterviewWriteFormPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routeElements));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
