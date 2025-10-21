import User from "@/database/user.model";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";

//Find User by Email API
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not Found!");
    }
    return handleSuccessResponse(user, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
