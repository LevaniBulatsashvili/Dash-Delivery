import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  Avatar,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { logout, userSelector } from "../store/user/user.slice";
import { useDispatch } from "react-redux";
import { objectIsEmpty } from "../utils/objectIsEmpty";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(userSelector);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userUuid");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link component={RouterLink} to="/dashboard" sx={{ marginRight: 2 }}>
          <Typography sx={{ color: "white" }} variant="h6">
            DashDelivery
          </Typography>
        </Link>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {objectIsEmpty(user) ? (
            <>
              <Link component={RouterLink} to="/login" sx={{ marginRight: 2 }}>
                <Button sx={{ color: "white" }}>Login</Button>
              </Link>
              <Link component={RouterLink} to="/register">
                <Button sx={{ color: "white" }}>Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.profileImage}
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
