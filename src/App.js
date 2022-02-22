import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { theme } from "./utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
