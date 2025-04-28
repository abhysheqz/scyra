import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email cannot be empty" })
    .max(255, { message: "Email must not exceed 255 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(16, { message: "Password must not exceed 16 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
      }
    ),
});

export const signUpSchema = z.object({
  ...signInSchema.shape,
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
