// src/components/AuthCard.jsx
import { Box, Paper, Typography } from "@mui/material";

const AuthCard = ({ icon, title, subtitle, children }) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#0f172a" // Tailwind-style dark navy
    >
      <Paper
        elevation={3}
        sx={{
          width: 360,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#1e293b", // Slightly lighter than body
          color: "#fff",
        }}
      >
        <Box textAlign="center" mb={2}>
          {icon}
        </Box>
        <Typography variant="h6" align="center" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="gray"
          mt={0.5}
          mb={3}
        >
          {subtitle}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthCard;
