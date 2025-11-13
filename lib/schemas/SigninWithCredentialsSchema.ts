import z from "zod";

const SigninWithCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "You should provide a valid email" })
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be less than 100 characters long")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character"
    ),
});

export default SigninWithCredentialsSchema;
