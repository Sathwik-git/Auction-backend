import zod from "zod";

export const signupInput = zod.object({
  username: zod.string(),
  email: zod.string().email("Ivalid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long") // Set a minimum length
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Lowercase letter
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Uppercase letter
    .regex(/[\W_]/, "Password must contain at least one special character") // Special character
    .regex(/[0-9]/, "Password must contain at least one number"), // Optional: at least one number
});

export type SignupInput = zod.infer<typeof signupInput>

