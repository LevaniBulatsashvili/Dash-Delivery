import { useState, useEffect } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button,
  ListItemButton,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UsersPage from "./UsersList";
import CouriersPage from "./CourierList";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../store/login/login.slice";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const AdminPanel = () => {
  const [selectedPage, setSelectedPage] = useState("users");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerClick = (page: string) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(
        loginSuccess({
          user: parsedUser,
          admin: parsedUser.admin || null,
          courier: parsedUser.courier || null,
          role: parsedUser.role,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    axios
      .get(`${VITE_API_URL}`, {
        headers: { Authorization: `Bearer ${VITE_API_KEY}` },
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_uuid"); 
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: "#000000",
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            color: "white",
            backgroundColor: "#090909",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <Avatar
            sx={{ bgcolor: "white", color: "black", width: 56, height: 56 }}
          >
            <Typography variant="h6" color="black">
              A
            </Typography>
          </Avatar>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleDrawerClick("users")}
              selected={selectedPage === "users"}
            >
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleDrawerClick("couriers")}
              selected={selectedPage === "couriers"}
            >
              <ListItemText primary="Couriers" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 3,
          marginLeft: 24,
        }}
      >
        <Container>
          {selectedPage === "users" && <UsersPage />}
          {selectedPage === "couriers" && <CouriersPage />}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPanel;
