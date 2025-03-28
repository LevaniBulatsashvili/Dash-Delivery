import { useState } from "react";

interface Order {
  startHours: string;
  endHours: string;
}

const useOrders = () => {
  const [orders, setOrders] = useState<{ [key: string]: Order[] }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const [error, setError] = useState<string | null>(null);

  const addOrder = (day: string) => {
    setOrders((prev) => ({
      ...prev,
      [day]: [...prev[day], { startHours: "8:00", endHours: "10:00" }],
    }));
  };

  const deleteOrder = (day: string, index: number) => {
    setOrders((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  const handleOrderChange = (day: string, index: number, startTime: string, endTime: string) => {
    setOrders((prev) => {
      const updatedOrders = [...prev[day]];
      updatedOrders[index] = { startHours: startTime, endHours: endTime };
      return { ...prev, [day]: updatedOrders };
    });
  };

  const isOverlapping = (newStart: string, newEnd: string, day: string, index: number) => {
    return orders[day].some((order, i) => 
      i !== index && 
      ((newStart >= order.startHours && newStart < order.endHours) ||
       (newEnd > order.startHours && newEnd <= order.endHours))
    );
  };

  return { orders, addOrder, deleteOrder, handleOrderChange, isOverlapping, error, setError };
};

export default useOrders;
