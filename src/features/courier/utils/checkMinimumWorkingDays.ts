import { IWorkingDays } from "../../../interface/courier.interface";

export const checkMinimumWorkingDays = (workingDays: IWorkingDays) => {
  const daysWithWorkingHours = Object.values(workingDays).filter(
    (day) => day.length > 0
  ).length;

  return daysWithWorkingHours >= 5;
};
