import { CircularProgress, Box } from "@mui/material";

function Spinner() {
  return (
    <Box
      sx={{
        marginTop: "6dvh",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <CircularProgress size={48} thickness={8} color="primary" />
    </Box>
  );
}

export default Spinner;
