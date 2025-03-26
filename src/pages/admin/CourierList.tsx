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
import { ICourier } from "../../interface/courier.interface";


const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const CouriersList = () => {
  const [couriers, setCouriers] = useState<ICourier[]>([]);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}`, {
        headers: { Authorization: `Bearer ${VITE_API_KEY}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.items)) {
          const filteredCouriers = response.data.items.filter(
            (user: ICourier) => user.role === "courier"
          );
          setCouriers(filteredCouriers);
        } else {
          console.error(
            "The response does not contain an array of items:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching couriers:", error);
      });
  }, []);

  const handleDeleteCourier = (pid: string) => {
    axios
      .delete(`${VITE_API_URL}/users/${pid}`, {
        headers: { Authorization: `Bearer ${VITE_API_KEY}` },
      })
      .then(() => {
        setCouriers((prevCouriers) =>
          prevCouriers.filter((courier) => courier._uuid !== pid)
        );
      })
      .catch((error) => {
        console.error("Error deleting courier:", error);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Add Courier
      </Button>
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
                    onClick={() => handleDeleteCourier(courier._uuid)}
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
