import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashDeliveryPage from "./pages/DashDeliveryPage";
import PageContainer from "./layouts/PageContainer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageContainer />}>
      <Route index element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dash-delivery" element={<DashDeliveryPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
