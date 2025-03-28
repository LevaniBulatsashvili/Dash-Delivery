import { Box, Typography, Grid2 } from "@mui/material";
import UserForm from "./UserForm";
import { IAdress, IUser } from "../../../interface/user.interface";
import GeoLocationInput from "../../../components/location/GeolocationInput";
import { useState } from "react";

interface IUserEdit {
  user: IUser;
  onSubmit: (updatedUser: IUser) => void;
}

const UserEdit = ({ user, onSubmit }: IUserEdit) => {
  const [address, setAdress] = useState<IAdress>({ lng: "", lat: "" });
  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedUser = { ...user, ...updatedData };
    if (address.lng) updatedUser.address = address;
    onSubmit(updatedUser);
  };

  const handleGeoLocationChange = (location: string) => {
    const [lat, lng] = location.split(", ");
    setAdress({
      lat: lat.trim(),
      lng: lng.trim(),
    });
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Grid2
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        container
        spacing={3}
        alignItems="flex-start"
      >
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="h6" gutterBottom>
            Edit User Information
          </Typography>
          <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />

          <UserForm
            formData={user as unknown as Record<string, string | number | File>}
            handleFormSubmit={handleFormSubmit}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default UserEdit;
