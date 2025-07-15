import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box minHeight="100vh">
      <Header />
      {children}
    </Box>
  );
};

export default MainLayout;
