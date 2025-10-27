import z from "zod";

const SigninWithOauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required" }),
  user: {
    name: z.string().min(1, "Name is required"),
    username: z.string().min(6, "Username must be at least 6 characters"),
    email: z.string().email("Invalid email address").optional(),
    image: z.string().url("Invalid image URL"),
  },
});

export default SigninWithOauthSchema;
