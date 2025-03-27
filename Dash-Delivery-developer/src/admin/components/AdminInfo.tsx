import { Box, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IInfoDisplay {
  label: string;
  value: string | number;
}

const InfoDisplay = ({ label, value }: IInfoDisplay) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {label}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

interface IAdminInfo {
  admin: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string;
  };
}

const AdminInfo = ({ admin }: IAdminInfo) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ margin: "0 auto 1rem auto" }}
          variant="h5"
          gutterBottom
        >
          Admin Details
        </Typography>
        <Button onClick={() => navigate("/admin-dashboard?edit=true")}>
          Edit
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar
          alt={`${admin.firstName} ${admin.lastName}`}
          src={admin.profileImage}
          sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <InfoDisplay label="Email" value={admin.email} />
        <InfoDisplay
          label="Full Name"
          value={`${admin.firstName} ${admin.lastName}`}
        />
        <InfoDisplay label="Phone Number" value={admin.phoneNumber} />
      </Box>
    </Box>
  );
};

export default AdminInfo;
