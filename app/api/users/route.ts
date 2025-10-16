import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

//define function
const handleSuccessResponse = (data: unknown, status: number = 200) => {
  const total = Array.isArray(data) ? data.length : 1;
  return NextResponse.json(
    {
      meta: {
        total,
      },
      data,
      sucess: true,
    },
    { status }
  );
};
//define function
const handleErrorResponse = (e: unknown, status: number = 500) => {
  return NextResponse.json(
    {
      message: e instanceof Error ? e.message : "Something went wrong!",
      success: false,
    },
    { status }
  );
};

//get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return handleSuccessResponse(users, 200); //function call
  } catch (e: unknown) {
    return handleErrorResponse(e, 500); //function call
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
    return handleSuccessResponse(newUser, 201); //function call
  } catch (e: unknown) {
    return handleErrorResponse(e, 500); //function call
  }
}
