"use server";

import Question, { IQuestionDoc } from "@/database/question.model";
import dbConnect from "../dbConnect";
import GetTagQuestionSchema from "../schemas/GetTagQuestionSchema";
import validateBody from "../vaildateBody";
import { FilterQuery } from "mongoose";
import { actionError } from "../response";
import Tag, { ITagDoc } from "@/database/tag.model";

const GetTagQuestions = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  tagId: string;
}): Promise<{
  success: boolean;
  data?: {
    tag: ITagDoc;
    questions: IQuestionDoc[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateBody(GetTagQuestionSchema, params);

  //@ts-expect-error
  let { page = 1, pageSize = 10, search, sort, tagId } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new Error("Tag Not Found");
    }

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (search) {
      filterQuery.title = { $regex: search, $options: "i" };
    }

    const questions = await Question.find(filterQuery)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate("author", "name image")
      .populate("tags", "name")
      .lean()
      .skip(skip)
      .limit(limit);

    const totalQuestion = await Question.countDocuments(filterQuery);
    const isNext = totalQuestion > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetTagQuestions;
