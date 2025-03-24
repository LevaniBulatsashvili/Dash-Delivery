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

const BaseForm: React.FC<{ fields: Field[] }> = ({ fields }) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | File>
  >({});
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setFormData((prev) => ({ ...prev, profileImage: file }));
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
      const finalData = { ...formData };

      if (formData.profileImage instanceof File) {
        const uploadData = new FormData();
        uploadData.append("file", formData.profileImage);
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_UPLOAD_URL, uploadData);
        finalData.profileImage = response.data.secure_url;
      }

      await axios.post(`${API_URL}/users`, finalData, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      setFormData({});
      setErrors({});
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting form. Please try again.");
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
                onChange={handleFileChange}
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
