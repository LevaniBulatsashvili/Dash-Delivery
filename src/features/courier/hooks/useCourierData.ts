import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ICourier } from "../../../interface/courier.interface";
import { userSelector } from "../../../store/user/user.slice";
import { editUserRequest } from "../../../store/user/user.thunk";

export const useCourierData = () => {
  const dispatch = useAppDispatch();
  const {
    user: courier,
    loading,
    error,
  } = useAppSelector(userSelector) as {
    user: ICourier;
    loading: boolean;
    error: null | string | undefined;
  };

  const onCourierEdit = (courier: ICourier) => {
    dispatch(editUserRequest(courier));
  };

  return {
    courier,
    loading,
    error,
    onCourierEdit,
  };
};
