import { createTheme } from "@mui/material";

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#32b08b',
    },
    secondary: {
      main: '#79ce66',
    },
    info: {
      main: '#FFC872',
    },
  },
};

export const theme = createTheme(themeOptions);