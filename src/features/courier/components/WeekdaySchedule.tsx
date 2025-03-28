import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { IWorkingDay, IWeekDays } from "../../../interface/courier.interface";
import { generateTimeSlots } from "../utils/generateTimeSlots";
import { weekDaysOrder } from "../utils/weekDayOrder";

const hours = generateTimeSlots(0, 24);

interface IWeekdayScheduleProps {
  workingDays: { [key: string]: IWorkingDay[] };
  handleTimeChange: (
    day: IWeekDays,
    index: number,
    startTime: string,
    endTime: string
  ) => void;
  addWorkingDay: (day: IWeekDays) => void;
  deleteWorkingDay: (day: IWeekDays, index: number) => void;
}

const WeekdaySchedule: React.FC<IWeekdayScheduleProps> = ({
  workingDays,
  handleTimeChange,
  addWorkingDay,
  deleteWorkingDay,
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleDay = (day: string) =>
    setExpandedDay(expandedDay === day ? null : day);

  const isOverlapping = (
    newStartTime: string,
    newEndTime: string,
    day: IWeekDays,
    index: number
  ): boolean => {
    const otherWorkingDays = workingDays[day].filter((_, idx) => idx !== index);
    for (const workingDay of otherWorkingDays) {
      const existingStartTime = workingDay.startHours;
      const existingEndTime = workingDay.endHours;
      if (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleStartChange = (
    day: IWeekDays,
    index: number,
    newStartTime: string,
    newEndTime: string
  ) => {
    if (isOverlapping(newStartTime, newEndTime, day, index))
      setError("Selected hours overlap with existing hours.");
    else {
      setError(null);
      handleTimeChange(day, index, newStartTime, newEndTime);
    }
  };

  const handleEndChange = (
    day: IWeekDays,
    index: number,
    newStartTime: string,
    newEndTime: string
  ) => {
    if (isOverlapping(newStartTime, newEndTime, day, index))
      setError("Selected hours overlap with existing hours.");
    else {
      setError(null);
      handleTimeChange(day, index, newStartTime, newEndTime);
    }
  };

  const sortedDays = Object.keys(workingDays).sort(
    (a, b) =>
      weekDaysOrder.indexOf(a as IWeekDays) -
      weekDaysOrder.indexOf(b as IWeekDays)
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {sortedDays.map((day) => (
        <Box key={day} sx={{ marginBottom: "1rem" }}>
          <Button variant="outlined" onClick={() => toggleDay(day)} fullWidth>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Button>
          {expandedDay === day && (
            <Box sx={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
              {workingDays[day as IWeekDays].map((workingDay, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
                >
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Start Time</InputLabel>
                    <Select
                      value={workingDay.startHours}
                      onChange={(e) =>
                        handleStartChange(
                          day as IWeekDays,
                          index,
                          e.target.value,
                          workingDay.endHours
                        )
                      }
                      disabled={workingDay.booked}
                      label="Start Time"
                    >
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>End Time</InputLabel>
                    <Select
                      value={workingDay.endHours}
                      onChange={(e) =>
                        handleEndChange(
                          day as IWeekDays,
                          index,
                          workingDay.startHours,
                          e.target.value
                        )
                      }
                      disabled={workingDay.booked}
                      label="End Time"
                    >
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                  </FormControl>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteWorkingDay(day as IWeekDays, index)}
                  >
                    Delete
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                onClick={() => addWorkingDay(day as IWeekDays)}
              >
                Add Working Hour
              </Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default WeekdaySchedule;
