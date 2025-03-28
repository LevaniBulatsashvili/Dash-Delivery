import { useState } from "react";
import { Box, CssBaseline, Container, Button } from "@mui/material";
import UsersPage from "./UsersList";
import CouriersPage from "./CourierList";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.slice";
import { IUser } from "../../interface/user.interface";
import { ICourier } from "../../interface/courier.interface";

const AdminPanel = () => {
  const { userList } = useSelector(userSelector);
  const [selectedPage, setSelectedPage] = useState("users");
  const users = userList.filter(
    (allUsers) => allUsers.role === "user"
  ) as IUser[];
  const couriers = userList.filter(
    (allUsers) => allUsers.role === "courier"
  ) as ICourier[];

  return (
    <Box
      sx={{
        maxWidth: "80rem",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        gap: "1rem",
      }}
    >
      <CssBaseline />
      <Box sx={{ margin: "0 auto" }}>
        <Button onClick={() => setSelectedPage("users")}>Users</Button>
        <Button onClick={() => setSelectedPage("couriers")}>Couriers</Button>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
        }}
      >
        <Container>
          {selectedPage === "users" && (
            <UsersPage users={users} couriers={couriers} />
          )}
          {selectedPage === "couriers" && <CouriersPage couriers={couriers} />}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
