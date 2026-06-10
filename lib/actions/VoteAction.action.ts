"use server";
import mongoose from "mongoose";
import VoteActionSchema from "../schemas/VoteActionSchema";
import validateBody from "../vaildateBody";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import { auth } from "@/auth";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

const VoteAction = async (params: {
  type: "question" | "answer";
  typeId: string;
  voteType: "upvote" | "downvote";
}): Promise<{
  success: boolean;
  data?: {
    upvotes: number;
    downvotes: number;
    userVote: "upvote" | "downvote" | null;
  };
  error?: string;
  details?: object | null;
}> => {
  await dbConnect();
  const validatedData = validateBody(VoteActionSchema, params);
  //@ts-expect-error
  const { type, typeId, voteType } = validatedData;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auth_session = await auth();
    if (!auth_session || !auth_session.user) {
      throw new Error("Unauthorized");
    }

    let Model = type === "question" ? Question : Answer;
    let item = await Model.findById(typeId).session(session);
    if (!item) {
      throw new Error(`${type} not found`);
    }

    let existingVote = item.Vote.findOne({
      author: auth_session.user.id,
      type_id: typeId,
      type: type,
    }).session(session);

    let newUpvotes = item.upvotes || 0;
    let newDownvotes = item.downvotes || 0;
    let userVote: "upvote" | "downvote" | null = null;
    if (existingVote) {
      // Handle existing vote
      if (existingVote.voteType === voteType) {
        // User is trying to vote the same way again, so we remove the vote
        if (voteType === "upvote") {
          newUpvotes -= 1;
        } else {
          newDownvotes -= 1;
        }
        await existingVote.deleteOne({ session });
        userVote = null;
      } else {
        // User is changing their vote
        if (voteType === "upvote") {
          newUpvotes += 1;
        } else {
          newDownvotes += 1;
        }
        existingVote.voteType = voteType;
        await existingVote.save({ session });
        userVote = voteType;
      }
    } else {
      // New vote
      item.Vote.push({
        author: auth_session.user.id,
        type_id: typeId,
        type: type,
        voteType: voteType,
      });
      if (voteType === "upvote") {
        newUpvotes += 1;
      } else {
        newDownvotes += 1;
      }
      userVote = voteType;
    }

    item.upvotes = newUpvotes;
    item.downvotes = newDownvotes;
    await item.save({ session });
    await session.commitTransaction();
    return {
      success: true,
      data: {
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        userVote: userVote,
      },
    };
  } catch (e) {
    session.abortTransaction();
    return actionError(e);
  } finally {
    session.endSession();
  }
};

export default VoteAction;
