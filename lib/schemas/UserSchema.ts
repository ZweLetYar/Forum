// import { z } from "zod";

// const UserSchema = z.object({
//   id: z.number(),
//   username: z.string().min(6),
//   email: z.email(),
//   image: z.url(),
// });

// export default UserSchema;

import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Invalid image URL"),
});

export default UserSchema;
