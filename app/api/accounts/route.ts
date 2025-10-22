import Account from "@/database/account.model";
import dbConnect from "@/lib/dbConnect";
import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";
import AccountSchema from "@/lib/schemas/AccountSchema";
import validateBody from "@/lib/vaildateBody";

//Get Accounts API
export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return handleSuccessResponse(accounts, 200);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

//Create Account API
export async function POST(req: Request) {
  try {
    await dbConnect(); // this is opitional in localhost
    const body = await req.json();
    let { provider, providerAccountId } = body;
    const validatedData = validateBody(AccountSchema, body);

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
    });
    if (existingAccount) {
      throw new Error("Account Already exist!");
    }

    const newAccount = await Account.create(validatedData);

    return handleSuccessResponse(newAccount, 201);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
