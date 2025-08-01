
import * as z from "zod";

export const loginTerramoAdminSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
});

export type TRLoginTerramoAdminSchema = z.infer<typeof loginTerramoAdminSchema>;
