import { Courier } from "../Types";

// Dummy data for couriers
export const fetchCourierData = (): Courier[] => {
  return [
    {
      id: "1",
      firstName: "მალხაზ",
      lastName: "მამიშვილა",
      workingDays: [
        { day: "Monday", startHours: "09:00", endHours: "18:00" },
        { day: "Tuesday", startHours: "09:00", endHours: "18:00" },
      ],
    },
    {
      id: "2",
      firstName: "მარიამი",
      lastName: "მიქაძე",
      workingDays: [
        { day: "Wednesday", startHours: "10:00", endHours: "17:00" },
        { day: "Thursday", startHours: "10:00", endHours: "17:00" },
      ],
    },
  ];
};
