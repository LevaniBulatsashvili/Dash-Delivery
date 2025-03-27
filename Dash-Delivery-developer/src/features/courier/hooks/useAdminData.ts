import { useState, useEffect } from "react";
import { IAdmin } from "../../../interface/admin.interface";

export const useAdminData = () => {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with real API call
    setTimeout(() => {
      setAdmin({
        email: "admin@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123456789",
        profileImage: "path/to/image.jpg",
      });
      setLoading(false);
    }, 1000);
  }, []);

  const onAdminEdit = (updatedAdmin: IAdmin) => {
    setAdmin(updatedAdmin);
    // Here, you would also send the data to the server
  };

  return { admin, loading, error, onAdminEdit };
};
