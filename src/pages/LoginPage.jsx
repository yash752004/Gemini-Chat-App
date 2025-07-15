import {
  // MenuItem,
  // Select,
  TextField,
  Button,
  Avatar,
  Autocomplete
} from "@mui/material";
import AuthCard from "../components/AuthCard";
import PersonIcon from "@mui/icons-material/Person";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/loginSchema";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { country: "", phone: "" },
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,idd")
      .then((res) => {
        const parsed = res.data
          .map((c) => ({
            name: c.name.common,
            code: c.idd?.root + (c.idd?.suffixes?.[0] || ""),
          }))
          .filter((c) => c.code);
        setCountries(parsed.sort((a, b) => a.name.localeCompare(b.name)));
      });
  }, []);

  const onSubmit = async (data) => {
    const id = toast.loading("Sending OTP...");

    setTimeout(() => {
      toast.update(id, {
        render: "OTP sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      dispatch(setUser({ name: "User", phone: data.phone, country: data.country }));
      navigate("/verify");
    }, 1500); // simulate delay
  };
  return (
    <AuthCard
      icon={<Avatar sx={{ bgcolor: "#0ea5e9", mx: "auto" }}><PersonIcon /></Avatar>}
      title="Create Account"
      subtitle="Sign up to start chatting with Gemini AI"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => `${option.name} (${option.code})`}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              onChange={(_, value) => field.onChange(value?.code || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select country"
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  sx={{
                    mb: 2,
                    bgcolor: "#0f172a",
                    input: { color: "#fff" },
                    "& .MuiSvgIcon-root": { color: "#fff" },
                  }}
                />
              )}
              // sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Enter phone number"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleSubmit(onSubmit)();
              //   }
              // }}
              sx={{
                mb: 3,
                bgcolor: "#0f172a",
                input: { color: "#fff" },
              }}
            />
          )}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#fff", color: "#000" }}>
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
};

export default LoginPage;
