import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/user/user.slice";
import { ICourier, IWorkingDays } from "../../../interface/courier.interface";
import CourierWorkDays from "./CourierWorkDays";
import { IRandomUser, IUser } from "../../../interface/user.interface";
import { useAppDispatch } from "../../../hooks/redux";
import { editUserRequest } from "../../../store/user/user.thunk";
import { useLocation } from "react-router-dom";
import UserEdit from "./UserEdit";
import Spinner from "../../../components/Spinner";
import Error from "../../../components/Error";
import UserView from "./UserView";

const UserPanel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editting = queryParams.get("edit");

  const { userList, user, loading, error } = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const couriers = userList.filter(
    (allUsers: IRandomUser) => allUsers.role === "courier"
  ) as ICourier[];

  const onBook = (courier: ICourier, updatedWorkingDays: IWorkingDays) => {
    const updatedCourier = {
      ...courier,
      workingDays: updatedWorkingDays,
      totalRequests: [...courier.totalRequests, user.email],
    };
    dispatch(editUserRequest(updatedCourier));
  };

  const onUserEdit = (user: IUser) => {
    console.log(user);
    dispatch(editUserRequest(user));
  };

  if (loading) return <Spinner />;
  if (error) return <Error text={error} />;
  return (
    <>
      {editting ? (
        <UserEdit user={user as IUser} onSubmit={onUserEdit} />
      ) : (
        <Box sx={{ padding: 3 }}>
          <UserView user={user as IUser} />

          <Typography
            sx={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: 2 }}
          >
            All Couriers
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vehicle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {couriers.map((courier) => (
                  <TableRow key={courier._uuid}>
                    <TableCell>
                      <Avatar
                        alt={`${courier.firstName} ${courier.lastName}`}
                        src={courier.profileImage}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{courier.firstName}</TableCell>
                    <TableCell>{courier.lastName}</TableCell>
                    <TableCell>{courier.email}</TableCell>
                    <TableCell>{courier.vehicle}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {couriers.map((courier) => (
            <Box
              key={courier._uuid}
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                marginBottom: 3,
                borderBottom: "1px solid black",
                maxWidth: "92dvw",
              }}
            >
              <Box width={"100%"}>
                <Typography variant="h6">
                  {courier.firstName} {courier.lastName}
                </Typography>
                <CourierWorkDays
                  workingDays={courier.workingDays}
                  onBook={(updatedWorkingDays) =>
                    onBook(courier, updatedWorkingDays)
                  }
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default UserPanel;
