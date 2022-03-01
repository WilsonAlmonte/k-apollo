import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackbarContext = React.createContext();

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackBarProvider = ({ children }) => {
  const [alertText, setAlertText] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const openSnackbar = (severity, providedText) => {
    setSeverity(severity);
    setAlertText(providedText);
    setOpen(true);
  };

  const errorSnackbar = (errorText) => {
    openSnackbar("error", errorText);
  };

  const successSnackbar = (successText) => {
    openSnackbar("success", successText);
  };

  const warningSnackbar = (warningText) => {
    openSnackbar("warning", warningText);
  };

  const value = {
    errorSnackbar,
    successSnackbar,
    warningSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alertText}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.node,
};
