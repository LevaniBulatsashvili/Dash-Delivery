import Courier from "../features/courier/components/Courier";
import { useAppSelector } from "../hooks/redux";
import { userSelector } from "../store/user/user.slice";
import AdminPage from "../pages/admin/AdminPanel";
import UserPanel from "../features/user/components/UserPanel";


const DashDeliveryPage = () => {
  const { user } = useAppSelector(userSelector);

  const loggedInAs = {
    admin: <AdminPage />,
    user: <UserPanel />,
    courier: <Courier />,
  };

  return loggedInAs[user.role];
};

export default DashDeliveryPage;
