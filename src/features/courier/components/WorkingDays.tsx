import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import WorkingDay from "./WorkingDay";
import { weekDaysOrder } from "../utils/weekDayOrder";

interface IWorkingDay {
  startHours: string;
  endHours: string;
  booked: boolean;
}

interface IWorkingDays {
  workingDays: { [key: string]: IWorkingDay[] };
}

const WorkingDays = ({ workingDays }: IWorkingDays) => {
  const sortedWorkingDays = weekDaysOrder.map((day) => {
    return {
      day,
      data: workingDays[day] || [],
    };
  });

  return (
    <Box
      sx={{ width: "100%", border: "1px solid grey", borderRadius: "0.2rem" }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 300,
          overflowY: "scroll",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Table sx={{ minWidth: "100%" }} aria-label="working days table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Day
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Hours
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedWorkingDays.map(({ day, data }) =>
              data.map(({ startHours, endHours, booked }) => (
                <TableRow key={uuidv4()}>
                  <TableCell align="center">{day}</TableCell>
                  <WorkingDay
                    startHours={startHours}
                    endHours={endHours}
                    booked={booked}
                  />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WorkingDays;
