import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ open = false }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress
        sx={{
          zIndex: 100,
          width: "100%",
        }}
        size={60}
        color="secondary"
      />
    </Backdrop>
  );
};

export default Loading;
