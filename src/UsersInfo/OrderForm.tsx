import React from "react";
import { Box, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const hours = [...Array(24).keys()].map(i => `${i}:00`);

const OrderForm: React.FC<{ 
  day: string, 
  orders: any, 
  addOrder: (day: string) => void,
  deleteOrder: (day: string, index: number) => void,
  handleOrderChange: (day: string, index: number, startTime: string, endTime: string) => void,
  isOverlapping: (newStartTime: string, newEndTime: string, day: string, index: number) => boolean,
  error: string | null,
  setError: (error: string | null) => void
}> = ({ day, orders, addOrder, deleteOrder, handleOrderChange, isOverlapping, error, setError }) => {
  return (
    <Box>
      {orders[day].map((order: any, index: number) => (
        <Box key={index} sx={{ display: "flex", gap: "1rem", marginBottom: "0.5rem" }}>
          <FormControl fullWidth error={!!error}>
            <InputLabel>Start Time</InputLabel>
            <Select
              value={order.startHours}
              onChange={(e) => {
                if (isOverlapping(e.target.value, order.endHours, day, index)) {
                  setError("Selected hours overlap with existing hours.");
                } else {
                  setError(null);
                  handleOrderChange(day, index, e.target.value, order.endHours);
                }
              }}
              label="Start Time"
            >
              {hours.map((hour) => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={!!error}>
            <InputLabel>End Time</InputLabel>
            <Select
              value={order.endHours}
              onChange={(e) => {
                if (isOverlapping(order.startHours, e.target.value, day, index)) {
                  setError("Selected hours overlap with existing hours.");
                } else {
                  setError(null);
                  handleOrderChange(day, index, order.startHours, e.target.value);
                }
              }}
              label="End Time"
            >
              {hours.map((hour) => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>

          <Button variant="outlined" color="error" onClick={() => deleteOrder(day, index)}>Delete</Button>
        </Box>
      ))}
      <Button variant="outlined" onClick={() => addOrder(day)}>Add Order</Button>
    </Box>
  );
};

export default OrderForm;
