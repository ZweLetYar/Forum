import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { auth } from "@/auth";
import Vote from "@/database/vote.model";
import Question from "@/database/question.model";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id: questionId } = params;
  const body = await req.json();
  const { voteType } = body as { voteType: "upvote" | "downvote" };

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const authSession = await auth();
    const userId = authSession?.user?.id;
    if (!userId)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const question = await Question.findById(questionId).session(session);
    if (!question)
      return NextResponse.json(
        { success: false, message: "Question not found" },
        { status: 404 }
      );

    const existing = await Vote.findOne({
      author: userId,
      type_id: questionId,
      type: "question",
    }).session(session);

    if (existing) {
      if (existing.voteType === voteType) {
        // toggle off
        await existing.deleteOne({ session });
        if (voteType === "upvote")
          question.upvotes = Math.max(0, (question.upvotes || 0) - 1);
        else question.downvotes = Math.max(0, (question.downvotes || 0) - 1);
        await question.save({ session });
        await session.commitTransaction();
        return NextResponse.json({
          success: true,
          data: {
            upvotes: question.upvotes,
            downvotes: question.downvotes,
            userVote: null,
          },
        });
      } else {
        // switch vote
        const prev = existing.voteType;
        existing.voteType = voteType;
        await existing.save({ session });
        if (voteType === "upvote") {
          question.upvotes = (question.upvotes || 0) + 1;
          question.downvotes = Math.max(0, (question.downvotes || 0) - 1);
        } else {
          question.downvotes = (question.downvotes || 0) + 1;
          question.upvotes = Math.max(0, (question.upvotes || 0) - 1);
        }
        await question.save({ session });
        await session.commitTransaction();
        return NextResponse.json({
          success: true,
          data: {
            upvotes: question.upvotes,
            downvotes: question.downvotes,
            userVote: voteType,
          },
        });
      }
    } else {
      // create vote
      await Vote.create(
        [{ author: userId, type_id: questionId, type: "question", voteType }],
        { session }
      );
      if (voteType === "upvote") question.upvotes = (question.upvotes || 0) + 1;
      else question.downvotes = (question.downvotes || 0) + 1;
      await question.save({ session });
      await session.commitTransaction();
      return NextResponse.json({
        success: true,
        data: {
          upvotes: question.upvotes,
          downvotes: question.downvotes,
          userVote: voteType,
        },
      });
    }
  } catch (e) {
    await session.abortTransaction();
    return NextResponse.json(
      { success: false, message: (e as any)?.message || "Error" },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}
