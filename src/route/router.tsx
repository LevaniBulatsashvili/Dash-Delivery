import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import AdminPage from "../pages/admin/AdminPanel";
import LoginPage from "../pages/LoginPage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import RegisterPage from "../pages/RegisterPage";
import DashDeliveryPage from "../pages/DashDeliveryPage";
import UserPanel from "../pages/user/UserPanel";
import CourierPanel from "../pages/courier/CourierPanel";
import { loginSuccess } from "../store/login/login.slice";

const AppRouter: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          user: parsedUser.user,
          admin: parsedUser.admin || null,
          courier: parsedUser.courier || null,
          role: parsedUser.role,
        })
      );
    }
    setLoading(false); 
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}
        {isAuthenticated && (
          <>
            <Route path="/login" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<Navigate to="/dashboard" />} />
            {role === "admin" && (
              <Route path="/dashboard" element={<AdminPage />} />
            )}
            {role === "user" && (
              <Route path="/dashboard" element={<UserPanel />} />
            )}
            {role === "courier" && (
              <Route path="/dashboard" element={<CourierPanel />} />
            )}
            <Route path="/dash-delivery" element={<DashDeliveryPage />} />
          </>
        )}

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
