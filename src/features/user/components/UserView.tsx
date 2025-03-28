import { Avatar, Box, Button, Typography } from "@mui/material";
import { IUser } from "../../../interface/user.interface";
import { useNavigate } from "react-router-dom";

interface IUserView {
  user: IUser;
}
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

const UserView = ({ user }: IUserView) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto 2rem auto",
        padding: "1rem 2rem",
        border: "1px solid black",
        borderRadius: "0.2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
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
            User Details
          </Typography>
          <Button onClick={() => navigate("/dashboard?edit=true")}>Edit</Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.profileImage}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InfoDisplay label="Email" value={user.email} />
          <InfoDisplay
            label="Full Name"
            value={`${user.firstName} ${user.lastName}`}
          />
          <InfoDisplay label="Phone Number" value={user.phoneNumber} />
          <InfoDisplay label="PID" value={user.pid} />
          <InfoDisplay
            label="Address"
            value={`${user.address.lng} : ${user.address.lat}`}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserView;
