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
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  loadingNotification,
  onResponseReturned,
} from "../../utils/notifications";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "file" | "select";
  options?: string[];
  required?: boolean;
}

const BaseForm: React.FC<{
  fields: Field[];
  onSubmit: (formData: Record<string, string | number | File>) => void;
  defaultValues: Record<string, string | number | File>;
  sx?: object;
  canSubmit?: boolean;
}> = ({ fields, onSubmit, defaultValues, sx, canSubmit }) => {
  const [formData, setFormData] = useState<
    Record<string, string | number | File>
  >(defaultValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
    if (canSubmit === true) return;
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
    const loadingToastId = loadingNotification();

    try {
      const finalData = { ...formData };

      if (formData.profileImage instanceof File) {
        const uploadData = new FormData();
        uploadData.append("file", formData.profileImage);
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        uploadData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

        console.log("Cloudinary Upload URL:", CLOUDINARY_UPLOAD_URL);
        console.log("Upload Preset:", CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(CLOUDINARY_UPLOAD_URL, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Cloudinary Response:", response.data);
        if (response.data.secure_url) {
          finalData.profileImage = response.data.secure_url;
        } else {
          throw new Error("Cloudinary did not return a valid image URL.");
        }
      }
      onSubmit(finalData);
      setFormData({});
      setErrors({});
      onResponseReturned(loadingToastId, () => {}, null);
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
      sx={{ maxWidth: 400, mx: "auto", p: 2, ...sx }}
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
          ) : type === "password" ? (
            <TextField
              fullWidth
              label={label}
              name={name}
              type={showPassword ? "text" : "password"}
              value={formData[name] || ""}
              onChange={handleChange}
              error={!!errors[name]}
              helperText={errors[name]}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
