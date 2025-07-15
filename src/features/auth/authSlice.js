// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";


const getInitialAuthState = () => {
  const saved = localStorage.getItem("authState");
  return saved
    ? JSON.parse(saved)
    : {
      user: null,
      isAuthenticated: false,
      phone: "",
      country: "",
    };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(
        "authState",
        JSON.stringify({ ...state })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.phone = "";
      state.country = "";
      localStorage.clear();   
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setPhone, setUser } = authSlice.actions;
export default authSlice.reducer;
