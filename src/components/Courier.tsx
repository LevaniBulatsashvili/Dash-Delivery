import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { generateTimeSlots } from "../features/courier/utils/generateTimeSlots";
import { IWeekDays, IWorkingDay } from "../interface/courier.interface";
import { weekDaysOrder } from "../features/courier/utils/weekDayOrder";

const hours = generateTimeSlots(0, 24);
interface IWeekdayScheduleProps {
  workingDays: { [key: string]: IWorkingDay[] };
}
const Courier: React.FC<IWeekdayScheduleProps> = ({
  workingDays,
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  // Toggle expanded day
  const toggleDay = (day: string) => setExpandedDay(expandedDay === day ? null : day);
  const sortedDays = Object.keys(workingDays).sort(
    (a, b) =>
      weekDaysOrder.indexOf(a as IWeekDays) - weekDaysOrder.indexOf(b as IWeekDays)
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {sortedDays.map((day) => (
        <Box key={day} sx={{ marginBottom: "1rem" }}>
          <Button variant="outlined" onClick={() => toggleDay(day)} fullWidth>
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </Button>
          {expandedDay === day && (
            <Box sx={{ padding: "1rem", backgroundColor: "#F5F5F5" }}>
              {workingDays[day as IWeekDays].map((workingDay, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}
                >
                  <FormControl fullWidth disabled>
                    <InputLabel>Start Time</InputLabel>
                    <Select value={workingDay.startHours} label="Start Time" disabled>
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth disabled>
                    <InputLabel>End Time</InputLabel>
                    <Select value={workingDay.endHours} label="End Time" disabled>
                      {hours.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default Courier;