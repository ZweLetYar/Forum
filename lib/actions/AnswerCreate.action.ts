"use server";
import Answer, { IAnswerDoc } from "@/database/answer.model";
import dbConnect from "../dbConnect";
import validateBody from "../vaildateBody";
import AnswerCreateSchema from "../schemas/AnswerCreateSchema";
import mongoose from "mongoose";
import { actionError } from "../response";
import Question from "@/database/question.model";
import { auth } from "@/auth";

export default async function AnswerCreate(params: {
  questionId: string;
  answerContent: string;
}): Promise<{
  success: boolean;
  data?: { newAnswer: IAnswerDoc };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validateBody(AnswerCreateSchema, params);
  //@ts-expect-error
  const { questionId, answerContent } = validatedData;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const Auth_session = await auth();
    const userId = Auth_session?.user?.id;
    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found!");
    }
    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          content: answerContent,
          question: questionId,
        },
      ],
      session
    );

    question.answers += 1;
    await question.save({ session });

    await session.commitTransaction();
    return {
      success: true,
      data: { newAnswer: JSON.parse(JSON.stringify(newAnswer)) },
    };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
