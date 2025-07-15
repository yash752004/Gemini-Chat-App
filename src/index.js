import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from "./theme/muiTheme";
import { useSelector } from "react-redux";

const ThemedApp = () => {
  const mode = useSelector((state) => state.ui.themeMode);
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const Root = () => (
  <Provider store={store}>
    <ThemedApp />
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
