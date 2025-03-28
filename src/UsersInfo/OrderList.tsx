import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const OrderList: React.FC<{ orders: any }> = ({ orders }) => {
  return (
    <Box>
      {Object.keys(orders).map((day) => (
        <Paper key={day} sx={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f0f0f0" }}>
          <Typography variant="h6">{day}</Typography>
          <List>
            {orders[day].length > 0 ? (
              orders[day].map((order: any, index: number) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={`${order.startHours} - ${order.endHours}`} 
                    secondary={order.booked ? "Booked" : "Available"} 
                  />
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No orders</Typography>
            )}
          </List>
        </Paper>
      ))}
    </Box>
  );
};

export default OrderList;
