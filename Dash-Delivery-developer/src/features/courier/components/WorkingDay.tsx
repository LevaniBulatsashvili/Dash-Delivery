import { TableCell } from "@mui/material";

interface IWorkingDay {
  startHours: string;
  endHours: string;
  booked: boolean;
}

const WorkingDay = ({ startHours, endHours, booked }: IWorkingDay) => {
  return (
    <>
      <TableCell align="center">
        {startHours} - {endHours}
      </TableCell>
      <TableCell align="center">{booked ? "Booked" : "Available"}</TableCell>
    </>
  );
};

export default WorkingDay;
