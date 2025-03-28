import { useState } from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WeekdaySchedule from "../../features/courier/components/WeekdaySchedule";
import { ICourier, IWeekDays } from "../../interface/courier.interface";

interface ICourierAdminEdit {
  courier: ICourier;
  onSubmit: (updatedCourier: ICourier) => void;
}

const CourierAdminEdit = ({ courier, onSubmit }: ICourierAdminEdit) => {
  const [courierData, setCourierData] = useState<ICourier>({ ...courier });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleTimeChange = (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => {
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: [...courierData.workingDays[day]],
    };
    updatedWorkingDays[day][index] = {
      startHours: startTime,
      endHours: endTime,
      booked: false,
    };

    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  const addWorkingDay = (day: IWeekDays) => {
    const lastWorkingDay =
      courierData.workingDays[day]?.length > 0
        ? courierData.workingDays[day][courierData.workingDays[day].length - 1]
            .endHours
        : "23:30";
    const newStartHours = addThirtySeconds(lastWorkingDay);
    const newEndHours = addThirtySeconds(newStartHours);

    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: [
        ...courierData.workingDays[day],
        {
          startHours: newStartHours,
          endHours: newEndHours,
          booked: false,
        },
      ],
    };

    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  const addThirtySeconds = (time: string) => {
    let [startHours, startMinutes] = time.split(":").map(Number);

    startMinutes += 30;

    if (startMinutes >= 60) {
      startMinutes -= 60;
      startHours += 1;
    }

    if (startHours >= 24) startHours = 0;

    return `${startHours.toString().padStart(2, "0")}:${startMinutes
      .toString()
      .padStart(2, "0")}`;
  };

  const deleteWorkingDay = (day: IWeekDays, index: number) => {
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: courierData.workingDays[day].filter((_, idx) => idx !== index),
    };
    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const dataToUpdate = [
      {
        email: courierData.email, 
        firstName: courierData.firstName,
        lastName: courierData.lastName,
        password: courierData.password,
        phoneNumber: courierData.phoneNumber,
        pid: courierData.pid,
        profileImage: courierData.profileImage || "",
        role: "courier", 
        vehicle: courierData.vehicle, 
        workingDays: courierData.workingDays,
        totalRequests: courierData.totalRequests || [],
      },
    ];

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!response.ok) {
        throw new Error("Failed to update courier data");
      }

      const updatedCourier = await response.json();
      onSubmit(updatedCourier); 
      navigate("/dashboard"); 
    } catch{
      setError("Error saving changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Grid2 container spacing={3} alignItems="flex-start">
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="h6" gutterBottom>
            Edit Working Days for {courier.firstName} {courier.lastName}
          </Typography>
          <WeekdaySchedule
            workingDays={courierData.workingDays}
            handleTimeChange={handleTimeChange}
            addWorkingDay={addWorkingDay}
            deleteWorkingDay={deleteWorkingDay}
          />
        </Grid2>
      </Grid2>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </Box>
      {error && (
        <Box sx={{ mt: 2, color: "red" }}>
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CourierAdminEdit;
