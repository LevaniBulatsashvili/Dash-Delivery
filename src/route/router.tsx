import React, { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import RegisterPage from "../pages/RegisterPage";
import DashDeliveryPage from "../pages/DashDeliveryPage";
import PageContainer from "../layouts/PageContainer";
import { userSelector } from "../store/user/user.slice";
import { objectIsEmpty } from "../utils/objectIsEmpty";
import { getUserRequest, getUsersRequest } from "../store/user/user.thunk";
import { useAppDispatch } from "../hooks/redux";
import Spinner from "../components/Spinner";

const AppRouter: React.FC = () => {
  const { userList, user, loading, error } = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const userUuid = localStorage.getItem("userUuid");

  useEffect(() => {
    if (!userList.length) dispatch(getUsersRequest());
    if (userUuid && userList.length) dispatch(getUserRequest(userUuid));
  }, [dispatch, userList, userUuid]);

  if (!userList.length && loading) return <Spinner />;
  if (error) console.log(error);
  if (userUuid && objectIsEmpty(user) && !error) return <Spinner />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageContainer />}>
          <Route index element={<Navigate to="/login" />} />
          {objectIsEmpty(user) && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
          {!objectIsEmpty(user) && (
            <>
              <Route path="/login" element={<Navigate to="/dashboard" />} />
              <Route path="/register" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashDeliveryPage />} />
            </>
          )}

          <Route
            path="*"
            element={
              <Navigate to={!objectIsEmpty(user) ? "/dashboard" : "/login"} />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
