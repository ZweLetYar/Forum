// import User from "@/database/user.model";
// import dbConnect from "@/lib/dbConnect";
// import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
// import UserSchema from "@/lib/schemas/UserSchema";
// import validateBody from "@/lib/vaildateBody";
// import { Types } from "mongoose";

// //Get user
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     if (!Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid user ID");
//     }
//     await dbConnect();

//     const user = await User.findById(id);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return handleSuccessResponse(user, 200);
//   } catch (e: unknown) {
//     return handleErrorResponse(e);
//   }
// }

// //Delete user
// export async function DELETE(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     if (!Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid user ID");
//     }

//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return handleSuccessResponse(user, 200);
//   } catch (e: unknown) {
//     return handleErrorResponse(e);
//   }
// }

// //Update user
// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     if (!Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid user ID");
//     }

//     const validatedData = validateBody(UserSchema, await req.json());

//     // @ts-expect-error
//     const user = await User.findByIdAndUpdate(id, validatedData, {
//       new: true,
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return handleSuccessResponse(user, 200);
//   } catch (e: unknown) {
//     return handleErrorResponse(e);
//   }
// }

// //Partial Update user
// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     if (!Types.ObjectId.isValid(id)) {
//       throw new Error("Invalid user ID");
//     }

//     const validatedData = validateBody(UserSchema.partial(), await req.json());

//     // @ts-expect-error
//     const user = await User.findByIdAndUpdate(id, validatedData, {
//       new: true,
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return handleSuccessResponse(user, 200);
//   } catch (e: unknown) {
//     return handleErrorResponse(e);
//   }
// }

import User from "@/database/user.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import UserSchema from "@/lib/schemas/UserSchema";
import validateBody from "@/lib/vaildateBody";
import { Types } from "mongoose";

// Ensure DB is connected before handling requests
async function ensureDb() {
  await dbConnect();
}

// GET user by ID
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDb();

    const { id } = params;

    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");

    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    return handleSuccessResponse(user, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

// DELETE user by ID
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDb();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");

    return handleSuccessResponse(user, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

// PUT - Full update user by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDb();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");

    const validatedData = validateBody(UserSchema, await req.json());

    //@ts-expect-error
    const user = await User.findByIdAndUpdate(id, validatedData, { new: true });
    if (!user) throw new Error("User not found");

    return handleSuccessResponse(user, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

// PATCH - Partial update user by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await ensureDb();

    const { id } = params;
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid user ID");

    const validatedData = validateBody(UserSchema.partial(), await req.json());

    //@ts-expect-error
    const user = await User.findByIdAndUpdate(id, validatedData, { new: true });
    if (!user) throw new Error("User not found");

    return handleSuccessResponse(user, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
