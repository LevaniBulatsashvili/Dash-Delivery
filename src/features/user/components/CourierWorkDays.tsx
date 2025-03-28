import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { generateTimeSlots } from "../../courier/utils/generateTimeSlots";
import { IWeekDays, IWorkingDay } from "../../../interface/courier.interface";
import { weekDaysOrder } from "../../courier/utils/weekDayOrder";

const hours = generateTimeSlots(0, 24);
interface ICourierWorkDays {
  workingDays: { [key: string]: IWorkingDay[] };
  onBook: (updatedWorkingDays: { [key: string]: IWorkingDay[] }) => void;
}
const CourierWorkDays: React.FC<ICourierWorkDays> = ({
  workingDays,
  onBook,
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const toggleDay = (day: string) =>
    setExpandedDay(expandedDay === day ? null : day);
  const sortedDays = Object.keys(workingDays).sort(
    (a, b) =>
      weekDaysOrder.indexOf(a as IWeekDays) -
      weekDaysOrder.indexOf(b as IWeekDays)
  );

  const bookWorkingDay = (
    day: string,
    hoursIndex: number,
    updatedHours: IWorkingDay
  ) => {
    const updatedWorkingDays = { ...workingDays };
    updatedWorkingDays[day] = [...workingDays[day]];
    updatedWorkingDays[day][hoursIndex] = { ...updatedHours, booked: true };
    return updatedWorkingDays;
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {sortedDays.map((day) => (
        <Box
          key={day}
          sx={{
            marginBottom: "1rem",
            minWidth: "19rem",
            display: "inline-block",
          }}
        >
          <Button variant="outlined" onClick={() => toggleDay(day)} fullWidth>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Button>
          {expandedDay === day && (
            <Box sx={{ padding: "1rem", backgroundColor: "#F5F5F5" }}>
              {workingDays[day as IWeekDays].map((workingDay, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                    whiteSpace: "normal",
                  }}
                >
                  <FormControl fullWidth disabled>
                    <InputLabel>Start Time</InputLabel>
                    <Select
                      value={workingDay.startHours}
                      label="Start Time"
                      disabled
                    >
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth disabled>
                    <InputLabel>End Time</InputLabel>
                    <Select
                      value={workingDay.endHours}
                      label="End Time"
                      disabled
                    >
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    onClick={() =>
                      onBook(bookWorkingDay(day, index, workingDay))
                    }
                    disabled={workingDay.booked}
                    sx={{
                      textTransform: "capitalize",
                      backgroundColor: workingDay.booked
                        ? "#fd6d6db5"
                        : "#487af7",
                      color: "white",
                      "&:hover": { backgroundColor: "#2563ff" },
                    }}
                  >
                    Book
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default CourierWorkDays;
