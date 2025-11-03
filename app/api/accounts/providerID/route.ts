import Account from "@/database/account.model";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";

//Find User by providerAccountId API
export async function POST(req: Request) {
  try {
    const { providerAccountId } = await req.json();
    const account = await Account.findOne({
      providerAccountId: providerAccountId,
    });
    if (!account) {
      throw new Error("Account Not Found!");
    }
    return handleSuccessResponse(account, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
