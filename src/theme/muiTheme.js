import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#f9f9f9" : "#020817",
        paper: mode === "light" ? "#fff" : "#1e293b",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
