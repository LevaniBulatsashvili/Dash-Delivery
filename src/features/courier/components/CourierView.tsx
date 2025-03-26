import { Box } from "@mui/material";
import CourierInfo from "./CourierInfo";
import WorkingDays from "./WorkingDays";
import { ICourier } from "../../../interface/courier.interface";

interface ICourierView {
  courier: ICourier;
}

const CourierView = ({ courier }: ICourierView) => {
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
      <WorkingDays workingDays={courier.workingDays} />
    </Box>
  );
};

export default CourierView;
