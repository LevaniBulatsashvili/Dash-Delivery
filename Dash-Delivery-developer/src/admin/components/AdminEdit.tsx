import { useState } from "react";
import { IAdmin } from "../../interface/admin.interface";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import AdminForm from "./AdminForm";

interface IAdminEdit {
  admin: IAdmin;
  onSubmit: (updatedAdmin: IAdmin) => void;
}

const AdminEdit = ({ admin, onSubmit }: IAdminEdit) => {
  const [adminData, setAdminData] = useState<IAdmin>({ ...admin });

  const handleFormSubmit = (updatedData: IAdmin) => {
    const updatedAdmin = { ...adminData, ...updatedData };
    onSubmit(updatedAdmin);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Grid2 container spacing={3} alignItems="flex-start">
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="h6" gutterBottom>
            Edit Admin Information
          </Typography>
          <AdminForm formData={adminData} handleFormSubmit={handleFormSubmit} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSubmit(adminData)}
          >
            Submit Changes
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AdminEdit;
