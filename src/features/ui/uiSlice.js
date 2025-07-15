import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  return stored ? stored : "dark";
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    themeMode: getInitialTheme(),
    isLoading: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.themeMode);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
