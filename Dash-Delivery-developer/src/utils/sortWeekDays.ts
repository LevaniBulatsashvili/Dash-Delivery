import { IWorkingDay, IWorkingDays } from "../interface/courier.interface";

const weekDaysOrder: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const sortWeekDays = (weekDays: IWorkingDays) =>
  weekDaysOrder.reduce((acc, day) => {
    if (weekDays[day]) {
      acc[day] = weekDays[day];
    }
    return acc;
  }, {} as { [key: string]: IWorkingDay[] });
