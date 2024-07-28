import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Layout from "./views/Layout";
import ErrorComponent from "./components/ErrorBoudary";

import Disclaimer from "./views/Disclaimer";
import NotFound from "./views/NotFound";
import TransferViewer from "./views/TransferViewer";
import InterviewInfoPage from "./views/InterviewDetail";
import InterviewIndexPage from "./views/InterviewIndex";
import InterviewWriteFormPage from "./views/InterviewWriteForm";

const routeElements = (
  <Route path="/" element={<Layout />}>
    <Route path="*" errorElement={<ErrorComponent />}>
      <Route index element={<TransferViewer />} />
      <Route path="disclaimer" element={<Disclaimer />} />
      <Route path="interview">
        <Route index element={<InterviewIndexPage />} />
        <Route path="view" element={<InterviewInfoPage />} />
        <Route path="write-form" element={<InterviewWriteFormPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routeElements));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
