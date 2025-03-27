import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface RoleSelectorProps {
  role: "admin" | "courier" | "user";
  onChange: (event: SelectChangeEvent<string>) => void;
}
const RoleSelector: React.FC<RoleSelectorProps> = ({ role, onChange }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Role</InputLabel>
      <Select value={role} onChange={onChange} label="Role">
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="courier">Courier</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RoleSelector;
