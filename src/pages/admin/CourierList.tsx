import {
  Button,
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
import { ICourier } from "../../interface/courier.interface";
import { useAppDispatch } from "../../hooks/redux";
import { deleteUserRequest } from "../../store/user/user.thunk";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CourierAdminEdit from "./CourierAdminEdit";
import { objectIsEmpty } from "../../utils/objectIsEmpty";
interface ICouriersList {
  couriers: ICourier[];
}
const CouriersList = ({ couriers }: ICouriersList) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editting = queryParams.get("edit");
  const [courierToEdit, setCourierToEdit] = useState<ICourier>({} as ICourier);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (editting && objectIsEmpty(courierToEdit)) navigate("/dashboard");
  }, [navigate, editting, courierToEdit]);
  const handleEdit = (courier: ICourier) => {
    setCourierToEdit(courier);
    navigate(`/dashboard?edit=true`);
  };
  return (
    <>
      {editting && !objectIsEmpty(courierToEdit) ? (
        <CourierAdminEdit courier={courierToEdit} onSubmit={() => {}} />
      ) : (
        <div>
          <Typography
            sx={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: 2 }}
            component="h1"
          >
            All Couriers
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profile Image</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Actions</TableCell>
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
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ marginRight: 1 }}
                        onClick={() => handleEdit(courier)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          dispatch(deleteUserRequest(courier._uuid))
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
export default CouriersList;
