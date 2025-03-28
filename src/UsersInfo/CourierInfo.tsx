import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";

const CourierInfo: React.FC = () => {
  const courierInfo = {
    email: "courier2@gmail.com",
    fullName: "Tornike Khurtsidze",
    phoneNumber: "123131312",
    pid: "1",
    vehicle: "BMW",
  };

  return (
    <Card sx={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#f9f9f9" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Courier Information</Typography>
        <Divider sx={{ marginBottom: "1rem" }} />
        <Typography variant="body1"><strong>Email:</strong> {courierInfo.email}</Typography>
        <Typography variant="body1"><strong>Full Name:</strong> {courierInfo.fullName}</Typography>
        <Typography variant="body1"><strong>Phone Number:</strong> {courierInfo.phoneNumber}</Typography>
        <Typography variant="body1"><strong>PID:</strong> {courierInfo.pid}</Typography>
        <Typography variant="body1"><strong>Vehicle:</strong> {courierInfo.vehicle}</Typography>
      </CardContent>
    </Card>
  );
};

export default CourierInfo;
