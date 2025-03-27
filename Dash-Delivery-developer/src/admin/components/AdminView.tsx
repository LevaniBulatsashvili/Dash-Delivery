import { Box } from "@mui/material";
import AdminInfo from "./AdminInfo";

interface IAdminView {
  admin: IAdmin;
}

const AdminView = ({ admin }: IAdminView) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        width: "70dvw",
        padding: "1rem 2rem",
        border: "1px solid black",
        borderRadius: "0.2rem",
      }}
    >
      <AdminInfo admin={admin} />
    </Box>
  );
};

export default AdminView;
