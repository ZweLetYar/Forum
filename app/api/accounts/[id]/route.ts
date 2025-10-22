import Account from "@/database/account.model";

import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";

import validateBody from "@/lib/vaildateBody";
import { Types } from "mongoose";

//Get account
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Account ID");
    }

    const account = await Account.findById(id);

    if (!account) {
      throw new Error("Account not found");
    }

    return handleSuccessResponse(account, 200);
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
      throw new Error("Invalid account ID");
    }

    const account = await Account.findByIdAndDelete(id);

    if (!account) {
      throw new Error("account not found");
    }

    return handleSuccessResponse(account, 200);
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
      throw new Error("Invalid account ID");
    }

    const validatedData = validateBody(AccountSchema, await req.json());

    // @ts-expect-error
    const account = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!account) {
      throw new Error("Account not found");
    }

    return handleSuccessResponse(account, 200);
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
      throw new Error("Invalid account ID");
    }

    const validatedData = validateBody(
      AccountSchema.partial(),
      await req.json()
    );

    // @ts-expect-error
    const account = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!account) {
      throw new Error("Account not found");
    }

    return handleSuccessResponse(account, 200);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}
