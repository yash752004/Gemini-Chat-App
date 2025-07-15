import AuthCard from "../components/AuthCard";
import ShieldIcon from "@mui/icons-material/Shield";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../validation/otpSchema";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { code: "" },
    resolver: zodResolver(otpSchema),
  });

  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    if (data.code === "123456") {

      toast.success("Phone verified successfully!");
      dispatch(login({ verified: true }));
      setTimeout(() => {

        navigate("/dashboard");
      }, 2000);

    } else {
      alert("Incorrect code");
    }
  };

  return (
    <AuthCard
      icon={<Avatar sx={{ bgcolor: "#0ea5e9", mx: "auto" }}><ShieldIcon /></Avatar>}
      title="Verify Your Phone"
      subtitle="Enter the 6-digit code sent to your phone number For demo purposes, use: 123456"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter 6-digit code"
              fullWidth
              error={!!errors.code}
              helperText={errors.code?.message}
              sx={{
                mb: 2,
                bgcolor: "#0f172a",
                input: { color: "#fff" },
              }}
            />
          )}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#fff", color: "#000" }}>
          Verify Code
        </Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Resend code in {timer > 0 ? timer : "00"} seconds
          </Typography>
          {timer === 0 && (
            <Button
              variant="text"
              onClick={() => {
                setTimer(30);
                toast.info("Code resent!");
              }}
            >
              Resend Code
            </Button>
          )}
        </Box>
      </form>
    </AuthCard>
  );
};

export default VerifyPage;
