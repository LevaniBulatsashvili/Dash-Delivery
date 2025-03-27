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
} from "@mui/material";
import { ICourier } from "../../interface/courier.interface";
import { useAppDispatch } from "../../hooks/redux";
import { deleteUserRequest } from "../../store/user/user.thunk";

interface ICouriersList {
  couriers: ICourier[];
}

const CouriersList = ({ couriers }: ICouriersList) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography
        sx={{ fontSize: "1.6rem", ontWeight: 600, marginBottom: 2 }}
        component="h1"
      >
        All Couriers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
                <TableCell>{courier.firstName}</TableCell>
                <TableCell>{courier.lastName}</TableCell>
                <TableCell>{courier.email}</TableCell>
                <TableCell>{courier.vehicle}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => dispatch(deleteUserRequest(courier._uuid))}
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
  );
};

export default CouriersList;
