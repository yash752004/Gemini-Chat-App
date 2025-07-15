import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.ui.themeMode);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Gemini Chat App
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {themeMode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          {user && (
            <>
              <Tooltip title={user.name}>
                <Avatar>{user.name?.[0]?.toUpperCase() || "U"}</Avatar>
              </Tooltip>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
