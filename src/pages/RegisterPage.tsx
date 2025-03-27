import React, { useState } from "react";
import BaseForm from "../components/forms/BaseForm";
import { Box, Button, CircularProgress, SelectChangeEvent } from "@mui/material";
import RoleSelector from "./registeritems/RoleSelector";
import { baseFields } from "./registeritems/registerField";
import GeoLocationInput from "../components/location/GeolocationInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAdress } from "../interface/user.interface";
import { postItemRequest } from "../services/thunks/post-item";


const postUserRequest = postItemRequest("users", import.meta.env.VITE_API_URL);

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "courier" | "user">("user");
  const [adress, setAdress] = useState<IAdress>({ lng: "", lat: "" });
 

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as "admin" | "courier" | "user");
  }

  const handleGeoLocationChange = (location: string) => {
    const [lat, lng] = location.split(", ");
    setAdress({
      lat: lat.trim(),
      lng: lng.trim(),
    })
  }
 

  const handleFormSubmit = (formData: Record<string, string | number | File>) => {
    const completeFormData = {
      ...formData,
      role,             // Ensure role is passed
      adress,          // Ensure address is passed
    }
 // dispatch(postUserRequest(completeFormData));
 dispatch(postUserRequest(completeFormData)as any)
 .then(() => {
   console.log("Form submitted successfully");
   navigate("/login"); // Navigate to the login page after successful submission
 })
 .catch((error:unknown) => {
   console.error("Error submitting form:", error);
 })
 
}
 

  


  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
     
      <RoleSelector role={role} onChange={handleRoleChange} />

      
      {role === "user" && <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />}

    
     
      <BaseForm
        fields={baseFields}
        onSubmit={handleFormSubmit}
        defaultValues={{ name: "", email: "", password: "", profileImage: "" }}
        sx={{ maxWidth: 500 }} 
      />
    </Box>
  )
}

export default RegisterPage



