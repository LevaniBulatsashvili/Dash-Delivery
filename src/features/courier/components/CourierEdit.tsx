import { useState } from "react";
import { ICourier, IWeekDays } from "../../../interface/courier.interface";
import { Box, Typography, Grid2 } from "@mui/material";
import CourierForm from "./CourierForm";
import WeekdaySchedule from "./WeekdaySchedule";

interface ICourierEdit {
  courier: ICourier;
  onSubmit: (updatedCourier: ICourier) => void;
}

const CourierEdit = ({ courier, onSubmit }: ICourierEdit) => {
  const [courierData, setCourierData] = useState<ICourier>({ ...courier });

  const handleFormSubmit = (
    updatedData: Record<string, string | number | File>
  ) => {
    const updatedCourier = {
      ...courierData,
      ...updatedData,
      workingDays: courierData.workingDays,
    };
    onSubmit(updatedCourier);
  };

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

  const deleteWorkingDay = (day: IWeekDays, index: number) => {
    const updatedWorkingDays = {
      ...courierData.workingDays,
      [day]: courierData.workingDays[day].filter((_, idx) => idx !== index),
    };
    setCourierData({ ...courierData, workingDays: updatedWorkingDays });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <Grid2 container spacing={3} alignItems="flex-start">
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography variant="h6" gutterBottom>
            Edit Courier Information
          </Typography>
          <CourierForm
            formData={
              courierData as unknown as Record<string, string | number | File>
            }
            handleFormSubmit={handleFormSubmit}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ marginTop: 0 }}>
              Edit Working Days
            </Typography>
            <WeekdaySchedule
              workingDays={courierData.workingDays}
              handleTimeChange={handleTimeChange}
              addWorkingDay={addWorkingDay}
              deleteWorkingDay={deleteWorkingDay}
            />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CourierEdit;
