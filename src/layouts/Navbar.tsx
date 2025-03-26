import { Box, AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
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
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          component={RouterLink}
          to="/dash-delivery"
          sx={{ marginRight: 2 }}
        >
          <Typography sx={{ color: "white" }} variant="h6">
            DashDelivery
          </Typography>
        </Link>

        <Box>
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
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
