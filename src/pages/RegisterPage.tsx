import React, { useState } from "react";
import BaseForm from "../components/forms/BaseForm";
import { Box, Button, CircularProgress, SelectChangeEvent } from "@mui/material";
import RoleSelector from "./registeritems/RoleSelector";
import { baseFields } from "./registeritems/registerField";
import GeoLocationInput from "../components/location/GeolocationInput";
import { useNavigate } from "react-router-dom";

const RegistrationPage: React.FC = () => {
  const [role, setRole] = useState<"admin" | "courier" | "user">("user");
  const [geoLocation, setGeoLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as "admin" | "courier" | "user");
  };

  const handleGeoLocationChange = (geoLocation: string) => {
    setGeoLocation(geoLocation);
  };

  const handleRegister = (formData: Record<string, string | number | File>) => {
    setLoading(true);

    const finalData: Record<string, string | number | File> = {
      ...formData,
      role,
    };

    if (role === "user" && geoLocation) {
      finalData.geolocation = geoLocation;
    }

    try {
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        `An error occurred: ${error instanceof Error ? error.message : error}`
      );
    } finally {
      setLoading(false);
    }

    navigate("/login");
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        sx={{ position: "absolute", top: 10, left: 10 }}
      >
        Back
      </Button>

      <RoleSelector role={role} onChange={handleRoleChange} />

      {role === "user" && (
        <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />
      )}

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <BaseForm
          fields={baseFields}
          onSubmit={handleRegister}
          defaultValues={{ role, geolocation: geoLocation ?? "" }}
        />
      )}
    </Box>
  );
};

export default RegistrationPage;
