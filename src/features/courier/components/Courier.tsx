import { useLocation } from "react-router-dom";
import CourierEdit from "./CourierEdit";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";

import { useCourierData } from "../hooks/useCourierData";
import CourierView from "./CourierView";
import { ICourier } from "../../../interface/courier.interface";

const Courier = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editting = queryParams.get("edit");

  const { userList, courier, loading, error, onCourierEdit } = useCourierData();

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;
  return (
    <>
      {!editting ? (
        <CourierView
          courier={courier}
          couriers={userList.filter((user) => user.role === "courier") as ICourier[]}
        />
      ) : (
        <CourierEdit courier={courier} onSubmit={onCourierEdit} />
      )}
    </>
  );
};

export default Courier;
