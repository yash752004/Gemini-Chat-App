import { z } from "zod";

export const otpSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});
