import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { IUser } from "../../interface/user.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}`, {
        headers: { Authorization: `Bearer ${VITE_API_KEY}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.items)) {
          const filteredUsers = response.data.items.filter(
            (user: IUser) => user.role === "user"
          );
          setUsers(filteredUsers);
        } else {
          console.error(
            "The response does not contain an array of items:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDeleteUser = (pid: string) => {
    axios
      .delete(`${VITE_API_URL}/users/${pid}`, {
        headers: { Authorization: `Bearer ${VITE_API_KEY}` },
      })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._uuid !== pid));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
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
                    onClick={() => handleDeleteUser(user._uuid)}
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

export default UsersList;
