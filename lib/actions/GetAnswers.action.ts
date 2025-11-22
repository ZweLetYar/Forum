"use server";

import Answer, { IAnswerDoc } from "@/database/answer.model";
import dbConnect from "../dbConnect";
import validateBody from "../vaildateBody";
import GetAnswersSchema from "../schemas/GetAnswersSchema";
import { actionError } from "../response";

export async function GetAnswers(params: {
  questionId: string;
  page: number;
  pageSize: number;
  filter?: string;
}): Promise<{
  success: boolean;
  data?: { answers: IAnswerDoc[]; totalAnswers: number; isNext: boolean };
  message?: string | undefined;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validateBody(GetAnswersSchema, params);
  //@ts-expect-error
  const { questionId, page = 1, pageSize = 10, filter } = validatedData;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);
  let sortCriteria: {};
  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }
  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const answers = await Answer.find({ question: questionId })
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .populate("author", "_id name image")
      .lean();

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        totalAnswers,
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
