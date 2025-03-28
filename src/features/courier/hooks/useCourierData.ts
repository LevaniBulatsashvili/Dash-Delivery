import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ICourier } from "../../../interface/courier.interface";
import { IRandomUser } from "../../../interface/user.interface";
import { userSelector } from "../../../store/user/user.slice";
import { editUserRequest } from "../../../store/user/user.thunk";

export const useCourierData = () => {
  const dispatch = useAppDispatch();
  const {
    userList,
    user: courier,
    loading,
    error,
  } = useAppSelector(userSelector) as {
    userList: IRandomUser[];
    user: ICourier;
    loading: boolean;
    error: null | string | undefined;
  };

  const onCourierEdit = (courier: ICourier) => {
    dispatch(editUserRequest(courier));
  };

  return {
    userList,
    courier,
    loading,
    error,
    onCourierEdit,
  };
};
