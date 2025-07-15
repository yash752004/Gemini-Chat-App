import { z } from "zod";

export const loginSchema = z.object({
  country: z.string().min(1, "Country required"),
  phone: z.string().min(8, "Enter valid number").max(10, "Enter valid number"),
});
