"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validateBody from "../vaildateBody";
import QuestionCreateSchema from "../schemas/QuestionCreateSchema";
import Question from "@/database/question.model";
import { auth } from "@/auth";
import Tag from "@/database/tag.model";
import TagQuestion from "@/database/tagQuestion.model";
import QuestionEditSchema from "../schemas/QuestionEditSchema";

export async function QuestionEdit(params: {
  id: string;
  title: string;
  content: string;
  tags: string[];
}): Promise<{
  success: boolean;
  data?: {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    author: string;
  };
}> {
  await dbConnect();
  const auth_session = await auth();
  const session = await mongoose.startSession();
  session.startTransaction();
  const validatedData = validateBody(QuestionEditSchema, params);
  //@ts-expect-error
  const { id, title, content, tags } = validatedData;
  const userId = auth_session?.user?.id;

  try {
    let question = await Question.findById(id).populate("tags");
    if (!question) throw new Error("Fail to get a question!");

    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save();
    }

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    session.abortTransaction();
    return actionError(e);
  } finally {
    session.endSession();
  }
}
