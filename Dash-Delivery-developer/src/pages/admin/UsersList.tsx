import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { IUser } from "../../interface/user.interface";
import { useAppDispatch } from "../../hooks/redux";
import { deleteUserRequest } from "../../store/user/user.thunk";
// import { editAdminRequest } from "../../store/admin/admin.thunk";
// import { create } from "@mui/material/styles/createTransitions";

interface IUserList {
  users: IUser[];
}

const UsersList = ({ users }: IUserList) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography
        sx={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: 2 }}
        component="h1"
      >
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile Image</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._uuid}>
                <TableCell>
                  <Avatar
                    alt={`${user.firstName} ${user.lastName}`}
                    src={user.profileImage}
                    sx={{ width: 40, height: 40 }}
                  />
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
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
                    onClick={() => dispatch(deleteUserRequest(user._uuid))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersList;
