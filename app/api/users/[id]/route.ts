import User from "@/database/user.model";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateBody from "@/lib/vaildateBody";
import { Types } from "mongoose";

//Get user
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return handleSuccessResponse(user, 200);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}

//Delete user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new Error("User not found");
    }

    return handleSuccessResponse(user, 200);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}

//Update user
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const validatedData = validateBody(UserSchema, await req.json());

    // @ts-expect-error
    const user = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return handleSuccessResponse(user, 200);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}

//Partial Update user
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    const validatedData = validateBody(UserSchema.partial(), await req.json());

    // @ts-expect-error
    const user = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return handleSuccessResponse(user, 200);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}
