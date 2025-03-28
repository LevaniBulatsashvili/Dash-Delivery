import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Navbar";
import { ToastContainer } from "react-toastify";

const PageContainer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        backgroundColor: "#f1f1f1",
      }}
    >
      <Header />
      <Box sx={{ padding: "2.5rem", backgroundColor: "#f1f1f1" }}>
        <Outlet />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default PageContainer;
