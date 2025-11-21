"use server";

import Question from "@/database/question.model";
import { actionError } from "../response";
import IncreaseViewCountSchema from "../schemas/IncreaseViewCountSchema";
import validateBody from "../vaildateBody";

export default async function (params: { questionId: string }): Promise<{
  success: boolean;
  data?: {
    views: number;
  };
  message?: string;
  details?: Object | null;
}> {
  const validatedData = validateBody(IncreaseViewCountSchema, params);

  //@ts-expect-error
  const { questionId } = validatedData;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question Not Found.");
    }

    question.views += 1;

    await question.save();

    return {
      success: true,
      data: {
        views: question.views,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
