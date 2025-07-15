import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ChatroomPage from "./pages/ChatroomPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyPage from "./pages/VerifyPage";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage />} />

        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/dashboard" element={isAuth ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/chat/:id" element={isAuth ? <ChatroomPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
