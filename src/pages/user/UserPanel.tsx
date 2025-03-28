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
import { userSelector } from "../../store/user/user.slice";
import { ICourier } from "../../interface/courier.interface";
import Courier from "../../components/Courier";

const UserPanel = () => {
  const { userList } = useSelector(userSelector);

  // Filters only couriers
  const couriers = userList.filter((allUsers) => allUsers.role === "courier") as ICourier[];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: 2 }}>
        ყველა კურიერი
      </Typography>

      {/* კურიერების ტაბლი */}
      <Typography sx={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: 1 }}>
        კურიერები
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>პროფილის სურათი</TableCell>
              <TableCell>პირველი სახელი</TableCell>
              <TableCell>გვარი</TableCell>
              <TableCell>ელ. ფოსტა</TableCell>
              <TableCell>ტრანსპორტი</TableCell>
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

      {/* Working Days Section */}
      {couriers.map((courier) => (
        <Box key={courier._uuid} sx={{ display: "flex", gap: 3, marginBottom: 3 }}>
          <Avatar
            alt={`${courier.firstName} ${courier.lastName}`}
            src={courier.profileImage}
            sx={{ width: 60, height: 60 }}
          />
          <Box>
            <Typography variant="h6">{courier.firstName} {courier.lastName}</Typography>
            <Courier workingDays={courier.workingDays} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default UserPanel;
