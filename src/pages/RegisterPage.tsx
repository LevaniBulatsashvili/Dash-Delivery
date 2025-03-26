import React, { useState } from "react";
  import BaseForm from "../components/forms/BaseForm";
 import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";
 import RoleSelector from "./registeritems/RoleSelector";   
 import { baseFields } from "./registeritems/registerField";
 import GeoLocationInput from "../components/location/GeoLocationInput";
import { useNavigate } from "react-router-dom";
   
   

 
   const RegistrationPage: React.FC = () => {
      const [role, setRole] = useState<"admin" | "courier" | "user">("user");
      const [geoLocation, setGeoLocation] = useState<string | null>(null);
      const [loading, setLoading] = useState<boolean>(false);
      const navigate=useNavigate()

     

   
      const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as "admin" | "courier" | "user");
      };
   
   
      const handleGeoLocationChange = (geoLocation: string) => {
        setGeoLocation(geoLocation);
      };

    
      const handleRegister = (formData: Record<string, string | number | File>) => {
        setLoading(true);
        
      
      
        const finalData: Record<string, string | number | File> = { ...formData, role };
        
        if (role === "user" && geoLocation) {
          finalData.geolocation = geoLocation;
        }
      
      
        try {
         
       
          alert("Registration successful!");
        } catch (error) {
          alert("An error occurred during registration.");
        } finally {
          setLoading(false); 
        }
        navigate('/login')
      };
    
      return (
        <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
          <RoleSelector role={role} onChange={handleRoleChange} />
    
          {role === "user" && <GeoLocationInput onGeoLocationChange={handleGeoLocationChange} />}
    
          {loading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <BaseForm fields={baseFields} onSubmit={handleRegister} />
          )}
        </Box>
      );
    };
    
    export default RegistrationPage;
   
   