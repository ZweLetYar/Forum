// "use server";

// import dbConnect from "../dbConnect";
// import mongoose, { Mongoose } from "mongoose";
// import { actionError } from "../response";
// import validateBody from "../vaildateBody";

// import Question from "@/database/question.model";

// import QuestionEditSchema from "../schemas/QuestionEditSchema";
// import Tag, { ITagDoc } from "@/database/tag.model";
// import TagQuestion from "@/database/tagQuestion.model";

// export async function QuestionEdit(params: {
//   id: string;
//   title: string;
//   content: string;
//   tags: string[];
// }): Promise<{
//   success: boolean;
//   data?: {
//     _id: string;
//     title: string;
//     content: string;
//     tags: string[];
//     author: string;
//   };
// }> {
//   await dbConnect();

//   const session = await mongoose.startSession();
//   session.startTransaction();
//   const validatedData = validateBody(QuestionEditSchema, params);
//   //@ts-expect-error
//   const { id, title, content, tags } = validatedData;

//   try {
//     let question = await Question.findById(id).populate("tags");
//     if (!question) throw new Error("Fail to get a question!");

//     if (question.title !== title || question.content !== content) {
//       question.title = title;
//       question.content = content;
//       await question.save({ session });
//     }

//     const tagsToAdd = tags.filter(
//       (tag: string) => !question.tags.includes(tag.toLowerCase())
//     );

//     const tagsToRemove = question.tags.filter(
//       (tag: ITagDoc) => !tags.includes(tag.name.toLowerCase())
//     );

//     if (tagsToRemove.length > 0) {
//       const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag._id);

//       await Tag.updateMany(
//         { _id: { $in: tagIdsToRemove } },
//         { $inc: { questions: -1 } },
//         { session }
//       );

//       await TagQuestion.deleteMany({
//         tag: { $in: tagIdsToRemove },
//         question: question._id,
//       }).session(session);

//       question.tags = question.tags.filter(
//         (tagId: mongoose.Types.ObjectId) => !tagsToRemove.includes(tagId)
//       );
//     }

//     if (tagsToAdd.length > 0) {
//       const newTagDocuments = [];
//       for (const tag of tagsToAdd) {
//         let existingTag = await Tag.findOneAndUpdate(
//           {
//             name: { $regex: new RegExp(`^${tag}$`, "i") },
//           },
//           { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
//           { upsert: true, new: true, session }
//         );

//         if (existingTag) {
//           const existingTagQuestion = await TagQuestion.findOne({
//             tag: existingTag._id,
//             question: id,
//           });

//           if (!existingTagQuestion) {
//             newTagDocuments.push({
//               tag: existingTag._id,
//               question: id,
//             });
//           }
//         }

//         if (
//           question.tags.find((tagId: mongoose.Types.ObjectId) =>
//             tagId.equals(existingTag._id)
//           )
//         ) {
//           question.tags.push(existingTag._id);
//         }
//       }

//       if (newTagDocuments.length > 0) {
//         await TagQuestion.insertMany(newTagDocuments);
//       }
//     }

//     await question.save({ session });

//     await session.commitTransaction();

//     return { success: true, data: JSON.parse(JSON.stringify(question)) };
//   } catch (e) {
//     session.abortTransaction();
//     return actionError(e);
//   } finally {
//     session.endSession();
//   }
// }

"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validateBody from "../vaildateBody";

import Question from "@/database/question.model";
import QuestionEditSchema from "../schemas/QuestionEditSchema";
import Tag, { ITagDoc } from "@/database/tag.model";
import TagQuestion from "@/database/tagQuestion.model";

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

  const session = await mongoose.startSession();
  session.startTransaction();

  const validatedData = validateBody(QuestionEditSchema, params);
  //@ts-expect-error
  const { id, title, content, tags } = validatedData;

  try {
    let question = await Question.findById(id).populate("tags");
    if (!question) throw new Error("Fail to get a question!");

    // ✅ Update basic fields if changed
    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save({ session });
    }

    // ✅ FIX HERE — get lowercase tag names from existing tag docs
    const currentTagNames = (question.tags as ITagDoc[]).map((t) =>
      t.name.toLowerCase()
    );

    // ✅ FIX HERE — compare names in lowercase consistently
    const tagsToAdd = tags.filter(
      (tag: string) => !currentTagNames.includes(tag.toLowerCase())
    );

    // ✅ FIX HERE — filter existing tags to remove
    const tagsToRemove = (question.tags as ITagDoc[]).filter(
      (t) =>
        !tags.map((x: string) => x.toLowerCase()).includes(t.name.toLowerCase())
    );

    // --- Handle removed tags ---
    if (tagsToRemove.length > 0) {
      const tagIdsToRemove: mongoose.Types.ObjectId[] = tagsToRemove.map(
        (t) => t._id as mongoose.Types.ObjectId
      );

      await Tag.updateMany(
        { _id: { $in: tagIdsToRemove } },
        { $inc: { questions: -1 } },
        { session }
      );

      await TagQuestion.deleteMany({
        tag: { $in: tagIdsToRemove },
        question: question._id,
      }).session(session);

      // ✅ FIX HERE — keep only remaining tags (ObjectIds only)
      question.tags = (question.tags as ITagDoc[])
        .filter(
          (t) =>
            !tagIdsToRemove.some((id: mongoose.Types.ObjectId) =>
              id.equals(t._id as mongoose.Types.ObjectId)
            )
        )
        .map((t) => t._id);
    }

    // --- Handle new tags ---
    if (tagsToAdd.length > 0) {
      const newTagDocs = [];

      for (const tag of tagsToAdd) {
        const tagName = tag.toLowerCase();

        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tagName}$`, "i") } },
          { $setOnInsert: { name: tagName }, $inc: { questions: 1 } },
          { upsert: true, new: true, session }
        );

        if (existingTag) {
          // ✅ FIX HERE — ensure TagQuestion mapping exists
          const existingLink = await TagQuestion.findOne({
            tag: existingTag._id,
            question: question._id,
          });

          if (!existingLink) {
            newTagDocs.push({ tag: existingTag._id, question: question._id });
          }

          // ✅ FIX HERE — ensure question.tags uses ObjectIds only
          if (
            !(question.tags as mongoose.Types.ObjectId[]).some((id) =>
              id.equals(existingTag._id)
            )
          ) {
            question.tags.push(existingTag._id);
          }
        }
      }

      if (newTagDocs.length > 0) {
        await TagQuestion.insertMany(newTagDocs);
      }
    }

    await question.save({ session });
    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    session.endSession();
  }
}
