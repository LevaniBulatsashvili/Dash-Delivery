import { useLocation } from "react-router-dom";
import CourierEdit from "./CourierEdit";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";

import { useCourierData } from "../hooks/useCourierData";
import CourierView from "./CourierView";

const Courier = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editting = queryParams.get("edit");

  const { courier, loading, error, onCourierEdit } = useCourierData();

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;
  return (
    <>
      {!editting ? (
        <CourierView courier={courier} />
      ) : (
        <CourierEdit courier={courier} onSubmit={onCourierEdit} />
      )}
    </>
  );
};

export default Courier;
