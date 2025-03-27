import { Box, Typography } from "@mui/material";

interface IError {
  text: string;
}

function Error({ text }: IError) {
  return (
    <Box
      sx={{
        marginTop: "10dvh",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        color: "#ed0000cc",
      }}
    >
      <Typography variant="h1">{text}</Typography>
    </Box>
  );
}

export default Error;
