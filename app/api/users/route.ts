import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleSuccessResponse, handleErrorResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateBody from "@/lib/vaildateBody";

//get all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return handleSuccessResponse(users, 200); //function call
  } catch (e: unknown) {
    return handleErrorResponse(e); //function call
  }
}

//create new user or register user
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const validatedBody = validateBody(UserSchema, body); // auto-throws ZodError

    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) throw new Error("Email already exists");

    const existingUserName = await User.findOne({ username: body.username });
    if (existingUserName) throw new Error("Username already exists");

    const newUser = await User.create(validatedBody);
    return handleSuccessResponse(newUser, 201);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}
