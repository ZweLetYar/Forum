"use server";

import mongoose from "mongoose";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../vaildateBody";
import SignupSchema from "../schemas/SignupSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function SignUpWithCredentials(params: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validateBody(SignupSchema, params);
    //@ts-expect-error
    const { name, username, email, password } = validatedData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists!");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exists!");
    }

    const [newUser] = await User.create(
      [
        {
          name,
          username,
          email,
        },
      ],
      { session }
    );

    await Account.create([
      {
        userId: newUser._id,
        name,
        password: await bcrypt.hash(password, 10),
        provider: "credentials",
        providerAccountId: email,
      },
    ]);

    await session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
