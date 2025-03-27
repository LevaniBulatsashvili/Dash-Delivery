import React from "react";
import { TextField, Button, Box } from "@mui/material";

export interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface BaseFormProps {
  fields: Field[];
  onSubmit: (data: Record<string, string | number | File>) => void;
  defaultValues: Record<string, string | number | File>;
  sx?: React.CSSProperties;
}

const BaseForm: React.FC<BaseFormProps> = ({
  fields,
  onSubmit,
  defaultValues,
  sx,
}) => {
  const [formData, setFormData] =
    React.useState<Record<string, string | number | File>>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required={field.required}
            fullWidth
            margin="normal"
          />
        ))}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BaseForm;
