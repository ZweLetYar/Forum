import Account from "@/database/account.model";
import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleSuccessResponse } from "@/lib/response";
import SigninWithOauthSchema from "@/lib/schemas/SigninWithOauthSchema";
import validateBody from "@/lib/vaildateBody";
import mongoose from "mongoose";
import slugify from "slugify";

export async function POST(req: Request) {
  const { provider, providerAccountId, user } = await req.json();
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = await validateBody(SigninWithOauthSchema, {
      provider,
      providerAccountId,
      user,
    });
    console.log(validatedData);
    //@ts-expect-error
    const { name, username, email, image } = validatedData.data.user;
    let existingUser = await User.findOne({ email }).session(session);
    if (!existingUser) {
      [existingUser] = await User.create(
        [
          {
            name,
            username: slugify(username, {
              lower: true,
              strict: true,
              trim: true,
            }),
            email,
            image,
          },
        ],
        { session }
      );
    } else {
      await User.updateOne(
        {
          _id: existingUser._id,
        },
        {
          $set: {
            image,
            name,
          },
        }
      ).session(session);
    }

    const existingAccount = Account.findOne({
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            provider,
            providerAccountId,
            name,
            image,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return handleSuccessResponse({
      existingUser,
    });
  } catch (e) {
    session.abortTransaction();
  } finally {
    session.endSession();
  }
}
