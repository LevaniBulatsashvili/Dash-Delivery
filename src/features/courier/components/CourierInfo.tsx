import { Box, Button, Typography } from "@mui/material";
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

interface ICourierInfo {
  courier: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    pid: number;
    vehicle: string;
    totalRequests: string[];
  };
}

const CourierInfo = ({ courier }: ICourierInfo) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ margin: "0 auto 1rem auto" }}
          variant="h5"
          gutterBottom
        >
          Courier Details
        </Typography>
        <Button onClick={() => navigate("/dash-delivery?edit=true")}>
          Edit
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <InfoDisplay label="Email" value={courier.email} />
        <InfoDisplay
          label="Full Name"
          value={`${courier.firstName} ${courier.lastName}`}
        />
        <InfoDisplay label="Phone Number" value={courier.phoneNumber} />
        <InfoDisplay label="PID" value={courier.pid} />
        <InfoDisplay label="Vehicle" value={courier.vehicle} />
        <InfoDisplay
          label="Requests"
          value={`[${courier.totalRequests.join(" ")}]`}
        />
      </Box>
    </Box>
  );
};

export default CourierInfo;
