import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Routes from "./routes";
import { SnackBarProvider } from "./contexts/SnackbarContext";
import { theme } from "./utils/theme";
import { AgentsProvider } from "./contexts/AgentsContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackBarProvider>
          <AgentsProvider>
            <Router>
              <Routes />
            </Router>
          </AgentsProvider>
        </SnackBarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
