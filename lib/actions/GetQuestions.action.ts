"use server";

import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import validateBody from "../vaildateBody";
import PaginatedSearchParamsSchema from "../schemas/PaginatedSearchParamsSchema";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";

export async function GetQuestions(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    questions: IQuestionDoc[];
    isNext: boolean;
  };
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(PaginatedSearchParamsSchema, params);

  //@ts-expect-error
  let { page = 1, pageSize = 10, search, filter, sort } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Question> = {};

  //will implement later
  if (filter === "recommended") {
    return { success: true, data: { questions: [], isNext: false } };
  }

  if (search) {
    filterQuery.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  let sortCreteria: {};

  switch (filter) {
    case "newest":
      sortCreteria = { createdAt: -1 };
      break;
    case "unanswered":
      filterQuery.answers = 0;
      sortCreteria = { createdAt: -1 };
      break;
    case "popular":
      sortCreteria = { upvote: -1 };
      break;

    default:
      sortCreteria = { createdAt: -1 };
      break;
  }

  try {
    const questions = await Question.find(filterQuery)
      .populate("author", "name image")
      .populate("tags", "name")
      .lean()
      .sort(sortCreteria)
      .skip(skip)
      .limit(limit);

    const totalQuestion = await Question.countDocuments(filterQuery);

    const isNext = totalQuestion > questions.length + skip;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
