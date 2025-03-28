import { Box, Typography } from "@mui/material";
import CourierInfo from "./CourierInfo";
import WorkingDays from "./WorkingDays";
import { ICourier } from "../../../interface/courier.interface";

interface ICourierView {
  courier: ICourier;
  couriers: ICourier[];
}

const CourierView = ({ courier, couriers }: ICourierView) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        width: "70dvw",
        padding: "1rem 2rem",
        border: "1px solid black",
        borderRadius: "0.2rem",
      }}
    >
      <CourierInfo courier={courier} />
      <Box>
        <Typography component="h1">My Schedule</Typography>
        <WorkingDays workingDays={courier.workingDays} />
      </Box>
      {couriers
        .filter(({ _uuid }) => courier._uuid !== _uuid)
        .map(({ _uuid, firstName, lastName, pid, workingDays }) => (
          <Box key={_uuid}>
            <Typography component="h1">
              {firstName} {lastName} ({pid})
            </Typography>
            <WorkingDays workingDays={workingDays} />
          </Box>
        ))}
    </Box>
  );
};

export default CourierView;
