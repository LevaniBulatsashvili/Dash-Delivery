import { useNavigate } from "react-router-dom";
import Courier from "../features/courier/components/Courier";
import { useAppSelector } from "../hooks/redux";
import { userSelector } from "../store/user/user.slice";
import { objectIsEmpty } from "../utils/objectIsEmpty";
import { useEffect } from "react";

const DashDeliveryPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(userSelector);

  useEffect(() => {
    if (objectIsEmpty(user)) navigate("/login");
  }, [navigate, user]);

  const loggedInAs = {
    admin: [],
    user: [],
    courier: <Courier />,
  };

  return loggedInAs[user.role];
};

export default DashDeliveryPage;
