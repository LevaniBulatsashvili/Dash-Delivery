import { useLocation } from "react-router-dom";
import AdminEdit from "../../../admin/components/AdminEdit";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";

import { useAdminData } from "../hooks/useAdminData";
import AdminView from "../../../admin/components/AdminView";

const Admin = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editting = queryParams.get("edit");

  const { admin, loading, error, onAdminEdit } = useAdminData();

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;
  return (
    <>
      {!editting ? (
        <AdminView admin={admin} />
      ) : (
        <AdminEdit admin={admin} onSubmit={onAdminEdit} />
      )}
    </>
  );
};

export default Admin;
