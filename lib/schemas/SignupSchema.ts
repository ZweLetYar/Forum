import z from "zod";

const SignupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name should be at least 2 characters" })
    .max(50, { message: "Name should be less than 50 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),

  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" })
    .max(30, { message: "Username should be less than 30 characters" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    })
    .toLowerCase(),

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

export default SignupSchema;
