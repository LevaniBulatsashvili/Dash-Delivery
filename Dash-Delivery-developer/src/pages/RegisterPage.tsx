import React, { useState } from "react";
import BaseForm from "../components/forms/BaseForm";
import { Box, SelectChangeEvent } from "@mui/material";
import RoleSelector from "./registeritems/RoleSelector";
import { baseFields } from "./registeritems/registerField";
import GeoLocationInput from "../components/location/GeolocationInput";
import { useNavigate } from "react-router-dom";
import { IAdress, IRandomUser } from "../interface/user.interface";
import { useAppDispatch } from "../hooks/redux";
import { postUserRequest } from "../store/user/user.thunk";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "courier" | "user">("user");
  const [address, setAdress] = useState<IAdress>({ lng: "", lat: "" });

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as "admin" | "courier" | "user");
  };

  const handleGeoLocationChange = (location: string) => {
    const [lat, lng] = location.split(", ");
    setAdress({
      lat: lat.trim(),
      lng: lng.trim(),
    });
  };

  const handleFormSubmit = async (
    formData: Record<string, string | number | File>
  ) => {
    const completeFormData: { [key: string]: unknown } = {
      ...formData,
      role,
    };

    if (role === "user") completeFormData.address = address;
    if (role === "courier") {
      completeFormData.totalRequests = [];
      completeFormData.workingDays = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
    }

    try {
      const res = await dispatch(
        postUserRequest(completeFormData as unknown as IRandomUser)
      ).unwrap();
      localStorage.setItem("userUuid", res._uuid);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      <RoleSelector role={role} onChange={handleRoleChange} />

      {role === "user" && (
        <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />
      )}

      <BaseForm
        fields={baseFields}
        onSubmit={handleFormSubmit}
        defaultValues={{ name: "", email: "", password: "", profileImage: "" }}
        sx={{ maxWidth: 500 }}
      />
    </Box>
  );
};

export default RegisterPage;
