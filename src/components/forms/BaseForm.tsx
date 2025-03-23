import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  SelectChangeEvent,
} from "@mui/material";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "file" | "select";
  options?: string[];
  required?: boolean;
}

interface BaseFormProps {
  fields: Field[];
  onSuccess?: () => void;
}

const BaseForm: React.FC<BaseFormProps> = ({ fields, onSuccess }) => {
  const [formData, setFormData] = useState<Record<string, string | number | File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setFormData((prev) => ({
        ...prev,
        profileImage: response.data.secure_url,
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: Record<string, string> = {};

    fields.forEach(({ name, required }) => {
      if (required && !formData[name]) {
        newErrors[name] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/users`, formData, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setFormData({});
      setErrors({});
      onSuccess?.();
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", p: 2 }}
    >
      {fields.map(({ name, label, type, options }) => (
        <Box key={name} mb={2}>
          {type === "select" ? (
            <FormControl fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                name={name}
                value={formData[name] ? String(formData[name]) : ""}
                onChange={handleChange}
              >
                {options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : type === "file" ? (
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          ) : (
            <TextField
              fullWidth
              label={label}
              name={name}
              type={type}
              value={formData[name] || ""}
              onChange={handleChange}
              error={!!errors[name]}
              helperText={errors[name]}
            />
          )}
        </Box>
      ))}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default BaseForm;
