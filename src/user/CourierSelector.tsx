import { SelectedCourier, WorkingDay } from "../Types";

export const selectCourier = (
  selectedCouriers: SelectedCourier[],
  courierId: string,
  workingDays: WorkingDay[]
): SelectedCourier[] => {
  const hasConflict = selectedCouriers.some((selected) =>
    selected.workingDays.some((day) =>
      workingDays.some(
        (newDay) =>
          day.day === newDay.day &&
          ((day.startHours >= newDay.startHours && day.startHours < newDay.endHours) ||
            (newDay.startHours >= day.startHours && newDay.startHours < day.endHours))
      )
    )
  );

  if (hasConflict) {
    alert("Selected courier's working hours conflict with an already selected courier.");
    return selectedCouriers; // No changes if conflict
  }

  return [...selectedCouriers, { courierId, workingDays }];
};
