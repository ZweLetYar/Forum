import z from "zod";

const AccountSchema = z.object({
  userId: z.string().min(1, { message: "UserID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  image: z.url({ message: "Please provide a valid provider" }).optional(),
  password: z.string().optional(),
  provider: z.string().min(1, { message: "Provider is required" }),
  providerAccountId: z
    .string()
    .min(1, { message: "ProviderAccountId is required" }),
});

export default AccountSchema;
