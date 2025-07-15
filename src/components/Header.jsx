import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";
import { DarkMode, LightMode, ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const themeMode = useSelector((state) => state.ui.themeMode);
  const user = useSelector((state) => state.auth.user);

  const isChatPage = location.pathname.includes("/chat");
  const chatroomName = sessionStorage.getItem("chatroomName");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleBack = () => {
    navigate("/dashboard"); // or wherever you want to go back
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 42, 74, 0.7)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          {isChatPage ? (
            <>
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                {chatroomName || "Chatroom"}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" fontWeight="bold">
              Gemini Chat App
            </Typography>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Toggle Theme">
            <IconButton onClick={() => dispatch(toggleTheme())}>
              {themeMode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          {user && (
            <>
            
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
