import { useState, useRef, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IUser } from "../../interface/user.interface";
import { ICourier } from "../../interface/courier.interface";
import { useAppDispatch } from "../../hooks/redux";
import { deleteUserRequest } from "../../store/user/user.thunk";

interface IUserList {
  users: IUser[];
  couriers: ICourier[];
}

const UsersList = ({ users, couriers }: IUserList) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const openModalButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    if (openModalButtonRef.current) {
      openModalButtonRef.current.focus();
    }
  };

  const handleOpenModal = (user: IUser) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  useEffect(() => {
    if (openModal && openModalButtonRef.current) {
      openModalButtonRef.current.blur();
    }
  }, [openModal]);

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
                    ref={openModalButtonRef}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleOpenModal(user)}
                  >
                    View More
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-hidden={!openModal}
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography variant="h6">Requested Couriers:</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Courier Name</TableCell>
                    <TableCell>Vehicle</TableCell>
                    <TableCell>Working Days</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {couriers
                    .filter((courier) => {
                      const hasRequested = courier.totalRequests.includes(
                        selectedUser.email
                      );
                      return (
                        hasRequested &&
                        Object.keys(courier.workingDays).some(
                          (day) =>
                            courier.workingDays[day].some((wd) => wd.booked)
                        )
                      );
                    })
                    .map((courier) => (
                      <TableRow key={courier._uuid}>
                        <TableCell>
                          {courier.firstName} {courier.lastName}
                        </TableCell>
                        <TableCell>{courier.vehicle}</TableCell>
                        <TableCell>
                          {Object.keys(courier.workingDays)
                            .filter((day) =>
                              courier.workingDays[day].some(
                                (wd) => wd.booked 
                              )
                            )
                            .map((day) => {
                              const dayName =
                                day.charAt(0).toUpperCase() + day.slice(1);
                              return (
                                <Box key={day}>
                                  <strong>{dayName}:</strong>{" "}
                                  {courier.workingDays[day]
                                    .filter((wd) => wd.booked)
                                    .map((wd, index) => (
                                      <div key={index}>
                                        {wd.startHours} - {wd.endHours}
                                      </div>
                                    ))}
                                </Box>
                              );
                            })}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersList;
