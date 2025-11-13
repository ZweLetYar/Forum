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

export async function QuestionCreate(params: {
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
  const validatedData = validateBody(QuestionCreateSchema, params);
  //@ts-expect-error
  const { title, content, tags } = validatedData;
  const userId = auth_session?.user?.id;

  try {
    let [question] = await Question.create(
      [{ title, content, author: userId }],
      { session }
    );
    if (!question) throw new Error("Fail to create a question!");

    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );

      tagIds.push(existingTag._id);
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    await TagQuestion.insertMany(tagQuestionDocuments, { session });
    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );

    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    session.abortTransaction();
    return actionError(e);
  } finally {
    session.endSession();
  }
}
