import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(
      {
        meta: {
          total: users.length,
        },
        data: users,
        sucess: true,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : "Something went wrong!",
        success: false,
      },
      { status: 500 }
    );
  }
}

//create new user or register user
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) throw new Error("Email already exists");

    const existingUserName = await User.findOne({ username: body.username });
    if (existingUserName) throw new Error("Username already exists");

    const newUser = await User.create(body);
    return NextResponse.json(
      {
        data: newUser,
        sucess: true,
        status: 201,
      },
      { status: 201 }
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : "Something went wrong!",
        success: false,
      },
      { status: 500 }
    );
  }
}
