"use server";

import dbConnect from "../dbConnect";

import { actionError } from "../response";
import validateBody from "../vaildateBody";

import Question, { IQuestion } from "@/database/question.model";

import GetQuestionSchma from "../schemas/GetQuestionSchema";

export async function GetQuestion(params: { questionId: string }): Promise<{
  success: boolean;
  data?: IQuestion;
}> {
  await dbConnect();

  const validatedData = validateBody(GetQuestionSchma, params);
  //@ts-expect-error
  const { questionId } = validatedData;

  try {
    const question = await Question.findById(questionId)
      .populate("tags")
      .populate("author", "_id name image")
      .lean();
    if (!question) throw new Error("Fail to get a question!");

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    return actionError(e);
  }
}
