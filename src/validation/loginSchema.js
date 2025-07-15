import { z } from "zod";

export const loginSchema = z.object({
  country: z.string().min(1, "Country required"),
  phone: z.string().min(8, "Enter min 8 digits").max(10, "Enter 10 digits"),
});
